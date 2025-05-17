---
layout: coach
title: "River Traffic Patterns"
search_exclude: true
---

# River Traffic Patterns

This guide outlines essential navigation rules and traffic patterns for safe rowing. Understanding and following these protocols is crucial for avoiding collisions and maintaining safety on shared waterways.

<div class="info-box tip">
  <h4>Teaching Note</h4>
  <p>Many novice rowers find it helpful to remember: "Stay to the right as in driving a car."</p>
</div>

## Basic Navigation Principles

### The Starboard Rule

The fundamental principle of rowing traffic patterns is the **starboard rule**: boats should stay to the starboard (right) side of the waterway relative to their direction of travel. This creates a consistent, predictable flow of traffic in both directions.

**Key Points:**
- Always row with the nearest shore on your starboard (right) side
- This applies regardless of boat type or direction of travel
- When in doubt, move further to starboard
- The rule creates a counter-clockwise pattern on most waterways

### Lane Discipline

While the waterway doesn't have marked lanes, conceptually dividing it helps maintain order:

**Three-Lane Concept:**
1. **Shore Lane:** Closest to the starboard shoreline (primary rowing lane)
2. **Middle Lane:** Used primarily for passing or when shore lane is obstructed
3. **Center/Far Lane:** Used only when necessary and with extreme caution

**Key Points:**
- Row primarily in the shore lane
- Maintain consistent distance from shore (approximately 10-30 meters as conditions allow)
- Center of river should remain clear for passing and navigation
- Avoid unnecessary lane changes

## Passing Procedures

### Overtaking Another Boat

When approaching a slower boat from behind:

1. Check thoroughly that passing lane is clear
2. Call out "Passing on your port!" to alert the boat being passed
3. Move toward middle lane to pass
4. Pass with adequate clearance (minimum 2-3 boat lengths)
5. Return to shore lane once safely past (minimum 2 boat lengths clear)

### Approaching Head-On

When approaching another boat head-on:

1. Both boats should maintain course in their respective shore lanes
2. If necessary for safety, both should adjust slightly further toward their starboard shore
3. Make intentions clear with early, decisive movements
4. In very narrow waterways, the upstream boat typically has right-of-way

## Bridge Navigation

Bridges present specific navigation challenges that require clear protocols:

### General Bridge Rules

1. **Designated Arches:** Use only designated rowing arches
2. **No Passing:** Never attempt to pass another boat under a bridge
3. **Single File:** Boats must proceed in single file through bridges
4. **Look and Call:** Check for oncoming traffic and call "Clear under bridge!" before proceeding
5. **Maintain Course:** Hold a straight line through the center of the arch
6. **Adjustments:** Make any needed course corrections *before* entering the bridge, not under it

### Approaching a Bridge

1. Begin lining up approximately 100 meters before the bridge
2. Check for oncoming traffic and communicate with other boats
3. Choose appropriate arch based on direction of travel and conditions
4. Keep eyes forward to judge clearance and maintain course
5. Maintain steady pressure and rhythm through the bridge

### Bridge Emergency Procedures

1. If collision with bridge appears imminent, stop rowing immediately
2. Call "HOLD WATER!" to stop the boat
3. If necessary, back the boat away from the obstacle
4. In swift current, it may be necessary to "grab" a bridge support temporarily

## Special Navigation Areas

### Narrow Passages

1. Establish right-of-way before entering
2. Call "Clear ahead?" before proceeding
3. Maintain voice contact around blind corners
4. Consider using sound signals (one blast = approaching blind corner)

### Launching and Landing Areas

1. Give wide berth to boats launching or landing
2. Approach docks at reduced speed and appropriate angle
3. Be prepared to yield to boats with limited maneuverability
4. Call intentions: "Approaching dock!" or "Landing on port!"

### High Traffic Areas

1. Maintain heightened vigilance
2. Be predictable in movements
3. Make course adjustments early and deliberately
4. Reduce speed if necessary for safety

## Communication on the Water

### Verbal Calls

- "Heads up!" - General warning
- "Hold water!" - Stop boat immediately
- "Easy all!" - Stop rowing but allow boat to glide
- "Look ahead/behind!" - Alert to potential hazard
- "On your port/starboard!" - Passing notification

### Non-Verbal Communication

- Raised hand (cox/coach) = Stop/emergency
- Circular motion above head = Spin around
- Pointing = Direction to travel or hazard location

## Teaching Navigation to Novices

### Session 1-2 Focus
- Basic starboard rule
- Looking around while rowing
- Predictable, straight courses

### Session 3-4 Focus
- Traffic pattern details
- Passing protocols
- Bridge navigation basics
- Emergency maneuvers

### Key Learning Outcomes
- Regular checking of surroundings (every 3-5 strokes)
- Ability to identify proper travel lane
- Understanding of right-of-way rules
- Basic collision avoidance skills

<div class="info-box warning">
  <h4>Coach Responsibility</h4>
  <p>New scullers depend on clear instructions about traffic patterns. Early in the learning process, maintain close supervision and provide constant reminders about position and direction.</p>
</div>

## Additional Resources

- [Michigan Boating Laws (Website)](https://www.boat-ed.com/michigan/handbook/book.html) - Applicable boating regulations for inland waterways
- [Local Waterway Map](#) - Detailed map of the Huron River with marked hazards and patterns
- [Traffic Pattern Video](#) - Instructional video demonstrating proper navigation on the Huron River

## Local River Traffic Pattern

<div class="river-diagram">
  <p class="text-center"><i>Insert your club-specific river traffic diagram here</i></p>
  <!-- Replace with actual diagram image -->
  <div class="placeholder-diagram">
    <div class="river">
      <div class="north-indicator">N</div>
      <div class="shore top"></div>
      <div class="water">
        <div class="arrow upstream"></div>
        <div class="arrow downstream"></div>
        <div class="bridge"></div>
        <div class="dock"></div>
      </div>
      <div class="shore bottom"></div>
    </div>
  </div>
</div>

<style>
  .river-diagram {
    margin: 30px 0;
    border: 1px solid #ddd;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .placeholder-diagram {
    height: 300px;
    position: relative;
  }
  
  .river {
    position: relative;
    height: 100%;
    background-color: #e6f7ff;
  }
  
  .shore {
    height: 40px;
    background-color: #8BC34A;
    position: relative;
  }
  
  .shore.top {
    top: 0;
  }
  
  .shore.bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .water {
    height: calc(100% - 80px);
    position: relative;
  }
  
  .arrow {
    position: absolute;
    width: 100px;
    height: 30px;
    background-color: rgba(0, 123, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
  
  .arrow::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  .arrow.upstream {
    top: 30%;
    left: 30%;
  }
  
  .arrow.upstream::after {
    content: "↑";
    font-size: 24px;
  }
  
  .arrow.downstream {
    bottom: 30%;
    right: 30%;
  }
  
  .arrow.downstream::after {
    content: "↓";
    font-size: 24px;
  }
  
  .bridge {
    position: absolute;
    width: 100%;
    height: 20px;
    background-color: #795548;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .dock {
    position: absolute;
    width: 60px;
    height: 40px;
    background-color: #795548;
    bottom: 0;
    left: 50px;
  }
  
  .north-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
    font-size: 20px;
    color: #333;
    z-index: 10;
    background-color: rgba(255,255,255,0.7);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
