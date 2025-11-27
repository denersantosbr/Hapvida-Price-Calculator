export enum Operator {
  HAPVIDA = 'Hapvida',
  MEDSENIOR = 'MedSênior',
  MEDSUL = 'MedSul',
  NOSSA_SAUDE = 'Nossa Saúde',
  PARANA_CLINICAS = 'Paraná Clínicas',
  SELECT = 'Select',
  UNIMED = 'Unimed'
}

export enum Region {
  CURITIBA = 'CURITIBA - PR',
  MARINGA = 'MARINGÁ - PR',
  LONDRINA = 'LONDRINA - PR',
  BALNEARIO_CAMBORIU = 'BALNEÁRIO CAMBORIÚ - SC',
  JOINVILLE = 'JOINVILLE - SC',
}

export enum PlanType {
  // Hapvida
  NOSSO_PLANO = 'NOSSO PLANO',
  NOSSO_MEDICO = 'NOSSO MÉDICO',
  PLENO = 'PLENO',
  
  // MedSênior
  ESSENCIAL = 'ESSENCIAL',
  PR3 = 'PR3',
  PR4 = 'PR4',
  BLACK = 'BLACK',

  // MedSul
  EXECUTIVE_DIRECT = 'EXECUTIVE DIRECT',
  EXECUTIVE_PERFECT = 'EXECUTIVE PERFECT',
  EXECUTIVE_PREMIUM = 'EXECUTIVE PREMIUM',

  // Nossa Saúde
  VIDA_LEVE = 'VIDA LEVE',
  LIDER_100 = 'LIDER 100',
  LIDER_200 = 'LIDER 200',

  // Paraná Clínicas
  STANDARD_PLUS = 'STANDARD PLUS',
  EXECUTIVO_PLUS = 'EXECUTIVO PLUS',
  ESTILO = 'ESTILO',

  // Select
  SELECT_100 = 'SELECT 100',
  SELECT_200 = 'SELECT 200',

  // Unimed
  FLEX = 'FLEX',
  AMIGO = 'AMIGO',
  PLENO_UNIMED = 'PLENO (UNIMED)',
}

export enum CopartType {
  PARCIAL = 'COPARTICIPAÇÃO PARCIAL',
  TOTAL = 'COM COPARTICIPAÇÃO',
  SEM_COPART = 'SEM COPARTICIPAÇÃO',
  COPART_30 = 'COPARTICIPAÇÃO 30%',
  COPART_50 = 'COPARTICIPAÇÃO 50%',
  COPART_20 = 'COPARTICIPAÇÃO 20%',
  COPART_25 = 'COPARTICIPAÇÃO 25%',
}

export enum Segmentation {
  AMB = 'AMB',
  AMB_HOSP = 'AMB + HOSP',
  AMB_HOSP_OBST = 'AMB + HOSP + OBST',
  AMB_HOSP_SEM_OBST = 'AMB + HOSP (S/ OBST)',
}

export enum Accommodation {
  SEM_ACOM = 'S/ ACOM',
  ENFERMARIA = 'ENFERMARIA',
  APARTAMENTO = 'APARTAMENTO',
}

export enum ContractType {
  PME = 'PME / EMPRESARIAL',
  INDIVIDUAL = 'INDIVIDUAL / FAMILIAR',
}

export interface PriceTable {
  [key: string]: number[]; // Array of 10 prices corresponding to age ranges
}

export interface Beneficiary {
  id: string;
  name: string;
  ageRangeIndex: number;
}

export interface PlanSelection {
  operator: Operator;
  region: Region;
  contractType: ContractType;
  copartType: CopartType;
  planType: PlanType;
  segmentation: Segmentation;
  accommodation: Accommodation;
  applyDiscount: boolean; // 15% promo (Hapvida/Select)
  includeOdonto: boolean; // Triggers specific tables
}