# Burst Mechanism Problem

## Problem Analysis

This appears to be a game simulation problem where:
- A ball moves through a grid and bursts blocks
- The ball starts at position (R, N) and moves with initial velocity (dr=-1, dc=0)
- When the ball hits blocks, it bursts connected components of the same color
- After bursting, disconnected blocks fall and score points
- The game continues until K bursts are made or no cells remain

## Issues in Original Code

### 1. Time Limit Exceeded (Test Cases 1 & 2)
- **Root Cause**: The `drop_and_score()` function performs O(R*C) BFS after every burst
- **Potential Issue**: Infinite loop if ball never hits anything (no iteration limit)
- **Impact**: Can cause timeout on larger grids or when many bursts are required

### 2. Wrong Answer (Test Case 3)
- **Possible Causes**:
  - Initial direction: `dc` was -1 instead of 0
  - Missing boundary check for `nr >= R`
  - Incorrect movement logic

## Optimizations Made

1. Fixed initial direction: `dc = 0` (pure vertical movement initially)
2. Added iteration limit to prevent infinite loops
3. Added boundary check for `nr >= R`
4. Reset iteration counter after successful hit

## Further Optimizations Needed

If TLE persists, consider:
- Lazy evaluation of disconnected components
- Only check cells that could be affected by the burst
- Use Union-Find data structure for connected components
- Cache reachability information
