export enum PlanType {
  NOSSO_PLANO = 'NOSSO PLANO',
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

export interface PriceTable {
  [key: string]: number[]; // Array of 10 prices corresponding to age ranges
}

export interface Beneficiary {
  id: string;
  name: string;
  ageRangeIndex: number;
}

export interface PlanSelection {
  copartType: CopartType;
  planType: PlanType;
  segmentation: Segmentation;
  accommodation: Accommodation;
  applyDiscount: boolean;
}
