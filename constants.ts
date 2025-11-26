import { PlanType, CopartType, Segmentation, Accommodation } from './types';

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

// Structure: [CopartType][PlanType][Segmentation][Accommodation] -> PriceArray
export const PRICES: Record<string, any> = {
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
        // Using the first Pleno column set (Standard)
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
        // Using the first Pleno column set (Standard)
        [Accommodation.ENFERMARIA]: [114.36, 128.08, 143.45, 164.97, 189.72, 225.77, 282.21, 352.76, 599.69, 671.65],
        [Accommodation.APARTAMENTO]: [170.82, 191.32, 214.28, 246.42, 283.38, 337.22, 421.53, 526.91, 895.75, 1003.24]
      }
    }
  }
};

export const ADESAO_FEE = 15.00;
export const ODONTO_PRICE = 22.36; // Premium
