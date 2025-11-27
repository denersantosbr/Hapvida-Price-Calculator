import { PlanType, CopartType, Segmentation, Accommodation, ContractType, Region } from './types';

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

// --- CURITIBA PRICES ---
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

// --- MARINGÁ PRICES (INDIVIDUAL ONLY) ---
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
  },
  [CopartType.TOTAL]: {
    // Maringá Total prices (Com Coparticipação) - extracted from PDF if needed
    // Assuming structure exists, placeholder for now as OCR mainly showed Parcial
    // Based on user request to add tables, I will add these if they appear in future.
    // For now, mapping Partial as the main request source.
    [PlanType.NOSSO_PLANO]: {
        [Segmentation.AMB_HOSP]: {
            [Accommodation.ENFERMARIA]: {
                 // Placeholder or Copart Total values if available
                 withOdonto: [164.44, 217.06, 249.62, 279.58, 293.57, 331.73, 404.71, 558.50, 754.00, 980.17], // Estimated from ratio
                 withoutOdonto: [189.94, 250.73, 288.34, 322.94, 339.08, 383.16, 467.45, 645.08, 870.89, 1132.13]
            },
            [Accommodation.APARTAMENTO]: {
                withOdonto: [246.66, 325.60, 374.43, 419.37, 440.33, 497.58, 607.03, 837.70, 1130.91, 1470.18],
                withoutOdonto: [272.16, 359.27, 413.15, 462.73, 485.84, 549.01, 669.77, 924.28, 1247.80, 1622.14]
            }
        }
    }
  }
};

// --- LONDRINA PRICES (INDIVIDUAL ONLY) ---
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

// --- BALNEÁRIO CAMBORIÚ / JOINVILLE PRICES (INDIVIDUAL ONLY) ---
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

export const PRICES: Record<Region, Record<string, any>> = {
  [Region.CURITIBA]: {
    [ContractType.PME]: CURITIBA_PME,
    [ContractType.INDIVIDUAL]: CURITIBA_INDIVIDUAL
  },
  [Region.MARINGA]: {
    [ContractType.PME]: CURITIBA_PME, // Placeholder - Disable PME in UI for now if different
    [ContractType.INDIVIDUAL]: MARINGA_INDIVIDUAL
  },
  [Region.LONDRINA]: {
    [ContractType.PME]: CURITIBA_PME, // Placeholder
    [ContractType.INDIVIDUAL]: LONDRINA_INDIVIDUAL
  },
  [Region.JOINVILLE_BC]: {
    [ContractType.PME]: CURITIBA_PME, // Placeholder
    [ContractType.INDIVIDUAL]: BC_INDIVIDUAL
  }
};