#!/usr/bin/env python3
"""Convert the AARC river navigation Google My Maps KML into static guide JSON.

Usage:
    python3 scripts/build_river_navigation_guide.py /path/to/river-map.kml assets/data/river-navigation-guide.json
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


MAP_DEFS = [
    {
        "id": "first-weekend",
        "name": "First Weekend Map",
        "summary": "First-weekend practice from launch to the assigned turn cues and back to docking. Stay inside the route your coach gives you.",
        "routeRanges": [[0, 280], [900, 1450], [6200, 6505]],
        "markerRanges": [[0, 280], [900, 1450], [6200, 6505]],
        "lineIds": [
            "lts-first-weekend",
            "no-rowing-beyond-this-point",
            "lts-first-weekend-2",
        ],
        "keyPlaceIds": [
            "launch",
            "downstream",
            "river-turn-5",
            "river-turn-6",
            "river-turn-7",
            "river-turn-8",
            "docking",
        ],
        "gateNotes": [
            {
                "lineId": "lts-first-weekend",
                "note": "First-weekend route limit on the downstream side of the dock.",
            },
            {
                "lineId": "no-rowing-beyond-this-point",
                "note": "Permanent no-row danger boundary near Argo.",
            },
            {
                "lineId": "lts-first-weekend-2",
                "note": "First-weekend route limit on the upstream side.",
            },
        ],
    },
    {
        "id": "saturday-second-weekend",
        "name": "Saturday Second Weekend Map",
        "summary": "Saturday bridge session for the second weekend. Review the bridge approach, pillar choices, current, return, and docking.",
        "routeRanges": [[0, 2820], [5160, 6505]],
        "markerRanges": [[0, 2820], [5160, 6505]],
        "excludeMarkerIds": [
            "river-turn-5",
            "river-turn-3",
            "river-turn-4",
            "river-turn-6",
            "river-turn-7",
            "river-turn-8",
        ],
        "lineIds": [
            "lts-saturday-second-weekend",
        ],
        "bridgeFocusIds": [
            "river-turn-9",
            "bridge-pillar-2",
            "tree-branches",
            "correct-your-angle",
            "wrong-side-of-the-pillar",
            "pass-here",
            "bridge-pillar",
            "bridge-pillar-4",
            "current",
            "bridge-pillar-3",
            "river-turn-10",
        ],
        "keyPlaceIds": [
            "launch",
            "river-turn-9",
            "bridge-pillar-2",
            "tree-branches",
            "correct-your-angle",
            "pass-here",
            "bridge-pillar-4",
            "current",
            "bridge-pillar-3",
            "river-turn-10",
            "docking",
        ],
        "gateNotes": [
            {
                "lineId": "lts-saturday-second-weekend",
                "note": "Saturday second-weekend route limit.",
            },
        ],
    },
    {
        "id": "sunday-full-route",
        "name": "Sunday Full Route Map",
        "summary": "Full-route rehearsal toward Tail Bridge and back. Review bridge openings, hazards, current, regrouping, and docking.",
        "routeRanges": [[0, 6505]],
        "markerRanges": "__all_stops__",
        "excludeMarkerIds": [
            "river-turn-5",
            "river-turn-3",
            "river-turn-4",
            "river-turn-6",
            "river-turn-7",
            "river-turn-8",
            "river-turn-9",
            "river-turn-10",
        ],
        "lineIds": [
            "no-rowing-beyond-this-point",
            "end-point",
        ],
        "bridgeFocusIds": [
            "river-turn-9",
            "bridge-pillar-2",
            "tree-branches",
            "correct-your-angle",
            "wrong-side-of-the-pillar",
            "pass-here",
            "bridge-pillar",
            "bridge-pillar-4",
            "current",
            "bridge-pillar-3",
            "river-turn-10",
        ],
        "keyPlaceIds": [
            "launch",
            "downstream",
            "island-weeds",
            "bridge-pillar-2",
            "tree-branches",
            "correct-your-angle",
            "pass-here",
            "sharp-turn",
            "tree-branch",
            "river-turn",
            "river-turn-2",
            "good-place-for-a-break",
            "fallen-trees-corner",
            "bridge-pillar-4",
            "current",
            "bridge-pillar-3",
            "stay-on-your-side-of-the-corner",
            "docking",
        ],
        "gateNotes": [
            {
                "lineId": "no-rowing-beyond-this-point",
                "note": "Permanent no-row danger boundary near Argo.",
            },
            {
                "lineId": "end-point",
                "note": "Turn point near Tail Bridge.",
            },
        ],
    },
]


CHECKS = {
    "Docking": {
        "question": "What is the safest docking approach?",
        "choices": [
            "Approach slowly at an angle, then make small corrections.",
            "Aim straight at the dock and stop at the last second.",
            "Come in fast so the boat keeps tracking straight.",
        ],
        "answer": 0,
        "feedback": "Docking should be slow and angled. Do not aim the bow straight at the dock.",
    },
    "No rowing beyond this point": {
        "question": "What should you do at this boundary?",
        "choices": [
            "Treat it as a hard no-row line and turn before reaching it.",
            "Continue if the water looks empty.",
            "Only stop if another shell is nearby.",
        ],
        "answer": 0,
        "feedback": "The map labels this as a danger zone; turn before the line.",
    },
    "Wrong Side of the Pillar": {
        "question": "What is the teaching point at this bridge marker?",
        "choices": [
            "Avoid the wrong side of the pillar and commit to the safe opening early.",
            "Follow the bridge symmetry even if it pulls you across.",
            "Wait until the last moment to decide.",
        ],
        "answer": 0,
        "feedback": "Bridge decisions need an early, settled line. Last-second corrections are risky.",
    },
    "Correct your angle": {
        "question": "What should you do before this bridge decision?",
        "choices": [
            "Look ahead and correct the angle before the bridge pulls you off your side.",
            "Let the bridge shape guide the boat.",
            "Move to the center and decide under the bridge.",
        ],
        "answer": 0,
        "feedback": "Do not let the bridge shape pull you off your side of the river.",
    },
    "Stay on your side of the corner": {
        "question": "What is the safe line through this corner?",
        "choices": [
            "Stay on your side and avoid drifting across the river.",
            "Cut across to make the corner shorter.",
            "Stop in the middle until the corner clears.",
        ],
        "answer": 0,
        "feedback": "Corners are where drift becomes easy. Stay predictable and hold your side.",
    },
    "Sharp Turn": {
        "question": "What should you prioritize at this sharper turn?",
        "choices": [
            "Stay close enough to your side without drifting across.",
            "Let the boat run wide to the other side.",
            "Speed up so steering feels easier.",
        ],
        "answer": 0,
        "feedback": "This sharper turn requires early steering and a predictable line.",
    },
    "Weeds": {
        "question": "What should you do near weeds?",
        "choices": [
            "Give the weeds room while staying in the traffic pattern.",
            "Cut across the river to avoid every weed patch.",
            "Row through them quickly so the boat does not slow down.",
        ],
        "answer": 0,
        "feedback": "Give weeds enough room for oars and skeg, but stay predictable.",
    },
    "Current": {
        "question": "What changes when current pushes the shell?",
        "choices": [
            "Make small early corrections and keep your line predictable.",
            "Wait until the boat has drifted, then make one large correction.",
            "Move into the middle of the river until the current passes.",
        ],
        "answer": 0,
        "feedback": "Current is easier to manage with early, small steering corrections.",
    },
}


ID_CHECKS = {
    "river-turn-5": {
        "question": "What is the river-turn sequence?",
        "choices": [
            "Stop, turn, check, then cross or continue as directed.",
            "Keep rowing through the turn and correct later.",
            "Move to the middle early and wait there.",
        ],
        "answer": 0,
        "feedback": "A river turn is a controlled stop-turn-check maneuver. It is not a speed move.",
    },
}


ITEM_OVERRIDES = {
    "river-turn-5": {
        "displayTitle": "River turn: downstream first cue",
        "description": "First downstream turn cue after leaving the dock.",
        "action": "Come under control early, turn as coached, check traffic, and keep the turn compact.",
    },
    "river-turn-3": {
        "displayTitle": "River turn: Argo boundary approach",
        "description": "Downstream turn cue near the hard no-row area. Treat this as a place to slow down and prepare before the danger boundary.",
        "action": "Set up early and turn before the no-row boundary. Do not drift toward the danger area.",
    },
    "river-turn-4": {
        "displayTitle": "River turn: Argo crossing cue",
        "description": "Companion turn cue on the Argo side of the downstream turn pattern.",
        "action": "Finish the turn sequence only after checking traffic and staying clear of the no-row area.",
    },
    "river-turn-6": {
        "displayTitle": "River turn: return from Argo side",
        "description": "Return-side turn cue near the downstream first-weekend practice area.",
        "action": "Use the same stop-turn-check habit before settling back into the normal traffic side.",
    },
    "river-turn-7": {
        "displayTitle": "River turn: upstream first-weekend cue",
        "description": "Upstream first-weekend turn cue. This is easier to use on the water than trying to interpret the gate line itself.",
        "action": "Turn where your coach directs, then confirm you are back on the correct side before adding pressure.",
    },
    "river-turn-8": {
        "displayTitle": "River turn: return toward dock",
        "description": "Return-side turn cue used when coming back toward the dock.",
        "action": "Complete the turn under control and keep scanning as you approach the dock area.",
    },
    "river-turn-9": {
        "displayTitle": "River turn: bridge approach cue",
        "description": "Second-weekend turn cue near the first bridge introduction.",
        "action": "Use this as the practical turn cue before the bridge sequence, then look early for the correct opening.",
    },
    "river-turn-10": {
        "displayTitle": "River turn: bridge return cue",
        "description": "Return-side turn cue for the second-weekend bridge area.",
        "action": "Turn only after checking traffic and leave the bridge approach clear for other shells.",
    },
    "river-turn": {
        "displayTitle": "River turn: Tail Bridge outbound",
        "description": "Full-route turn cue near Tail Bridge on the outbound side.",
        "action": "Turn before Tail Bridge and keep the turn predictable for following boats.",
    },
    "river-turn-2": {
        "displayTitle": "River turn: Tail Bridge return",
        "description": "Full-route return-side turn cue near Tail Bridge.",
        "action": "Complete the return-side turn with room for the next boat and settle back onto the correct side.",
    },
    "bridge-pillar-2": {
        "displayTitle": "Bridge pillar: outbound opening",
    },
    "bridge-pillar-3": {
        "displayTitle": "Bridge pillar: return opening",
    },
    "bridge-pillar-4": {
        "displayTitle": "Bridge pillar: return-side setup",
    },
}


DESCRIPTION_OVERRIDES = {
    "Launch": "Start of the route at the AARC dock.",
    "Downstream": "Orientation cue for the downstream direction from the dock.",
    "Docking": "Docking works best as a slow angled approach, not a head-on approach.",
    "River Turn": "River turns are controlled stop-turn-check maneuvers.",
    "LTS First Weekend": "Route limit for first-weekend practice.",
    "LTS Saturday Second Weekend": "Route limit for the Saturday bridge session.",
    "No rowing beyond this point": "Hard no-row boundary. The map marks this area as dangerous.",
    "End Point": "Full-route turn point before Tail Bridge.",
    "Island + Weeds": "Island and weed area where oars can catch if you crowd the edge.",
    "Weeds": "Weed area. Stay clear enough that oars and skeg do not catch.",
    "Fallen Tree": "Fallen tree hazard near the rowing line.",
    "Fallen Trees": "Fallen tree hazards near the rowing line.",
    "Fallen Trees / Corner": "Fallen tree hazards at a corner where drift is easy.",
    "Tree Branch": "Branch hazard near the rowing line.",
    "Tree branches": "Branch hazard near the bridge approach.",
    "Current": "Current can push the shell off line here.",
    "Bridge Pillar": "Bridge-pillar decision point.",
    "Wrong Side of the Pillar": "Wrong-side marker for the bridge-pillar decision.",
    "Pass here": "Preferred bridge opening or passing side.",
    "Correct your angle": "Angle-correction point before the bridge pulls you off line.",
    "Sharp Turn": "Sharper turn where it is easy to drift across the river.",
    "Stay on your side of the corner": "Corner where it is easy to drift to the other side.",
    "Good Place for a Break": "Good regrouping area when a coach directs the group to pause.",
}


ACTION_OVERRIDES = {
    "Launch": "Launch cleanly, check traffic, and settle onto the correct side before adding pressure.",
    "Downstream": "Use this cue to orient yourself before rowing away from the dock.",
    "Docking": "Approach slowly at an angle, make small corrections, and avoid pointing the bow straight at the dock.",
    "River Turn": "Come fully under control, turn, check traffic, then cross or continue in the direction your coach has assigned.",
    "LTS First Weekend": "Stay inside the route your coach gives you and turn where directed.",
    "LTS Saturday Second Weekend": "Stay inside the route your coach gives you and turn where directed.",
    "No rowing beyond this point": "Do not row past this boundary. Turn before reaching the danger area.",
    "End Point": "Turn before Tail Bridge and keep the turning area clear for the next boat.",
    "Island + Weeds": "Give the island and weed edge room while still staying in the traffic pattern.",
    "Weeds": "Stay far enough off the weeds to keep oars and skeg clear.",
    "Fallen Tree": "Look early and give the tree room without crossing into the wrong traffic lane.",
    "Fallen Trees": "Look early and give the trees room without crossing into the wrong traffic lane.",
    "Fallen Trees / Corner": "Set the corner early, hold your side, and leave room for the tree hazards.",
    "Tree Branch": "Correct early and leave room for the branch hazard.",
    "Tree branches": "Do not follow the bridge shape blindly; correct early so you avoid the branches.",
    "Current": "Expect drift here. Make small early corrections and keep your line predictable.",
    "Bridge Pillar": "Look early, identify the correct side of the pillar, and commit before you reach the bridge.",
    "Wrong Side of the Pillar": "Do not use this side of the pillar. Choose the safe opening early.",
    "Pass here": "Use this cue for the safe bridge opening or passing side, then settle back into the normal traffic pattern.",
    "Correct your angle": "Look ahead and correct your angle before bridge symmetry pulls you across your side.",
    "Sharp Turn": "Set the turn early, stay on your side, and avoid drifting across the river.",
    "Stay on your side of the corner": "Hold your side through the corner; do not cut across the river.",
    "Good Place for a Break": "Use this as a calm regrouping area only when directed by a coach.",
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
    if name in ACTION_OVERRIDES:
        return ACTION_OVERRIDES[name]
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


def add_projection_labels(item: dict) -> None:
    projections = item.get("projections", [])
    if not projections:
        item["routePositions"] = []
        return
    positions = sorted({projection["distanceMeters"] for projection in projections})
    item["routePositions"] = positions


def in_ranges(distance: float, ranges: list[list[float]]) -> bool:
    return any(start <= distance <= end for start, end in ranges)


def marker_ids_for_map(map_def: dict, stops: list[dict]) -> list[str]:
    marker_ranges = map_def.get("markerRanges")
    if marker_ranges == "__all_stops__":
        marker_ids = [item["id"] for item in stops]
    elif marker_ranges:
        marker_ids = [item["id"] for item in stops if in_ranges(item["distanceMeters"], marker_ranges)]
    else:
        marker_ids = list(map_def.get("markerIds", []))

    excluded = set(map_def.get("excludeMarkerIds", []))
    if excluded:
        marker_ids = [item_id for item_id in marker_ids if item_id not in excluded]

    seen = set(marker_ids)
    for item_id in map_def["keyPlaceIds"]:
        if item_id not in seen:
            marker_ids.append(item_id)
            seen.add(item_id)
    return marker_ids


def build_maps(stops: list[dict], lines: list[dict]) -> list[dict]:
    stop_ids = {item["id"] for item in stops}
    line_ids = {item["id"] for item in lines}
    all_ids = stop_ids | line_ids
    maps = []
    for map_def in MAP_DEFS:
        marker_ids = marker_ids_for_map(map_def, stops)
        bridge_focus_ids = list(map_def.get("bridgeFocusIds", []))
        missing_markers = sorted(set(marker_ids) - stop_ids)
        missing_lines = sorted(set(map_def["lineIds"]) - line_ids)
        missing_keys = sorted(set(map_def["keyPlaceIds"]) - all_ids)
        missing_bridge_focus = sorted(set(bridge_focus_ids) - all_ids)
        missing_excluded = sorted(set(map_def.get("excludeMarkerIds", [])) - stop_ids)
        if missing_markers or missing_lines or missing_keys or missing_bridge_focus or missing_excluded:
            details = []
            if missing_markers:
                details.append(f"markers={missing_markers}")
            if missing_lines:
                details.append(f"lines={missing_lines}")
            if missing_keys:
                details.append(f"key places={missing_keys}")
            if missing_bridge_focus:
                details.append(f"bridge focus={missing_bridge_focus}")
            if missing_excluded:
                details.append(f"excluded markers={missing_excluded}")
            raise SystemExit(f"Map {map_def['id']} references missing ids: {'; '.join(details)}")
        maps.append({
            "id": map_def["id"],
            "name": map_def["name"],
            "summary": map_def["summary"],
            "routeRanges": map_def["routeRanges"],
            "keyPlaceIds": map_def["keyPlaceIds"],
            "markerIds": marker_ids,
            "lineIds": map_def["lineIds"],
            "bridgeFocusIds": bridge_focus_ids,
            "gateNotes": map_def["gateNotes"],
        })
    return maps


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
        projections = [
            project_to_route(
                coord,
                route_xy,
                segments,
                lambda lon, lat: (xy(lon, lat)[0] - min_x, xy(lon, lat)[1] - min_y),
            )
            for coord in coords
        ]
        distance = min(item["distanceMeters"] for item in projections)
        offset = sum(item["offsetMeters"] for item in projections) / len(projections)
        category = classify(name, description, geometry)
        display_description = DESCRIPTION_OVERRIDES.get(name, description)
        item = {
            "id": slugify(name, counter),
            "title": name,
            "category": category,
            "geometry": geometry,
            "description": display_description,
            "action": action_for(name, category, description),
            "distanceMeters": round(distance, 1),
            "offsetMeters": round(offset, 1),
            "coordinates": coords,
            "projections": projections,
        }
        if item["id"] in ITEM_OVERRIDES:
            item.update(ITEM_OVERRIDES[item["id"]])
        add_projection_labels(item)
        check = ID_CHECKS.get(item["id"]) or CHECKS.get(name)
        if check:
            item["check"] = check
        if is_line:
            lines.append(item)
        else:
            stops.append(item)

    stops.sort(key=lambda item: (item["distanceMeters"], item["title"], item["id"]))
    lines.sort(key=lambda item: (item["distanceMeters"], item["title"], item["id"]))
    maps = build_maps(stops, lines)

    payload = {
        "version": 4,
        "name": "AARC River Navigation Guide",
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
            "limit": "Practice gate / limit",
            "bridge": "Bridge decision",
            "hazard": "Hazard",
            "current": "Current / drift",
            "corner": "Corner / angle",
            "break": "Regrouping point",
            "marker": "River marker",
        },
        "maps": maps,
        "stops": stops,
        "lines": lines,
    }

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {destination} with {len(stops)} stops, {len(lines)} lines, and {len(maps)} maps.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
