Current 100-composition catalog (2026-10-11)
--------------------------------------------

Puzzle and Spot share 100 different complete compositions: the existing 50 plus 50 new ImageGen animal story scenes, appended as scene-46..95 under assets/art/illustrated-v2/. The existing 50 source files, frame data and order remain unchanged. Difficulty variants do not count as new artwork.

The new scenes use the approved warm, flat storybook style. Rejected drafts and QA corrections remain in ignored cloud evidence rather than the website source. Atlas exports are native 512×341/342; five regenerated scenes (46,78,81,84,90) are native 768×512. The 50 new WebP files total 3,273,890 bytes. No HD claim, external stock-source attribution or separately purchased service is made.

The active Spot renderer uses natural-illustrations-v2.js and illustration-patches.js: 700 named material changes, seven per composition. It preserves source A exactly and recolors only the selected original object material in B, keeping ink, prints, shading, occlusions, fur and background. The earlier SVG-decoration catalogs below are compatibility assets, not the active new-round technique.

All 50 new sources and 350 new answers were visually reviewed by their author and a different reviewer at native, desktop and 390px mobile sizes, including individual answers. Historical rejected candidates remain in QA evidence. Source/frame hashes and the final release manifest identify the exact accepted versions. Existing saved frames remain immutable; refresh does not replace an accepted round with a newly resolved catalog entry. See R4_REVIEW.md for testing, framing exceptions and local-storage boundaries.

Historical artwork notes
------------------------

The first five scene pairs reuse the images already present in the repository at R1 eaf4592. The new WebP derivatives change resolution/encoding only; original JPEG files remain for compatibility. No external image source was downloaded.

The five additional scene pairs (harbor, forest, winter, space, bakery) are original SVG illustrations authored for this R2 change. Each has a distinct composition and three named changes in scenes.js. The A/B pair shares its drawing except for those deliberate changes. They contain no fonts fetched remotely, scripts, links, external requests, or third-party material.

Difference bounds are percentages of the right image, not of the whole figure. Scene indices 0–4 and their existing spot IDs remain unchanged so R1 saves restore. QA pair screenshots and click results are supplied in the review evidence.


2026-10-11 illustrated-v1 expansion (baseline f8a0778)
---------------------------------------------------

At this historical expansion, the catalog had 50 complete compositions, shared across Puzzle 12/24/36 pieces and Spot 3/5/7 differences. Five are the existing garden/room/sea/picnic/kitchen artworks above. The 45 new animal story scenes were generated in this cloud task with ImageGen using the existing approved artwork and pilot as style references; no external asset was downloaded or purchased. Generation originals are preserved under /workspace/generated_images. No separate original-artist or external license claim is made.

Five 1536×1024 RGB atlases each contain a 3×3 panel grid. Panels were exported at x=[0,512,1024,1536], y=[0,341,682,1024] as scene-01..45.webp at quality86. Each is native512×341 or512×342; this is not960px or HD art. Total new WebP bytes:2,815,312. The export changes packaging/encoding; it does not repaint the generated illustrations. All50 artworks decode and have distinct decoded pixel hashes.

assets/data/illustration-bank.js identifies immutable full compositions and versions. illustration-details-original/01/16/31.js contain350 explicitly positioned local SVG details. Natural anchors include clothing embroidery, book/pot decorations, leaves, woodgrain, shell ribs and countable bubbles. A and B composite the same base and under-layer; B substitutes only the selected3/5/7 changes. Each bounds region is disjoint, inside the native canvas, and uses the same coordinates for rendering and clicking. Pixel tests find no changes outside selected regions. Advanced surface details may be small; small visible pixel differences are not described as large alterations.

New rounds store full frame/version/src/details/selectedIDs. A catalog update never re-resolves an in-progress illustration from index or theme. Existing null/index scenes and procedural question payloads still restore through their original renderers; old sea star/crab mapping and previous records remain. Existing JPG/WebP/dataURI compatibility assets have not been removed.
