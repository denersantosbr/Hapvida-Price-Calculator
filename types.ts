export enum Region {
  CURITIBA = 'CURITIBA - PR',
  MARINGA = 'MARINGÁ - PR',
  LONDRINA = 'LONDRINA - PR',
  JOINVILLE_BC = 'BALNEÁRIO CAMBORIÚ / JOINVILLE - SC',
}

export enum PlanType {
  NOSSO_PLANO = 'NOSSO PLANO',
  NOSSO_MEDICO = 'NOSSO MÉDICO',
  PLENO = 'PLENO',
}

export enum CopartType {
  PARCIAL = 'COPARTICIPAÇÃO PARCIAL',
  TOTAL = 'COM COPARTICIPAÇÃO',
}

export enum Segmentation {
  AMB = 'AMB',
  AMB_HOSP = 'AMB + HOSP',
  AMB_HOSP_OBST = 'AMB + HOSP + OBST',
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
  region: Region;
  contractType: ContractType;
  copartType: CopartType;
  planType: PlanType;
  segmentation: Segmentation;
  accommodation: Accommodation;
  applyDiscount: boolean; // 15% promo
  includeOdonto: boolean; // New: triggers "Medica 1" prices for Individual
}