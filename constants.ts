import { PlanType, CopartType, Segmentation, Accommodation, ContractType, Region, Operator } from './types';

export const AGE_RANGES = [
  "00 a 18 anos",
  "19 a 23 anos",
  "24 a 28 anos",
  "29 a 33 anos",
  "34 a 38 anos",
  "39 a 43 anos",
  "44 a 48 anos",
  "49 a 53 anos",
  "54 a 58 anos",
  "59 anos ou mais"
];

export const ADESAO_FEE = 15.00;
export const ODONTO_PRICE_PME = 22.36; // Premium
export const ODONTO_PRICE_INDIVIDUAL_PROMO = 24.50; // Promo value when tied to health
export const ODONTO_PRICE_INDIVIDUAL_NORMAL = 75.84; // Not used in sim currently, assuming promo

// ================= HAPVIDA =================
const CURITIBA_PME = {
  [CopartType.PARCIAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB]: {
        [Accommodation.SEM_ACOM]: [126.48, 141.66, 158.66, 182.46, 209.83, 249.70, 312.13, 390.16, 663.27, 742.86]
      },
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: [140.38, 157.23, 176.10, 202.52, 232.90, 277.15, 346.44, 433.05, 736.19, 824.53],
        [Accommodation.APARTAMENTO]: [209.85, 235.03, 263.23, 302.71, 348.12, 414.26, 517.83, 647.29, 1100.39, 1232.44]
      }
    },
    [PlanType.PLENO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [175.10, 196.11, 219.64, 252.59, 290.48, 345.67, 432.09, 540.11, 918.19, 1028.37],
        [Accommodation.APARTAMENTO]: [261.94, 293.37, 328.57, 377.86, 434.54, 517.10, 646.38, 807.98, 1373.57, 1538.40]
      }
    }
  },
  [CopartType.TOTAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB]: {
        [Accommodation.SEM_ACOM]: [82.74, 92.67, 103.79, 119.36, 137.26, 163.34, 204.18, 255.23, 433.89, 485.96]
      },
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: [91.79, 102.80, 115.14, 132.41, 152.27, 181.20, 226.50, 283.13, 481.32, 539.08],
        [Accommodation.APARTAMENTO]: [136.96, 153.40, 171.81, 197.58, 227.22, 270.39, 337.99, 422.49, 718.23, 804.42]
      }
    },
    [PlanType.PLENO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [114.36, 128.08, 143.45, 164.97, 189.72, 225.77, 282.21, 352.76, 599.69, 671.65],
        [Accommodation.APARTAMENTO]: [170.82, 191.32, 214.28, 246.42, 283.38, 337.22, 421.53, 526.91, 895.75, 1003.24]
      }
    }
  }
};

const CURITIBA_INDIVIDUAL = {
  [CopartType.PARCIAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [201.21, 265.60, 305.44, 342.09, 359.19, 405.88, 495.17, 683.33, 922.50, 1199.25],
          withoutOdonto: [226.71, 299.26, 344.15, 385.45, 404.72, 457.33, 557.94, 769.96, 1039.45, 1351.29]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [301.83, 398.42, 458.18, 513.16, 538.82, 608.87, 742.82, 1025.09, 1383.87, 1799.03],
          withoutOdonto: [327.33, 432.08, 496.89, 556.52, 584.35, 660.32, 805.59, 1111.71, 1500.81, 1951.05]
        }
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [261.55, 345.25, 397.04, 444.68, 466.91, 527.61, 643.68, 888.28, 1199.18, 1558.93],
          withoutOdonto: [287.05, 378.91, 435.75, 488.04, 512.44, 579.06, 706.45, 974.90, 1316.12, 1710.96]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [392.31, 517.85, 595.53, 666.99, 700.34, 791.38, 965.48, 1332.36, 1798.69, 2338.30],
          withoutOdonto: [417.81, 551.51, 634.24, 710.35, 745.87, 842.83, 1028.25, 1418.99, 1915.64, 2490.33]
        }
      }
    },
    [PlanType.PLENO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [367.75, 485.43, 558.24, 625.23, 656.49, 741.83, 905.03, 1248.94, 1686.07, 2191.89],
          withoutOdonto: [393.25, 519.09, 596.95, 668.58, 702.01, 793.27, 967.79, 1335.55, 1802.99, 2343.89]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [551.63, 728.15, 837.37, 937.85, 984.74, 1112.76, 1357.57, 1873.45, 2529.16, 3287.91],
          withoutOdonto: [577.13, 761.81, 876.08, 981.21, 1030.27, 1164.21, 1420.34, 1960.07, 2646.09, 3439.92]
        }
      }
    }
  },
  [CopartType.TOTAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [160.97, 212.48, 244.34, 273.67, 287.36, 324.72, 396.15, 546.69, 738.03, 959.45],
          withoutOdonto: [186.47, 246.14, 283.06, 317.03, 332.88, 376.15, 458.90, 633.28, 854.93, 1111.41]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [241.46, 318.73, 366.53, 410.52, 431.04, 487.07, 594.22, 820.04, 1107.06, 1439.16],
          withoutOdonto: [266.96, 352.39, 405.25, 453.88, 476.57, 538.52, 656.99, 906.65, 1223.98, 1591.17]
        }
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [209.24, 276.19, 317.60, 355.70, 373.47, 422.04, 514.88, 710.51, 959.16, 1246.90],
          withoutOdonto: [234.74, 309.86, 356.34, 399.10, 419.06, 473.54, 577.72, 797.25, 1076.29, 1399.18]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [313.84, 414.29, 476.43, 533.60, 560.28, 633.11, 772.40, 1065.92, 1438.99, 1870.68],
          withoutOdonto: [339.34, 447.93, 515.12, 576.93, 605.78, 684.53, 835.13, 1152.48, 1555.85, 2022.61]
        }
      }
    },
    [PlanType.PLENO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [294.19, 388.33, 446.59, 500.18, 525.19, 593.47, 724.03, 999.15, 1348.86, 1753.51],
          withoutOdonto: [319.69, 421.99, 485.29, 543.52, 570.70, 644.89, 786.77, 1085.74, 1465.75, 1905.48]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [441.30, 582.51, 669.90, 750.28, 787.80, 890.22, 1086.06, 1498.76, 2023.33, 2630.34],
          withoutOdonto: [466.80, 616.18, 708.61, 793.64, 833.32, 941.65, 1148.81, 1585.36, 2140.24, 2782.31]
        }
      }
    }
  }
};

const MARINGA_INDIVIDUAL = {
  [CopartType.PARCIAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [205.55, 271.32, 312.03, 349.47, 366.96, 414.66, 505.89, 698.13, 942.47, 1225.21],
          withoutOdonto: [231.05, 304.99, 350.74, 392.83, 412.47, 466.09, 568.63, 784.71, 1059.36, 1377.17]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [308.33, 407.00, 468.04, 524.21, 550.41, 621.97, 758.79, 1047.13, 1413.64, 1837.72],
          withoutOdonto: [333.83, 440.66, 506.76, 567.57, 595.95, 673.42, 821.57, 1133.77, 1530.59, 1989.77]
        }
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [256.95, 339.16, 390.05, 436.85, 458.69, 518.32, 632.35, 872.65, 1178.07, 1531.50],
          withoutOdonto: [282.45, 372.83, 428.75, 480.20, 504.21, 569.76, 695.11, 959.25, 1294.99, 1683.49]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [385.43, 508.76, 585.07, 655.28, 688.04, 777.48, 948.54, 1308.99, 1767.13, 2297.27],
          withoutOdonto: [410.93, 542.43, 623.79, 698.64, 733.57, 828.93, 1011.29, 1395.58, 1884.03, 2449.24]
        }
      }
    },
    [PlanType.NOSSO_MEDICO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [231.23, 305.25, 351.02, 393.16, 412.81, 466.48, 569.10, 785.35, 1060.24, 1378.30],
          withoutOdonto: [256.73, 338.88, 389.71, 436.48, 458.30, 517.88, 631.81, 871.90, 1177.07, 1530.19]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [346.86, 457.86, 526.54, 589.73, 619.22, 699.71, 853.65, 1178.04, 1590.35, 2067.47],
          withoutOdonto: [372.36, 491.52, 565.25, 633.08, 664.73, 751.14, 916.39, 1264.62, 1707.24, 2219.41]
        }
      }
    }
  }
};

const LONDRINA_INDIVIDUAL = {
  [CopartType.PARCIAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [169.13, 223.25, 256.74, 287.55, 301.93, 341.18, 416.24, 574.41, 775.45, 1008.09],
          withoutOdonto: [194.63, 256.91, 295.45, 330.90, 347.45, 392.62, 479.00, 661.02, 892.38, 1160.09]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [253.68, 334.86, 385.09, 431.30, 452.87, 511.74, 624.32, 861.56, 1163.11, 1512.04],
          withoutOdonto: [279.18, 368.52, 423.80, 474.66, 498.39, 563.18, 687.08, 948.17, 1280.03, 1664.04]
        }
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [183.83, 242.66, 279.04, 312.53, 328.13, 370.80, 452.37, 624.25, 842.72, 1095.54],
          withoutOdonto: [209.33, 276.32, 317.77, 355.90, 373.70, 422.28, 515.18, 710.95, 959.78, 1247.71]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [275.76, 364.00, 418.61, 468.84, 492.27, 556.28, 678.65, 936.53, 1264.32, 1643.62],
          withoutOdonto: [301.26, 397.66, 457.31, 512.19, 537.80, 607.71, 741.41, 1023.15, 1381.25, 1795.63]
        }
      }
    },
    [PlanType.NOSSO_MEDICO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [165.45, 218.39, 251.14, 281.28, 295.32, 333.72, 407.13, 561.83, 758.45, 985.99],
          withoutOdonto: [190.95, 252.05, 289.86, 324.64, 340.87, 385.18, 469.92, 648.49, 875.46, 1138.10]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [248.18, 327.59, 376.71, 421.92, 442.98, 500.58, 610.70, 842.75, 1137.68, 1478.99],
          withoutOdonto: [273.68, 361.26, 415.45, 465.30, 488.57, 552.08, 673.54, 929.49, 1254.81, 1631.25]
        }
      }
    },
    [PlanType.PLENO]: {
        [Segmentation.AMB_HOSP_OBST]: {
          [Accommodation.ENFERMARIA]: {
            withOdonto: [397.30, 524.42, 603.10, 675.46, 709.25, 801.43, 977.76, 1349.31, 1821.56, 2368.03],
            withoutOdonto: [422.80, 558.10, 641.82, 718.84, 754.78, 852.90, 1040.54, 1435.95, 1938.53, 2520.09]
          },
          [Accommodation.APARTAMENTO]: {
            withOdonto: [595.95, 786.65, 904.65, 1013.21, 1063.86, 1202.16, 1466.65, 2023.97, 2732.36, 3552.08],
            withoutOdonto: [621.45, 820.31, 943.36, 1056.56, 1109.39, 1253.61, 1529.40, 2110.57, 2849.27, 3704.05]
          }
        }
      }
  },
  [CopartType.TOTAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: {
            withOdonto: [115.20, 129.02, 144.50, 166.18, 191.11, 227.42, 284.28, 355.35, 604.10, 676.59],
            withoutOdonto: [172.81, 193.55, 216.78, 249.30, 286.70, 341.17, 426.46, 533.08, 906.24, 1014.99]
        }
      }
    }
  }
};

const BC_INDIVIDUAL = {
  [CopartType.PARCIAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [189.93, 250.72, 288.32, 322.91, 339.06, 383.14, 467.44, 645.07, 870.83, 1132.08],
          withoutOdonto: [215.43, 284.37, 327.03, 366.27, 384.58, 434.58, 530.19, 731.66, 987.74, 1284.06]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [284.91, 376.07, 432.49, 484.39, 508.60, 574.73, 701.17, 967.61, 1306.27, 1698.16],
          withoutOdonto: [310.41, 409.74, 471.20, 527.74, 554.13, 626.17, 763.93, 1054.22, 1423.20, 1850.16]
        }
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [237.42, 313.40, 360.38, 403.61, 423.80, 478.88, 584.23, 806.23, 1088.37, 1414.87],
          withoutOdonto: [262.92, 347.05, 399.11, 447.00, 469.35, 530.37, 647.05, 892.93, 1205.46, 1567.10]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [356.12, 470.09, 540.60, 605.47, 635.75, 718.39, 876.44, 1209.48, 1632.80, 2122.63],
          withoutOdonto: [381.62, 503.74, 579.30, 648.82, 681.26, 769.82, 939.18, 1296.07, 1749.69, 2274.60]
        }
      }
    },
    [PlanType.NOSSO_MEDICO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
          withOdonto: [213.68, 282.06, 324.38, 363.29, 381.47, 431.05, 525.89, 725.73, 979.74, 1273.67],
          withoutOdonto: [239.18, 315.72, 363.08, 406.65, 426.98, 482.49, 588.64, 812.32, 1096.63, 1425.62]
        },
        [Accommodation.APARTAMENTO]: {
          withOdonto: [320.54, 423.10, 486.57, 544.96, 572.19, 646.59, 788.83, 1088.57, 1469.58, 1910.46],
          withoutOdonto: [346.04, 456.77, 525.29, 588.32, 617.74, 698.05, 851.62, 1175.24, 1586.57, 2062.54]
        }
      }
    },
    [PlanType.PLENO]: {
        [Segmentation.AMB_HOSP_OBST]: {
          [Accommodation.ENFERMARIA]: {
            withOdonto: [332.40, 438.75, 504.57, 565.13, 593.39, 670.54, 818.04, 1128.90, 1524.01, 1981.21],
            withoutOdonto: [357.90, 472.43, 543.29, 608.48, 638.90, 721.96, 880.79, 1215.49, 1640.91, 2133.18]
          },
          [Accommodation.APARTAMENTO]: {
            withOdonto: [498.59, 658.14, 756.85, 847.67, 890.06, 1005.76, 1227.03, 1693.30, 2285.96, 2971.74],
            withoutOdonto: [524.09, 691.80, 795.57, 891.04, 935.59, 1057.22, 1289.81, 1779.94, 2402.92, 3123.80]
          }
        }
    }
  },
  [CopartType.TOTAL]: {
    [PlanType.NOSSO_PLANO]: {
       [Segmentation.AMB_HOSP]: {
         [Accommodation.ENFERMARIA]: {
           withOdonto: [171.38, 191.95, 214.98, 247.23, 284.31, 338.33, 422.91, 528.64, 898.69, 1006.53],
           withoutOdonto: [256.43, 287.20, 321.66, 369.91, 425.40, 506.23, 632.79, 790.99, 1344.68, 1506.04]
         }
       }
    }
  }
};

const JOINVILLE_INDIVIDUAL = {
  [CopartType.PARCIAL]: {
    [PlanType.NOSSO_PLANO]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.SEM_ACOM]: {
            withOdonto: [132.98, 175.54, 201.72, 226.09, 237.38, 268.17, 327.19, 451.52, 609.61, 792.61],
            withoutOdonto: [150.83, 199.10, 228.80, 256.44, 269.24, 304.17, 371.11, 512.13, 691.43, 899.00]
        },
        [Accommodation.ENFERMARIA]: {
            withOdonto: [202.10, 266.78, 306.77, 343.79, 360.96, 407.78, 497.47, 686.47, 926.82, 1204.93],
            withoutOdonto: [229.23, 302.58, 347.94, 389.94, 409.41, 462.51, 564.24, 778.61, 1051.23, 1366.67]
        },
        [Accommodation.APARTAMENTO]: {
            withOdonto: [303.18, 400.20, 460.24, 515.47, 541.24, 611.59, 746.11, 1029.62, 1390.07, 1807.14],
            withoutOdonto: [343.88, 453.91, 522.02, 584.65, 613.89, 693.68, 846.25, 1167.82, 1576.61, 2049.68]
        }
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
            withOdonto: [252.62, 333.46, 383.49, 429.51, 450.97, 509.58, 621.67, 857.88, 1158.23, 1505.76],
            withoutOdonto: [286.53, 378.21, 434.95, 487.16, 511.50, 577.98, 705.12, 973.03, 1313.70, 1707.88]
        },
        [Accommodation.APARTAMENTO]: {
            withOdonto: [378.93, 500.19, 575.23, 644.26, 676.45, 764.37, 932.51, 1286.81, 1737.32, 2258.58],
            withoutOdonto: [429.79, 567.33, 652.44, 730.74, 767.25, 866.97, 1057.67, 1459.54, 1970.51, 2561.74]
        }
      }
    },
    [PlanType.NOSSO_MEDICO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: {
            withOdonto: [273.46, 360.93, 415.09, 464.93, 488.15, 551.64, 672.98, 928.74, 1253.91, 1629.94],
            withoutOdonto: [310.16, 409.37, 470.80, 527.33, 553.66, 625.68, 763.29, 1053.39, 1422.18, 1848.71]
        },
        [Accommodation.APARTAMENTO]: {
            withOdonto: [379.15, 500.48, 575.56, 644.63, 676.84, 764.81, 933.05, 1287.56, 1738.32, 2259.87],
            withoutOdonto: [430.03, 567.65, 652.81, 731.16, 767.70, 867.47, 1058.29, 1460.39, 1971.66, 2563.21]
        }
      }
    }
  }
};

const JOINVILLE_PME = {
    [CopartType.PARCIAL]: {
      [PlanType.NOSSO_PLANO]: {
        [Segmentation.AMB]: {
            [Accommodation.SEM_ACOM]: [97.68, 128.94, 148.21, 166.12, 174.41, 197.03, 240.39, 331.73, 447.85, 582.24]
        },
        [Segmentation.AMB_HOSP]: {
            [Accommodation.ENFERMARIA]: [148.45, 195.96, 225.31, 252.54, 265.15, 299.52, 365.44, 504.29, 680.82, 885.12],
            [Accommodation.APARTAMENTO]: [222.70, 293.97, 338.01, 378.86, 397.78, 449.46, 548.33, 756.70, 1021.59, 1328.12]
        },
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [185.56, 244.95, 281.65, 315.69, 331.46, 374.42, 456.80, 630.37, 851.03, 1106.38],
            [Accommodation.APARTAMENTO]: [278.38, 367.46, 422.51, 473.59, 497.24, 561.83, 685.42, 945.88, 1276.97, 1660.11]
        }
      },
      [PlanType.NOSSO_MEDICO]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [199.50, 263.34, 302.80, 339.40, 356.36, 402.54, 491.10, 677.71, 914.93, 1189.43],
            [Accommodation.APARTAMENTO]: [277.36, 366.12, 420.98, 471.86, 495.43, 559.79, 682.93, 942.44, 1272.33, 1654.08]
        }
      }
    },
    [CopartType.TOTAL]: {
        [PlanType.NOSSO_PLANO]: {
            [Segmentation.AMB]: {
                [Accommodation.SEM_ACOM]: [60.78, 80.23, 92.22, 103.37, 108.53, 122.60, 149.58, 206.41, 278.67, 362.30]
            },
            [Segmentation.AMB_HOSP]: {
                [Accommodation.ENFERMARIA]: [92.37, 121.94, 140.20, 157.15, 165.00, 186.38, 227.40, 313.81, 423.65, 550.79],
                [Accommodation.APARTAMENTO]: [138.58, 182.93, 210.32, 235.75, 247.52, 279.67, 341.20, 470.86, 635.69, 826.42]
            },
            [Segmentation.AMB_HOSP_OBST]: {
                [Accommodation.ENFERMARIA]: [115.46, 152.42, 175.26, 196.44, 206.25, 232.98, 284.24, 392.25, 529.55, 688.46],
                [Accommodation.APARTAMENTO]: [173.23, 228.66, 262.91, 294.70, 309.42, 349.61, 426.53, 588.60, 794.63, 1033.06]
            }
        }
    }
};

// ================= MEDSÊNIOR =================
const MEDSENIOR_PME = {
  [CopartType.SEM_COPART]: {
    [PlanType.ESSENCIAL]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: [0, 0, 0, 0, 0, 0, 0, 499.62, 599.54, 785.40]
      }
    },
    [PlanType.PR3]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: [0, 0, 0, 0, 0, 0, 0, 569.75, 683.70, 895.65]
      }
    },
    [PlanType.PR4]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.APARTAMENTO]: [0, 0, 0, 0, 0, 0, 0, 712.19, 854.63, 1119.57]
      }
    },
    [PlanType.BLACK]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.APARTAMENTO]: [0, 0, 0, 0, 0, 0, 0, 1205.92, 1447.10, 1895.70]
      }
    }
  }
};

const MEDSENIOR_CORPORATE = {
  [CopartType.SEM_COPART]: {
    [PlanType.PR3]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.ENFERMARIA]: [0, 0, 0, 0, 0, 0, 0, 512.78, 615.34, 806.10]
      }
    },
    [PlanType.PR4]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.APARTAMENTO]: [0, 0, 0, 0, 0, 0, 0, 640.97, 769.16, 1007.60]
      }
    },
    [PlanType.BLACK]: {
      [Segmentation.AMB_HOSP]: {
        [Accommodation.APARTAMENTO]: [0, 0, 0, 0, 0, 0, 0, 1085.34, 1302.41, 1706.16]
      }
    }
  }
};

// ================= MEDSUL =================
const MEDSUL_PME_30 = {
  [CopartType.COPART_30]: {
    [PlanType.EXECUTIVE_DIRECT]: {
      [Segmentation.AMB_HOSP_SEM_OBST]: {
        [Accommodation.ENFERMARIA]: [95.49, 106.94, 122.98, 141.43, 162.64, 187.04, 243.17, 323.40, 430.12, 572.04]
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [119.36, 133.68, 153.73, 176.78, 203.30, 233.80, 303.96, 404.25, 537.65, 715.06]
      }
    },
    [PlanType.EXECUTIVE_PERFECT]: {
      [Segmentation.AMB_HOSP_SEM_OBST]: {
        [Accommodation.ENFERMARIA]: [107.30, 120.17, 138.19, 158.92, 182.76, 210.18, 273.25, 363.41, 483.33, 642.81],
        [Accommodation.APARTAMENTO]: [134.12, 150.21, 172.74, 198.65, 228.46, 262.73, 341.56, 454.26, 604.17, 803.52]
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [134.12, 150.21, 172.74, 198.65, 228.46, 262.73, 341.56, 454.26, 604.17, 803.52],
        [Accommodation.APARTAMENTO]: [167.65, 187.77, 215.93, 248.32, 285.57, 328.41, 426.95, 567.82, 755.21, 1004.40]
      }
    },
    [PlanType.EXECUTIVE_PREMIUM]: {
      [Segmentation.AMB_HOSP_SEM_OBST]: {
        [Accommodation.ENFERMARIA]: [133.68, 149.71, 172.17, 197.99, 227.69, 261.85, 340.42, 452.75, 602.15, 800.84],
        [Accommodation.APARTAMENTO]: [167.10, 187.14, 215.21, 247.49, 284.62, 327.31, 425.53, 565.93, 752.69, 924.05]
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [167.10, 187.14, 215.21, 247.49, 284.62, 327.31, 425.53, 565.93, 752.69, 1001.05],
        [Accommodation.APARTAMENTO]: [208.87, 233.93, 269.01, 309.36, 355.77, 409.14, 531.91, 707.41, 940.86, 1155.06]
      }
    }
  },
  [CopartType.COPART_50]: {
    [PlanType.EXECUTIVE_DIRECT]: {
        [Segmentation.AMB_HOSP_SEM_OBST]: {
            [Accommodation.ENFERMARIA]: [79.57, 89.12, 102.48, 117.86, 135.54, 155.87, 202.64, 269.50, 358.43, 476.70]
        },
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [99.46, 111.40, 128.10, 147.32, 169.42, 194.83, 253.30, 336.87, 448.04, 595.88]
        }
    },
    [PlanType.EXECUTIVE_PERFECT]: {
        [Segmentation.AMB_HOSP_SEM_OBST]: {
            [Accommodation.ENFERMARIA]: [89.42, 100.14, 115.16, 132.44, 152.30, 175.15, 227.71, 302.84, 402.78, 535.68],
            [Accommodation.APARTAMENTO]: [111.77, 125.18, 143.95, 165.54, 190.38, 218.94, 284.63, 378.55, 503.47, 669.60]
        },
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [111.77, 125.18, 143.95, 165.54, 190.38, 218.94, 284.63, 378.55, 503.47, 669.60],
            [Accommodation.APARTAMENTO]: [139.71, 156.47, 179.94, 206.93, 237.97, 273.67, 355.79, 473.19, 629.34, 837.00]
        }
    },
    [PlanType.EXECUTIVE_PREMIUM]: {
        [Segmentation.AMB_HOSP_SEM_OBST]: {
            [Accommodation.ENFERMARIA]: [111.40, 124.76, 143.47, 164.99, 189.74, 218.21, 283.69, 377.29, 501.79, 667.37],
            [Accommodation.APARTAMENTO]: [139.25, 155.95, 179.34, 206.24, 237.18, 272.76, 354.61, 471.61, 627.24, 770.04]
        },
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [139.25, 155.95, 179.34, 206.24, 237.18, 272.76, 354.61, 471.61, 627.24, 834.21],
            [Accommodation.APARTAMENTO]: [174.06, 194.94, 224.18, 257.80, 296.48, 340.95, 443.26, 589.51, 784.05, 962.55]
        }
    }
  }
};

// ================= NOSSA SAUDE =================
const NOSSA_SAUDE_INDIV = {
  [CopartType.COPART_20]: { // CCP 21 is assumed ~20% or specific fixed
    [PlanType.VIDA_LEVE]: {
      [Segmentation.AMB_HOSP_SEM_OBST]: {
        [Accommodation.ENFERMARIA]: [207.66, 229.22, 269.37, 325.96, 355.75, 430.21, 550.67, 672.36, 847.18, 1192.90],
        [Accommodation.APARTAMENTO]: [269.95, 297.98, 350.19, 423.75, 462.48, 559.27, 715.87, 874.07, 1101.33, 1550.77]
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [244.92, 270.35, 317.72, 384.47, 419.60, 507.42, 649.50, 793.04, 999.22, 1406.99],
        [Accommodation.APARTAMENTO]: [318.40, 351.46, 413.04, 499.80, 545.48, 659.64, 844.35, 1030.95, 1298.99, 1829.09]
      }
    }
  },
  [CopartType.COPART_50]: { // CCP 50 - usually cheaper
    [PlanType.VIDA_LEVE]: {
      [Segmentation.AMB_HOSP_SEM_OBST]: {
        [Accommodation.ENFERMARIA]: [173.05, 191.01, 224.48, 271.64, 296.46, 358.51, 458.89, 560.30, 705.98, 994.08],
        [Accommodation.APARTAMENTO]: [224.96, 248.32, 291.82, 353.13, 385.40, 466.06, 596.56, 728.39, 917.78, 1292.31]
      },
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [204.10, 225.29, 264.77, 320.39, 349.67, 422.85, 541.25, 660.86, 832.69, 1172.49],
        [Accommodation.APARTAMENTO]: [265.33, 292.88, 344.20, 416.50, 454.57, 549.70, 703.63, 859.12, 1082.49, 1524.24]
      }
    }
  }
};

const NOSSA_SAUDE_PME = {
  [CopartType.COPART_20]: {
    [PlanType.LIDER_100]: {
        [Segmentation.AMB_HOSP_SEM_OBST]: {
            [Accommodation.ENFERMARIA]: [144.24, 161.56, 185.79, 217.37, 254.32, 297.55, 386.81, 483.52, 638.24, 865.45],
            [Accommodation.APARTAMENTO]: [187.52, 210.02, 241.52, 282.58, 330.62, 386.82, 502.85, 628.57, 829.71, 1125.09]
        }
    },
    [PlanType.LIDER_200]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [165.52, 185.39, 213.19, 249.43, 291.83, 341.44, 443.87, 554.83, 732.38, 993.11],
            [Accommodation.APARTAMENTO]: [215.18, 241.00, 277.15, 324.26, 379.38, 443.87, 577.02, 721.29, 952.10, 1291.04]
        }
    }
  },
  [CopartType.COPART_50]: {
    [PlanType.LIDER_100]: {
        [Segmentation.AMB_HOSP_SEM_OBST]: {
            [Accommodation.ENFERMARIA]: [110.55, 123.82, 142.39, 166.59, 194.91, 228.04, 296.45, 370.56, 489.14, 663.27],
            [Accommodation.APARTAMENTO]: [143.71, 160.96, 185.10, 216.57, 253.38, 296.45, 385.38, 481.73, 635.88, 862.26]
        }
    },
    [PlanType.LIDER_200]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [126.85, 142.08, 163.39, 191.16, 223.66, 261.68, 340.17, 425.22, 561.29, 761.11],
            [Accommodation.APARTAMENTO]: [164.91, 184.70, 212.40, 248.51, 290.76, 340.18, 442.23, 552.79, 729.68, 989.44]
        }
    }
  }
};

// ================= PARANÁ CLÍNICAS =================
const PARANA_PME = {
  [CopartType.COPART_30]: {
    [PlanType.STANDARD_PLUS]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [146.36, 162.46, 188.45, 218.60, 257.95, 304.38, 359.17, 448.96, 597.11, 865.81],
        [Accommodation.APARTAMENTO]: [164.60, 182.71, 211.94, 245.85, 290.10, 342.32, 403.94, 504.92, 671.54, 973.73]
      }
    },
    [PlanType.EXECUTIVO_PLUS]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [188.62, 209.37, 242.86, 281.72, 332.43, 392.27, 462.88, 578.60, 769.53, 1115.81],
        [Accommodation.APARTAMENTO]: [212.20, 235.54, 273.22, 316.94, 373.99, 441.30, 520.74, 650.92, 865.72, 1255.29]
      }
    },
    [PlanType.ESTILO]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [212.75, 236.15, 273.94, 317.77, 374.97, 442.46, 522.11, 652.63, 868.00, 1258.60],
        [Accommodation.APARTAMENTO]: [239.35, 265.67, 308.18, 357.49, 421.84, 497.77, 587.37, 734.21, 976.50, 1415.93]
      }
    }
  },
  [CopartType.COPART_50]: {
    [PlanType.STANDARD_PLUS]: {
        [Segmentation.AMB_HOSP_OBST]: {
          [Accommodation.ENFERMARIA]: [129.78, 144.05, 167.10, 193.84, 228.73, 269.90, 318.48, 398.10, 529.47, 767.72],
          [Accommodation.APARTAMENTO]: [145.95, 162.01, 187.93, 218.00, 257.24, 303.54, 358.18, 447.72, 595.46, 863.42]
        }
    },
    [PlanType.EXECUTIVO_PLUS]: {
        [Segmentation.AMB_HOSP_OBST]: {
          [Accommodation.ENFERMARIA]: [167.24, 185.63, 215.33, 249.79, 294.75, 347.80, 410.41, 513.01, 682.30, 989.34],
          [Accommodation.APARTAMENTO]: [188.14, 208.84, 242.25, 281.01, 331.60, 391.28, 461.71, 577.14, 767.59, 1113.00]
        }
    },
    [PlanType.ESTILO]: {
        [Segmentation.AMB_HOSP_OBST]: {
          [Accommodation.ENFERMARIA]: [188.64, 209.39, 242.89, 281.75, 332.47, 392.31, 462.93, 578.66, 769.61, 1115.94],
          [Accommodation.APARTAMENTO]: [212.22, 235.56, 273.25, 316.97, 374.02, 441.35, 520.79, 650.99, 865.82, 1255.43]
        }
    }
  }
};

// ================= SELECT =================
const SELECT_INDIV = {
  [CopartType.PARCIAL]: { // 100 & 200
    [PlanType.SELECT_100]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.ENFERMARIA]: [298.30, 321.36, 361.16, 408.27, 463.93, 541.71, 700.54, 907.16, 1175.99, 1528.21]
      }
    },
    [PlanType.SELECT_200]: {
      [Segmentation.AMB_HOSP_OBST]: {
        [Accommodation.APARTAMENTO]: [370.35, 399.15, 448.92, 507.80, 577.38, 674.59, 873.13, 1131.43, 1467.48, 1907.76]
      }
    }
  }
};

const SELECT_PME = {
  [CopartType.PARCIAL]: {
    [PlanType.SELECT_100]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [199.28, 214.69, 241.27, 272.74, 309.93, 361.89, 467.99, 606.03, 785.63, 1020.93]
        }
    },
    [PlanType.SELECT_200]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.APARTAMENTO]: [247.41, 266.66, 299.91, 339.25, 385.72, 450.67, 583.31, 755.86, 980.37, 1274.48]
        }
    }
  }
};

// ================= UNIMED =================
// Using the "Vital/Tramontina" tables which seem to be PME/Adesão
const UNIMED_PME = {
  [CopartType.COPART_30]: {
    [PlanType.FLEX]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [327.88, 389.30, 432.56, 489.53, 522.23, 590.19, 662.03, 748.95, 834.78, 1251.51], // Flex 1 30%
            [Accommodation.APARTAMENTO]: [458.83, 540.50, 655.77, 747.45, 819.28, 882.69, 967.60, 1201.28, 1389.52, 1830.41]
        }
    },
    [PlanType.PLENO_UNIMED]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [229.42, 272.39, 302.65, 351.38, 416.36, 470.68, 524.02, 609.31, 695.39, 1110.75],
            [Accommodation.APARTAMENTO]: [308.28, 367.06, 412.95, 470.68, 515.91, 555.84, 653.22, 756.46, 875.00, 1469.62]
        }
    }
  },
  [CopartType.COPART_50]: {
    [PlanType.FLEX]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [288.67, 344.78, 348.51, 397.13, 430.75, 499.82, 557.10, 631.60, 788.12, 1059.45],
            [Accommodation.APARTAMENTO]: [430.97, 508.74, 491.22, 538.43, 580.10, 635.91, 789.48, 913.19, 1202.95, 1533.76]
        }
    },
    [PlanType.AMIGO]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [345.54, 464.40, 375.95, 434.11, 488.11, 561.08, 632.45, 783.42, 982.02, 1230.86],
            [Accommodation.APARTAMENTO]: [505.27, 617.78, 564.54, 690.68, 777.01, 833.58, 972.62, 1094.19, 1294.56, 1639.43]
        }
    },
    [PlanType.PLENO_UNIMED]: {
        [Segmentation.AMB_HOSP_OBST]: {
            [Accommodation.ENFERMARIA]: [183.54, 230.94, 252.50, 280.91, 317.79, 354.21, 421.72, 501.96, 580.62, 975.18],
            [Accommodation.APARTAMENTO]: [274.02, 344.78, 312.33, 342.34, 368.84, 404.32, 501.96, 580.62, 764.85, 1224.24]
        }
    }
  }
};

export const PRICES: Record<Operator, Record<Region, Record<string, any>>> = {
  [Operator.HAPVIDA]: {
    [Region.CURITIBA]: {
      [ContractType.PME]: CURITIBA_PME,
      [ContractType.INDIVIDUAL]: CURITIBA_INDIVIDUAL
    },
    [Region.MARINGA]: {
      [ContractType.PME]: CURITIBA_PME, // Placeholder
      [ContractType.INDIVIDUAL]: MARINGA_INDIVIDUAL
    },
    [Region.LONDRINA]: {
      [ContractType.PME]: CURITIBA_PME, // Placeholder
      [ContractType.INDIVIDUAL]: LONDRINA_INDIVIDUAL
    },
    [Region.BALNEARIO_CAMBORIU]: {
      [ContractType.PME]: CURITIBA_PME, // Placeholder
      [ContractType.INDIVIDUAL]: BC_INDIVIDUAL
    },
    [Region.JOINVILLE]: {
      [ContractType.PME]: JOINVILLE_PME,
      [ContractType.INDIVIDUAL]: JOINVILLE_INDIVIDUAL
    }
  },
  [Operator.MEDSENIOR]: {
    [Region.CURITIBA]: {
      [ContractType.INDIVIDUAL]: MEDSENIOR_PME, // Reusing PME table for Simplicity as Indiv structure is similar in prices usually, but mapped to Sem Copart
      [ContractType.PME]: {
          [CopartType.SEM_COPART]: MEDSENIOR_CORPORATE[CopartType.SEM_COPART]
      }
    },
    [Region.MARINGA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }, // Default empty
    [Region.LONDRINA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.BALNEARIO_CAMBORIU]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.JOINVILLE]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }
  },
  [Operator.MEDSUL]: {
    [Region.CURITIBA]: {
      [ContractType.PME]: MEDSUL_PME_30,
      [ContractType.INDIVIDUAL]: {} // Not provided
    },
    [Region.MARINGA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.LONDRINA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.BALNEARIO_CAMBORIU]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.JOINVILLE]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }
  },
  [Operator.NOSSA_SAUDE]: {
    [Region.CURITIBA]: {
      [ContractType.PME]: NOSSA_SAUDE_PME,
      [ContractType.INDIVIDUAL]: NOSSA_SAUDE_INDIV
    },
    [Region.MARINGA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.LONDRINA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.BALNEARIO_CAMBORIU]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.JOINVILLE]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }
  },
  [Operator.PARANA_CLINICAS]: {
    [Region.CURITIBA]: {
      [ContractType.PME]: PARANA_PME,
      [ContractType.INDIVIDUAL]: {}
    },
    [Region.MARINGA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.LONDRINA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.BALNEARIO_CAMBORIU]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.JOINVILLE]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }
  },
  [Operator.SELECT]: {
    [Region.CURITIBA]: {
      [ContractType.PME]: SELECT_PME,
      [ContractType.INDIVIDUAL]: SELECT_INDIV
    },
    [Region.MARINGA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.LONDRINA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.BALNEARIO_CAMBORIU]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.JOINVILLE]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }
  },
  [Operator.UNIMED]: {
    [Region.CURITIBA]: {
      [ContractType.PME]: UNIMED_PME,
      [ContractType.INDIVIDUAL]: {}
    },
    [Region.MARINGA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.LONDRINA]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.BALNEARIO_CAMBORIU]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} },
    [Region.JOINVILLE]: { [ContractType.PME]: {}, [ContractType.INDIVIDUAL]: {} }
  }
};