# Game reference matrix

Interaction patterns only. No copied code, assets, or branding.

| Game | Reference | Desktop Interaction | Mobile Interaction | Difficulty Model | UI Lessons | Current Problems |
| ---- | --------- | ------------------- | ------------------ | ---------------- | ---------- | ---------------- |
| Sliding | Coolmath Unblock It; Rush Hour web clones | Grab block, drag only on its long axis, stop at obstacle, undo | Same pointer drag, no page scroll | Exit depth and blockers, not click count | Board is the page; exit marked; move count secondary | Click-then-destination felt like menus |
| Puzzle | Toy Theater / ABCya jigsaws | Drag with grab offset, tray beside board, snap with tolerance | Same drag, pieces stay finger-sized, tray scrolls | Piece count plus hint fade | Reference image small; tray is a workspace, not a dump | Exact-cell only; pieces could jump to center |
| Tangram | Digital tangram apps (drag + rotate buttons) | Drag, rotate around piece, flip parallelogram | Large rotate button, drag with capture | Outline to silhouette | Silhouette under pieces; selected piece on top | Centroid snap ignored rotation |
| Sokoban | Classic sokoban web (WASD + swipe) | Arrows and WASD, instant step, undo | Swipe plus d-pad | Room topology and box locks | Board dominates; undo next to restart | No WASD; d-pad only |
| Memory | ABCya / Toy Theater memory | Click card, cursor pointer, ignore extra clicks while resolving | Same tap, large cards | Pair count, then similar symbols | Matched cards stay readable | Fast clicks could race |
| Visual memory | Classroom visual-memory grids | Observe, hide, reconstruct, then result | Same, big cells | Targets and grid, not a short timer | Phase label is explicit | Phase was only a status line |
| Maze | Browser maze with keys | Arrows and WASD | Existing swipe / d-pad | Path length and dead ends | Keep current maze; memory mode is extra | Desktop lacked WASD |
| Hanoi | Click-peg or drag-disc towers | Click source/target or drag; illegal peg shakes | Large pegs | Disc count, minimum 2^n-1 | Selected disc and legal peg visible | Text-only illegal feedback |
| Pattern / stroke / spot | Keep playable; not this pass | Click choices / edges / hits | Same, 48px targets | Existing tiers | Shared header, board first | Inconsistent chrome |
