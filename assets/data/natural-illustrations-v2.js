/* Fifty full original illustrations with seven reviewed existing-material changes each.
   Each saved round keeps its entire versioned frame; published v1 artwork stays separate. */
window.SistersNaturalIllustrations = Object.freeze([
  {
    "id": "garden",
    "version": 2,
    "name": "花園",
    "src": "../../games/spot/art/garden.webp",
    "width": 960,
    "height": 644,
    "details": [
      {
        "id": "cat-fur",
        "label": "橘色貓毛變柔灰色",
        "bounds": [
          297,
          142,
          300,
          420
        ],
        "mask": {
          "paths": [
            "M332 148 Q317 201 332 250 Q314 292 329 341 L342 457 Q330 504 350 540 Q399 553 493 541 Q538 566 576 550 Q606 525 577 485 L559 464 Q562 402 540 356 Q552 308 535 244 Q548 190 532 151 L482 188 Q431 169 381 184Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              14,
              36
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 0.8,
          "targetHue": 25,
          "targetSat": 0.1,
          "satModel": "hsv"
        },
        "protect": "保留奶油色嘴胸腳、眼睛、耳內、條紋明暗及原線條",
        "operation": "recolor",
        "labelZh": "橘色貓毛變柔灰色",
        "hitRect": [
          297,
          142,
          300,
          420
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "fish",
        "label": "橘色魚變紫色",
        "bounds": [
          624,
          473,
          113,
          68
        ],
        "mask": {
          "paths": [
            "M629 493 Q647 475 670 483 Q690 465 701 479 L699 486 Q715 482 717 501 Q725 484 731 487 L729 509 Q739 523 729 531 L714 521 Q700 541 681 536 L672 529 Q651 535 638 522 Q627 515 629 493Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              40
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.9,
          "targetHue": 280,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "只魚材質；保留眼睛、原輪廓與魚缸水",
        "operation": "recolor",
        "labelZh": "橘色魚變紫色",
        "hitRect": [
          624,
          473,
          113,
          68
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "bowl-water",
        "label": "魚缸藍水變薄荷綠",
        "bounds": [
          614,
          410,
          139,
          54
        ],
        "mask": {
          "paths": [
            "M622 425 Q679 410 742 426 Q769 455 758 510 Q750 556 700 562 Q641 564 611 535 Q587 487 609 448Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              225
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 160,
          "targetSat": 0.48,
          "satModel": "hsv"
        },
        "protect": "只藍水色系；魚、玻璃反光、黑線、背景不改",
        "operation": "recolor",
        "labelZh": "魚缸藍水變薄荷綠",
        "hitRect": [
          614,
          410,
          139,
          54
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "left-flower",
        "label": "左前景大粉花變紫色",
        "bounds": [
          8,
          372,
          108,
          103
        ],
        "mask": {
          "paths": [
            "M0 365H120V477H0Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              320,
              360
            ],
            [
              0,
              12
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.38,
          "maxLight": 0.94,
          "targetHue": 275,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "大花瓣而非小花；保留黃花心與葉莖",
        "operation": "recolor",
        "labelZh": "左前景大粉花變紫色",
        "hitRect": [
          8,
          372,
          108,
          103
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "sun",
        "label": "黃色太陽變暖橘色",
        "bounds": [
          79,
          44,
          150,
          153
        ],
        "mask": {
          "paths": [
            "M225 120 A70 70 0 1 1 85 120 A70 70 0 1 1 225 120Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              38,
              70
            ]
          ],
          "minSat": 0.3,
          "maxSat": 1,
          "minLight": 0.4,
          "maxLight": 0.94,
          "targetHue": 25,
          "targetSat": 0.72,
          "satModel": "hsv"
        },
        "protect": "只太陽圓面黃色；五官、粉頰、外側光線不改",
        "operation": "recolor",
        "labelZh": "黃色太陽變暖橘色",
        "hitRect": [
          79,
          44,
          150,
          153
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "right-flower",
        "label": "右前景大粉花變天空藍",
        "bounds": [
          819,
          423,
          124,
          114
        ],
        "mask": {
          "paths": [
            "M817 415H948V542H817Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              320,
              360
            ],
            [
              0,
              12
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.38,
          "maxLight": 0.94,
          "targetHue": 205,
          "targetSat": 0.6,
          "satModel": "hsv"
        },
        "protect": "大花瓣色彩；保留中心與葉莖",
        "operation": "recolor",
        "labelZh": "右前景大粉花變天空藍",
        "hitRect": [
          819,
          423,
          124,
          114
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "lower-flower",
        "label": "下方中間大粉花變珊瑚橘",
        "bounds": [
          188,
          518,
          108,
          103
        ],
        "mask": {
          "paths": [
            "M184 517H303V625H184Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              320,
              360
            ],
            [
              0,
              12
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.38,
          "maxLight": 0.94,
          "targetHue": 20,
          "targetSat": 0.6,
          "satModel": "hsv"
        },
        "protect": "只這朵大前景花，不改粉色地面",
        "operation": "recolor",
        "labelZh": "下方中間大粉花變珊瑚橘",
        "hitRect": [
          188,
          518,
          108,
          103
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      }
    ],
    "sourceSHA256": "b441f7247bb3c8d3dbecca15c8e594865c9d72b39cee68cf3856165a5416744f"
  },
  {
    "id": "room",
    "version": 2,
    "name": "房間",
    "src": "../../games/spot/art/room.webp",
    "width": 960,
    "height": 644,
    "details": [
      {
        "id": "bed-cover",
        "label": "紫色床罩變淡藍色",
        "bounds": [
          178,
          331,
          422,
          119
        ],
        "mask": {
          "paths": [
            "M163 316 Q194 287 247 292 Q343 248 423 278 Q540 276 586 320 Q607 354 576 380 Q533 404 473 409 Q426 432 368 436 Q303 453 234 443 Q178 446 157 418Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              260,
              320
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 205,
          "targetSat": 0.38,
          "satModel": "hsv"
        },
        "protect": "保留枕頭、米色波浪邊、原布料褶線",
        "operation": "recolor",
        "labelZh": "紫色床罩變淡藍色",
        "hitRect": [
          178,
          331,
          422,
          119
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "blue-pillow",
        "label": "藍色大枕頭變薄荷綠",
        "bounds": [
          169,
          208,
          115,
          111
        ],
        "mask": {
          "paths": [
            "M164 228 Q170 215 184 222 Q203 203 273 205 L295 205 Q314 212 311 229 L321 279 Q313 313 282 314 L195 325 Q176 326 174 307 L170 266Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              185,
              235
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 160,
          "targetSat": 0.45,
          "satModel": "hsv"
        },
        "protect": "保留原金星、黃色枕頭遮擋與邊線",
        "operation": "recolor",
        "labelZh": "藍色大枕頭變薄荷綠",
        "hitRect": [
          169,
          208,
          115,
          111
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "floor-book",
        "label": "地板藍書變森林綠",
        "bounds": [
          202,
          519,
          159,
          108
        ],
        "mask": {
          "paths": [
            "M214 548 L280 522 L353 550 L358 576 L319 617 L216 581Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              190,
              240
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 0.9,
          "targetHue": 135,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "保留金星、奶油色書頁與地板陰影",
        "operation": "recolor",
        "labelZh": "地板藍書變森林綠",
        "hitRect": [
          202,
          519,
          159,
          108
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "lamp-shade",
        "label": "黃色燈罩變薰衣草紫",
        "bounds": [
          24,
          197,
          101,
          98
        ],
        "mask": {
          "paths": [
            "M48 200 Q75 190 99 201 L124 271 Q114 289 99 282 Q82 296 64 282 Q40 295 24 276Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              30,
              70
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.4,
          "maxLight": 0.9,
          "targetHue": 275,
          "targetSat": 0.45,
          "satModel": "hsv"
        },
        "protect": "保留亮色星形、燈桿、底座及輪廓",
        "operation": "recolor",
        "labelZh": "黃色燈罩變薰衣草紫",
        "hitRect": [
          24,
          197,
          101,
          98
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "hanging-mobile",
        "label": "奶油色雲朵吊飾變淡藍",
        "bounds": [
          41,
          36,
          91,
          149
        ],
        "mask": {
          "paths": [
            "M43 123 Q42 111 56 108 Q55 92 72 94 Q87 85 99 101 Q115 96 119 113 Q133 117 125 133 Q97 145 53 141Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              20,
              65
            ]
          ],
          "minSat": 0.06,
          "maxSat": 1,
          "minLight": 0.68,
          "maxLight": 0.98,
          "targetHue": 205,
          "targetSat": 0.65,
          "satModel": "hsv"
        },
        "protect": "只既有奶油色雲面；不移除吊飾、不加圖案，繩和水滴保留",
        "operation": "recolor",
        "labelZh": "奶油色雲朵吊飾變淡藍",
        "hitRect": [
          41,
          36,
          91,
          149
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "yellow-pillow",
        "label": "黃色枕頭變淡珊瑚粉",
        "bounds": [
          290,
          230,
          111,
          85
        ],
        "mask": {
          "paths": [
            "M291 247 Q300 240 316 245 L352 232 Q377 223 384 245 L397 292 Q384 308 364 307 L314 318 Q291 313 293 292Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              30,
              70
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.4,
          "maxLight": 0.95,
          "targetHue": 345,
          "targetSat": 0.45,
          "satModel": "hsv"
        },
        "protect": "只既有黃色枕頭布料、保留原折線",
        "operation": "recolor",
        "labelZh": "黃色枕頭變淡珊瑚粉",
        "hitRect": [
          290,
          230,
          111,
          85
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "cat-grey",
        "label": "灰貓毛斑變暖棕色",
        "bounds": [
          645,
          351,
          165,
          215
        ],
        "mask": {
          "paths": [
            "M679 359 L699 381 Q717 363 735 380 L750 363 L753 413 Q786 458 794 498 Q816 512 801 550 L772 565 Q736 556 714 539 L672 495 L663 425Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.01,
          "maxSat": 0.22,
          "minLight": 0.4,
          "maxLight": 0.72,
          "targetHue": 25,
          "targetSat": 0.35,
          "satModel": "hsv"
        },
        "protect": "只中明度低彩度灰毛；白毛、粉耳、五官、地毯不改",
        "operation": "recolor",
        "labelZh": "灰貓毛斑變暖棕色",
        "hitRect": [
          645,
          351,
          165,
          215
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      }
    ],
    "sourceSHA256": "82826648a408ce301274f3b87a7a8b9d72ca7e9e95cd36ded9550491267daaa5"
  },
  {
    "id": "sea",
    "version": 2,
    "name": "海底",
    "src": "../../games/spot/art/sea.webp",
    "width": 960,
    "height": 644,
    "details": [
      {
        "id": "yellow-fish",
        "label": "左邊黃魚身變珊瑚粉",
        "bounds": [
          178,
          174,
          270,
          205
        ],
        "mask": {
          "paths": [
            "M237 253 Q271 174 345 198 Q408 203 443 269 Q449 320 402 339 Q350 368 277 338 Q237 323 236 283Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              35,
              75
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 15,
          "targetSat": 0.65,
          "satModel": "hsv"
        },
        "protect": "保留彩色魚鱗、鰭、臉部與輪廓",
        "operation": "recolor",
        "labelZh": "左邊黃魚身變珊瑚粉",
        "hitRect": [
          178,
          174,
          270,
          205
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "blue-fish",
        "label": "右邊藍魚身變淡紫粉",
        "bounds": [
          510,
          173,
          270,
          205
        ],
        "mask": {
          "paths": [
            "M516 272 Q541 211 600 207 Q664 198 713 244 L730 281 Q721 326 676 341 Q607 363 550 339 Q516 318 516 294Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              175,
              230
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 0.94,
          "targetHue": 305,
          "targetSat": 0.45,
          "satModel": "hsv"
        },
        "protect": "保留魚鱗、綠鰭、嘴眼與輪廓",
        "operation": "recolor",
        "labelZh": "右邊藍魚身變淡紫粉",
        "hitRect": [
          510,
          173,
          270,
          205
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "crab",
        "label": "粉紅螃蟹變橘色",
        "bounds": [
          651,
          428,
          171,
          141
        ],
        "mask": {
          "paths": [
            "M626 454 Q620 427 640 415 L653 441 L668 425 Q686 450 674 476 L694 488 L750 478 L781 484 L802 468 Q790 441 808 428 L821 452 L842 435 Q854 472 831 485 L812 505 Q833 526 827 543 L811 540 L800 524 L785 545 Q744 570 690 551 L670 543 L659 574 L649 567 L650 539 L629 557 L623 548 L644 518 L638 496Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              325,
              360
            ],
            [
              0,
              15
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.95,
          "targetHue": 25,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "只螃蟹粉色材質；保留眼嘴和珊瑚",
        "operation": "recolor",
        "labelZh": "粉紅螃蟹變橘色",
        "hitRect": [
          651,
          428,
          171,
          141
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "left-tubes",
        "label": "左側橘色管珊瑚變青綠色",
        "bounds": [
          55,
          480,
          128,
          145
        ],
        "mask": {
          "paths": [
            "M50 540 L59 506 L94 513 L102 477 L140 480 L146 524 L167 514 L180 543 L162 613 L92 626 L65 600Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              38
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 0.94,
          "targetHue": 175,
          "targetSat": 0.6,
          "satModel": "hsv"
        },
        "protect": "保留暗色管口、草叢遮擋與原筆觸",
        "operation": "recolor",
        "labelZh": "左側橘色管珊瑚變青綠色",
        "hitRect": [
          55,
          480,
          128,
          145
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "right-tubes",
        "label": "右側紫色管珊瑚變玫紅色",
        "bounds": [
          832,
          412,
          128,
          157
        ],
        "mask": {
          "paths": [
            "M817 502 L845 482 L849 450 L883 450 L886 420 L924 418 L928 448 L957 446 L960 480 L943 534 L917 565 L859 569Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              235,
              290
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 0.94,
          "targetHue": 345,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "只紫材質、保留管口及螃蟹遮擋",
        "operation": "recolor",
        "labelZh": "右側紫色管珊瑚變玫紅色",
        "hitRect": [
          832,
          412,
          128,
          157
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "yellow-coral",
        "label": "黃色枝珊瑚變淡藍",
        "bounds": [
          150,
          380,
          115,
          100
        ],
        "mask": {
          "paths": [
            "M125 370H267V576H125Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              40,
              80
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 190,
          "targetSat": 0.5,
          "satModel": "hsv"
        },
        "protect": "只黃枝原色，不改管珊瑚、海草",
        "operation": "recolor",
        "labelZh": "黃色枝珊瑚變淡藍",
        "hitRect": [
          150,
          380,
          115,
          100
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "pink-coral",
        "label": "左邊粉色枝珊瑚變紫色",
        "bounds": [
          0,
          387,
          124,
          89
        ],
        "mask": {
          "paths": [
            "M0 390H127V595H0Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              335,
              360
            ],
            [
              0,
              8
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 275,
          "targetSat": 0.5,
          "satModel": "hsv"
        },
        "protect": "既有整群粉枝變色，不移除物件",
        "operation": "recolor",
        "labelZh": "左邊粉色枝珊瑚變紫色",
        "hitRect": [
          0,
          387,
          124,
          89
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      }
    ],
    "sourceSHA256": "bbffa608a8d567edadde4abe1bf5050adabbe0f476d4623a4731697ed982a5b2"
  },
  {
    "id": "picnic",
    "version": 2,
    "name": "野餐",
    "src": "../../games/spot/art/picnic.webp",
    "width": 960,
    "height": 644,
    "details": [
      {
        "id": "drink-cup",
        "label": "藍飲料杯變淡紫色",
        "bounds": [
          554,
          418,
          76,
          112
        ],
        "mask": {
          "paths": [
            "M557 453 Q581 438 618 452 L616 505 Q614 528 590 528 Q562 526 562 505Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              235
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 0.94,
          "targetHue": 280,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "保留杯口、黃色飲料、白吸管與輪廓",
        "operation": "recolor",
        "labelZh": "藍飲料杯變淡紫色",
        "hitRect": [
          554,
          418,
          76,
          112
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "apple",
        "label": "紅蘋果變綠色",
        "bounds": [
          458,
          423,
          80,
          88
        ],
        "mask": {
          "paths": [
            "M461 457 Q470 438 488 445 Q505 436 523 447 Q545 468 526 497 Q510 516 497 508 Q480 512 466 496 Q455 477 461 457Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              335,
              360
            ],
            [
              0,
              20
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 0.95,
          "targetHue": 105,
          "targetSat": 0.65,
          "satModel": "hsv"
        },
        "protect": "保留綠葉、果柄及亮斑",
        "operation": "recolor",
        "labelZh": "紅蘋果變綠色",
        "hitRect": [
          458,
          423,
          80,
          88
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "dog-patches",
        "label": "棕色狗耳和毛斑變柔灰色",
        "bounds": [
          683,
          384,
          190,
          197
        ],
        "mask": {
          "paths": [
            "M696 398 Q726 382 735 397 Q772 383 803 400 Q829 400 828 435 L828 479 Q852 500 850 529 L870 553 L847 572 L811 574 L786 558 L732 555 L708 520 L694 483 L681 440Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              45
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.77,
          "targetHue": 25,
          "targetSat": 0.1,
          "satModel": "hsv"
        },
        "protect": "只原棕毛；白毛、眼鼻、藍領圈、陰影不改",
        "operation": "recolor",
        "labelZh": "棕色狗耳和毛斑變柔灰色",
        "hitRect": [
          683,
          384,
          190,
          197
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "sandwich-top",
        "label": "上層麵包表面變莓果粉色",
        "bounds": [
          290,
          421,
          142,
          110
        ],
        "mask": {
          "paths": [
            "M304 477 L336 429 Q382 424 419 440 L421 466 L343 490Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              28,
              70
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.58,
          "maxLight": 0.96,
          "targetHue": 335,
          "targetSat": 0.45,
          "satModel": "hsv"
        },
        "protect": "保留麵包原孔紋、外皮、下層及夾餡；只既有表面換色",
        "operation": "recolor",
        "labelZh": "上層麵包表面變莓果粉色",
        "hitRect": [
          290,
          421,
          142,
          110
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "kite-panel",
        "label": "紫色風箏區塊變青色",
        "bounds": [
          620,
          21,
          112,
          132
        ],
        "mask": {
          "paths": [
            "M622 101 L671 79 L713 151Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              250,
              320
            ]
          ],
          "minSat": 0.1,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 0.94,
          "targetHue": 180,
          "targetSat": 0.5,
          "satModel": "hsv"
        },
        "protect": "只原紫色三角布面，不改其他面、框線與尾巴",
        "operation": "recolor",
        "labelZh": "紫色風箏區塊變青色",
        "hitRect": [
          620,
          21,
          112,
          132
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "left-tree",
        "label": "左大樹綠樹冠變秋橘",
        "bounds": [
          0,
          29,
          258,
          299
        ],
        "mask": {
          "paths": [
            "M0 80 Q6 49 47 60 Q68 21 114 29 Q144 17 164 53 Q195 53 200 91 Q240 94 240 138 Q264 154 252 183 Q272 216 245 243 Q241 281 205 285 Q169 311 143 289 Q113 311 83 283 Q48 302 23 265 L0 263Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              60,
              135
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 0.94,
          "targetHue": 20,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "只樹冠綠色，保留樹幹枝條、陰影形狀及雲",
        "operation": "recolor",
        "labelZh": "左大樹綠樹冠變秋橘",
        "hitRect": [
          0,
          29,
          258,
          299
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "middle-tree",
        "label": "中間樹冠變秋紅",
        "bounds": [
          264,
          157,
          158,
          208
        ],
        "mask": {
          "paths": [
            "M259 150H419V306L373 321L296 319L259 299Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              60,
              135
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 0.94,
          "targetHue": 350,
          "targetSat": 0.5,
          "satModel": "hsv"
        },
        "protect": "既有中樹綠色樹冠換色，不刪樹，保留枝幹",
        "operation": "recolor",
        "labelZh": "中間樹冠變秋紅",
        "hitRect": [
          264,
          157,
          158,
          208
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      }
    ],
    "sourceSHA256": "e3a5e83b92af14e299ea0370c27354a73bfec4caa8e58a3d241f0c197504b001"
  },
  {
    "id": "kitchen",
    "version": 2,
    "name": "廚房",
    "src": "../../games/spot/art/kitchen.webp",
    "width": 960,
    "height": 644,
    "details": [
      {
        "id": "table-cup",
        "label": "藍杯變淡粉色",
        "bounds": [
          272,
          294,
          128,
          114
        ],
        "mask": {
          "paths": [
            "M277 317 Q320 294 367 314 L370 329 Q391 319 398 339 Q404 359 389 374 L369 378 L365 394 Q352 408 317 404 Q279 405 278 381Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              175,
              235
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1,
          "minLight": 0.23,
          "maxLight": 0.94,
          "targetHue": 335,
          "targetSat": 0.5,
          "satModel": "hsv"
        },
        "protect": "保留杯內淺色、白杯口、輪廓及把手洞",
        "operation": "recolor",
        "labelZh": "藍杯變淡粉色",
        "hitRect": [
          272,
          294,
          128,
          114
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "apple",
        "label": "紅蘋果變黃綠色",
        "bounds": [
          135,
          291,
          105,
          121
        ],
        "mask": {
          "paths": [
            "M138 341 Q145 319 166 324 Q188 309 214 324 Q243 345 233 378 Q226 409 205 407 Q189 419 173 406 Q145 408 140 380Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              335,
              360
            ],
            [
              0,
              20
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 0.94,
          "targetHue": 85,
          "targetSat": 0.65,
          "satModel": "hsv"
        },
        "protect": "只果實紅色；綠葉、果柄、亮斑不改",
        "operation": "recolor",
        "labelZh": "紅蘋果變黃綠色",
        "hitRect": [
          135,
          291,
          105,
          121
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "cat-grey",
        "label": "灰貓毛斑變暖棕色",
        "bounds": [
          633,
          254,
          231,
          333
        ],
        "mask": {
          "paths": [
            "M671 264 Q694 255 714 293 Q739 281 759 295 L794 263 Q820 273 816 314 L800 364 Q824 395 833 442 Q861 478 858 530 Q850 575 818 583 L757 585 L710 572 L678 546 Q638 563 642 541 L650 514 L672 493 L671 443 L659 390 L662 330Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.01,
          "maxSat": 0.22,
          "minLight": 0.35,
          "maxLight": 0.72,
          "targetHue": 25,
          "targetSat": 0.35,
          "satModel": "hsv"
        },
        "protect": "只灰毛中明度低彩度色系，保留奶油毛和五官",
        "operation": "recolor",
        "labelZh": "灰貓毛斑變暖棕色",
        "hitRect": [
          633,
          254,
          231,
          333
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "shelf-bowl",
        "label": "藍碗變暖黃色",
        "bounds": [
          630,
          78,
          133,
          75
        ],
        "mask": {
          "paths": [
            "M636 96 Q691 79 755 95 L752 119 Q749 146 713 150 L665 147 Q641 137 636 115Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              170,
              240
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 0.94,
          "targetHue": 45,
          "targetSat": 0.6,
          "satModel": "hsv"
        },
        "protect": "只碗色，保留深色碗口、輪廓和木架",
        "operation": "recolor",
        "labelZh": "藍碗變暖黃色",
        "hitRect": [
          630,
          78,
          133,
          75
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "window-pot",
        "label": "陶土花盆變淡藍",
        "bounds": [
          123,
          183,
          93,
          72
        ],
        "mask": {
          "paths": [
            "M131 195 Q170 183 206 194 L200 235 Q198 251 171 252 Q143 251 137 239Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              50
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.23,
          "maxLight": 0.94,
          "targetHue": 205,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "只盆面陶土色；土、深盆口、植物及窗台不改",
        "operation": "recolor",
        "labelZh": "陶土花盆變淡藍",
        "hitRect": [
          123,
          183,
          93,
          72
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "toast-face",
        "label": "吐司表面變莓果粉色",
        "bounds": [
          402,
          334,
          141,
          111
        ],
        "mask": {
          "paths": [
            "M409 384 L439 359 Q431 344 452 339 Q493 329 521 350 Q538 366 534 387 L503 422 Q477 435 444 424 L404 408Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              25,
              70
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.56,
          "maxLight": 0.96,
          "targetHue": 335,
          "targetSat": 0.45,
          "satModel": "hsv"
        },
        "protect": "只原米色吐司面換色、保留孔紋和外皮；不移除、不添加果醬圖案",
        "operation": "recolor",
        "labelZh": "吐司表面變莓果粉色",
        "hitRect": [
          402,
          334,
          141,
          111
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      },
      {
        "id": "window-leaves",
        "label": "窗台綠葉變秋橘",
        "bounds": [
          107,
          116,
          118,
          67
        ],
        "mask": {
          "paths": [
            "M112 157 Q123 148 144 154 Q129 136 136 125 Q153 119 165 144 Q174 118 191 126 Q211 128 192 155 Q217 155 223 171 Q202 188 180 181 L169 196 L156 181 Q125 182 112 169Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              65,
              150
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 0.94,
          "targetHue": 25,
          "targetSat": 0.55,
          "satModel": "hsv"
        },
        "protect": "只既有四片綠葉和綠莖，保留花盆和窗框",
        "operation": "recolor",
        "labelZh": "窗台綠葉變秋橘",
        "hitRect": [
          107,
          116,
          118,
          67
        ],
        "status": "independently approved original-A material pair; full live Spot runtime regression remains integration gate"
      }
    ],
    "sourceSHA256": "c057efe14e1ca02b8d2354d0e1815d001486d5d5158fb1032d36b1823f2bdd8e"
  },
  {
    "id": "scene-01",
    "version": 2,
    "name": "狐狸的樹屋圖書館",
    "src": "../../assets/art/illustrated-v1/scene-01.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "mug",
        "label": "奶油色杯身變青綠色",
        "bounds": [
          99,
          254,
          53,
          48
        ],
        "mask": {
          "paths": [
            "M104 260 Q105 254 119 254 Q132 254 135 261 L135 265 Q143 260 147 267 Q150 274 144 281 Q141 285 135 285 L135 292 Q132 297 120 297 Q105 298 104 292Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              12,
              48
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.65,
          "maxLight": 0.96,
          "targetHue": 175
        }
      },
      {
        "id": "held-book",
        "label": "藍書封面變暖紅色",
        "bounds": [
          185,
          191,
          102,
          64
        ],
        "mask": {
          "paths": [
            "M204 205 L246 215 L263 204 L299 192 L299 204 L292 226 L280 250 L264 263 L245 266 L210 259 L191 247 L188 233Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              195,
              235
            ]
          ],
          "minSat": 0.18,
          "maxSat": 0.85,
          "minLight": 0.22,
          "maxLight": 0.78,
          "targetHue": 8
        }
      },
      {
        "id": "cushion",
        "label": "藍色靠墊變紫色",
        "bounds": [
          82,
          211,
          93,
          43
        ],
        "mask": {
          "paths": [
            "M81 237 Q86 222 108 226 Q139 228 157 250 Q168 270 172 287 L162 291 L140 295 L108 283 L87 271Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              200,
              250
            ]
          ],
          "minSat": 0.12,
          "maxSat": 0.8,
          "minLight": 0.3,
          "maxLight": 0.87,
          "targetHue": 280
        }
      },
      {
        "id": "lamp",
        "label": "右上暖黃燈玻璃變冷藍",
        "bounds": [
          373,
          0,
          43,
          59
        ],
        "mask": {
          "paths": [
            "M389 5 Q376 16 380 32 Q381 42 391 45 L402 45 Q415 37 413 23 Q412 13 403 5Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              35,
              65
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.35,
          "maxLight": 0.9,
          "targetHue": 195
        }
      },
      {
        "id": "pot",
        "label": "右側粉紅花盆變天空藍",
        "bounds": [
          454,
          216,
          58,
          40
        ],
        "mask": {
          "paths": [
            "M463 221 Q481 218 501 222 L497 242 Q493 250 480 251 Q466 251 466 241Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              330,
              360
            ],
            [
              0,
              45
            ]
          ],
          "minSat": 0.06,
          "maxSat": 0.65,
          "minLight": 0.4,
          "maxLight": 0.94,
          "targetHue": 210
        }
      },
      {
        "id": "floor-stack",
        "label": "書堆最上層綠書變暖紅色",
        "bounds": [
          289,
          249,
          91,
          61
        ],
        "mask": {
          "paths": [
            "M292 255 L331 249 L363 256 L365 266 L360 273 L331 278 L299 270 L291 265Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              80,
              165
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.16,
          "maxLight": 0.9,
          "targetHue": 8,
          "targetSat": 0.62
        }
      },
      {
        "id": "flowers",
        "label": "窗台粉紅花瓣變黄色",
        "bounds": [
          100,
          117,
          68,
          65
        ],
        "mask": {
          "paths": [
            "M105 117 L128 117 L139 126 L151 132 L165 146 L167 169 L148 170 L128 150 L106 140Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              250,
              345
            ]
          ],
          "minSat": 0.04,
          "maxSat": 0.65,
          "minLight": 0.45,
          "maxLight": 0.96,
          "targetHue": 48,
          "targetSat": 0.65
        }
      }
    ]
  },
  {
    "id": "scene-02",
    "version": 2,
    "name": "兔兔麵包烘焙",
    "src": "../../assets/art/illustrated-v1/scene-02.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "mother-apron",
        "label": "兔媽媽上衣的顏色",
        "bounds": [
          227,
          160,
          134,
          115
        ],
        "mask": {
          "paths": [
            "M253 164 L267 163 L278 171 L283 185 L301 192 L321 181 L333 173 L347 184 L356 198 L362 220 L352 232 L335 236 L334 269 L284 279 L239 277 L225 263 L228 243 L230 225 L235 199 L245 179 Z"
          ],
          "holes": [
            "M239 225 L245 219 L261 217 L275 222 L280 229 L291 234 L304 237 L316 245 L316 253 L309 259 L299 260 L281 255 L268 250 L257 247 L249 242 L241 233 Z",
            "M330 221 L340 219 L350 225 L350 234 L344 241 L341 250 L336 258 L329 261 L321 257 L318 249 L325 239 L329 231 Z",
            "M241 268 L253 258 L266 258 L283 258 L308 260 L320 258 L333 260 L341 269 L339 280 L239 280 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              325,
              360
            ],
            [
              0,
              30
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv"
        }
      },
      {
        "id": "flour-bowl",
        "label": "左下麵粉碗釉色",
        "bounds": [
          0,
          301,
          104,
          40
        ],
        "mask": {
          "paths": [
            "M0 306 L16 309 L45 314 L78 311 L101 304 L98 336 L89 341 L0 341 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              8,
              47
            ]
          ],
          "minSat": 0.1,
          "maxSat": 1,
          "minLight": 0.62,
          "maxLight": 0.97,
          "targetHue": 175,
          "targetSat": 0.35
        }
      },
      {
        "id": "right-child-shirt",
        "label": "右邊小兔衣服的顏色",
        "bounds": [
          372,
          247,
          89,
          48
        ],
        "mask": {
          "paths": [
            "M382 259 L394 252 L412 249 L435 251 L453 260 L458 278 L449 291 L420 292 L394 285 L376 276 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              35,
              68
            ]
          ],
          "minSat": 0.3,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 1,
          "targetHue": 14,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "left-child-shirt",
        "label": "左邊小兔衣服的顏色",
        "bounds": [
          118,
          236,
          44,
          46
        ],
        "mask": {
          "paths": [
            "M142 239 L158 242 L152 253 L136 266 L143 278 L122 279 L124 267 L131 251 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              173,
              237
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 125
        }
      },
      {
        "id": "milk-mug",
        "label": "右下杯子的釉色",
        "bounds": [
          463,
          266,
          49,
          66
        ],
        "mask": {
          "paths": [
            "M474 269 L501 270 L504 277 L510 272 L512 277 L512 307 L505 314 L501 322 L488 329 L472 322 L466 305 L468 281 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.24,
          "minLight": 0.68,
          "maxLight": 1,
          "targetHue": 155,
          "satModel": "hsv",
          "targetSat": 0.42,
          "lightnessScale": 0.97
        }
      },
      {
        "id": "front-bread",
        "label": "盤裡中間麵包的烘焙顏色",
        "bounds": [
          159,
          293,
          47,
          34
        ],
        "mask": {
          "paths": [
            "M164 302 L173 296 L184 297 L193 300 L201 307 L202 316 L197 322 L180 323 L168 319 L162 312 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              85
            ]
          ],
          "minSat": 0.02,
          "maxSat": 1,
          "minLight": 0.48,
          "maxLight": 1,
          "targetHue": 35,
          "satModel": "hsv",
          "targetSat": 0.6,
          "lightnessScale": 0.8
        }
      },
      {
        "id": "flower-vase",
        "label": "窗邊花瓶的顏色",
        "bounds": [
          402,
          126,
          40,
          36
        ],
        "mask": {
          "paths": [
            "M414 131 L429 131 L436 140 L437 150 L432 157 L417 159 L410 151 L409 141 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              150,
              245
            ]
          ],
          "minSat": 0.025,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 12,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      }
    ],
    "sourceSHA256": "a7892640848b1998d42807725f3a47f5157762f646ab819d9a401e1c9bf46119"
  },
  {
    "id": "scene-03",
    "version": 2,
    "name": "小熊柳岸帆船",
    "src": "../../assets/art/illustrated-v1/scene-03.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "main-sail",
        "label": "帆船右側大帆的顏色",
        "bounds": [
          336,
          88,
          70,
          115
        ],
        "mask": {
          "paths": [
            "M319 51 L343 88 L383 143 L429 204 L328 216 L321 197 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              74
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 200
        }
      },
      {
        "id": "bear-shirt",
        "label": "小熊水手衣藍條紋的顏色",
        "bounds": [
          194,
          200,
          58,
          53
        ],
        "mask": {
          "paths": [
            "M211 202 L223 201 L231 210 L228 226 L211 232 L216 243 L236 241 L250 245 L245 250 L198 250 L198 236 L205 219 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              178,
              242
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 5
        }
      },
      {
        "id": "front-lily",
        "label": "右下大荷花花瓣的顏色",
        "bounds": [
          439,
          286,
          60,
          49
        ],
        "mask": {
          "paths": [
            "M447 310 L448 297 L458 301 L463 288 L471 299 L480 294 L485 305 L495 306 L493 318 L484 326 L470 332 L455 329 L443 320 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.65,
          "maxLight": 1,
          "targetHue": 48,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "duck-feathers",
        "label": "左下鴨子羽毛的顏色",
        "bounds": [
          25,
          269,
          85,
          65
        ],
        "mask": {
          "paths": [
            "M83 271 L95 273 L103 280 L104 288 L97 294 L93 301 L100 307 L106 316 L106 324 L96 331 L76 334 L52 331 L35 325 L27 311 L29 305 L49 310 L63 307 L69 302 L67 286 L72 278 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.25,
          "minLight": 0.68,
          "maxLight": 1,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.55,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "boat-rim",
        "label": "帆船藍色船舷的顏色",
        "bounds": [
          328,
          209,
          101,
          26
        ],
        "mask": {
          "paths": [
            "M333 218 L423 210 L425 215 L399 220 L375 226 L339 233 L331 230 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              173,
              237
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 345
        }
      },
      {
        "id": "mast-flag",
        "label": "桅杆旗子的顏色",
        "bounds": [
          313,
          19,
          49,
          26
        ],
        "mask": {
          "paths": [
            "M312 22 L322 17 L334 21 L344 26 L361 25 L356 33 L348 40 L334 44 L324 39 L314 44 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              335,
              360
            ],
            [
              0,
              30
            ]
          ],
          "minSat": 0.17,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 1,
          "targetHue": 125,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "distant-roof",
        "label": "遠方小屋屋頂的顏色",
        "bounds": [
          430,
          104,
          55,
          29
        ],
        "mask": {
          "paths": [
            "M430 123 L444 103 L459 106 L474 107 L487 126 L487 131 L459 131 L445 113 L435 131 Z"
          ],
          "holes": [
            "M459 97 L473 97 L473 116 L459 113 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              335,
              360
            ],
            [
              0,
              45
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1,
          "minLight": 0.27,
          "maxLight": 0.9,
          "targetHue": 210,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      }
    ],
    "sourceSHA256": "28dec078fd781583b3c3df85de765a63f4cbfccdd75dc8302ea748908542863c"
  },
  {
    "id": "scene-04",
    "version": 2,
    "name": "貓咪溫室種植",
    "src": "../../assets/art/illustrated-v1/scene-04.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "cat-overalls",
        "label": "小貓工作服的顏色",
        "bounds": [
          150,
          187,
          114,
          91
        ],
        "mask": {
          "paths": [
            "M178 190 L193 195 L217 203 L239 200 L258 214 L260 241 L248 260 L230 270 L215 275 L176 271 L157 258 L154 240 L163 218 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              183,
              247
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 280
        }
      },
      {
        "id": "watering-can",
        "label": "澆水壺的顏色",
        "bounds": [
          355,
          210,
          157,
          119
        ],
        "mask": {
          "paths": [
            "M416 269 L416 247 L425 239 L426 225 L438 214 L458 211 L479 215 L490 226 L495 239 L502 236 L512 243 L512 270 L506 289 L495 299 L495 313 L486 321 L465 325 L443 324 L427 320 L420 312 L414 307 L403 293 L392 276 L381 257 L372 250 L365 250 L358 245 L361 235 L372 227 L383 225 L392 228 L395 237 L389 246 L403 259 Z"
          ],
          "holes": [
            "M440 226 L451 221 L471 225 L479 236 L438 236 Z",
            "M500 245 L507 247 L507 268 L497 287 L495 261 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              180,
              260
            ]
          ],
          "minSat": 0.035,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 125,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      },
      {
        "id": "hydrangea-cluster",
        "label": "右上繡球花的花瓣顏色",
        "bounds": [
          428,
          85,
          84,
          53
        ],
        "mask": {
          "paths": [
            "M422 104 L429 96 L445 93 L451 100 L462 87 L478 88 L487 93 L498 93 L504 100 L512 99 L512 121 L503 129 L488 137 L472 132 L460 137 L443 132 L427 127 L420 117 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              185,
              300
            ]
          ],
          "minSat": 0.09,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 340,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      },
      {
        "id": "front-pot",
        "label": "右下小花盆的顏色",
        "bounds": [
          331,
          289,
          51,
          44
        ],
        "mask": {
          "paths": [
            "M336 296 L349 299 L376 295 L377 314 L370 328 L352 331 L341 325 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              350,
              360
            ],
            [
              0,
              54
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 215
        }
      },
      {
        "id": "stool-pot",
        "label": "木凳上花盆的顏色",
        "bounds": [
          326,
          176,
          49,
          26
        ],
        "mask": {
          "paths": [
            "M332 181 L363 182 L371 177 L367 195 L363 198 L337 198 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              352,
              360
            ],
            [
              0,
              56
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 50
        }
      },
      {
        "id": "hanging-pot",
        "label": "右上吊盆的顏色",
        "bounds": [
          425,
          26,
          52,
          43
        ],
        "mask": {
          "paths": [
            "M429 36 L444 41 L467 37 L472 29 L470 57 L460 65 L441 64 L431 56 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              353,
              360
            ],
            [
              0,
              57
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 180
        }
      },
      {
        "id": "ripe-tomato",
        "label": "左上大番茄的顏色",
        "bounds": [
          26,
          40,
          38,
          39
        ],
        "mask": {
          "paths": [
            "M30 47 L39 43 L48 44 L57 49 L62 57 L59 68 L53 73 L43 76 L34 72 L29 63 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              334,
              360
            ],
            [
              0,
              38
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 45
        }
      }
    ],
    "sourceSHA256": "18a1a1bc2deb746b16684c69839861b81f081bce80faa2452817f339c3e47b9a"
  },
  {
    "id": "scene-05",
    "version": 2,
    "name": "企鵝雪堡與極光",
    "src": "../../assets/art/illustrated-v1/scene-05.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "adult-scarf",
        "label": "大企鵝圍巾的顏色",
        "bounds": [
          61,
          138,
          101,
          57
        ],
        "mask": {
          "paths": [
            "M99 140 L118 144 L146 142 L161 145 L165 153 L153 161 L116 161 L100 161 L93 169 L87 191 L78 196 L64 187 L63 179 L75 165 L81 151 L91 145 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              345,
              360
            ],
            [
              0,
              22
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.24,
          "maxLight": 1,
          "targetHue": 125,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "child-scarf",
        "label": "前面小企鵝圍巾的顏色",
        "bounds": [
          124,
          222,
          70,
          39
        ],
        "mask": {
          "paths": [
            "M144 224 L159 231 L187 225 L191 234 L178 246 L169 253 L158 256 L145 250 L145 242 L132 246 L127 239 L136 232 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              163,
              227
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 15
        }
      },
      {
        "id": "ice-doorway",
        "label": "雪堡拱門裡的冰色",
        "bounds": [
          278,
          205,
          57,
          67
        ],
        "mask": {
          "paths": [
            "M286 215 L297 208 L310 209 L322 218 L330 231 L332 264 L281 269 L280 236 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              178,
              242
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.4,
          "maxLight": 0.97,
          "targetHue": 235
        }
      },
      {
        "id": "knitted-hat",
        "label": "後方小企鵝毛帽的顏色",
        "bounds": [
          253,
          88,
          65,
          43
        ],
        "mask": {
          "paths": [
            "M301 91 L308 92 L315 98 L311 105 L315 113 L315 129 L305 122 L292 115 L274 117 L260 127 L255 123 L258 111 L265 104 L284 99 L299 101 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              11,
              75
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 350
        }
      },
      {
        "id": "castle-flag",
        "label": "雪堡旗子的顏色",
        "bounds": [
          375,
          121,
          43,
          34
        ],
        "mask": {
          "paths": [
            "M378 118 L390 121 L409 127 L424 127 L415 138 L426 151 L408 154 L377 150 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              335,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.3,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 0.87,
          "targetHue": 220,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "lantern-window",
        "label": "右邊提燈的玻璃顏色",
        "bounds": [
          405,
          230,
          38,
          46
        ],
        "mask": {
          "paths": [
            "M409 237 L423 233 L437 238 L439 263 L427 273 L410 267 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              11,
              75
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.53,
          "maxLight": 0.97,
          "targetHue": 195
        }
      },
      {
        "id": "adult-beak",
        "label": "大企鵝嘴巴的顏色",
        "bounds": [
          156,
          111,
          28,
          20
        ],
        "mask": {
          "paths": [
            "M162 116 L173 114 L181 119 L177 124 L167 128 L158 126 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              355,
              360
            ],
            [
              0,
              59
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 47
        }
      }
    ],
    "sourceSHA256": "582f411c345e1984d6c74c8c65e8dce1e0dc2cc6fb61f86f305f2e9b60219dfd"
  },
  {
    "id": "scene-06",
    "version": 2,
    "name": "狗狗村落郵局",
    "src": "../../assets/art/illustrated-v1/scene-06.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "mailbox",
        "label": "右邊郵筒的顏色",
        "bounds": [
          420,
          151,
          81,
          128
        ],
        "mask": {
          "paths": [
            "M424 163 L435 156 L472 154 L493 162 L501 178 L500 260 L491 275 L438 277 L423 260 Z"
          ],
          "holes": [
            "M432 199 L460 199 L460 231 L432 231 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              340,
              360
            ],
            [
              0,
              20
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.24,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "dog-satchel",
        "label": "小狗郵差包的顏色",
        "bounds": [
          151,
          211,
          72,
          52
        ],
        "mask": {
          "paths": [
            "M163 215 L180 217 L212 216 L221 221 L214 247 L208 259 L182 260 L154 253 L156 236 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              244
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 280
        }
      },
      {
        "id": "cottage-door",
        "label": "小屋木門的顏色",
        "bounds": [
          347,
          125,
          32,
          113
        ],
        "mask": {
          "paths": [
            "M351 126 L362 122 L374 124 L377 145 L377 229 L363 236 L350 230 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              61
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 110
        }
      },
      {
        "id": "hanging-sign",
        "label": "屋外信封招牌的顏色",
        "bounds": [
          344,
          75,
          57,
          49
        ],
        "mask": {
          "paths": [
            "M347 79 L394 79 L397 119 L350 120 Z"
          ],
          "holes": [
            "M357 87 L386 87 L386 112 L357 112 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              340,
              360
            ],
            [
              0,
              20
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 1,
          "targetHue": 220,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "carried-envelope",
        "label": "小狗叼著的信封顏色",
        "bounds": [
          249,
          191,
          65,
          44
        ],
        "mask": {
          "paths": [
            "M255 199 L282 194 L301 199 L311 225 L266 233 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.25,
          "minLight": 0.73,
          "maxLight": 1,
          "targetHue": 48,
          "satModel": "hsv",
          "targetSat": 0.5,
          "lightnessScale": 0.92
        }
      },
      {
        "id": "left-roof",
        "label": "左邊遠方屋頂的顏色",
        "bounds": [
          0,
          87,
          52,
          35
        ],
        "mask": {
          "paths": [
            "M0 91 L23 94 L49 116 L16 114 L0 120 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              353,
              360
            ],
            [
              0,
              57
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 215
        }
      },
      {
        "id": "porch-flower",
        "label": "右上大花朵的花瓣顏色",
        "bounds": [
          466,
          57,
          35,
          30
        ],
        "mask": {
          "paths": [
            "M476 61 L483 60 L488 64 L494 65 L499 70 L497 76 L491 77 L487 84 L479 82 L476 76 L469 75 L469 69 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.65,
          "maxLight": 1,
          "targetHue": 48,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      }
    ],
    "sourceSHA256": "a65ca08b92423f4b69377ddc5ec76d631549c0121f61ccd305f3acdc34f8226b"
  },
  {
    "id": "scene-07",
    "version": 2,
    "name": "刺蝟閣樓畫室",
    "src": "../../assets/art/illustrated-v1/scene-07.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "beret",
        "label": "刺蝟貝雷帽的顏色",
        "bounds": [
          266,
          93,
          70,
          40
        ],
        "mask": {
          "paths": [
            "M272 98 L285 96 L300 101 L310 104 L326 106 L333 113 L331 125 L320 130 L300 130 L283 123 L269 111 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              331,
              360
            ],
            [
              0,
              35
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 285
        }
      },
      {
        "id": "cat-cushion",
        "label": "小貓坐墊的顏色",
        "bounds": [
          7,
          292,
          190,
          49
        ],
        "mask": {
          "paths": [
            "M21 295 L38 303 L79 321 L122 321 L150 309 L163 295 L185 305 L193 317 L185 330 L161 338 L88 341 L41 337 L15 326 L10 311 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              300,
              360
            ],
            [
              0,
              45
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 48,
          "satModel": "hsv",
          "targetSat": 0.42
        }
      },
      {
        "id": "trunk",
        "label": "左邊大箱子的顏色",
        "bounds": [
          0,
          187,
          95,
          103
        ],
        "mask": {
          "paths": [
            "M0 194 L81 190 L91 198 L88 217 L1 218 L1 231 L90 228 L90 263 L78 271 L60 279 L13 282 L0 289 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              130,
              220
            ]
          ],
          "minSat": 0.035,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 1,
          "targetHue": 10,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      },
      {
        "id": "daisy-vase",
        "label": "右邊花瓶的顏色",
        "bounds": [
          460,
          165,
          42,
          55
        ],
        "mask": {
          "paths": [
            "M470 169 L490 169 L491 177 L500 188 L499 204 L493 217 L483 221 L467 215 L458 204 L457 190 L462 181 L468 177 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              150,
              245
            ]
          ],
          "minSat": 0.025,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 12,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      },
      {
        "id": "stool-seat",
        "label": "刺蝟木凳座面的顏色",
        "bounds": [
          247,
          237,
          97,
          26
        ],
        "mask": {
          "paths": [
            "M251 243 L267 244 L285 246 L316 239 L338 240 L341 249 L326 257 L281 260 L249 252 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              358,
              360
            ],
            [
              0,
              62
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 135
        }
      },
      {
        "id": "folded-tablecloth",
        "label": "桌邊小桌布的顏色",
        "bounds": [
          393,
          221,
          100,
          51
        ],
        "mask": {
          "paths": [
            "M397 222 L423 229 L442 237 L463 231 L491 222 L459 253 L448 270 L418 256 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.24,
          "minLight": 0.65,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.4,
          "lightnessScale": 0.96
        }
      },
      {
        "id": "hanging-planter",
        "label": "左上小吊盆的顏色",
        "bounds": [
          58,
          48,
          31,
          26
        ],
        "mask": {
          "paths": [
            "M61 52 L84 52 L85 64 L79 71 L66 70 L62 63 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              65
            ]
          ],
          "minSat": 0.03,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      }
    ],
    "sourceSHA256": "46079e0116841d923175ae8af55f6a75512cc274885d3912fbeba58d80b214f4"
  },
  {
    "id": "scene-08",
    "version": 2,
    "name": "水獺星空觀測站",
    "src": "../../assets/art/illustrated-v1/scene-08.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "telescope-tube",
        "label": "望遠鏡鏡筒的顏色",
        "bounds": [
          219,
          59,
          101,
          67
        ],
        "mask": {
          "paths": [
            "M221 98 L303 62 L313 73 L317 87 L248 122 L231 124 L229 111 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              6,
              70
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 185
        }
      },
      {
        "id": "star-rug",
        "label": "地毯底色的顏色",
        "bounds": [
          77,
          280,
          316,
          62
        ],
        "mask": {
          "paths": [
            "M100 296 L153 302 L189 305 L215 299 L244 289 L283 282 L324 285 L359 295 L383 307 L389 322 L357 339 L112 341 L80 322 L84 308 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              193,
              257
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 345
        }
      },
      {
        "id": "stool-seat",
        "label": "小圓凳座面的顏色",
        "bounds": [
          88,
          231,
          81,
          27
        ],
        "mask": {
          "paths": [
            "M92 237 L116 233 L144 235 L164 239 L165 248 L146 254 L112 255 L92 249 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.35,
          "minLight": 0.17,
          "maxLight": 0.65,
          "targetHue": 25,
          "targetSat": 0.3
        }
      },
      {
        "id": "star-chart",
        "label": "左邊星圖底色的顏色",
        "bounds": [
          0,
          86,
          79,
          89
        ],
        "mask": {
          "paths": [
            "M1 90 L76 92 L75 168 L1 172 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              193,
              257
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.7,
          "targetHue": 140
        }
      },
      {
        "id": "globe-ocean",
        "label": "右邊小地球儀海洋的顏色",
        "bounds": [
          438,
          152,
          43,
          46
        ],
        "mask": {
          "paths": [
            "M446 160 L456 155 L468 158 L476 168 L477 181 L471 190 L457 195 L447 188 L441 176 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              165,
              245
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.5,
          "lightnessScale": 1.1
        }
      },
      {
        "id": "desk-lantern",
        "label": "桌上提燈玻璃的顏色",
        "bounds": [
          378,
          216,
          39,
          47
        ],
        "mask": {
          "paths": [
            "M385 224 L395 220 L411 224 L412 255 L398 260 L383 256 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              74
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 195
        }
      },
      {
        "id": "red-book",
        "label": "右邊最上面書封的顏色",
        "bounds": [
          433,
          228,
          75,
          25
        ],
        "mask": {
          "paths": [
            "M439 236 L476 231 L502 236 L502 247 L471 250 L437 245 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              318,
              360
            ],
            [
              0,
              22
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 130
        }
      }
    ],
    "sourceSHA256": "09ab5aac3f3d23f6118f8e5c374f8abdb22851408d93dfc1938b2a481390f9fb"
  },
  {
    "id": "scene-09",
    "version": 2,
    "name": "松鼠果園果醬",
    "src": "../../assets/art/illustrated-v1/scene-09.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "jam-pot",
        "label": "大果醬鍋的顏色",
        "bounds": [
          240,
          223,
          81,
          58
        ],
        "mask": {
          "paths": [
            "M224 221 L261 225 L298 224 L332 218 L352 209 L359 210 L364 216 L360 224 L354 266 L347 280 L328 286 L252 286 L231 278 L224 257 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              193,
              257
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 140
        }
      },
      {
        "id": "squirrel-apron",
        "label": "松鼠圍裙的顏色",
        "bounds": [
          178,
          182,
          54,
          85
        ],
        "mask": {
          "paths": [
            "M178 183 L188 185 L195 210 L213 210 L233 209 L232 241 L227 269 L214 281 L194 278 L181 269 L184 245 L185 219 L176 209 Z"
          ],
          "holes": [
            "M218 212 L240 215 L241 234 L224 233 L221 225 L218 221 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.23,
          "minLight": 0.68,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.4,
          "lightnessScale": 0.96
        }
      },
      {
        "id": "basket-front",
        "label": "左邊水果籃的顏色",
        "bounds": [
          15,
          272,
          166,
          69
        ],
        "mask": {
          "paths": [
            "M19 278 L41 287 L77 291 L118 285 L172 274 L177 285 L170 325 L139 336 L74 340 L31 331 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              358,
              360
            ],
            [
              0,
              62
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 15
        }
      },
      {
        "id": "jar-cloth",
        "label": "果醬罐格紋布的顏色",
        "bounds": [
          364,
          214,
          72,
          42
        ],
        "mask": {
          "paths": [
            "M374 224 L392 217 L418 219 L433 227 L430 237 L418 237 L425 245 L422 253 L412 246 L405 241 L378 240 L367 232 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              318,
              360
            ],
            [
              0,
              22
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 215
        }
      },
      {
        "id": "back-jam",
        "label": "後方罐子裡果醬的顏色",
        "bounds": [
          439,
          214,
          39,
          47
        ],
        "mask": {
          "paths": [
            "M443 218 L467 218 L474 224 L473 252 L464 258 L443 257 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              318,
              360
            ],
            [
              0,
              22
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 28
        }
      },
      {
        "id": "striped-bowl",
        "label": "莓果碗條紋的顏色",
        "bounds": [
          322,
          281,
          75,
          39
        ],
        "mask": {
          "paths": [
            "M326 286 L341 293 L370 294 L393 285 L387 309 L370 317 L346 315 L333 307 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              308,
              360
            ],
            [
              0,
              12
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 135
        }
      },
      {
        "id": "front-peach",
        "label": "桌子最前方桃子的顏色",
        "bounds": [
          280,
          290,
          45,
          42
        ],
        "mask": {
          "paths": [
            "M292 299 L296 294 L303 294 L310 298 L317 301 L321 311 L319 321 L313 327 L302 329 L290 326 L284 319 L285 310 L288 304 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              325,
              360
            ],
            [
              0,
              65
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.35,
          "maxLight": 1,
          "targetHue": 48,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      }
    ],
    "sourceSHA256": "3b76a6e3c01cedefab5c7d07d3d64cceafef038dacff6f5bd4e45b108ca23da9"
  },
  {
    "id": "scene-10",
    "version": 2,
    "name": "小馬雨天電車站",
    "src": "../../assets/art/illustrated-v1/scene-10.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "umbrella",
        "label": "雨傘的顏色",
        "bounds": [
          79,
          43,
          215,
          107
        ],
        "mask": {
          "paths": [
            "M86 146 L94 112 L112 80 L142 59 L184 46 L219 47 L254 56 L288 67 L267 79 L252 101 L240 125 L209 118 L167 124 L127 137 Z"
          ],
          "holes": [
            "M193 81 L203 91 L208 110 L205 125 L193 133 L181 126 L180 109 L183 94 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              313,
              360
            ],
            [
              0,
              17
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 210
        }
      },
      {
        "id": "raincoat",
        "label": "小馬雨衣的顏色",
        "bounds": [
          157,
          179,
          79,
          106
        ],
        "mask": {
          "paths": [
            "M142 187 L162 180 L175 184 L194 185 L211 193 L224 188 L234 201 L236 229 L225 242 L227 277 L205 282 L150 274 L132 259 L130 236 L125 219 L132 201 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              35,
              70
            ]
          ],
          "minSat": 0.3,
          "maxSat": 1,
          "minLight": 0.33,
          "maxLight": 1,
          "targetHue": 150,
          "satModel": "hsv",
          "targetSat": 0.48
        }
      },
      {
        "id": "train-body",
        "label": "電車車身的顏色",
        "bounds": [
          337,
          190,
          113,
          49
        ],
        "mask": {
          "paths": [
            "M337 183 L369 190 L396 190 L446 185 L450 219 L437 234 L405 237 L372 230 L339 215 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              115,
              200
            ]
          ],
          "minSat": 0.03,
          "maxSat": 1,
          "minLight": 0.16,
          "maxLight": 0.85,
          "targetHue": 350,
          "satModel": "hsv",
          "targetSat": 0.42
        }
      },
      {
        "id": "pony-bag",
        "label": "小馬背包的顏色",
        "bounds": [
          96,
          213,
          59,
          59
        ],
        "mask": {
          "paths": [
            "M112 218 L129 217 L151 220 L151 245 L146 265 L122 269 L101 262 L99 249 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              183,
              247
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 285
        }
      },
      {
        "id": "station-lamp",
        "label": "右上車站燈玻璃的顏色",
        "bounds": [
          350,
          40,
          28,
          44
        ],
        "mask": {
          "paths": [
            "M354 46 L365 43 L373 48 L371 73 L365 81 L354 75 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              74
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 195
        }
      },
      {
        "id": "flower-pot",
        "label": "左下花盆的顏色",
        "bounds": [
          0,
          293,
          48,
          48
        ],
        "mask": {
          "paths": [
            "M1 296 L16 306 L44 301 L44 327 L35 337 L13 341 L1 337 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              350,
              360
            ],
            [
              0,
              54
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 180
        }
      },
      {
        "id": "lighthouse",
        "label": "遠處燈塔塔身的顏色",
        "bounds": [
          430,
          88,
          23,
          41
        ],
        "mask": {
          "paths": [
            "M437 92 L446 95 L449 125 L436 124 L434 115 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              300
            ]
          ],
          "minSat": 0,
          "maxSat": 0.9,
          "minLight": 0.55,
          "maxLight": 0.97,
          "targetHue": 48,
          "targetSat": 0.5,
          "lightnessScale": 0.92
        }
      }
    ],
    "sourceSHA256": "58c81360b3c7ff90fe53d8159312abb58cc221317528417daf653c6ca1901448"
  },
  {
    "id": "scene-11",
    "version": 2,
    "name": "浣熊時鐘工坊",
    "src": "../../assets/art/illustrated-v1/scene-11.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "raccoon-overalls",
        "label": "浣熊工作服的顏色",
        "bounds": [
          176,
          178,
          119,
          83
        ],
        "mask": {
          "paths": [
            "M173 170 L311 170 L311 265 L173 265 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              175,
              255
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.23,
          "maxLight": 1,
          "targetHue": 345,
          "satModel": "hsv",
          "targetSat": 0.42
        }
      },
      {
        "id": "big-clock-frame",
        "label": "桌上大鐘木框的顏色",
        "bounds": [
          316,
          135,
          109,
          149
        ],
        "mask": {
          "paths": [
            "M324 162 L342 143 L363 138 L384 145 L399 158 L416 165 L416 254 L422 264 L414 275 L382 280 L329 275 L321 264 L322 236 L325 215 L318 183 Z"
          ],
          "holes": [
            "M355 148 L366 151 L376 160 L381 177 L381 197 L373 218 L358 228 L343 224 L333 215 L326 195 L326 176 L331 160 L343 151 Z",
            "M329 227 L369 227 L379 237 L379 264 L327 265 L327 239 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              0,
              38
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.24,
          "maxLight": 0.82,
          "targetHue": 5,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "lamp-shade",
        "label": "右上檯燈燈罩的顏色",
        "bounds": [
          429,
          106,
          45,
          48
        ],
        "mask": {
          "paths": [
            "M409 122 L425 110 L445 108 L459 115 L467 129 L471 150 L443 148 L409 135 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              52,
              116
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.65,
          "targetHue": 210
        }
      },
      {
        "id": "front-toolbox",
        "label": "前景木盒正面的顏色",
        "bounds": [
          44,
          306,
          232,
          35
        ],
        "mask": {
          "paths": [
            "M48 309 L86 319 L120 325 L201 329 L273 310 L273 338 L266 341 L88 340 L48 325 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              356,
              360
            ],
            [
              0,
              60
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 135
        }
      },
      {
        "id": "yarn-basket",
        "label": "左邊線球籃的顏色",
        "bounds": [
          0,
          258,
          100,
          44
        ],
        "mask": {
          "paths": [
            "M1 272 L32 278 L65 275 L96 261 L96 285 L79 293 L46 300 L13 295 L1 289 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              65
            ]
          ],
          "minSat": 0.03,
          "maxSat": 1,
          "minLight": 0.24,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      },
      {
        "id": "screwdriver-handle",
        "label": "桌上藍柄螺絲起子的顏色",
        "bounds": [
          173,
          267,
          64,
          27
        ],
        "mask": {
          "paths": [
            "M177 277 L183 270 L194 271 L227 280 L233 285 L229 289 L217 290 L183 283 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              183,
              247
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 25
        }
      },
      {
        "id": "loose-gold-gear",
        "label": "桌上中央大齒輪的顏色",
        "bounds": [
          313,
          284,
          39,
          26
        ],
        "mask": {
          "paths": [
            "M321 291 L330 287 L340 288 L348 293 L349 301 L340 306 L329 307 L319 302 L317 296 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              11,
              75
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 200,
          "targetSat": 0.12,
          "lightnessScale": 1.12
        }
      }
    ],
    "sourceSHA256": "366ab56d9092cabe3bd79c67c4a181a05cc2f838f1da661c32a0eeaed6551a8b"
  },
  {
    "id": "scene-12",
    "version": 2,
    "name": "小鹿山間採花",
    "src": "../../assets/art/illustrated-v1/scene-12.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "basket-front",
        "label": "野餐花籃的顏色",
        "bounds": [
          64,
          271,
          137,
          58
        ],
        "mask": {
          "paths": [
            "M68 284 L105 291 L145 284 L193 274 L197 285 L191 312 L166 325 L122 326 L88 317 L69 304 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              356,
              360
            ],
            [
              0,
              60
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 14
        }
      },
      {
        "id": "foreground-leaf-plant",
        "label": "左下長葉植物的顏色",
        "bounds": [
          0,
          274,
          59,
          67
        ],
        "mask": {
          "paths": [
            "M0 273 L25 280 L48 294 L88 307 L92 332 L63 341 L0 341 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              55,
              175
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.95,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.5,
          "lightnessScale": 1,
          "lightnessDelta": 0
        }
      },
      {
        "id": "cottage-roof",
        "label": "左上小屋屋頂的顏色",
        "bounds": [
          24,
          23,
          69,
          30
        ],
        "mask": {
          "paths": [
            "M27 44 L60 26 L86 36 L89 46 L76 50 L62 43 L33 48 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              340,
              360
            ],
            [
              0,
              44
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 215
        }
      },
      {
        "id": "bouquet-white-daisy",
        "label": "花束中下方大白花的顏色",
        "bounds": [
          295,
          255,
          39,
          30
        ],
        "mask": {
          "paths": [
            "M306 257 L312 259 L315 255 L319 261 L325 260 L325 265 L331 269 L325 274 L324 279 L318 275 L313 282 L309 276 L301 277 L304 271 L298 266 L305 265 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.25,
          "minLight": 0.72,
          "maxLight": 1,
          "targetHue": 15,
          "satModel": "hsv",
          "targetSat": 0.55,
          "lightnessScale": 0.92
        }
      },
      {
        "id": "bouquet-blue-flower",
        "label": "花束中間藍花的顏色",
        "bounds": [
          284,
          226,
          34,
          29
        ],
        "mask": {
          "paths": [
            "M296 231 L303 230 L307 235 L313 235 L315 241 L309 245 L306 251 L300 250 L296 254 L290 249 L291 243 L287 239 L291 233 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              193,
              257
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 340,
          "targetSat": 0.5
        }
      },
      {
        "id": "crown-white-daisy",
        "label": "小鹿花冠右邊白花的顏色",
        "bounds": [
          296,
          122,
          30,
          27
        ],
        "mask": {
          "paths": [
            "M306 125 L312 127 L317 125 L321 129 L318 134 L323 138 L318 142 L313 142 L309 146 L305 141 L299 141 L299 135 L302 132 L301 127 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.25,
          "minLight": 0.72,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.5,
          "lightnessScale": 0.92
        }
      },
      {
        "id": "foreground-yellow-flower",
        "label": "前景中央黃花的顏色",
        "bounds": [
          264,
          298,
          39,
          30
        ],
        "mask": {
          "paths": [
            "M279 301 L284 304 L289 301 L294 305 L293 310 L300 312 L297 317 L290 319 L287 324 L281 322 L276 325 L273 319 L267 316 L271 310 L274 308 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              13,
              77
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 16
        }
      }
    ],
    "sourceSHA256": "13b096ac46c323dc7515dfa745d90888f5a21f47f010f53fc21880648a0dce40"
  },
  {
    "id": "scene-13",
    "version": 2,
    "name": "熊貓玩具鐵道",
    "src": "../../assets/art/illustrated-v1/scene-13.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "star-pillow",
        "label": "星形抱枕的顏色",
        "bounds": [
          311,
          114,
          78,
          69
        ],
        "mask": {
          "paths": [
            "M310 124 L337 128 L347 116 L357 129 L387 133 L373 151 L377 178 L352 174 L339 181 L332 167 L310 160 L320 144 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              85
            ]
          ],
          "minSat": 0.025,
          "maxSat": 1,
          "minLight": 0.36,
          "maxLight": 1,
          "targetHue": 155,
          "satModel": "hsv",
          "targetSat": 0.35,
          "lightnessScale": 0.97
        }
      },
      {
        "id": "round-pillow",
        "label": "右邊圓抱枕的顏色",
        "bounds": [
          415,
          139,
          76,
          58
        ],
        "mask": {
          "paths": [
            "M402 147 L425 141 L449 140 L473 146 L488 157 L494 174 L492 192 L467 195 L447 190 L432 181 L412 179 L404 167 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              310,
              360
            ],
            [
              0,
              35
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.35,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      },
      {
        "id": "locomotive",
        "label": "玩具火車頭的顏色",
        "bounds": [
          183,
          185,
          77,
          44
        ],
        "mask": {
          "paths": [
            "M187 207 L207 206 L214 200 L230 201 L233 191 L253 188 L256 194 L255 214 L243 218 L217 217 L209 225 L191 223 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              340,
              360
            ],
            [
              0,
              18
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.26,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "blue-shoulder-strap",
        "label": "熊貓左肩背帶的顏色",
        "bounds": [
          121,
          126,
          62,
          73
        ],
        "mask": {
          "paths": [
            "M146 133 L163 129 L180 138 L175 146 L157 142 L149 156 L136 178 L133 195 L125 190 L127 172 L136 148 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              183,
              247
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 345
        }
      },
      {
        "id": "toy-house-roof",
        "label": "軌道旁小屋屋頂的顏色",
        "bounds": [
          280,
          237,
          81,
          40
        ],
        "mask": {
          "paths": [
            "M283 263 L310 238 L331 238 L358 258 L362 267 L349 278 L329 263 L307 271 L282 274 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              340,
              360
            ],
            [
              0,
              45
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1,
          "minLight": 0.29,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "ball-red-panel",
        "label": "右下彩球紅色區塊的顏色",
        "bounds": [
          477,
          298,
          35,
          43
        ],
        "mask": {
          "paths": [
            "M482 302 L494 307 L505 317 L510 331 L506 341 L483 341 L489 328 L486 315 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              318,
              360
            ],
            [
              0,
              22
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 25,
          "targetSat": 0.45
        }
      },
      {
        "id": "front-blue-block",
        "label": "左前方藍積木的顏色",
        "bounds": [
          26,
          206,
          30,
          26
        ],
        "mask": {
          "paths": [
            "M32 211 L45 209 L53 214 L51 229 L33 229 L29 223 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              173,
              237
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 135
        }
      }
    ],
    "sourceSHA256": "d64fca40f461c080953ade9f028cfe2e0675076223269f6405dbbcf6e56240d5"
  },
  {
    "id": "scene-14",
    "version": 2,
    "name": "小鼠拼布裁縫",
    "src": "../../assets/art/illustrated-v1/scene-14.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "mother-dress",
        "label": "兔媽媽洋裝的顏色",
        "bounds": [
          104,
          150,
          123,
          86
        ],
        "mask": {
          "paths": [
            "M142 154 L164 151 L177 154 L207 153 L221 168 L218 177 L210 171 L199 171 L189 176 L177 178 L160 180 L148 185 L143 194 L142 202 L151 209 L159 211 L172 207 L171 215 L143 226 L107 234 L116 213 L121 189 L128 169 Z"
          ],
          "holes": [
            "M141 185 L158 176 L177 176 L190 171 L200 170 L208 166 L219 167 L225 176 L225 185 L215 195 L205 199 L193 193 L181 204 L166 212 L145 212 L137 205 L137 194 Z",
            "M161 148 L202 147 L207 156 L201 164 L191 170 L175 170 L165 163 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              325,
              360
            ],
            [
              0,
              30
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv"
        }
      },
      {
        "id": "dress-on-stand",
        "label": "後方花洋裝布底的顏色",
        "bounds": [
          310,
          91,
          74,
          107
        ],
        "mask": {
          "paths": [
            "M333 95 L348 98 L366 94 L370 122 L379 147 L366 149 L356 157 L349 171 L347 191 L312 189 L318 157 L328 120 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              12,
              48
            ]
          ],
          "minSat": 0.1,
          "maxSat": 1,
          "minLight": 0.61,
          "maxLight": 0.97,
          "targetHue": 195,
          "targetSat": 0.3
        }
      },
      {
        "id": "front-green-quilt",
        "label": "右下綠色拼布的顏色",
        "bounds": [
          438,
          277,
          74,
          64
        ],
        "mask": {
          "paths": [
            "M435 283 L484 273 L512 289 L512 341 L469 341 L439 312 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              105,
              185
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      },
      {
        "id": "yellow-quilt-patch",
        "label": "小兔手下黃色格紋的顏色",
        "bounds": [
          361,
          250,
          46,
          30
        ],
        "mask": {
          "paths": [
            "M357 224 L375 232 L397 244 L419 277 L375 279 L361 247 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              25,
              75
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.35,
          "maxLight": 1,
          "targetHue": 15,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "child-bow",
        "label": "小兔蝴蝶結的顏色",
        "bounds": [
          397,
          150,
          42,
          34
        ],
        "mask": {
          "paths": [
            "M402 158 L410 153 L418 161 L428 157 L436 162 L435 172 L425 181 L419 175 L411 176 L400 168 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              315,
              360
            ],
            [
              0,
              30
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 1,
          "targetHue": 200,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "child-dress",
        "label": "小兔洋裝的顏色",
        "bounds": [
          408,
          217,
          35,
          31
        ],
        "mask": {
          "paths": [
            "M417 218 L429 219 L437 229 L441 243 L431 248 L416 241 L406 235 L410 226 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              325,
              360
            ],
            [
              0,
              18
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 150,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      },
      {
        "id": "blue-thread-spool",
        "label": "前景藍線軸的顏色",
        "bounds": [
          91,
          306,
          38,
          30
        ],
        "mask": {
          "paths": [
            "M99 312 L109 309 L125 316 L124 329 L116 333 L99 327 L94 319 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              280
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 0.95,
          "targetHue": 5,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      }
    ],
    "sourceSHA256": "67380c1a36e926a7c3bc14542ce567a6c0d7cf8a91fa7c895ebb75b65f4d45fa"
  },
  {
    "id": "scene-15",
    "version": 2,
    "name": "小鴨河畔莓果市集",
    "src": "../../assets/art/illustrated-v1/scene-15.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "adult-hat",
        "label": "大鴨子帽頂的顏色",
        "bounds": [
          240,
          58,
          83,
          45
        ],
        "mask": {
          "paths": [
            "M244 80 L254 66 L276 61 L292 64 L307 74 L319 84 L301 90 L274 91 L251 99 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              74
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 25
        }
      },
      {
        "id": "adult-scarf",
        "label": "大鴨子領巾的顏色",
        "bounds": [
          225,
          150,
          96,
          69
        ],
        "mask": {
          "paths": [
            "M244 157 L261 153 L280 166 L297 157 L310 166 L316 190 L306 200 L292 192 L282 215 L270 209 L273 194 L258 181 L234 174 L229 164 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              183,
              247
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 130
        }
      },
      {
        "id": "plant-pot",
        "label": "左邊木花盆的顏色",
        "bounds": [
          0,
          213,
          53,
          41
        ],
        "mask": {
          "paths": [
            "M5 218 L27 220 L47 216 L49 238 L38 251 L12 251 L2 243 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              45
            ]
          ],
          "minSat": 0.1,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 0.98,
          "targetHue": 180,
          "targetSat": 0.3
        }
      },
      {
        "id": "child-hat",
        "label": "左邊小鴨帽頂的顏色",
        "bounds": [
          151,
          176,
          66,
          51
        ],
        "mask": {
          "paths": [
            "M159 197 L170 184 L187 180 L202 184 L212 195 L203 202 L183 210 L160 224 L156 216 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              13,
              77
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 150
        }
      },
      {
        "id": "strawberry-sign",
        "label": "右上草莓招牌底色",
        "bounds": [
          446,
          68,
          55,
          74
        ],
        "mask": {
          "paths": [
            "M459 76 L489 71 L497 129 L450 138 L450 129 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.3,
          "minLight": 0.15,
          "maxLight": 0.49,
          "targetHue": 140,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      },
      {
        "id": "front-fruit-crate",
        "label": "右下水果木箱前板的顏色",
        "bounds": [
          435,
          307,
          77,
          34
        ],
        "mask": {
          "paths": [
            "M440 310 L455 318 L512 325 L512 341 L439 341 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              19,
              52
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 0.9,
          "targetHue": 205,
          "targetSat": 0.4
        }
      },
      {
        "id": "duckling-bow",
        "label": "右邊小鴨蝴蝶結的顏色",
        "bounds": [
          352,
          191,
          35,
          33
        ],
        "mask": {
          "paths": [
            "M357 198 L363 195 L369 199 L377 197 L383 202 L383 211 L375 220 L368 215 L364 207 L356 208 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              313,
              360
            ],
            [
              0,
              17
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.22,
          "maxLight": 0.97,
          "targetHue": 280
        }
      }
    ],
    "sourceSHA256": "20091da6ef7706d5e9f497f6d8c4dc45f31eef55f450a825eb7d944283e43e7f"
  },
  {
    "id": "scene-16",
    "version": 2,
    "name": "變色龍生態玻璃園",
    "src": "../../assets/art/illustrated-v1/scene-16.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-16-difference-1",
        "label": "植物書封由綠色變成淡紫色",
        "bounds": [
          89,
          268,
          164,
          51
        ],
        "mask": {
          "paths": [
            "M89 287 L195 268 L252 293 L168 318 L93 307 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              20,
              60
            ]
          ],
          "minSat": 0,
          "maxSat": 0.3,
          "minLight": 0.62,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.4,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-16-difference-2",
        "label": "圍裙由米色變成淺藍色",
        "bounds": [
          178,
          127,
          65,
          104
        ],
        "mask": {
          "paths": [
            "M183 127 L199 150 L222 173 L239 170 L242 183 L242 228 L178 230 L178 184 L187 156 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              3.5,
              63.5
            ]
          ],
          "minSat": 0.11,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 205,
          "satModel": "hsv",
          "targetSat": 0.42
        }
      },
      {
        "id": "scene-16-difference-3",
        "label": "前景花盆由棕色變成青色",
        "bounds": [
          0,
          291,
          84,
          50
        ],
        "mask": {
          "paths": [
            "M0 292 L83 291 L81 316 L70 338 L0 340 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              349.2,
              360
            ],
            [
              0,
              49.2
            ]
          ],
          "minSat": 0.26,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "scene-16-difference-4",
        "label": "噴水壺由金色變成銀色",
        "bounds": [
          450,
          184,
          49,
          96
        ],
        "mask": {
          "paths": [
            "M476 184 L487 184 L487 190 L479 193 L479 216 L492 222 L498 231 L497 275 L484 279 L461 276 L450 271 L450 232 L458 222 L470 216 L470 194 L456 194 L450 189 L475 188 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              356.5,
              360
            ],
            [
              0,
              56.5
            ]
          ],
          "minSat": 0.23,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.04
        }
      },
      {
        "id": "scene-16-difference-5",
        "label": "左邊蘭花盆由棕色變成藍色",
        "bounds": [
          15,
          199,
          56,
          45
        ],
        "mask": {
          "paths": [
            "M15 199 L70 199 L66 238 L53 243 L29 240 L17 231 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              346.5,
              360
            ],
            [
              0,
              46.5
            ]
          ],
          "minSat": 0.24,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      },
      {
        "id": "scene-16-difference-6",
        "label": "架上藍色玻璃瓶變成琥珀色",
        "bounds": [
          59,
          50,
          17,
          34
        ],
        "mask": {
          "paths": [
            "M63 50 L69 50 L69 58 L75 65 L75 83 L59 83 L59 64 L63 58 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 35,
          "satModel": "hsv",
          "targetSat": 0.7,
          "lightnessScale": 0.85
        }
      },
      {
        "id": "scene-16-difference-7",
        "label": "窗邊小陶盆由橘色變成青色",
        "bounds": [
          440,
          129,
          25,
          13
        ],
        "mask": {
          "paths": [
            "M440 129 L464 129 L462 141 L443 141 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              349.3,
              360
            ],
            [
              0,
              49.3
            ]
          ],
          "minSat": 0.24,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      }
    ],
    "sourceSHA256": "d7a2b784c9f80149a91a3ee4bacd64dd4dea456ad5c5a5a7877aae4d6c331496"
  },
  {
    "id": "scene-17",
    "version": 2,
    "name": "無尾熊森林診所",
    "src": "../../assets/art/illustrated-v1/scene-17.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-17-difference-1",
        "label": "藍色棉被變成綠色",
        "bounds": [
          119,
          225,
          245,
          117
        ],
        "mask": {
          "paths": [
            "M147 234 L172 226 L210 225 L248 233 L277 249 L301 268 L322 283 L344 300 L363 342 L120 342 L119 267 L130 246 Z"
          ],
          "holes": [
            "M156 247 L165 218 L190 224 L187 233 L169 241 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              190,
              245
            ]
          ],
          "minSat": 0.11,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 135,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-17-difference-2",
        "label": "粉紅枕頭變成淡紫色",
        "bounds": [
          337,
          183,
          64,
          73
        ],
        "mask": {
          "paths": [
            "M355 183 L395 187 L400 196 L389 234 L373 254 L355 255 L353 248 L356 242 L351 233 L347 225 L343 223 L339 215 L337 203 L345 192 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              60
            ]
          ],
          "minSat": 0.035,
          "maxSat": 0.4,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.28,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-17-difference-3",
        "label": "醫療圖牌綠色底色變成藍色",
        "bounds": [
          309,
          30,
          63,
          57
        ],
        "mask": {
          "paths": [
            "M309 31 L368 30 L371 85 L309 86 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              90,
              190
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 195,
          "satModel": "hsv",
          "targetSat": 0.52
        }
      },
      {
        "id": "scene-17-difference-4",
        "label": "床邊黃色燈罩變成藍色",
        "bounds": [
          383,
          106,
          66,
          45
        ],
        "mask": {
          "paths": [
            "M384 106 L443 108 L448 150 L383 150 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.38,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-17-difference-5",
        "label": "青色花瓶變成珊瑚紅",
        "bounds": [
          467,
          184,
          27,
          46
        ],
        "mask": {
          "paths": [
            "M476 184 L484 184 L484 194 L491 204 L493 218 L491 224 L486 229 L476 229 L469 224 L467 215 L470 203 L476 195 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.48,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 5,
          "satModel": "hsv",
          "targetSat": 0.53
        }
      },
      {
        "id": "scene-17-difference-6",
        "label": "醫袍綠色口袋變成橘色",
        "bounds": [
          103,
          202,
          28,
          25
        ],
        "mask": {
          "paths": [
            "M109 202 L130 212 L124 226 L107 222 L103 216 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              139.7,
              199.7
            ]
          ],
          "minSat": 0.13,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.56
        }
      },
      {
        "id": "scene-17-difference-7",
        "label": "窗邊棕色花盆變成藍色",
        "bounds": [
          73,
          119,
          27,
          18
        ],
        "mask": {
          "paths": [
            "M73 119 L99 119 L96 135 L77 136 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              356.1,
              360
            ],
            [
              0,
              56.1
            ]
          ],
          "minSat": 0.24,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      }
    ],
    "sourceSHA256": "e30dc2a04f012a905c59390ad099d561eda9ac5d3d3c998f4491bce7e30af4f0"
  },
  {
    "id": "scene-18",
    "version": 2,
    "name": "北極熊暖爐茶會",
    "src": "../../assets/art/illustrated-v1/scene-18.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-18-difference-1",
        "label": "金色燈籠變成銀色",
        "bounds": [
          132,
          207,
          59,
          105
        ],
        "mask": {
          "paths": [
            "M158 207 L169 215 L176 225 L188 230 L190 301 L182 310 L139 311 L132 303 L132 235 L140 226 L149 221 L153 214 Z"
          ],
          "holes": [
            "M143 239 L176 240 L176 296 L143 297 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              2.7,
              62.7
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.82,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.04
        }
      },
      {
        "id": "scene-18-difference-2",
        "label": "米色椅墊變成紫色",
        "bounds": [
          430,
          179,
          75,
          83
        ],
        "mask": {
          "paths": [
            "M452 179 L487 179 L504 190 L491 222 L478 246 L465 261 L434 261 L430 236 L433 217 L443 198 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              350.9,
              360
            ],
            [
              0,
              50.9
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.32
        }
      },
      {
        "id": "scene-18-difference-3",
        "label": "白色茶壺變成淡綠色",
        "bounds": [
          201,
          166,
          95,
          67
        ],
        "mask": {
          "paths": [
            "M230 166 L239 166 L242 173 L263 178 L276 187 L279 196 L289 192 L295 196 L287 210 L275 216 L268 228 L239 232 L215 225 L204 211 L201 190 L207 185 L216 180 L227 178 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              75
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.25,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-18-difference-4",
        "label": "糖罐變成青色",
        "bounds": [
          229,
          251,
          27,
          55
        ],
        "mask": {
          "paths": [
            "M239 251 L245 251 L247 259 L255 264 L254 299 L248 305 L233 304 L229 297 L230 265 L236 260 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0.5,
              60.5
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 180,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "scene-18-difference-5",
        "label": "红色茶葉罐變成深藍色",
        "bounds": [
          193,
          263,
          32,
          38
        ],
        "mask": {
          "paths": [
            "M193 264 L221 263 L224 271 L223 298 L193 300 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357.2,
              360
            ],
            [
              0,
              57.2
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 220,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-18-difference-6",
        "label": "右邊小茶杯變成粉紅色",
        "bounds": [
          344,
          236,
          47,
          32
        ],
        "mask": {
          "paths": [
            "M344 237 L375 236 L377 242 L388 242 L390 251 L378 257 L375 265 L355 267 L349 259 L346 251 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              75
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 335,
          "satModel": "hsv",
          "targetSat": 0.3,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-18-difference-7",
        "label": "暖爐上花盆變成紫色",
        "bounds": [
          147,
          80,
          27,
          19
        ],
        "mask": {
          "paths": [
            "M147 80 L173 80 L172 98 L153 98 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              349.3,
              360
            ],
            [
              0,
              49.3
            ]
          ],
          "minSat": 0.26,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.54
        }
      }
    ],
    "sourceSHA256": "57d852c335902eb06708db7890d25193725795e7aa9d406b5f772a7a6ec334d2"
  },
  {
    "id": "scene-19",
    "version": 2,
    "name": "小熊貓陶藝工房",
    "src": "../../assets/art/illustrated-v1/scene-19.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-19-difference-1",
        "label": "左下白色陶壺變成淡綠色",
        "bounds": [
          0,
          272,
          81,
          69
        ],
        "mask": {
          "paths": [
            "M23 272 L59 272 L64 279 L57 288 L71 296 L80 315 L80 341 L0 341 L0 312 L12 294 L28 286 L25 279 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.24,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-19-difference-2",
        "label": "右下白色大陶壺變成淡紫色",
        "bounds": [
          444,
          238,
          63,
          78
        ],
        "mask": {
          "paths": [
            "M457 238 L490 238 L496 244 L493 252 L504 263 L506 290 L497 310 L479 315 L459 309 L447 294 L444 271 L451 252 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.25,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-19-difference-3",
        "label": "陶輪上的米色陶瓶變成淺藍色",
        "bounds": [
          214,
          205,
          62,
          66
        ],
        "mask": {
          "paths": [
            "M227 205 L254 205 L267 211 L262 224 L266 233 L275 247 L273 263 L262 270 L229 270 L214 260 L215 243 L223 227 L222 214 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              359.3,
              360
            ],
            [
              0,
              59.3
            ]
          ],
          "minSat": 0.14,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 205,
          "satModel": "hsv",
          "targetSat": 0.32
        }
      },
      {
        "id": "scene-19-difference-4",
        "label": "右側白色筆筒變成粉紅色",
        "bounds": [
          381,
          250,
          47,
          61
        ],
        "mask": {
          "paths": [
            "M386 250 L424 251 L427 261 L425 303 L414 310 L395 309 L384 301 L381 263 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 335,
          "satModel": "hsv",
          "targetSat": 0.28,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-19-difference-5",
        "label": "上層白陶瓶變成綠色",
        "bounds": [
          54,
          85,
          28,
          43
        ],
        "mask": {
          "paths": [
            "M62 86 L70 85 L71 94 L79 100 L81 119 L75 127 L59 127 L54 118 L56 104 L61 94 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.28,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.45,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-19-difference-6",
        "label": "中間藍色筆筒變成橘色",
        "bounds": [
          313,
          194,
          30,
          32
        ],
        "mask": {
          "paths": [
            "M315 195 L339 194 L342 200 L340 220 L336 225 L318 223 L313 218 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              186.9,
              246.9
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      },
      {
        "id": "scene-19-difference-7",
        "label": "窗臺小陶盆變成紫色",
        "bounds": [
          227,
          46,
          20,
          15
        ],
        "mask": {
          "paths": [
            "M227 46 L246 46 L244 60 L229 60 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              352.7,
              360
            ],
            [
              0,
              52.7
            ]
          ],
          "minSat": 0.24,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.53
        }
      }
    ],
    "sourceSHA256": "9f0406913f0c6b52978b0efeafc2b3a71ae56f1e409dbe5504d5b074d05bc43e"
  },
  {
    "id": "scene-20",
    "version": 2,
    "name": "貓咪花亭樂團",
    "src": "../../assets/art/illustrated-v1/scene-20.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-20-difference-1",
        "label": "棕色吉他變成藍色",
        "bounds": [
          82,
          184,
          79,
          77
        ],
        "mask": {
          "paths": [
            "M105 190 L116 184 L132 188 L146 188 L157 195 L160 208 L151 224 L157 239 L149 252 L130 260 L107 260 L91 250 L82 235 L83 218 L93 208 Z"
          ],
          "holes": [
            "M95 201 L103 194 L115 193 L123 198 L128 205 L126 212 L118 217 L106 217 L97 213 L92 207 Z",
            "M147 240 L157 240 L167 245 L173 254 L169 261 L156 264 L144 258 L142 248 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              356.9,
              360
            ],
            [
              0,
              56.9
            ]
          ],
          "minSat": 0.33,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 180,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      },
      {
        "id": "scene-20-difference-2",
        "label": "藍色鼓身變成紅色",
        "bounds": [
          232,
          220,
          71,
          53
        ],
        "mask": {
          "paths": [
            "M232 220 L300 220 L302 266 L292 272 L243 270 L232 264 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              186.1,
              246.1
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-20-difference-3",
        "label": "粉紅洋裝變成淡紫色",
        "bounds": [
          331,
          222,
          102,
          56
        ],
        "mask": {
          "paths": [
            "M374 222 L390 226 L405 243 L418 247 L424 258 L432 260 L424 270 L409 277 L402 267 L389 263 L379 275 L367 269 L348 271 L331 261 L333 248 L345 241 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              331.6,
              360
            ],
            [
              0,
              31.6
            ]
          ],
          "minSat": 0.05,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-20-difference-4",
        "label": "右邊吊燈金屬框變成深青色",
        "bounds": [
          432,
          13,
          38,
          77
        ],
        "mask": {
          "paths": [
            "M445 13 L459 15 L461 23 L469 30 L467 65 L460 77 L458 88 L447 89 L444 78 L434 71 L432 33 L439 22 Z"
          ],
          "holes": [
            "M439 32 L460 33 L460 64 L439 65 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              21.1,
              81.1
            ]
          ],
          "minSat": 0.13,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.82,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-20-difference-5",
        "label": "左邊吊燈金屬框變成銀色",
        "bounds": [
          90,
          21,
          30,
          84
        ],
        "mask": {
          "paths": [
            "M103 21 L112 29 L119 33 L119 75 L113 86 L111 102 L103 104 L102 91 L95 84 L91 74 L90 36 L96 30 Z"
          ],
          "holes": [
            "M97 40 L113 40 L113 74 L97 74 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              5.0,
              65.0
            ]
          ],
          "minSat": 0.27096774193548384,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.82,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.04
        }
      },
      {
        "id": "scene-20-difference-6",
        "label": "左下花盆變成紅色",
        "bounds": [
          18,
          322,
          46,
          19
        ],
        "mask": {
          "paths": [
            "M18 322 L63 322 L59 341 L24 341 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 10,
          "satModel": "hsv",
          "targetSat": 0.5,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-20-difference-7",
        "label": "灰貓黃色領巾變成紅色",
        "bounds": [
          240,
          178,
          41,
          28
        ],
        "mask": {
          "paths": [
            "M240 180 L249 178 L257 184 L271 179 L280 178 L276 187 L269 192 L267 199 L260 205 L252 203 L252 194 L247 187 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              8.5,
              68.5
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 5,
          "satModel": "hsv",
          "targetSat": 0.63
        }
      }
    ],
    "sourceSHA256": "62f6490839715626dff40f41d8a687ad0220e105919eb8b31436a99fcf5a4cee"
  },
  {
    "id": "scene-21",
    "version": 2,
    "name": "青蛙池畔野餐",
    "src": "../../assets/art/illustrated-v1/scene-21.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-21-difference-1",
        "label": "野餐籃變成深棕色",
        "bounds": [
          34,
          281,
          104,
          49
        ],
        "mask": {
          "paths": [
            "M34 281 L128 282 L137 289 L135 315 L126 327 L58 329 L38 319 Z"
          ],
          "holes": [
            "M54 275 L60 269 L74 268 L89 271 L94 275 L100 277 L105 280 L113 282 L111 285 L103 287 L90 287 L77 284 L65 282 L56 282 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              356.2,
              360
            ],
            [
              0,
              56.2
            ]
          ],
          "minSat": 0.27,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 10,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-21-difference-2",
        "label": "白色廚師帽變成淡藍色",
        "bounds": [
          188,
          91,
          86,
          62
        ],
        "mask": {
          "paths": [
            "M193 117 L188 110 L190 102 L201 96 L211 99 L219 91 L231 92 L238 101 L248 96 L264 101 L273 111 L270 124 L259 132 L252 152 L201 150 L202 130 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 210,
          "satModel": "hsv",
          "targetSat": 0.32,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-21-difference-3",
        "label": "條紋圍裙變成紅白色",
        "bounds": [
          184,
          221,
          68,
          42
        ],
        "mask": {
          "paths": [
            "M189 224 L203 232 L229 232 L246 221 L251 245 L249 260 L195 262 L184 247 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              177.9,
              237.9
            ]
          ],
          "minSat": 0.04,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-21-difference-4",
        "label": "白鴨羽毛變成淡金黃色",
        "bounds": [
          355,
          166,
          64,
          43
        ],
        "mask": {
          "paths": [
            "M365 166 L377 166 L380 176 L374 186 L383 190 L399 187 L414 181 L418 187 L410 200 L398 207 L376 208 L358 202 L356 195 L363 190 L363 181 L355 180 L355 175 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.48,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-21-difference-5",
        "label": "藍色花瓶變成紫色",
        "bounds": [
          299,
          245,
          36,
          53
        ],
        "mask": {
          "paths": [
            "M311 245 L320 245 L319 261 L329 267 L334 284 L329 295 L314 297 L300 291 L299 280 L306 263 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              196.0,
              256.0
            ]
          ],
          "minSat": 0.07,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-21-difference-6",
        "label": "橘色果汁變成紅色果汁",
        "bounds": [
          146,
          250,
          22,
          39
        ],
        "mask": {
          "paths": [
            "M148 250 L167 250 L167 282 L151 288 L146 282 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              11.8,
              71.8
            ]
          ],
          "minSat": 0.17,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 350,
          "satModel": "hsv",
          "targetSat": 0.68
        }
      },
      {
        "id": "scene-21-difference-7",
        "label": "碼頭上的大陶盆變成藍色",
        "bounds": [
          442,
          105,
          29,
          21
        ],
        "mask": {
          "paths": [
            "M442 105 L470 105 L467 123 L447 125 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              351.4,
              360
            ],
            [
              0,
              51.4
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 210,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      }
    ],
    "sourceSHA256": "ef17f11c477acb54ff8f6d5cd7a38aab217977ed8d113ff9aef327a07db2a24f"
  },
  {
    "id": "scene-22",
    "version": 2,
    "name": "兔兔燈塔寶藏圖",
    "src": "../../assets/art/illustrated-v1/scene-22.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-22-difference-1",
        "label": "望遠鏡金色鏡筒變成銀色",
        "bounds": [
          207,
          278,
          188,
          41
        ],
        "mask": {
          "paths": [
            "M216 278 L229 281 L243 278 L270 278 L284 281 L349 282 L375 278 L388 283 L394 296 L388 313 L376 318 L350 314 L280 305 L244 304 L228 299 L214 298 L207 291 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              359.5,
              360
            ],
            [
              0,
              59.5
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.04
        }
      },
      {
        "id": "scene-22-difference-2",
        "label": "左下金色燈籠變成深藍色",
        "bounds": [
          38,
          207,
          54,
          98
        ],
        "mask": {
          "paths": [
            "M63 207 L69 209 L67 220 L78 230 L83 236 L82 289 L91 297 L88 304 L41 304 L38 296 L43 289 L43 237 L49 229 L57 224 L57 215 Z"
          ],
          "holes": [
            "M48 241 L78 241 L78 285 L48 286 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              349.2,
              360
            ],
            [
              0,
              49.2
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.82,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "scene-22-difference-3",
        "label": "棕色背包變成綠色",
        "bounds": [
          96,
          148,
          53,
          92
        ],
        "mask": {
          "paths": [
            "M115 149 L129 148 L138 157 L137 169 L130 187 L140 198 L148 215 L144 231 L130 239 L112 232 L98 222 L96 198 L101 166 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              352.3,
              360
            ],
            [
              0,
              52.3
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-22-difference-4",
        "label": "羅盤外殼變成深紅色",
        "bounds": [
          127,
          289,
          72,
          41
        ],
        "mask": {
          "paths": [
            "M152 289 L180 291 L194 299 L198 311 L187 324 L157 329 L132 323 L127 315 L131 303 Z"
          ],
          "holes": [
            "M141 297 L157 294 L172 295 L184 299 L191 305 L191 311 L182 317 L164 320 L146 317 L135 311 L134 304 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              352.5,
              360
            ],
            [
              0,
              52.5
            ]
          ],
          "minSat": 0.09,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.56
        }
      },
      {
        "id": "scene-22-difference-5",
        "label": "吊掛燈籠金屬框變成紫色",
        "bounds": [
          309,
          25,
          63,
          67
        ],
        "mask": {
          "paths": [
            "M338 25 L348 25 L347 36 L358 46 L371 54 L370 61 L361 63 L359 84 L351 91 L332 88 L327 64 L310 64 L309 56 L325 47 L334 39 Z"
          ],
          "holes": [
            "M333 66 L352 66 L352 84 L333 84 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              4.0,
              64.0
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.82,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "scene-22-difference-6",
        "label": "左邊藍色箱子變成紅色",
        "bounds": [
          0,
          147,
          32,
          58
        ],
        "mask": {
          "paths": [
            "M0 147 L29 147 L31 153 L30 202 L0 204 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              184.0,
              244.0
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-22-difference-7",
        "label": "架上橘色書脊變成紫色",
        "bounds": [
          75,
          130,
          11,
          49
        ],
        "mask": {
          "paths": [
            "M75 131 L84 130 L85 177 L76 178 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              351.2,
              360
            ],
            [
              0,
              51.2
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      }
    ],
    "sourceSHA256": "a8b0fe13c3e1a46ed1a8311b430276bb0e19ed1f09523915a9d67de3a11d1380"
  },
  {
    "id": "scene-23",
    "version": 2,
    "name": "花栗鼠蜂蜜花園",
    "src": "../../assets/art/illustrated-v1/scene-23.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-23-difference-1",
        "label": "大蜂箱木材變成深紅棕色",
        "bounds": [
          214,
          219,
          191,
          85
        ],
        "mask": {
          "paths": [
            "M214 227 L298 219 L394 220 L404 228 L404 275 L385 294 L326 303 L216 282 Z"
          ],
          "holes": [
            "M235 221 L289 214 L373 219 L387 224 L382 233 L303 241 L230 233 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              357.2,
              360
            ],
            [
              0,
              57.2
            ]
          ],
          "minSat": 0.23,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 12,
          "satModel": "hsv",
          "lightnessScale": 0.78
        }
      },
      {
        "id": "scene-23-difference-2",
        "label": "草帽变成淡藍色",
        "bounds": [
          155,
          46,
          140,
          96
        ],
        "mask": {
          "paths": [
            "M155 134 L161 114 L170 97 L171 80 L182 61 L204 49 L228 46 L253 54 L273 69 L278 80 L278 84 L288 85 L294 93 L287 102 L275 106 L267 90 L252 85 L235 94 L217 105 L200 117 L183 131 L170 140 L159 141 Z"
          ],
          "holes": [
            "M177 137 L179 121 L188 108 L191 99 L200 89 L213 80 L229 73 L244 67 L259 64 L268 65 L273 74 L276 88 L287 104 L293 123 L284 139 L261 151 L225 155 L196 145 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              9.3,
              69.3
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 210,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      },
      {
        "id": "scene-23-difference-3",
        "label": "右邊金屬煙燻壺變成銅色",
        "bounds": [
          411,
          201,
          91,
          94
        ],
        "mask": {
          "paths": [
            "M417 213 L411 204 L418 201 L434 211 L439 229 L448 235 L458 235 L459 252 L464 266 L471 258 L482 255 L490 243 L501 245 L501 285 L481 293 L435 294 L417 283 L416 252 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.4,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-23-difference-4",
        "label": "左側蜂箱變成藍綠色",
        "bounds": [
          0,
          137,
          90,
          52
        ],
        "mask": {
          "paths": [
            "M0 140 L86 137 L89 150 L84 181 L3 188 L0 187 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              355.6,
              360
            ],
            [
              0,
              55.6
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "scene-23-difference-5",
        "label": "右側遠處蜂箱變成紫色",
        "bounds": [
          468,
          120,
          44,
          58
        ],
        "mask": {
          "paths": [
            "M468 126 L512 120 L512 174 L469 177 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0.0,
              60.0
            ]
          ],
          "minSat": 0.24,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-23-difference-6",
        "label": "右邊蜂蜜玻璃罐變成紅色玻璃",
        "bounds": [
          152,
          235,
          43,
          45
        ],
        "mask": {
          "paths": [
            "M161 235 L185 235 L191 240 L194 262 L190 276 L181 279 L159 277 L152 270 L153 249 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              6.5,
              66.5
            ]
          ],
          "minSat": 0.29,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.62
        }
      },
      {
        "id": "scene-23-difference-7",
        "label": "左邊蜂蜜玻璃罐變成藍色玻璃",
        "bounds": [
          108,
          238,
          34,
          41
        ],
        "mask": {
          "paths": [
            "M116 239 L136 238 L141 245 L141 270 L134 278 L115 276 L108 267 L109 248 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              3.5,
              63.5
            ]
          ],
          "minSat": 0.31,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      }
    ],
    "sourceSHA256": "9edbbc1f350a60fbb9c7b39d51fd6b70735281b4e4fe7a17ec094436b92bd644"
  },
  {
    "id": "scene-24",
    "version": 2,
    "name": "狗狗沙漠露營",
    "src": "../../assets/art/illustrated-v1/scene-24.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-24-difference-1",
        "label": "藍色睡墊變成紅色",
        "bounds": [
          0,
          245,
          92,
          53
        ],
        "mask": {
          "paths": [
            "M0 253 L21 249 L50 245 L69 248 L81 251 L90 260 L91 280 L84 290 L65 297 L32 295 L0 294 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              183.2,
              243.2
            ]
          ],
          "minSat": 0.23,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-24-difference-2",
        "label": "黃色帳篷門布變成紫色",
        "bounds": [
          62,
          126,
          105,
          92
        ],
        "mask": {
          "paths": [
            "M113 126 L138 143 L166 165 L154 167 L146 174 L140 185 L130 197 L125 205 L112 214 L102 217 L84 211 L67 207 L62 202 L72 185 L85 167 L98 149 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              25,
              65
            ]
          ],
          "minSat": 0.15,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-24-difference-3",
        "label": "金色露營燈變成銀色",
        "bounds": [
          270,
          193,
          46,
          75
        ],
        "mask": {
          "paths": [
            "M287 193 L298 194 L300 202 L308 210 L310 253 L315 261 L311 267 L273 266 L270 260 L274 251 L274 213 L281 204 Z"
          ],
          "holes": [
            "M280 216 L301 216 L301 248 L280 248 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              13.1,
              73.1
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 0.82,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.04
        }
      },
      {
        "id": "scene-24-difference-4",
        "label": "綠色露營杯變成藍色",
        "bounds": [
          149,
          257,
          60,
          50
        ],
        "mask": {
          "paths": [
            "M152 258 L180 257 L194 260 L197 267 L202 266 L208 271 L206 286 L197 292 L194 302 L168 306 L151 301 L149 265 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              145,
              205
            ]
          ],
          "minSat": 0.04,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "scene-24-difference-5",
        "label": "營火左邊石頭變成藍灰色",
        "bounds": [
          228,
          277,
          36,
          29
        ],
        "mask": {
          "paths": [
            "M231 285 L240 278 L253 277 L262 284 L263 293 L258 301 L245 305 L232 300 L228 293 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.55,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.4,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-24-difference-6",
        "label": "營火右邊石頭變成紫灰色",
        "bounds": [
          382,
          282,
          31,
          29
        ],
        "mask": {
          "paths": [
            "M386 286 L397 282 L406 284 L412 293 L411 304 L401 310 L387 307 L382 298 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.55,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.35,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-24-difference-7",
        "label": "營火前方大石頭變成紅灰色",
        "bounds": [
          284,
          286,
          43,
          32
        ],
        "mask": {
          "paths": [
            "M287 294 L299 286 L313 286 L323 294 L326 307 L317 317 L301 317 L290 311 L284 303 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.55,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 5,
          "satModel": "hsv",
          "targetSat": 0.4
        }
      }
    ],
    "sourceSHA256": "c0a19abd63fb4488801ff439c219ab9f0d1ecad9c00bb244fdd29cdd3431bbe1"
  },
  {
    "id": "scene-25",
    "version": 2,
    "name": "海狸溪上小橋",
    "src": "../../assets/art/illustrated-v1/scene-25.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-25-difference-1",
        "label": "綠色工作服變成藍色",
        "bounds": [
          136,
          98,
          63,
          73
        ],
        "mask": {
          "paths": [
            "M155 99 L169 98 L173 107 L162 112 L157 123 L157 134 L161 141 L180 151 L198 151 L198 163 L170 170 L146 170 L136 163 L138 143 L145 120 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              80,
              165
            ]
          ],
          "minSat": 0.025,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 210,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-25-difference-2",
        "label": "小屋右側屋面變成藍色",
        "bounds": [
          399,
          37,
          100,
          37
        ],
        "mask": {
          "paths": [
            "M427 37 L449 44 L487 47 L498 59 L497 65 L453 64 L432 48 L407 73 L399 73 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              220.0,
              280.0
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-25-difference-3",
        "label": "左側橋柱變成紅色",
        "bounds": [
          51,
          133,
          20,
          67
        ],
        "mask": {
          "paths": [
            "M53 135 L68 133 L70 144 L69 197 L58 199 L51 190 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              356.2,
              360
            ],
            [
              0,
              56.2
            ]
          ],
          "minSat": 0.26,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.54
        }
      },
      {
        "id": "scene-25-difference-4",
        "label": "右側橋柱變成藍色",
        "bounds": [
          416,
          145,
          21,
          51
        ],
        "mask": {
          "paths": [
            "M419 147 L434 145 L436 152 L435 191 L426 195 L416 184 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357.2,
              360
            ],
            [
              0,
              57.2
            ]
          ],
          "minSat": 0.27,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.5
        }
      },
      {
        "id": "scene-25-difference-5",
        "label": "灰色鎚頭變成銅色",
        "bounds": [
          249,
          99,
          38,
          26
        ],
        "mask": {
          "paths": [
            "M260 99 L268 100 L286 110 L284 119 L273 124 L249 111 L250 104 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.55,
          "lightnessScale": 1.12
        }
      },
      {
        "id": "scene-25-difference-6",
        "label": "中央粉紅花變成白色",
        "bounds": [
          159,
          276,
          29,
          26
        ],
        "mask": {
          "paths": [
            "M170 276 L175 281 L183 278 L187 283 L179 288 L185 293 L182 298 L174 294 L169 301 L164 298 L166 291 L159 292 L159 287 L166 283 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              344.6,
              360
            ],
            [
              0,
              44.6
            ]
          ],
          "minSat": 0.17,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.02
        }
      },
      {
        "id": "scene-25-difference-7",
        "label": "左下粉紅花變成紫色",
        "bounds": [
          50,
          284,
          27,
          24
        ],
        "mask": {
          "paths": [
            "M61 284 L67 288 L74 286 L76 291 L70 296 L76 300 L72 305 L65 301 L61 307 L56 304 L58 297 L51 300 L50 294 L57 291 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              88.7,
              148.7
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "6ba727b2a0be2586ffc95285b59345e7bd0905bf4e5b2b780e15b7fa22f0a699"
  },
  {
    "id": "scene-26",
    "version": 2,
    "name": "小鹿雨後水窪",
    "src": "../../assets/art/illustrated-v1/scene-26.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-26-difference-1",
        "label": "橘色小鹿變成棕色小鹿",
        "bounds": [
          124,
          50,
          180,
          204
        ],
        "mask": {
          "paths": [
            "M252 50 L265 52 L275 68 L277 80 L291 91 L300 111 L299 135 L294 147 L280 155 L277 177 L292 200 L303 222 L300 235 L286 232 L279 213 L263 196 L258 219 L268 240 L265 253 L251 250 L242 227 L239 203 L210 190 L203 216 L191 237 L190 251 L180 250 L176 236 L179 212 L169 190 L154 183 L142 199 L131 212 L124 208 L128 192 L144 166 L155 146 L174 134 L180 116 L170 112 L165 104 L171 102 L184 109 L194 126 L208 120 L196 103 L185 69 L207 67 L228 78 L241 82 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              15,
              45
            ]
          ],
          "minSat": 0.38,
          "maxSat": 1,
          "minLight": 0.23,
          "maxLight": 1,
          "targetHue": 25,
          "satModel": "hsv",
          "targetSat": 0.36,
          "lightnessScale": 0.7
        }
      },
      {
        "id": "scene-26-difference-2",
        "label": "左上櫻花群變成白色",
        "bounds": [
          97,
          1,
          80,
          37
        ],
        "mask": {
          "paths": [
            "M97 1 L110 1 L116 9 L127 5 L141 8 L147 14 L160 12 L171 17 L176 28 L167 37 L152 36 L143 29 L132 36 L119 33 L110 23 L101 22 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              315,
              360
            ],
            [
              0,
              15
            ]
          ],
          "minSat": 0.04,
          "maxSat": 1,
          "minLight": 0.4,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.02,
          "lightnessScale": 1.06
        }
      },
      {
        "id": "scene-26-difference-3",
        "label": "右前景灰石變成紅褐色",
        "bounds": [
          436,
          285,
          65,
          21
        ],
        "mask": {
          "paths": [
            "M451 285 L470 286 L487 289 L498 294 L500 299 L486 305 L458 305 L442 300 L436 296 L440 291 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 10,
          "satModel": "hsv",
          "targetSat": 0.45,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-26-difference-4",
        "label": "前景中央粉紅花變成紫色",
        "bounds": [
          95,
          297,
          25,
          22
        ],
        "mask": {
          "paths": [
            "M99 310 L96 308 L95 305 L97 302 L100 303 L101 305 L102 300 L104 298 L106 297 L108 299 L110 302 L110 305 L113 303 L117 303 L119 305 L119 309 L116 312 L113 312 L115 315 L113 318 L110 318 L108 316 L106 317 L102 318 L99 317 L99 314 L101 312 Z"
          ],
          "holes": [
            "M105 307 L109 307 L112 309 L112 312 L109 314 L106 313 L103 311 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              325.4,
              360
            ],
            [
              0,
              25.4
            ]
          ],
          "minSat": 0.01,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-26-difference-5",
        "label": "左前景粉紅花變成黃色",
        "bounds": [
          42,
          292,
          33,
          21
        ],
        "mask": {
          "paths": [
            "M45 299 L47 295 L50 294 L54 296 L57 293 L60 292 L63 294 L66 295 L66 298 L65 300 L72 299 L74 301 L74 303 L69 305 L67 305 L70 308 L72 310 L71 312 L67 312 L63 310 L61 309 L60 311 L57 311 L54 310 L52 308 L49 308 L44 305 L42 303 L42 301 Z"
          ],
          "holes": [
            "M54 299 L58 298 L61 300 L61 304 L59 306 L55 305 L53 303 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              315,
              360
            ],
            [
              0,
              30
            ]
          ],
          "minSat": 0.01,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.6,
          "lightnessScale": 0.78
        }
      },
      {
        "id": "scene-26-difference-6",
        "label": "左邊白色大雛菊變成黃色",
        "bounds": [
          28,
          187,
          26,
          25
        ],
        "mask": {
          "paths": [
            "M38 187 L44 191 L50 188 L53 194 L47 198 L53 201 L50 207 L43 204 L40 211 L35 208 L36 202 L29 205 L28 199 L34 195 L31 190 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.7,
          "lightnessScale": 0.7
        }
      },
      {
        "id": "scene-26-difference-7",
        "label": "右邊白色大雛菊變成紫色",
        "bounds": [
          467,
          201,
          27,
          25
        ],
        "mask": {
          "paths": [
            "M479 201 L484 205 L490 202 L493 207 L487 212 L491 218 L486 222 L481 218 L476 225 L471 221 L473 215 L467 214 L468 208 L474 207 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.45,
          "lightnessScale": 0.88
        }
      }
    ],
    "sourceSHA256": "7a08c52fcba24954acbfd0f9a062afd6fa34eaf94c67947d99180bfd097f36c7"
  },
  {
    "id": "scene-27",
    "version": 2,
    "name": "烏龜手繪風箏",
    "src": "../../assets/art/illustrated-v1/scene-27.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-27-difference-1",
        "label": "右邊編織籃變成深紅棕色",
        "bounds": [
          379,
          252,
          125,
          69
        ],
        "mask": {
          "paths": [
            "M398 257 L466 252 L503 260 L503 285 L493 312 L452 320 L394 305 L383 290 L379 268 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              355.5,
              360
            ],
            [
              0,
              55.5
            ]
          ],
          "minSat": 0.21,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 10,
          "satModel": "hsv",
          "lightnessScale": 0.78
        }
      },
      {
        "id": "scene-27-difference-2",
        "label": "草帽變成淡藍色",
        "bounds": [
          101,
          91,
          138,
          81
        ],
        "mask": {
          "paths": [
            "M141 98 L165 91 L189 94 L207 105 L217 113 L232 115 L238 125 L232 137 L213 149 L185 151 L165 148 L134 166 L112 171 L101 167 L103 157 L121 139 L123 119 Z"
          ],
          "holes": [
            "M128 148 L145 137 L166 128 L187 119 L205 117 L216 124 L226 143 L225 167 L139 176 L126 167 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              15,
              65
            ]
          ],
          "minSat": 0.04,
          "maxSat": 1,
          "minLight": 0.2,
          "maxLight": 1,
          "targetHue": 210,
          "satModel": "hsv",
          "targetSat": 0.35
        }
      },
      {
        "id": "scene-27-difference-3",
        "label": "中間風箏白布變成淡紫色",
        "bounds": [
          334,
          41,
          66,
          106
        ],
        "mask": {
          "paths": [
            "M361 41 L399 76 L366 146 L334 78 Z"
          ],
          "holes": [
            "M352 64 L365 60 L376 64 L380 74 L374 81 L379 86 L378 101 L370 105 L375 117 L368 124 L362 120 L366 109 L359 105 L356 96 L362 89 L361 82 L354 75 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              0,
              90
            ]
          ],
          "minSat": 0,
          "maxSat": 0.35,
          "minLight": 0.4,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.55,
          "lightnessScale": 0.82
        }
      },
      {
        "id": "scene-27-difference-4",
        "label": "右邊深藍風箏變成深紅色",
        "bounds": [
          421,
          53,
          68,
          94
        ],
        "mask": {
          "paths": [
            "M452 53 L488 88 L459 146 L421 96 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              255
            ]
          ],
          "minSat": 0.04,
          "maxSat": 1,
          "minLight": 0.18,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "scene-27-difference-5",
        "label": "黃色顏料罐變成紫色",
        "bounds": [
          73,
          276,
          30,
          44
        ],
        "mask": {
          "paths": [
            "M78 276 L97 276 L102 283 L102 311 L96 319 L76 317 L73 310 L73 285 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              9.8,
              69.8
            ]
          ],
          "minSat": 0.25,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv",
          "targetSat": 0.56
        }
      },
      {
        "id": "scene-27-difference-6",
        "label": "藍色顏料罐變成綠色",
        "bounds": [
          32,
          269,
          32,
          42
        ],
        "mask": {
          "paths": [
            "M38 269 L55 269 L61 278 L63 304 L58 310 L36 310 L32 304 L32 281 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              188.6,
              248.6
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-27-difference-7",
        "label": "桌上筆筒變成橘色",
        "bounds": [
          312,
          205,
          25,
          34
        ],
        "mask": {
          "paths": [
            "M312 205 L335 205 L336 215 L334 235 L327 238 L314 235 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.55,
          "lightnessScale": 0.88
        }
      }
    ],
    "sourceSHA256": "12732c00975ecad446d7c000545b6829e093c6c23c7772ca20f0ad762d0463a3"
  },
  {
    "id": "scene-28",
    "version": 2,
    "name": "老虎運河燈節",
    "src": "../../assets/art/illustrated-v1/scene-28.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-28-difference-1",
        "label": "橘色老虎變成白虎",
        "bounds": [
          121,
          75,
          140,
          131
        ],
        "mask": {
          "paths": [
            "M205 80 L217 75 L230 87 L241 106 L257 126 L260 145 L250 164 L246 181 L252 189 L246 201 L225 203 L218 199 L205 203 L190 203 L168 197 L148 205 L121 204 L121 191 L129 179 L144 178 L147 165 L155 145 L151 105 L159 96 L174 100 L191 88 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              10,
              45
            ]
          ],
          "minSat": 0.22,
          "maxSat": 1,
          "minLight": 0.32,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.03,
          "lightnessScale": 1.12
        }
      },
      {
        "id": "scene-28-difference-2",
        "label": "左邊大紅燈籠變成藍色",
        "bounds": [
          91,
          38,
          55,
          62
        ],
        "mask": {
          "paths": [
            "M108 38 L126 38 L139 46 L145 60 L145 74 L137 89 L126 99 L109 99 L100 91 L93 80 L91 64 L95 48 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.3,
          "maxLight": 1,
          "targetHue": 195,
          "satModel": "hsv",
          "targetSat": 0.52,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-28-difference-3",
        "label": "上方大天燈變成紫色",
        "bounds": [
          346,
          1,
          46,
          59
        ],
        "mask": {
          "paths": [
            "M349 5 L365 1 L381 3 L391 13 L386 43 L379 56 L357 59 L348 48 L346 16 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              359.1,
              360
            ],
            [
              0,
              59.1
            ]
          ],
          "minSat": 0.19,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-28-difference-4",
        "label": "右邊大紅燈籠變成綠色",
        "bounds": [
          463,
          72,
          45,
          47
        ],
        "mask": {
          "paths": [
            "M477 72 L493 74 L503 83 L507 95 L506 104 L500 113 L488 118 L476 115 L468 109 L463 99 L466 85 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.55,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-28-difference-5",
        "label": "右下蓮花燈變成粉紅色",
        "bounds": [
          419,
          276,
          56,
          38
        ],
        "mask": {
          "paths": [
            "M419 284 L426 277 L436 285 L444 276 L453 283 L464 278 L474 282 L473 297 L467 307 L454 313 L436 313 L424 308 L419 298 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 335,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "scene-28-difference-6",
        "label": "左上小天燈變成綠色",
        "bounds": [
          273,
          32,
          24,
          31
        ],
        "mask": {
          "paths": [
            "M277 33 L288 32 L296 39 L294 56 L290 62 L279 62 L274 56 L273 40 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              355.0,
              360
            ],
            [
              0,
              55.0
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "scene-28-difference-7",
        "label": "水道中央蓮花燈變成青色",
        "bounds": [
          398,
          211,
          29,
          28
        ],
        "mask": {
          "paths": [
            "M398 221 L404 213 L411 220 L418 211 L426 217 L426 228 L421 237 L406 238 L399 231 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              80
            ]
          ],
          "minSat": 0,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 175,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      }
    ],
    "sourceSHA256": "aef0931f08b6960f293faabe6964064da7869a1cfc4b1d1eec3642d45e04e4b4"
  },
  {
    "id": "scene-29",
    "version": 2,
    "name": "樹懶杯子蛋糕",
    "src": "../../assets/art/illustrated-v1/scene-29.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-29-difference-1",
        "label": "透明糖罐變成淡藍玻璃",
        "bounds": [
          367,
          244,
          54,
          65
        ],
        "mask": {
          "paths": [
            "M371 244 L410 244 L416 251 L414 262 L420 280 L420 301 L414 308 L374 308 L367 299 L367 274 L372 261 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0,
          "maxSat": 0.38,
          "minLight": 0.34,
          "maxLight": 1,
          "targetHue": 205,
          "satModel": "hsv",
          "targetSat": 0.24,
          "lightnessScale": 0.88
        }
      },
      {
        "id": "scene-29-difference-2",
        "label": "粉紅擠花袋變成淺藍色",
        "bounds": [
          192,
          156,
          49,
          72
        ],
        "mask": {
          "paths": [
            "M204 156 L215 158 L223 167 L229 184 L233 204 L240 220 L239 227 L231 226 L217 210 L204 201 L200 196 L212 191 L215 184 L209 177 L197 171 L192 170 L196 160 Z"
          ],
          "holes": [
            "M176 174 L185 170 L200 171 L211 177 L217 182 L218 189 L213 196 L203 201 L192 201 L182 199 L174 192 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              330,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.035,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 205,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-29-difference-3",
        "label": "粉紅糖粒碗變成紫色",
        "bounds": [
          302,
          282,
          53,
          38
        ],
        "mask": {
          "paths": [
            "M302 285 L326 282 L350 286 L354 296 L350 311 L338 319 L318 319 L305 309 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              351.6,
              360
            ],
            [
              0,
              51.6
            ]
          ],
          "minSat": 0.17,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-29-difference-4",
        "label": "右邊蛋糕紙杯變成紅色",
        "bounds": [
          229,
          261,
          46,
          24
        ],
        "mask": {
          "paths": [
            "M229 261 L274 261 L269 283 L236 284 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              6.3,
              66.3
            ]
          ],
          "minSat": 0.27,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "scene-29-difference-5",
        "label": "左邊蛋糕紙杯變成藍色",
        "bounds": [
          113,
          261,
          41,
          23
        ],
        "mask": {
          "paths": [
            "M113 261 L153 261 L149 280 L143 283 L123 283 L117 279 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              7.1,
              67.1
            ]
          ],
          "minSat": 0.26,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      },
      {
        "id": "scene-29-difference-6",
        "label": "中間蛋糕紙杯變成綠色",
        "bounds": [
          171,
          261,
          40,
          22
        ],
        "mask": {
          "paths": [
            "M171 261 L210 261 L205 282 L176 282 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              5.6,
              65.6
            ]
          ],
          "minSat": 0.28,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "scene-29-difference-7",
        "label": "掛著的綠色杯子變成橘色",
        "bounds": [
          342,
          94,
          29,
          30
        ],
        "mask": {
          "paths": [
            "M352 94 L363 94 L369 99 L370 113 L366 122 L355 123 L348 120 L343 116 L342 106 L346 99 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              90,
              195
            ]
          ],
          "minSat": 0.02,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      }
    ],
    "sourceSHA256": "3771d9793b8e2621bbef199a01a959c4ab9d04e7c06ce5f2a0116a750ff83dd4"
  },
  {
    "id": "scene-30",
    "version": 2,
    "name": "水獺珊瑚潛水艇",
    "src": "../../assets/art/illustrated-v1/scene-30.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-30-difference-1",
        "label": "海龜龜殼變成紅褐色",
        "bounds": [
          287,
          40,
          70,
          38
        ],
        "mask": {
          "paths": [
            "M287 63 L296 54 L310 44 L325 40 L339 40 L350 45 L356 54 L351 60 L341 62 L328 65 L314 69 L303 75 L292 77 L287 72 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              30,
              105
            ]
          ],
          "minSat": 0.015,
          "maxSat": 1,
          "minLight": 0.25,
          "maxLight": 1,
          "targetHue": 15,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-30-difference-2",
        "label": "紅色海星變成紫色",
        "bounds": [
          25,
          254,
          67,
          77
        ],
        "mask": {
          "paths": [
            "M48 256 L55 254 L62 276 L80 279 L91 285 L90 291 L73 299 L78 321 L76 327 L69 327 L55 312 L40 330 L33 328 L35 320 L40 301 L25 289 L25 282 L43 279 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              342.5,
              360
            ],
            [
              0,
              42.5
            ]
          ],
          "minSat": 0.23,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-30-difference-3",
        "label": "藍色魚變成粉紅色",
        "bounds": [
          263,
          153,
          45,
          40
        ],
        "mask": {
          "paths": [
            "M279 153 L292 153 L303 161 L307 170 L303 183 L291 192 L276 191 L268 185 L263 175 L266 162 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              190,
              255
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1,
          "minLight": 0.16,
          "maxLight": 1,
          "targetHue": 330,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "scene-30-difference-4",
        "label": "黃色魚變成青色",
        "bounds": [
          405,
          117,
          61,
          29
        ],
        "mask": {
          "paths": [
            "M421 117 L438 117 L449 124 L460 122 L465 117 L465 143 L454 138 L446 144 L428 145 L414 139 L405 134 L408 128 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              19.2,
              79.2
            ]
          ],
          "minSat": 0.21,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 180,
          "satModel": "hsv",
          "targetSat": 0.58
        }
      },
      {
        "id": "scene-30-difference-5",
        "label": "橘色小丑魚變成紅色",
        "bounds": [
          331,
          192,
          49,
          29
        ],
        "mask": {
          "paths": [
            "M348 193 L362 192 L373 198 L379 206 L370 215 L353 220 L340 215 L331 209 L333 200 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              7.5,
              67.5
            ]
          ],
          "minSat": 0.03,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 0,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-30-difference-6",
        "label": "黃色探照燈鏡片變成青色",
        "bounds": [
          120,
          1,
          32,
          34
        ],
        "mask": {
          "paths": [
            "M132 1 L143 1 L151 9 L151 22 L145 31 L135 34 L124 29 L120 20 L121 10 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              27.0,
              87.0
            ]
          ],
          "minSat": 0.14,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 190,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-30-difference-7",
        "label": "底部藍色圓窗變成紫色",
        "bounds": [
          105,
          307,
          26,
          29
        ],
        "mask": {
          "paths": [
            "M113 307 L123 308 L130 316 L130 328 L122 335 L112 334 L105 326 L106 315 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              185.9,
              245.9
            ]
          ],
          "minSat": 0.26,
          "maxSat": 1,
          "minLight": 0.15,
          "maxLight": 1,
          "targetHue": 280,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "519fc0ec9ddc4de9c0743e50e620ec227d6b3e4d94e6af63c9d578d5db884646"
  },
  {
    "id": "scene-31",
    "version": 2,
    "name": "海豚發現珍珠",
    "src": "../../assets/art/illustrated-v1/scene-31.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-31-difference-1",
        "label": "大貝殼由桃色變成淡紫色",
        "bounds": [
          309,
          157,
          117,
          57
        ],
        "mask": {
          "paths": [
            "M323 170 L347 156 L370 161 L391 158 L415 178 L424 205 L413 231 L389 243 L370 249 L342 234 L322 214 L302 194 Z",
            "M299 239 L318 237 L337 247 L359 252 L380 246 L405 245 L420 251 L412 266 L388 275 L339 275 L309 265 Z"
          ],
          "holes": [
            "M367 215 L380 217 L386 223 L387 235 L384 243 L377 247 L363 247 L356 242 L352 235 L354 223 L359 217 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              352,
              360
            ],
            [
              0,
              48
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-31-difference-2",
        "label": "右下貝殼由粉色變成金黃色",
        "bounds": [
          409,
          279,
          87,
          53
        ],
        "mask": {
          "paths": [
            "M448 273 L461 276 L473 285 L481 298 L489 309 L491 318 L483 323 L475 325 L462 330 L455 327 L447 331 L438 327 L430 328 L422 323 L415 323 L411 315 L411 305 L418 290 L432 280 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              300,
              360
            ],
            [
              0,
              30
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-31-difference-3",
        "label": "左下海星由粉橘色變成紫色",
        "bounds": [
          8,
          248,
          83,
          59
        ],
        "mask": {
          "paths": [
            "M14 271 L37 265 L43 250 L54 264 L79 257 L81 267 L67 278 L85 289 L75 297 L57 288 L45 303 L36 303 L33 283 L14 279 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              312,
              360
            ],
            [
              0,
              48
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-31-difference-4",
        "label": "左上海星由粉色變成橘黃色",
        "bounds": [
          5,
          82,
          48,
          50
        ],
        "mask": {
          "paths": [
            "M27 86 L34 87 L36 102 L50 106 L48 113 L36 116 L29 130 L22 125 L23 114 L8 119 L7 112 L19 104 L19 95 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              312,
              360
            ],
            [
              0,
              8
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 35,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-31-difference-5",
        "label": "右側珊瑚由粉色變成橙色",
        "bounds": [
          429,
          135,
          49,
          63
        ],
        "mask": {
          "paths": [
            "M430 168 L433 155 L437 149 L444 156 L443 140 L449 137 L452 154 L458 145 L462 148 L460 164 L472 155 L476 160 L461 181 L450 193 L437 191 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              272,
              360
            ],
            [
              0,
              8
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 25,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-31-difference-6",
        "label": "左側珊瑚由橙色變成紫紅色",
        "bounds": [
          2,
          135,
          70,
          50
        ],
        "mask": {
          "paths": [
            "M3 158 L7 157 L12 168 L16 145 L22 144 L23 162 L28 138 L33 138 L33 154 L45 138 L50 140 L46 157 L60 147 L65 151 L54 168 L67 164 L70 170 L52 180 L15 184 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 320,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-31-difference-7",
        "label": "白珍珠變成金色珍珠",
        "bounds": [
          354,
          216,
          34,
          34
        ],
        "mask": {
          "paths": [
            "M369 217 L378 219 L384 225 L385 233 L382 241 L375 245 L365 245 L358 240 L354 233 L356 225 L361 219 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.0,
          "maxSat": 0.35,
          "minLight": 0.48,
          "maxLight": 0.96,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      }
    ],
    "sourceSHA256": "d998046a254133e31f65684471e0af1d0bb406390f32d3d63f8f591ee62c8e59"
  },
  {
    "id": "scene-32",
    "version": 2,
    "name": "貓頭鷹寶石攤",
    "src": "../../assets/art/illustrated-v1/scene-32.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-32-difference-1",
        "label": "披風由紫藍色變成酒紅色",
        "bounds": [
          83,
          175,
          125,
          95
        ],
        "mask": {
          "paths": [
            "M87 214 L102 181 L126 179 L145 185 L171 193 L207 193 L205 201 L175 203 L148 214 L137 257 L124 267 L107 265 L85 241 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              217,
              273
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 345,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-32-difference-2",
        "label": "桌前布由紫色變成翠綠色",
        "bounds": [
          169,
          295,
          119,
          46
        ],
        "mask": {
          "paths": [
            "M173 299 L199 299 L224 297 L250 296 L282 296 L266 312 L245 317 L222 334 L200 326 L187 316 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              252,
              308
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-32-difference-3",
        "label": "手中的寶石由藍色變成橙色",
        "bounds": [
          208,
          188,
          35,
          44
        ],
        "mask": {
          "paths": [
            "M218 194 L233 190 L240 202 L235 215 L219 229 L211 221 L209 209 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 30,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-32-difference-4",
        "label": "中央綠寶石變成藍寶石",
        "bounds": [
          280,
          208,
          31,
          38
        ],
        "mask": {
          "paths": [
            "M293 211 L305 219 L302 237 L291 243 L281 234 L283 220 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              122,
              178
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-32-difference-5",
        "label": "前方紫寶石變成黃寶石",
        "bounds": [
          322,
          244,
          34,
          39
        ],
        "mask": {
          "paths": [
            "M336 248 L342 253 L350 251 L351 261 L355 269 L345 278 L331 278 L324 269 L327 258 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              252,
              308
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 45,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-32-difference-6",
        "label": "左下燈籠的黃玻璃變成藍玻璃",
        "bounds": [
          91,
          276,
          36,
          45
        ],
        "mask": {
          "paths": [
            "M97 281 L110 278 L120 282 L122 311 L111 318 L97 313 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 185,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-32-difference-7",
        "label": "懸掛紫寶石變成綠寶石",
        "bounds": [
          379,
          67,
          26,
          37
        ],
        "mask": {
          "paths": [
            "M390 70 L401 84 L391 100 L381 84 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              252,
              308
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "f262b5bd85e9661d4b8514ac1f672927c954f3a3351229e98656746a693c9230"
  },
  {
    "id": "scene-33",
    "version": 2,
    "name": "山羊雪山小屋",
    "src": "../../assets/art/illustrated-v1/scene-33.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-33-difference-1",
        "label": "紅毛衣變成紫毛衣",
        "bounds": [
          145,
          204,
          65,
          84
        ],
        "mask": {
          "paths": [
            "M151 206 L159 205 L182 207 L194 206 L195 218 L198 225 L203 239 L218 248 L215 260 L204 264 L183 265 L175 275 L163 284 L148 287 L143 276 L144 261 L149 245 L147 230 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-33-difference-2",
        "label": "左邊藍滑雪板變成紅色",
        "bounds": [
          42,
          98,
          72,
          242
        ],
        "mask": {
          "paths": [
            "M48 103 L62 104 L78 146 L112 334 L96 338 L53 172 L43 115 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 0,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-33-difference-3",
        "label": "圍巾垂端變成綠色",
        "bounds": [
          118,
          205,
          27,
          53
        ],
        "mask": {
          "paths": [
            "M136 208 L143 209 L139 229 L140 246 L132 254 L123 249 L120 240 L126 222 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-33-difference-4",
        "label": "白杯子變成淡黃色",
        "bounds": [
          213,
          206,
          38,
          45
        ],
        "mask": {
          "paths": [
            "M218 210 L244 211 L248 221 L247 244 L238 249 L218 246 L216 231 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.0,
          "maxSat": 0.28,
          "minLight": 0.48,
          "maxLight": 0.96,
          "targetHue": 50,
          "satModel": "hsv",
          "targetSat": 0.8
        }
      },
      {
        "id": "scene-33-difference-5",
        "label": "藍背包變成橙背包",
        "bounds": [
          13,
          205,
          29,
          100
        ],
        "mask": {
          "paths": [
            "M26 205 L45 198 L60 210 L61 230 L47 240 L49 277 L42 303 L24 300 L17 277 L16 245 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              188,
              252
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.1,
          "maxLight": 0.96,
          "targetHue": 25,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-33-difference-6",
        "label": "燈籠的黃玻璃变成淡藍色",
        "bounds": [
          29,
          25,
          36,
          43
        ],
        "mask": {
          "paths": [
            "M34 29 L56 29 L61 35 L59 62 L37 66 L32 59 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-33-difference-7",
        "label": "右前椅面木色變成綠色",
        "bounds": [
          253,
          278,
          46,
          26
        ],
        "mask": {
          "paths": [
            "M264 282 L292 280 L296 291 L282 299 L258 300 L258 293 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 135,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "39086aca58fc942699f1c17c9fe58c64d0afe86ea4da9ee46e3ce5a17c4a23ca"
  },
  {
    "id": "scene-34",
    "version": 2,
    "name": "狐狸雪橇送禮",
    "src": "../../assets/art/illustrated-v1/scene-34.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-34-difference-1",
        "label": "红圍巾變成藍圍巾",
        "bounds": [
          180,
          135,
          130,
          51
        ],
        "mask": {
          "paths": [
            "M183 143 L197 136 L207 153 L233 160 L260 163 L289 157 L301 151 L304 169 L290 181 L258 184 L225 175 L199 168 L180 162 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-34-difference-2",
        "label": "藍禮物盒變成紫禮物盒",
        "bounds": [
          114,
          166,
          65,
          41
        ],
        "mask": {
          "paths": [
            "M121 166 L176 166 L177 192 L166 202 L133 199 L116 184 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-34-difference-3",
        "label": "綠禮物盒變成藍禮物盒",
        "bounds": [
          89,
          125,
          87,
          40
        ],
        "mask": {
          "paths": [
            "M95 129 L152 128 L170 134 L173 160 L156 163 L94 157 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              60,
              160
            ]
          ],
          "minSat": 0.18,
          "maxSat": 1.0,
          "minLight": 0.16,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-34-difference-4",
        "label": "雪橇側板由木色變成紅色",
        "bounds": [
          49,
          223,
          158,
          43
        ],
        "mask": {
          "paths": [
            "M52 228 L82 231 L112 242 L169 248 L196 235 L201 248 L179 264 L130 264 L79 252 L50 244 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-34-difference-5",
        "label": "右側招牌木色變成藍綠色",
        "bounds": [
          391,
          96,
          66,
          57
        ],
        "mask": {
          "paths": [
            "M399 101 L450 102 L451 145 L399 147 Z"
          ],
          "holes": [
            "M426 105 L417 113 L421 114 L413 122 L418 123 L410 132 L423 132 L424 139 L429 139 L429 133 L441 132 L434 123 L438 122 L429 114 L434 113 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 175,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-34-difference-6",
        "label": "雪人帽由藍黑色變成紫色",
        "bounds": [
          324,
          120,
          41,
          30
        ],
        "mask": {
          "paths": [
            "M334 125 L355 128 L354 139 L362 141 L361 148 L326 144 L327 140 L334 140 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              188,
              252
            ]
          ],
          "minSat": 0.14,
          "maxSat": 1.0,
          "minLight": 0.03,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.8,
          "lightnessDelta": 0.12
        }
      },
      {
        "id": "scene-34-difference-7",
        "label": "雪橇燈籠的黃玻璃變成藍色",
        "bounds": [
          284,
          230,
          44,
          58
        ],
        "mask": {
          "paths": [
            "M290 239 L306 235 L319 240 L323 275 L311 282 L289 279 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 185,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "b7a9e6a2e7563eaa70090800be10980260affa450f86d2fe03b35da1a4b5f244"
  },
  {
    "id": "scene-35",
    "version": 2,
    "name": "小熊星象館",
    "src": "../../assets/art/illustrated-v1/scene-35.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-35-difference-1",
        "label": "小熊藍袍變成酒紅色",
        "bounds": [
          46,
          143,
          143,
          128
        ],
        "mask": {
          "paths": [
            "M89 152 L111 149 L154 150 L176 145 L186 171 L167 186 L151 210 L130 204 L110 228 L103 269 L80 270 L62 259 L51 249 L56 224 L70 188 Z"
          ],
          "holes": [
            "M10 230 L29 226 L51 231 L60 237 L61 259 L50 264 L6 260 L5 239 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              197,
              253
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 345,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-35-difference-2",
        "label": "右上大行星由棕橙色變成紫色",
        "bounds": [
          329,
          17,
          78,
          77
        ],
        "mask": {
          "paths": [
            "M357 21 L380 21 L398 34 L404 54 L398 76 L383 89 L359 89 L340 77 L332 58 L336 37 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-35-difference-3",
        "label": "中央黃色行星變成紅橙色",
        "bounds": [
          219,
          14,
          59,
          60
        ],
        "mask": {
          "paths": [
            "M240 19 L256 18 L270 28 L275 42 L271 58 L259 68 L241 70 L228 59 L222 43 L226 27 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 10,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-35-difference-4",
        "label": "左上紅行星變成綠色",
        "bounds": [
          69,
          35,
          45,
          45
        ],
        "mask": {
          "paths": [
            "M83 39 L101 39 L110 50 L110 64 L101 75 L84 77 L73 67 L72 50 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              342,
              360
            ],
            [
              0,
              38
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 115,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-35-difference-5",
        "label": "地球模型海洋由藍色變成紫色",
        "bounds": [
          279,
          60,
          49,
          54
        ],
        "mask": {
          "paths": [
            "M294 64 L312 67 L324 84 L321 100 L305 110 L288 107 L278 94 L279 79 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-35-difference-6",
        "label": "左側黃燈籠變成淡藍色",
        "bounds": [
          23,
          94,
          32,
          39
        ],
        "mask": {
          "paths": [
            "M29 99 L49 98 L51 124 L31 130 L27 123 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-35-difference-7",
        "label": "左側桌上藍木箱變成綠色",
        "bounds": [
          5,
          229,
          40,
          34
        ],
        "mask": {
          "paths": [
            "M12 232 L31 228 L49 233 L58 239 L59 257 L48 262 L8 258 L7 241 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              185,
              255
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.08,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      }
    ],
    "sourceSHA256": "66701ce71b12b2aa4f80fadf06c166f607b298b8f9321ba21fa167df24121921"
  },
  {
    "id": "scene-36",
    "version": 2,
    "name": "兔兔芭蕾教室",
    "src": "../../assets/art/illustrated-v1/scene-36.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-36-difference-1",
        "label": "粉紅芭蕾舞裙變成淡藍色",
        "bounds": [
          172,
          147,
          145,
          85
        ],
        "mask": {
          "paths": [
            "M175 149 L196 145 L216 154 L235 162 L252 169 L278 170 L300 181 L314 193 L315 205 L304 218 L286 224 L259 230 L239 225 L217 214 L197 200 L180 184 L172 169 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-36-difference-2",
        "label": "粉紅舞蹈袋變成紫色",
        "bounds": [
          12,
          209,
          132,
          88
        ],
        "mask": {
          "paths": [
            "M37 231 L52 220 L81 216 L95 225 L118 232 L135 253 L139 277 L128 289 L92 294 L42 291 L17 279 L14 250 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-36-difference-3",
        "label": "左側粉紅窗簾變成淡綠色",
        "bounds": [
          48,
          0,
          63,
          157
        ],
        "mask": {
          "paths": [
            "M59 0 L107 0 L97 39 L89 67 L75 98 L84 114 L82 151 L65 151 L55 117 L56 99 L51 74 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              312,
              360
            ],
            [
              0,
              8
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-36-difference-4",
        "label": "右側粉紅毛巾變成淡紫色",
        "bounds": [
          444,
          210,
          52,
          62
        ],
        "mask": {
          "paths": [
            "M450 217 L465 213 L491 214 L478 235 L483 264 L467 269 L448 260 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-36-difference-5",
        "label": "芭蕾畫的木框變成藍色",
        "bounds": [
          383,
          31,
          63,
          85
        ],
        "mask": {
          "paths": [
            "M385 33 L442 31 L445 108 L385 114 Z"
          ],
          "holes": [
            "M394 41 L434 39 L436 101 L394 106 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              3,
              47
            ]
          ],
          "minSat": 0.1,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-36-difference-6",
        "label": "前景舞鞋由粉紅變成淡藍色",
        "bounds": [
          416,
          274,
          43,
          53
        ],
        "mask": {
          "paths": [
            "M435 280 L445 277 L453 285 L455 306 L449 320 L428 322 L420 315 L424 297 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-36-difference-7",
        "label": "右側綠花瓶變成橙色",
        "bounds": [
          476,
          178,
          33,
          32
        ],
        "mask": {
          "paths": [
            "M480 181 L504 180 L504 201 L496 208 L483 205 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              55,
              160
            ]
          ],
          "minSat": 0.07,
          "maxSat": 1.0,
          "minLight": 0.3,
          "maxLight": 0.96,
          "targetHue": 20,
          "satModel": "hsv",
          "targetSat": 0.6
        }
      }
    ],
    "sourceSHA256": "afeaf4684233f5df8a6b5dab9bc181d76e4830719303a4d644de3e5792d91f33"
  },
  {
    "id": "scene-37",
    "version": 2,
    "name": "小熊樹屋木工",
    "src": "../../assets/art/illustrated-v1/scene-37.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-37-difference-1",
        "label": "藍色工作服變成綠色",
        "bounds": [
          96,
          145,
          103,
          119
        ],
        "mask": {
          "paths": [
            "M124 149 L141 149 L150 158 L138 164 L126 182 L129 201 L158 204 L171 196 L193 195 L192 216 L180 224 L177 258 L123 260 L104 249 L97 223 L99 200 L112 166 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              187,
              243
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 140,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-37-difference-2",
        "label": "鳥屋屋頂由木色變成紅色",
        "bounds": [
          201,
          184,
          95,
          43
        ],
        "mask": {
          "paths": [
            "M218 191 L243 186 L270 191 L291 210 L279 218 L243 205 L214 223 L204 218 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              2,
              58
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-37-difference-3",
        "label": "木鳥玩具變成淡藍色",
        "bounds": [
          224,
          252,
          64,
          58
        ],
        "mask": {
          "paths": [
            "M231 260 L242 255 L250 263 L250 271 L266 276 L282 286 L275 297 L263 302 L239 300 L230 290 L229 279 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              2,
              58
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-37-difference-4",
        "label": "木兔玩具變成淡粉紅色",
        "bounds": [
          328,
          257,
          50,
          83
        ],
        "mask": {
          "paths": [
            "M333 260 L340 263 L346 283 L353 279 L359 263 L367 264 L369 278 L365 291 L373 304 L373 318 L367 337 L344 338 L333 329 L333 311 L339 295 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              2,
              58
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 340,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-37-difference-5",
        "label": "工具箱正面由木色變成綠色",
        "bounds": [
          105,
          272,
          114,
          58
        ],
        "mask": {
          "paths": [
            "M108 282 L146 291 L210 277 L215 316 L153 328 L109 316 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              2,
              58
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 135,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-37-difference-6",
        "label": "吊燈的黃玻璃變成藍色",
        "bounds": [
          251,
          49,
          30,
          43
        ],
        "mask": {
          "paths": [
            "M257 55 L274 55 L277 83 L256 86 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 185,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-37-difference-7",
        "label": "藍三角旗變成紅色",
        "bounds": [
          92,
          61,
          26,
          30
        ],
        "mask": {
          "paths": [
            "M94 63 L116 67 L105 90 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              200,
              280
            ]
          ],
          "minSat": 0.05,
          "maxSat": 1.0,
          "minLight": 0.2,
          "maxLight": 0.96,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      }
    ],
    "sourceSHA256": "f92cb4ea8f71959dbfc2ff40b35ed25732a702cfc45e5a72fc951775c5e7ac16"
  },
  {
    "id": "scene-38",
    "version": 2,
    "name": "小鴨水上圖書館",
    "src": "../../assets/art/illustrated-v1/scene-38.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-38-difference-1",
        "label": "中央橫放綠書變成紫色",
        "bounds": [
          231,
          226,
          102,
          20
        ],
        "mask": {
          "paths": [
            "M237 224 L322 220 L331 224 L332 240 L319 243 L237 242 L235 233 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              105,
              165
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-38-difference-2",
        "label": "遮棚藍綠條紋變成紅色",
        "bounds": [
          153,
          0,
          220,
          88
        ],
        "mask": {
          "paths": [
            "M132 0 L182 0 L225 14 L271 29 L312 44 L350 61 L367 75 L374 89 L362 88 L353 81 L343 85 L333 78 L319 82 L305 70 L290 74 L275 60 L258 60 L249 50 L235 54 L219 42 L206 44 L191 32 L176 32 L163 22 L145 24 L131 17 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              147,
              203
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-38-difference-3",
        "label": "手中紅書變成藍書",
        "bounds": [
          257,
          159,
          82,
          66
        ],
        "mask": {
          "paths": [
            "M273 165 L304 167 L330 164 L324 185 L315 220 L291 220 L261 212 L266 185 Z"
          ],
          "holes": [
            "M277 188 L280 191 L281 185 L285 185 L287 190 L287 192 L290 192 L293 196 L290 200 L286 199 L287 204 L284 208 L280 205 L280 200 L276 205 L271 203 L271 199 L276 196 L272 192 L273 188 Z",
            "M276 207 L279 210 L281 215 L278 216 L278 220 L274 217 L271 219 L270 216 L272 212 L273 209 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-38-difference-4",
        "label": "左側燈籠黃玻璃變成淡藍色",
        "bounds": [
          85,
          91,
          35,
          47
        ],
        "mask": {
          "paths": [
            "M92 98 L110 99 L114 127 L90 128 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-38-difference-5",
        "label": "右側直立綠書變成橙紅色",
        "bounds": [
          355,
          150,
          41,
          77
        ],
        "mask": {
          "paths": [
            "M363 154 L387 154 L390 163 L381 223 L359 221 L366 176 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              112,
              203
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 15,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-38-difference-6",
        "label": "左側花盆由棕色變成藍色",
        "bounds": [
          84,
          238,
          41,
          33
        ],
        "mask": {
          "paths": [
            "M90 242 L120 242 L118 268 L94 268 L87 249 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-38-difference-7",
        "label": "船前黃燈籠玻璃變成綠色",
        "bounds": [
          126,
          280,
          46,
          57
        ],
        "mask": {
          "paths": [
            "M135 292 L153 289 L166 298 L164 327 L149 331 L133 325 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "c212e8a1e7979613df05f3eeba045a3d5a34f216782a128f456db9df2b10bf40"
  },
  {
    "id": "scene-39",
    "version": 2,
    "name": "兔兔向日葵花車",
    "src": "../../assets/art/illustrated-v1/scene-39.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-39-difference-1",
        "label": "粉紅裙子變成淡藍色",
        "bounds": [
          191,
          214,
          113,
          72
        ],
        "mask": {
          "paths": [
            "M217 217 L211 236 L230 258 L259 267 L290 257 L300 273 L284 281 L232 283 L207 273 L195 261 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-39-difference-2",
        "label": "藍澆水壺變成紅澆水壺",
        "bounds": [
          364,
          262,
          116,
          79
        ],
        "mask": {
          "paths": [
            "M366 273 L376 270 L390 288 L391 284 L396 276 L430 267 L450 272 L458 285 L472 299 L474 308 L460 319 L450 336 L400 337 L391 323 L389 302 L376 290 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              177,
              233
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-39-difference-3",
        "label": "草帽由淺棕色變成淡粉红色",
        "bounds": [
          175,
          90,
          111,
          103
        ],
        "mask": {
          "paths": [
            "M235 96 L258 93 L275 98 L281 111 L270 135 L246 163 L217 179 L195 187 L180 180 L189 160 L209 132 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              12,
              68
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 340,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-39-difference-4",
        "label": "右側遮棚粉紅條紋變成淡藍色",
        "bounds": [
          403,
          91,
          109,
          68
        ],
        "mask": {
          "paths": [
            "M409 118 L421 110 L435 103 L456 98 L483 94 L512 94 L512 139 L502 143 L490 140 L485 135 L481 141 L467 144 L455 138 L449 143 L436 147 L423 141 L420 147 L409 149 L403 140 L404 129 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-39-difference-5",
        "label": "左上向日葵花瓣由黃色變成橙色",
        "bounds": [
          51,
          2,
          82,
          86
        ],
        "mask": {
          "paths": [
            "M86 8 L92 20 L103 8 L108 12 L106 26 L117 21 L124 27 L117 39 L130 45 L128 53 L114 57 L121 69 L114 77 L102 68 L98 84 L88 80 L86 67 L73 79 L66 73 L70 59 L57 65 L54 56 L65 45 L57 34 L64 29 L77 34 L74 18 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              22,
              78
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 25,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-39-difference-6",
        "label": "右上燈籠黃玻璃變成淡藍色",
        "bounds": [
          369,
          78,
          31,
          39
        ],
        "mask": {
          "paths": [
            "M376 87 L391 86 L393 106 L377 109 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-39-difference-7",
        "label": "花車右側花盆由棕色變成藍色",
        "bounds": [
          470,
          212,
          35,
          30
        ],
        "mask": {
          "paths": [
            "M474 216 L500 215 L499 236 L477 239 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "9d7e53196333e0a213d8016f6c2ad6652ccda2192142e51ee1ae180ffb99d6a1"
  },
  {
    "id": "scene-40",
    "version": 2,
    "name": "柯基熱氣球氣象站",
    "src": "../../assets/art/illustrated-v1/scene-40.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-40-difference-1",
        "label": "熱氣球藍布變成綠布",
        "bounds": [
          9,
          4,
          161,
          151
        ],
        "mask": {
          "paths": [
            "M61 9 L90 7 L123 14 L146 32 L162 59 L164 79 L151 108 L119 141 L108 149 L64 149 L37 122 L16 88 L12 65 L18 39 L34 23 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              177,
              233
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 140,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-40-difference-2",
        "label": "藍背包變成紫背包",
        "bounds": [
          142,
          178,
          59,
          68
        ],
        "mask": {
          "paths": [
            "M164 183 L184 181 L193 190 L188 209 L186 234 L170 243 L152 239 L145 232 L146 215 L153 196 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              187,
              243
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-40-difference-3",
        "label": "紅旗變成藍旗",
        "bounds": [
          363,
          54,
          58,
          37
        ],
        "mask": {
          "paths": [
            "M367 60 L381 57 L395 63 L413 66 L403 79 L384 86 L368 83 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-40-difference-4",
        "label": "筆記本米白紙頁變成淡藍色",
        "bounds": [
          264,
          156,
          67,
          57
        ],
        "mask": {
          "paths": [
            "M280 162 L323 160 L327 165 L307 205 L272 208 L270 197 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.0,
          "maxSat": 0.28,
          "minLight": 0.48,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-40-difference-5",
        "label": "溫度計木框變成藍色",
        "bounds": [
          342,
          139,
          45,
          73
        ],
        "mask": {
          "paths": [
            "M347 145 L354 142 L354 203 L349 207 L343 202 Z",
            "M375 142 L382 143 L384 201 L378 206 L375 199 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-40-difference-6",
        "label": "右下木箱變成紅木箱",
        "bounds": [
          382,
          214,
          84,
          68
        ],
        "mask": {
          "paths": [
            "M388 220 L430 215 L459 224 L462 275 L421 279 L384 260 Z"
          ],
          "holes": [
            "M382 242 L390 241 L397 250 L413 250 L417 255 L432 253 L434 261 L442 269 L438 284 L383 285 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-40-difference-7",
        "label": "風向袋紅條紋變成紫色",
        "bounds": [
          443,
          134,
          64,
          33
        ],
        "mask": {
          "paths": [
            "M450 138 L463 140 L460 160 L447 158 Z",
            "M478 144 L488 147 L483 162 L474 162 Z",
            "M498 149 L504 151 L501 161 L493 163 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "7719c0bac2515e055e534a8a304e0f74987d448559c8133e2cfcf5d0a9d53f17"
  },
  {
    "id": "scene-41",
    "version": 2,
    "name": "松鼠溪邊洗莓果",
    "src": "../../assets/art/illustrated-v1/scene-41.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-41-difference-1",
        "label": "藍花衣服變成淡綠色",
        "bounds": [
          157,
          151,
          85,
          88
        ],
        "mask": {
          "paths": [
            "M174 154 L187 150 L203 156 L218 163 L239 164 L245 176 L246 192 L238 215 L234 226 L241 232 L233 240 L211 235 L194 223 L172 224 L160 217 L159 182 Z"
          ],
          "holes": [
            "M184 160 L205 172 L216 192 L239 208 L241 219 L230 223 L214 212 L195 209 L188 195 Z",
            "M242 193 L269 196 L280 207 L279 216 L273 213 L272 202 L257 200 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              177,
              233
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-41-difference-2",
        "label": "莓果籃正面由棕色變成紅色",
        "bounds": [
          45,
          212,
          110,
          27
        ],
        "mask": {
          "paths": [
            "M49 211 L74 215 L105 217 L136 214 L171 207 L169 226 L156 235 L74 235 L52 226 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              2,
              58
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-41-difference-3",
        "label": "手中的紅草莓變成淡綠色未熟草莓",
        "bounds": [
          243,
          202,
          36,
          34
        ],
        "mask": {
          "paths": [
            "M251 207 L264 205 L274 211 L272 224 L261 233 L252 227 L246 214 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 105,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-41-difference-4",
        "label": "前方中央紅草莓變成淡綠色",
        "bounds": [
          139,
          240,
          31,
          33
        ],
        "mask": {
          "paths": [
            "M147 245 L160 244 L165 252 L161 268 L150 270 L142 262 L141 253 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 105,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-41-difference-5",
        "label": "籃中藍莓由藍色變成深紫色",
        "bounds": [
          82,
          185,
          34,
          20
        ],
        "mask": {
          "paths": [
            "M85 190 L93 187 L99 191 L98 202 L86 203 L83 198 Z",
            "M98 190 L106 187 L113 191 L114 201 L101 203 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              202,
              258
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 285,
          "satModel": "hsv",
          "targetSat": 0.8
        }
      },
      {
        "id": "scene-41-difference-6",
        "label": "左前紅草莓變成淡綠色",
        "bounds": [
          104,
          243,
          33,
          28
        ],
        "mask": {
          "paths": [
            "M113 249 L123 247 L131 253 L129 264 L120 269 L108 260 L107 252 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 105,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-41-difference-7",
        "label": "右前藍莓群由藍色變成紫色",
        "bounds": [
          180,
          243,
          29,
          40
        ],
        "mask": {
          "paths": [
            "M177 241 L184 244 L187 251 L183 258 L176 258 L172 251 Z",
            "M185 253 L193 256 L197 265 L192 272 L182 270 L180 262 Z",
            "M199 263 L206 266 L207 274 L202 279 L195 277 L193 269 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              185,
              265
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.08,
          "maxLight": 0.96,
          "targetHue": 285,
          "satModel": "hsv",
          "targetSat": 0.8
        }
      }
    ],
    "sourceSHA256": "9a87b799288927497e5a08aa4ed2f31ca1303626d28bb77c77aa9964d44a0b3b"
  },
  {
    "id": "scene-42",
    "version": 2,
    "name": "小鼠火車旅行",
    "src": "../../assets/art/illustrated-v1/scene-42.webp",
    "width": 512,
    "height": 341,
    "details": [
      {
        "id": "scene-42-difference-1",
        "label": "左邊紅窗簾變成藍色",
        "bounds": [
          0,
          0,
          63,
          184
        ],
        "mask": {
          "paths": [
            "M0 0 L58 0 L43 42 L21 93 L17 110 L34 124 L32 169 L5 179 L0 167 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-42-difference-2",
        "label": "大鼠的藍外套變成綠色",
        "bounds": [
          291,
          189,
          80,
          88
        ],
        "mask": {
          "paths": [
            "M320 193 L337 189 L364 188 L379 194 L397 216 L393 257 L377 274 L332 274 L312 271 L296 262 L289 247 L295 229 L299 215 L313 207 Z"
          ],
          "holes": [
            "M225 254 L245 248 L266 252 L280 248 L296 252 L307 256 L318 262 L318 273 L226 277 Z",
            "M367 203 L377 196 L400 195 L423 217 L417 253 L399 271 L377 266 L366 248 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              187,
              243
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 140,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-42-difference-3",
        "label": "女童粉紅裙子變成淡藍色",
        "bounds": [
          343,
          278,
          113,
          49
        ],
        "mask": {
          "paths": [
            "M354 284 L371 297 L394 296 L405 285 L434 283 L445 293 L450 313 L434 323 L405 316 L388 321 L352 310 L347 298 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-42-difference-4",
        "label": "男童黃色衣服變成橙色",
        "bounds": [
          230,
          221,
          59,
          50
        ],
        "mask": {
          "paths": [
            "M245 227 L261 236 L281 225 L284 236 L286 262 L277 267 L263 258 L247 254 L239 241 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              17,
              73
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 25,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-42-difference-5",
        "label": "桌上紅書變成藍書",
        "bounds": [
          160,
          279,
          100,
          45
        ],
        "mask": {
          "paths": [
            "M170 294 L205 284 L246 293 L254 305 L213 319 L167 307 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-42-difference-6",
        "label": "上方棕行李箱變成紅色",
        "bounds": [
          390,
          8,
          96,
          44
        ],
        "mask": {
          "paths": [
            "M402 16 L465 11 L478 18 L482 39 L399 47 L393 34 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              6,
              30
            ]
          ],
          "minSat": 0.1,
          "maxSat": 1.0,
          "minLight": 0.12,
          "maxLight": 0.96,
          "targetHue": 5,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-42-difference-7",
        "label": "綠花瓶變成蓝色",
        "bounds": [
          130,
          273,
          28,
          38
        ],
        "mask": {
          "paths": [
            "M135 279 L154 279 L155 298 L150 306 L140 309 L133 302 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              85,
              155
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      }
    ],
    "sourceSHA256": "2cd95dcf9bc0e73fbe8a62b546ec60a5fcbd811dc2f19e1ceb0ab84160e65628"
  },
  {
    "id": "scene-43",
    "version": 2,
    "name": "刺蝟海灘沙堡",
    "src": "../../assets/art/illustrated-v1/scene-43.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-43-difference-1",
        "label": "藍花上衣變成綠色",
        "bounds": [
          178,
          139,
          52,
          86
        ],
        "mask": {
          "paths": [
            "M206 141 L224 142 L223 151 L204 161 L202 172 L226 178 L224 199 L211 211 L191 217 L181 211 L189 184 L195 158 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              177,
              233
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 145,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-43-difference-2",
        "label": "紅桶變成藍桶",
        "bounds": [
          58,
          186,
          89,
          69
        ],
        "mask": {
          "paths": [
            "M64 194 L79 189 L121 189 L141 196 L142 205 L132 250 L90 252 L75 239 L66 210 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-43-difference-3",
        "label": "右下橙海星變成紫色",
        "bounds": [
          369,
          224,
          75,
          63
        ],
        "mask": {
          "paths": [
            "M400 229 L409 229 L416 244 L437 246 L440 255 L424 267 L430 280 L421 282 L407 271 L388 281 L378 280 L384 263 L372 252 L376 246 L394 246 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              342,
              360
            ],
            [
              0,
              38
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-43-difference-4",
        "label": "前景紫貝殼變成金黃色",
        "bounds": [
          94,
          261,
          66,
          52
        ],
        "mask": {
          "paths": [
            "M104 281 L118 268 L130 265 L143 272 L153 289 L157 303 L145 310 L120 306 L97 300 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              265,
              360
            ],
            [
              0,
              5
            ]
          ],
          "minSat": 0.04,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 45,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-43-difference-5",
        "label": "沙堡紅旗變成藍旗",
        "bounds": [
          326,
          18,
          39,
          27
        ],
        "mask": {
          "paths": [
            "M330 20 L346 21 L361 26 L349 34 L333 37 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              332,
              360
            ],
            [
              0,
              28
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-43-difference-6",
        "label": "白海鷗羽毛變成暖棕色",
        "bounds": [
          8,
          130,
          79,
          56
        ],
        "mask": {
          "paths": [
            "M10 161 L31 151 L42 149 L50 135 L63 133 L76 143 L83 143 L76 149 L74 165 L65 175 L63 183 L57 183 L56 173 L49 179 L48 185 L43 184 L43 173 L30 172 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.0,
          "maxSat": 0.28,
          "minLight": 0.48,
          "maxLight": 0.96,
          "targetHue": 25,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-43-difference-7",
        "label": "右下小粉紅貝殼變成淡藍色",
        "bounds": [
          444,
          278,
          40,
          31
        ],
        "mask": {
          "paths": [
            "M450 291 L463 282 L472 289 L479 301 L468 306 L447 302 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              312,
              360
            ],
            [
              0,
              8
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "b3db9c72579a1c16b3f2bf0f39764bcc479f1d61e50ae55774df2208555b2ccf"
  },
  {
    "id": "scene-44",
    "version": 2,
    "name": "狐狸夕陽冰淇淋車",
    "src": "../../assets/art/illustrated-v1/scene-44.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-44-difference-1",
        "label": "冰淇淋車的粉紅正面變成綠色",
        "bounds": [
          275,
          198,
          94,
          91
        ],
        "mask": {
          "paths": [
            "M270 198 L384 200 L383 251 L374 259 L369 291 L307 290 L271 281 L269 242 Z"
          ],
          "holes": [
            "M273 212 L294 208 L356 211 L372 217 L376 238 L370 270 L352 282 L296 282 L273 270 Z",
            "M268 198 L279 198 L274 218 L269 242 L265 243 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 130,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-44-difference-2",
        "label": "狐狸藍領結變成紅色",
        "bounds": [
          286,
          126,
          36,
          26
        ],
        "mask": {
          "paths": [
            "M291 130 L299 132 L305 134 L312 131 L317 132 L318 144 L313 149 L305 144 L299 147 L291 144 L289 138 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              180,
              240
            ]
          ],
          "minSat": 0.12,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 0,
          "satModel": "hsv",
          "targetSat": 0.7
        }
      },
      {
        "id": "scene-44-difference-3",
        "label": "遮棚粉紅條紋變成淡藍色",
        "bounds": [
          193,
          0,
          284,
          56
        ],
        "mask": {
          "paths": [
            "M240 0 L414 0 L447 18 L472 36 L475 49 L467 54 L452 43 L441 37 L433 36 L422 37 L410 31 L399 34 L383 26 L370 27 L362 19 L347 21 L332 17 L325 12 L312 20 L296 18 L292 24 L280 27 L271 20 L257 24 L247 16 L235 28 L231 39 L219 38 L211 48 L202 57 L194 54 L192 46 L196 32 L215 15 Z"
          ],
          "holes": [
            "M406 19 L425 19 L440 26 L445 37 L449 44 L448 63 L440 71 L434 96 L423 112 L410 94 L400 78 L394 65 L392 47 L398 30 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              305,
              360
            ],
            [
              0,
              25
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 200,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-44-difference-4",
        "label": "小客人的藍背包變成紫色",
        "bounds": [
          147,
          252,
          65,
          38
        ],
        "mask": {
          "paths": [
            "M155 256 L171 254 L180 261 L196 260 L208 268 L203 283 L187 286 L172 278 L151 275 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 275,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-44-difference-5",
        "label": "手中紫冰淇淋變成黃色",
        "bounds": [
          362,
          98,
          38,
          31
        ],
        "mask": {
          "paths": [
            "M369 105 L380 101 L391 108 L394 119 L390 126 L367 126 L365 118 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              265,
              355
            ]
          ],
          "minSat": 0.05,
          "maxSat": 1.0,
          "minLight": 0.25,
          "maxLight": 0.96,
          "targetHue": 50,
          "satModel": "hsv",
          "targetSat": 0.65
        }
      },
      {
        "id": "scene-44-difference-6",
        "label": "左側黑板木框變成藍色",
        "bounds": [
          49,
          183,
          91,
          121
        ],
        "mask": {
          "paths": [
            "M62 191 L76 189 L67 296 L54 298 L49 293 Z",
            "M115 190 L123 193 L139 290 L129 296 Z",
            "M68 189 L115 186 L119 194 L66 201 Z",
            "M64 284 L129 284 L132 295 L62 296 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-44-difference-7",
        "label": "右下花盆由棕色變成藍色",
        "bounds": [
          389,
          302,
          77,
          40
        ],
        "mask": {
          "paths": [
            "M392 310 L416 315 L459 307 L461 338 L402 341 L394 333 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 215,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "9b0792486d7abf7e70f600d56e713e255839e2c1f96baca68c94a8d8c90056c1"
  },
  {
    "id": "scene-45",
    "version": 2,
    "name": "貓咪太空駕駛艙",
    "src": "../../assets/art/illustrated-v1/scene-45.webp",
    "width": 512,
    "height": 342,
    "details": [
      {
        "id": "scene-45-difference-1",
        "label": "貓咪白太空衣變成淡綠色",
        "bounds": [
          148,
          202,
          97,
          102
        ],
        "mask": {
          "paths": [
            "M175 211 L196 215 L210 211 L219 216 L226 219 L239 226 L240 247 L224 252 L209 259 L206 287 L195 299 L178 290 L172 276 L155 263 L151 245 L157 221 Z"
          ],
          "holes": [
            "M162 213 L176 217 L183 223 L180 234 L168 238 L158 230 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              0,
              360
            ]
          ],
          "minSat": 0.0,
          "maxSat": 0.28,
          "minLight": 0.48,
          "maxLight": 0.96,
          "targetHue": 130,
          "satModel": "hsv",
          "targetSat": 0.45
        }
      },
      {
        "id": "scene-45-difference-2",
        "label": "黄色座椅靠背變成紅棕色",
        "bounds": [
          71,
          171,
          57,
          84
        ],
        "mask": {
          "paths": [
            "M90 179 L117 175 L124 190 L119 215 L116 250 L96 253 L78 234 L74 204 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              12,
              68
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 10,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-45-difference-3",
        "label": "機器人藍胸甲變成粉紅色",
        "bounds": [
          291,
          256,
          78,
          66
        ],
        "mask": {
          "paths": [
            "M308 260 L333 263 L353 265 L365 277 L358 299 L342 312 L318 309 L299 294 L294 276 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              182,
              238
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 350,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-45-difference-4",
        "label": "左側黃色星形控制燈變成紫色",
        "bounds": [
          25,
          74,
          46,
          52
        ],
        "mask": {
          "paths": [
            "M47 77 L51 79 L55 92 L66 92 L70 96 L68 101 L60 107 L64 117 L62 122 L58 122 L48 114 L39 121 L35 124 L32 121 L33 117 L36 106 L29 101 L26 97 L29 92 L40 91 L42 80 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              35,
              65
            ]
          ],
          "minSat": 0.2,
          "maxSat": 1.0,
          "minLight": 0.55,
          "maxLight": 0.96,
          "targetHue": 280,
          "satModel": "hsv",
          "targetSat": 0.7
        }
      },
      {
        "id": "scene-45-difference-5",
        "label": "左下控制板由藍色變成紅色",
        "bounds": [
          0,
          255,
          70,
          87
        ],
        "mask": {
          "paths": [
            "M0 263 L43 253 L58 267 L71 329 L65 340 L0 340 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              192,
              248
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 0,
          "satModel": "hsv"
        }
      },
      {
        "id": "scene-45-difference-6",
        "label": "右側按鈕板由藍色變成綠色",
        "bounds": [
          392,
          189,
          62,
          73
        ],
        "mask": {
          "paths": [
            "M402 195 L449 203 L432 257 L397 248 L394 219 Z"
          ],
          "holes": [
            "M422 204 L440 204 L444 218 L435 227 L421 221 Z",
            "M395 246 L419 246 L420 258 L395 258 Z"
          ]
        },
        "material": {
          "sourceHue": [
            [
              217,
              253
            ]
          ],
          "minSat": 0.08,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 160,
          "satModel": "hsv",
          "targetSat": 0.55
        }
      },
      {
        "id": "scene-45-difference-7",
        "label": "機器人橙耳罩變成綠色",
        "bounds": [
          364,
          216,
          28,
          40
        ],
        "mask": {
          "paths": [
            "M375 220 L386 224 L389 236 L383 248 L372 251 L366 244 L367 231 Z"
          ],
          "holes": []
        },
        "material": {
          "sourceHue": [
            [
              357,
              360
            ],
            [
              0,
              53
            ]
          ],
          "minSat": 0.16,
          "maxSat": 1.0,
          "minLight": 0.18,
          "maxLight": 0.96,
          "targetHue": 120,
          "satModel": "hsv"
        }
      }
    ],
    "sourceSHA256": "a791a1beb18e7d36db8d49cb4499ab93dd1f57d44e0364972efc6e0757e227f9"
  }
]);
