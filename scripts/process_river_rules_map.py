#!/usr/bin/env python3
"""Convert the AARC river rules Google My Maps KML into static tour JSON.

Usage:
    python3 scripts/process_river_rules_map.py /path/to/river-map.kml assets/data/river-rules-rally-course.json
"""

from __future__ import annotations

import json
import math
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path


NS = {"k": "http://www.opengis.net/kml/2.2"}


SECTION_DEFS = [
    {
        "id": "dock-basics",
        "name": "Dock Basics",
        "summary": "Launch, orient downstream, and rehearse a slow angled docking approach.",
        "distanceRanges": [[0, 320], [6420, 6505]],
        "types": ["dock", "direction"],
    },
    {
        "id": "first-weekend",
        "name": "First Weekend Limits",
        "summary": "Use the first Learn-to-Scull boundaries and nearby turn markers before stretching the route.",
        "distanceRanges": [[240, 1825]],
        "types": ["limit", "turn", "hazard", "corner"],
    },
    {
        "id": "argo-turn",
        "name": "Argo Turn / No-Row Boundary",
        "summary": "Practice the downstream turn area, island/weeds, and the no-rowing danger line.",
        "distanceRanges": [[250, 1040]],
        "types": ["limit", "turn", "hazard"],
    },
    {
        "id": "second-weekend",
        "name": "Second Weekend Bridge Intro",
        "summary": "Review the second-weekend boundary, bridge-pillar choices, current, weeds, and pass-here cue.",
        "distanceRanges": [[1800, 2820], [5160, 5745]],
        "types": ["limit", "bridge", "hazard", "current", "corner"],
    },
    {
        "id": "full-technical",
        "name": "Full Technical Route",
        "summary": "Step through the sharper turns, fallen trees, end point, break area, and return-side hazards.",
        "distanceRanges": [[2820, 6415]],
        "types": ["turn", "limit", "hazard", "corner", "current", "bridge", "break"],
    },
]


CHECKS = {
    "Docking": {
        "question": "What is the safe docking idea here?",
        "choices": [
            "Slow approach at an angle, then adjust gently.",
            "Aim straight at the dock and stop at the last second.",
            "Come in fast so the boat tracks straight.",
        ],
        "answer": 0,
        "feedback": "Docking should be slow and angled; do not aim the bow straight at the dock.",
    },
    "River Turn": {
        "question": "What is the river-turn sequence to rehearse?",
        "choices": [
            "Stop, turn, check, cross or continue as directed.",
            "Keep rowing through the turn and correct later.",
            "Move to the middle early and wait there.",
        ],
        "answer": 0,
        "feedback": "A river turn is a controlled stop-turn-check maneuver, not a speed move.",
    },
    "No rowing beyond this point": {
        "question": "What should you do at this boundary?",
        "choices": [
            "Treat it as a hard no-row line and turn before it.",
            "Continue if the water looks empty.",
            "Only stop if another shell is nearby.",
        ],
        "answer": 0,
        "feedback": "The map labels this as a danger zone; turn before the line.",
    },
    "LTS First Weekend": {
        "question": "How should a first-weekend learner use this line?",
        "choices": [
            "Do not row beyond it until coaches expand the route.",
            "Use it only as a suggestion if you feel comfortable.",
            "Cross it when traffic is light.",
        ],
        "answer": 0,
        "feedback": "Progression boundaries are part of the practice plan, not optional challenges.",
    },
    "LTS Saturday Second Weekend": {
        "question": "What does this second-weekend line mean?",
        "choices": [
            "Do not row beyond it yet; turn before the line.",
            "Sprint through it before traffic arrives.",
            "Stop on the line and wait for other shells.",
        ],
        "answer": 0,
        "feedback": "Use it as a route limit and keep the turn area clear.",
    },
    "Wrong Side of the Pillar": {
        "question": "What is the teaching point at this bridge marker?",
        "choices": [
            "Do not choose the wrong side of the pillar; commit to the safe opening early.",
            "Follow the bridge symmetry even if it pulls you across.",
            "Wait until the last moment to decide.",
        ],
        "answer": 0,
        "feedback": "Bridge decisions need an early, settled line.",
    },
    "Correct your angle": {
        "question": "What should you do before this bridge/corner decision?",
        "choices": [
            "Look ahead and correct the angle before the bridge pulls you off your side.",
            "Let the bridge shape guide the boat.",
            "Move to the center and decide under the bridge.",
        ],
        "answer": 0,
        "feedback": "The map note warns not to follow bridge symmetry into the wrong side.",
    },
    "Stay on your side of the corner": {
        "question": "What is the safe line through this corner?",
        "choices": [
            "Stay on your side and avoid drifting across the river.",
            "Cut across to make the corner shorter.",
            "Stop in the middle until the corner clears.",
        ],
        "answer": 0,
        "feedback": "Corners are where drift becomes easy; stay predictable.",
    },
    "Sharp Turn": {
        "question": "What should you prioritize at this sharper turn?",
        "choices": [
            "Stay close enough to your side without drifting across.",
            "Let the boat run wide to the other side.",
            "Speed up so steering feels easier.",
        ],
        "answer": 0,
        "feedback": "The map note calls out the sharper turn and the need to avoid drifting across.",
    },
}


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    value = re.sub(r"<[^>]+>", " ", value)
    value = unicodedata.normalize("NFKC", value)
    return " ".join(value.split())


def slugify(value: str, counter: Counter[str]) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "stop"
    counter[slug] += 1
    if counter[slug] > 1:
        return f"{slug}-{counter[slug]}"
    return slug


def parse_coords(text: str) -> list[dict[str, float]]:
    coords = []
    for raw in text.split():
        lon, lat, *_ = raw.split(",")
        coords.append({"lon": round(float(lon), 7), "lat": round(float(lat), 7)})
    return coords


def classify(name: str, description: str, geometry: str) -> str:
    lower = f"{name} {description}".lower()
    if name in {"Launch", "Docking"}:
        return "dock"
    if name == "Downstream":
        return "direction"
    if "no rowing" in lower or "lts " in lower or name == "End Point":
        return "limit"
    if "river turn" in lower:
        return "turn"
    if "pillar" in lower or "pass here" in lower or "correct your angle" in lower:
        return "bridge"
    if "current" in lower:
        return "current"
    if "sharp turn" in lower or "corner" in lower:
        return "corner"
    if "good place" in lower:
        return "break"
    if any(word in lower for word in ["weed", "fallen tree", "tree branch", "branches", "island"]):
        return "hazard"
    return "marker" if geometry == "Point" else "line"


def action_for(name: str, category: str, description: str) -> str:
    if description:
        return description.rstrip(".") + "."
    if category == "dock" and name == "Launch":
        return "Launch cleanly, orient yourself, and establish the correct traffic side before building pressure."
    if category == "direction":
        return "Use this as an orientation cue for the downstream direction from the dock."
    if category == "turn":
        return "Stop under control, turn, check, then cross or continue in the direction noted by your coach."
    if category == "limit":
        return "Treat this as a route boundary for the relevant practice progression and turn before crossing it."
    if category == "bridge":
        return "Look early, choose the correct side or opening, and avoid last-second steering under the structure."
    if category == "current":
        return "Expect drift and correct early while keeping your line predictable."
    if category == "corner":
        return "Hold your side through the bend and avoid drifting across the traffic pattern."
    if category == "break":
        return "Use this as a calm regrouping spot when directed by a coach."
    if category == "hazard":
        return "Give the hazard extra room without abandoning the traffic pattern."
    return "Review this local marker before rowing the route."


def project_to_route(coord: dict[str, float], route_xy: list[tuple[float, float]], segments: list[tuple[float, float]], xy_func):
    px, py = xy_func(coord["lon"], coord["lat"])
    best = (float("inf"), 0.0, 0.0)
    for index in range(1, len(route_xy)):
        ax, ay = route_xy[index - 1]
        bx, by = route_xy[index]
        vx, vy = bx - ax, by - ay
        length_sq = vx * vx + vy * vy
        t = 0.0 if length_sq == 0 else max(0.0, min(1.0, ((px - ax) * vx + (py - ay) * vy) / length_sq))
        qx, qy = ax + vx * t, ay + vy * t
        distance = math.hypot(px - qx, py - qy)
        segment_start, segment_length = segments[index - 1]
        route_distance = segment_start + (segment_length * t)
        cross = vx * (py - qy) - vy * (px - qx)
        offset = distance if cross >= 0 else -distance
        if distance < best[0]:
            best = (distance, route_distance, offset)
    return {
        "distanceMeters": round(best[1], 1),
        "offsetMeters": round(best[2], 1),
        "projectionErrorMeters": round(best[0], 1),
    }


def in_ranges(distance: float, ranges: list[list[float]]) -> bool:
    return any(start <= distance <= end for start, end in ranges)


def assign_sections(stop: dict) -> list[str]:
    result = []
    distance = stop["distanceMeters"]
    category = stop["category"]
    for section in SECTION_DEFS:
        if in_ranges(distance, section["distanceRanges"]) and category in section["types"]:
            result.append(section["id"])
    if not result:
        for section in SECTION_DEFS:
            if in_ranges(distance, section["distanceRanges"]):
                result.append(section["id"])
                break
    if not result:
        result.append("full-technical")
    return result


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__.strip(), file=sys.stderr)
        return 2

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    root = ET.parse(source).getroot()

    route_placemark = None
    for placemark in root.findall(".//k:Placemark", NS):
        if clean_text(placemark.findtext("k:name", "", NS)) == "Full Round / 6.5 km":
            route_placemark = placemark
            break
    if route_placemark is None:
        raise SystemExit("Could not find Full Round / 6.5 km route in KML.")

    route_coords = parse_coords(route_placemark.findtext(".//k:coordinates", "", NS))
    mean_lat = sum(coord["lat"] for coord in route_coords) / len(route_coords)
    mean_lon = sum(coord["lon"] for coord in route_coords) / len(route_coords)

    def xy(lon: float, lat: float) -> tuple[float, float]:
        x = (lon - mean_lon) * math.cos(math.radians(mean_lat)) * 111_320
        y = -(lat - mean_lat) * 110_540
        return x, y

    raw_xy = [xy(coord["lon"], coord["lat"]) for coord in route_coords]
    min_x = min(point[0] for point in raw_xy)
    min_y = min(point[1] for point in raw_xy)
    route_xy = [(x - min_x, y - min_y) for x, y in raw_xy]
    segments = []
    vertex_distances = [0.0]
    total = 0.0
    for index in range(1, len(route_xy)):
        ax, ay = route_xy[index - 1]
        bx, by = route_xy[index]
        length = math.hypot(bx - ax, by - ay)
        segments.append((total, length))
        total += length
        vertex_distances.append(total)

    counter: Counter[str] = Counter()
    stops = []
    lines = []
    for placemark in root.findall(".//k:Placemark", NS):
        name = clean_text(placemark.findtext("k:name", "", NS))
        if name == "Full Round / 6.5 km":
            continue
        description = clean_text(placemark.findtext("k:description", "", NS))
        is_line = placemark.find(".//k:LineString", NS) is not None
        geometry = "LineString" if is_line else "Point"
        coords = parse_coords(placemark.findtext(".//k:coordinates", "", NS))
        projections = [project_to_route(coord, route_xy, segments, lambda lon, lat: (xy(lon, lat)[0] - min_x, xy(lon, lat)[1] - min_y)) for coord in coords]
        distance = min(item["distanceMeters"] for item in projections)
        offset = sum(item["offsetMeters"] for item in projections) / len(projections)
        category = classify(name, description, geometry)
        item = {
            "id": slugify(name, counter),
            "title": name,
            "category": category,
            "geometry": geometry,
            "description": description,
            "action": action_for(name, category, description),
            "distanceMeters": round(distance, 1),
            "offsetMeters": round(offset, 1),
            "coordinates": coords,
            "projections": projections,
        }
        check = CHECKS.get(name)
        if check:
            item["check"] = check
        if is_line:
            lines.append(item)
        else:
            stops.append(item)

    for item in stops + lines:
        item["sectionIds"] = assign_sections(item)

    stops.sort(key=lambda item: (item["distanceMeters"], item["title"], item["id"]))
    lines.sort(key=lambda item: (item["distanceMeters"], item["title"], item["id"]))

    sections = []
    for section in SECTION_DEFS:
        stop_ids = [item["id"] for item in stops if section["id"] in item["sectionIds"]]
        line_ids = [item["id"] for item in lines if section["id"] in item["sectionIds"]]
        sections.append({
            "id": section["id"],
            "name": section["name"],
            "summary": section["summary"],
            "stopIds": stop_ids,
            "lineIds": line_ids,
        })

    payload = {
        "version": 3,
        "name": "AARC River Rules Rally Guided Map Tour",
        "source": {
            "name": "Rowing Traffic on the Huron River",
            "mapUrl": "https://www.google.com/maps/d/u/0/edit?mid=1TqDNEvBmUQ8M4lU-NvyYAd9pCoG6agY&usp=sharing",
            "processedFrom": source.name,
            "note": "Generated from Google My Maps KML. Distances are training approximations, not navigation authority.",
        },
        "route": {
            "name": "Full Round / 6.5 km",
            "description": clean_text(route_placemark.findtext("k:description", "", NS)),
            "lengthMeters": round(total, 1),
            "coordinates": route_coords,
            "points": [
                {
                    "x": round(point[0], 1),
                    "y": round(point[1], 1),
                    "distanceMeters": round(vertex_distances[index], 1),
                }
                for index, point in enumerate(route_xy)
            ],
        },
        "categories": {
            "dock": "Dock / launch",
            "direction": "Direction cue",
            "turn": "River turn",
            "limit": "Route limit",
            "bridge": "Bridge decision",
            "hazard": "Hazard",
            "current": "Current / drift",
            "corner": "Corner / angle",
            "break": "Regrouping point",
            "marker": "Map marker",
        },
        "sections": sections,
        "stops": stops,
        "lines": lines,
    }

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {destination} with {len(stops)} stops, {len(lines)} lines, and {len(sections)} sections.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
