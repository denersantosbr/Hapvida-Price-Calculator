
import { Operator, ContractType, PlanVariant, DentalPlan } from './types';

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

export const ADESAO_FEE = 25.00;

// Helper
const simplePrice = (prices: number[]) => [{ min_lives: 1, max_lives: 999, prices }];

export const HAPVIDA_DENTAL_PLANS: DentalPlan[] = [
  {
    id: 'hap_dental_premium_pme',
    operator: Operator.HAPVIDA,
    contractType: ContractType.PME,
    name: 'PREMIUM NACIONAL',
    price: 22.36,
    description: 'Cobertura Rol ANS Ampliado'
  },
  {
    id: 'hap_dental_prot_total_pme',
    operator: Operator.HAPVIDA,
    contractType: ContractType.PME,
    name: '+ODONTO PROTEÇÃO TOTAL',
    price: 0.00,
    description: 'Condicionado à contratação do Saúde PME',
    warning: 'ATENÇÃO: Este plano possui REGIME MISTO DE PAGAMENTO. Cobertura básica incluída. Procedimentos complexos (canal, prótese, etc.) são pagos à parte conforme tabela CBHPO vigente.'
  },
  {
    id: 'hap_dental_promo_ind',
    operator: Operator.HAPVIDA,
    contractType: ContractType.INDIVIDUAL,
    name: 'ODONTO (Promo Saúde Integral)',
    price: 24.50,
    description: 'Valor promocional venda casada (Normal: R$ 75,84)'
  }
];

export const ALL_PLANS: PlanVariant[] = [
  // ================= HAPVIDA =================
  // --- JOINVILLE ---
  {
    id: 'hap_join_ind_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'JOINVILLE - SC',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([303.85, 401.06, 461.24, 516.59, 542.42, 612.93, 747.77, 1031.92, 1393.08, 1811.02])
  },
  {
    id: 'hap_join_ind_nosso_apto',
    operator: Operator.HAPVIDA,
    region: 'JOINVILLE - SC',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Apartamento',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([455.83, 601.70, 691.96, 775.00, 813.75, 919.54, 1121.84, 1548.14, 2089.99, 2716.99])
  },
  {
    id: 'hap_join_ind_mix_enf',
    operator: Operator.HAPVIDA,
    region: 'JOINVILLE - SC',
    contractType: ContractType.INDIVIDUAL,
    planName: 'MIX',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([308.70, 407.48, 468.60, 524.83, 551.07, 622.71, 759.71, 1048.40, 1415.34, 1839.94])
  },
  {
    id: 'hap_join_pme_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'JOINVILLE - SC',
    contractType: ContractType.PME,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([121.91, 136.54, 152.92, 175.86, 202.24, 240.67, 300.84, 376.05, 639.29, 716.00])
  },
  {
    id: 'hap_join_pme_nosso_apto',
    operator: Operator.HAPVIDA,
    region: 'JOINVILLE - SC',
    contractType: ContractType.PME,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Apartamento',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([146.14, 163.68, 183.32, 210.82, 242.44, 288.50, 360.63, 450.79, 766.34, 858.30])
  },
  {
    id: 'hap_join_pme_medico_enf',
    operator: Operator.HAPVIDA,
    region: 'JOINVILLE - SC',
    contractType: ContractType.PME,
    planName: 'NOSSO MÉDICO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([109.73, 122.90, 137.65, 158.30, 182.05, 216.64, 270.80, 338.50, 575.45, 644.56])
  },

  // --- LONDRINA ---
  {
    id: 'hap_lon_ind_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'LONDRINA - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([211.41, 279.06, 320.92, 359.43, 377.40, 426.46, 520.29, 717.99, 969.29, 1260.08])
  },
  {
    id: 'hap_lon_ind_mater_enf',
    operator: Operator.HAPVIDA,
    region: 'LONDRINA - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'MATER',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([255.30, 337.00, 387.55, 434.06, 455.76, 515.01, 628.31, 867.07, 1170.54, 1521.70])
  },
  {
    id: 'hap_lon_pme_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'LONDRINA - PR',
    contractType: ContractType.PME,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([129.01, 144.49, 161.83, 186.10, 214.02, 254.68, 318.35, 397.94, 676.50, 757.68])
  },
  {
    id: 'hap_lon_pme_pleno_enf',
    operator: Operator.HAPVIDA,
    region: 'LONDRINA - PR',
    contractType: ContractType.PME,
    planName: 'PLENO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([249.56, 279.51, 313.05, 360.01, 414.01, 492.67, 615.84, 769.80, 1308.66, 1465.70])
  },

  // --- CURITIBA ---
  {
    id: 'hap_cur_ind_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'CURITIBA - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([160.97, 212.48, 244.34, 273.67, 287.36, 324.72, 396.15, 546.69, 738.03, 959.45])
  },
  {
    id: 'hap_cur_ind_mater_enf',
    operator: Operator.HAPVIDA,
    region: 'CURITIBA - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'MATER',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([209.24, 276.19, 317.60, 355.70, 373.47, 422.04, 514.88, 710.51, 959.16, 1246.90])
  },
  {
    id: 'hap_cur_ind_pleno_enf',
    operator: Operator.HAPVIDA,
    region: 'CURITIBA - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'PLENO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([367.75, 485.43, 558.24, 625.23, 656.49, 741.83, 905.03, 1248.94, 1686.07, 2191.89])
  },
  {
    id: 'hap_cur_pme_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'CURITIBA - PR',
    contractType: ContractType.PME,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([114.36, 128.08, 143.45, 164.97, 189.72, 225.77, 282.21, 352.76, 599.69, 671.65])
  },
  {
    id: 'hap_cur_pme_pleno_enf',
    operator: Operator.HAPVIDA,
    region: 'CURITIBA - PR',
    contractType: ContractType.PME,
    planName: 'PLENO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([159.52, 178.66, 200.10, 230.12, 264.64, 314.92, 393.65, 492.06, 836.50, 936.88])
  },

  // --- MARINGA ---
  {
    id: 'hap_mga_ind_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'MARINGÁ - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([256.94, 339.16, 390.03, 436.83, 458.67, 518.30, 632.33, 872.62, 1178.04, 1531.45])
  },
  {
    id: 'hap_mga_ind_medico_enf',
    operator: Operator.HAPVIDA,
    region: 'MARINGÁ - PR',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO MÉDICO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([231.23, 305.25, 351.02, 393.16, 412.81, 466.48, 569.10, 785.35, 1060.24, 1378.30])
  },
  {
    id: 'hap_mga_pme_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'MARINGÁ - PR',
    contractType: ContractType.PME,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([170.77, 191.26, 214.21, 246.34, 283.29, 337.12, 421.40, 526.75, 895.48, 1002.94])
  },
  {
    id: 'hap_mga_pme_medico_enf',
    operator: Operator.HAPVIDA,
    region: 'MARINGÁ - PR',
    contractType: ContractType.PME,
    planName: 'NOSSO MÉDICO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([128.40, 143.81, 161.07, 185.23, 213.01, 253.48, 316.85, 396.06, 673.30, 754.10])
  },

  // --- BALNEARIO CAMBORIU ---
  {
    id: 'hap_bc_ind_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'BALNEÁRIO CAMBORIÚ - SC',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([169.93, 250.72, 288.32, 322.91, 339.06, 383.14, 467.44, 645.07, 870.83, 1132.09])
  },
  {
    id: 'hap_bc_ind_nosso_apto',
    operator: Operator.HAPVIDA,
    region: 'BALNEÁRIO CAMBORIÚ - SC',
    contractType: ContractType.INDIVIDUAL,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Apartamento',
    coparticipation: 'Copart Parcial',
    discountAvailable: true,
    priceTables: simplePrice([215.43, 317.87, 365.55, 409.39, 429.87, 485.75, 592.62, 817.82, 1104.05, 1435.26])
  },
  {
    id: 'hap_bc_pme_nosso_enf',
    operator: Operator.HAPVIDA,
    region: 'BALNEÁRIO CAMBORIÚ - SC',
    contractType: ContractType.PME,
    planName: 'NOSSO PLANO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([152.48, 170.78, 191.27, 219.96, 252.95, 301.01, 376.26, 470.33, 799.56, 895.51])
  },
  {
    id: 'hap_bc_pme_pleno_enf',
    operator: Operator.HAPVIDA,
    region: 'BALNEÁRIO CAMBORIÚ - SC',
    contractType: ContractType.PME,
    planName: 'PLENO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([265.89, 297.80, 333.54, 383.57, 441.11, 524.92, 656.15, 820.10, 1394.32, 1561.64])
  },
  {
    id: 'hap_bc_pme_medico_enf',
    operator: Operator.HAPVIDA,
    region: 'BALNEÁRIO CAMBORIÚ - SC',
    contractType: ContractType.PME,
    planName: 'NOSSO MÉDICO',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Copart Total',
    discountAvailable: true,
    priceTables: simplePrice([171.38, 191.95, 214.98, 247.23, 284.31, 338.33, 422.91, 528.64, 898.69, 1006.53])
  },

  // ================= UNIMED =================
  {
    id: 'unimed_vital_enf',
    operator: Operator.UNIMED,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'VITAL',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: '20% (Teto R$ 90)',
    priceTables: simplePrice([242.78, 277.92, 291.46, 376.48, 394.96, 453.18, 627.23, 794.70, 873.47, 1197.96])
  },
  {
    id: 'unimed_vital_apto',
    operator: Operator.UNIMED,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'VITAL',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Apartamento',
    coparticipation: '20% (Teto R$ 90)',
    priceTables: simplePrice([296.50, 360.27, 377.95, 539.55, 566.18, 774.53, 812.92, 1109.75, 1197.96, 1197.96])
  },
  {
    id: 'unimed_flex_enf',
    operator: Operator.UNIMED,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'FLEX',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: '30% (Teto R$ 90)',
    priceTables: simplePrice([233.44, 267.15, 280.16, 361.77, 379.52, 435.44, 602.54, 763.37, 838.99, 1150.52])
  },
  {
    id: 'unimed_amigo_enf_promo',
    operator: Operator.UNIMED,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'PLANO AMIGO (Promo Porte)',
    segmentation: 'Nacional',
    accommodation: 'Enfermaria',
    coparticipation: '50%',
    priceTables: [
      { min_lives: 1, max_lives: 1, prices: [431.92, 469.93, 542.63, 610.13, 701.34, 790.55, 979.25, 1227.49, 1538.54, 1886.40] },
      { min_lives: 2, max_lives: 2, prices: [388.73, 422.94, 488.37, 549.12, 631.21, 711.50, 881.34, 1104.76, 1384.71, 1697.79] },
      { min_lives: 3, max_lives: 999, prices: [345.54, 375.95, 434.11, 488.11, 561.08, 632.45, 783.42, 982.02, 1230.86, 1509.16] }
    ]
  },

  // ================= MEDSUL =================
  {
    id: 'medsul_direct_plus_enf',
    operator: Operator.MEDSUL,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'EXECUTIVE DIRECT PLUS',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: '30%',
    priceTables: [
      { min_lives: 2, max_lives: 29, prices: [119.36, 133.68, 153.73, 176.78, 203.30, 233.80, 303.96, 404.25, 537.65, 715.06] }
    ]
  },

  // ================= PARANA CLINICAS =================
  {
    id: 'pr_std_plus_enf',
    operator: Operator.PARANA_CLINICAS,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'STANDARD PLUS',
    segmentation: 'Regional',
    accommodation: 'Enfermaria',
    coparticipation: '30%',
    priceTables: simplePrice([146.36, 162.46, 188.45, 218.60, 257.95, 304.38, 359.17, 448.96, 597.11, 865.81])
  },

  // ================= NOSSA SAUDE =================
  {
    id: 'ns_lider100_enf',
    operator: Operator.NOSSA_SAUDE,
    region: 'Curitiba e Região',
    contractType: ContractType.PME,
    planName: 'LIDER 100',
    segmentation: 'Amb + Hosp',
    accommodation: 'Enfermaria',
    coparticipation: '50%',
    priceTables: simplePrice([110.55, 123.82, 142.39, 166.59, 194.91, 253.38, 296.45, 370.56, 489.14, 663.27])
  },

  // ================= SELECT =================
  {
    id: 'select_100_enf',
    operator: Operator.SELECT,
    region: 'Curitiba',
    contractType: ContractType.INDIVIDUAL,
    planName: 'SELECT 100',
    segmentation: 'Amb + Hosp + Obst',
    accommodation: 'Enfermaria',
    coparticipation: 'Coparticipação',
    priceTables: [
      { min_lives: 1, max_lives: 2, prices: [298.30, 321.36, 361.16, 408.27, 463.93, 541.71, 700.54, 907.16, 1175.99, 1528.21] },
      { min_lives: 3, max_lives: 999, prices: [256.06, 275.85, 310.02, 350.47, 398.24, 465.00, 601.34, 778.71, 1009.48, 1311.82] }
    ]
  },

  // ================= MEDSENIOR =================
  {
    id: 'medsenior_essencial',
    operator: Operator.MEDSENIOR,
    region: 'Curitiba',
    contractType: ContractType.INDIVIDUAL,
    planName: 'ESSENCIAL (49+)',
    segmentation: 'Amb + Hosp',
    accommodation: 'Enfermaria',
    coparticipation: 'Sem Copart',
    priceTables: simplePrice([0,0,0,0,0,0,0, 499.62, 599.54, 785.40])
  }
];
