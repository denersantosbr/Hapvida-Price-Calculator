import { PlanType, CopartType, Segmentation, Accommodation, ContractType } from './types';

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

// PME PRICES (Porte I & II)
const PRICES_PME: Record<string, any> = {
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

// INDIVIDUAL PRICES
// Structure leaf: { withOdonto: [], withoutOdonto: [] }
const PRICES_INDIVIDUAL: Record<string, any> = {
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

export const PRICES = {
  [ContractType.PME]: PRICES_PME,
  [ContractType.INDIVIDUAL]: PRICES_INDIVIDUAL
};