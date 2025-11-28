
export enum Operator {
  HAPVIDA = 'Hapvida',
  MEDSENIOR = 'MedSênior',
  MEDSUL = 'MedSul',
  NOSSA_SAUDE = 'Nossa Saúde',
  PARANA_CLINICAS = 'Paraná Clínicas',
  SELECT = 'Select',
  UNIMED = 'Unimed Curitiba'
}

export enum ContractType {
  PME = 'PME / EMPRESARIAL',
  INDIVIDUAL = 'INDIVIDUAL / FAMILIAR',
  ADESAO = 'COLETIVO POR ADESÃO',
}

export interface PriceTableEntry {
  min_lives: number;
  max_lives: number;
  prices: number[]; // 10 age ranges
}

export interface PlanVariant {
  id: string;
  operator: Operator;
  region: string; // "Curitiba", "Joinville", etc. or "Estadual/Nacional"
  contractType: ContractType;
  planName: string;
  segmentation: string;
  accommodation: string;
  coparticipation: string;
  priceTables: PriceTableEntry[];
  discountAvailable?: boolean; // For Hapvida 15%
}

export interface DentalPlan {
  id: string;
  name: string;
  operator: Operator;
  contractType: ContractType | 'BOTH';
  price: number;
  description: string;
  warning?: string; // For "Regime Misto"
}

export interface Beneficiary {
  id: string;
  name: string;
  ageRangeIndex: number;
}

export interface PlanSelection {
  operator: Operator | null;
  region: string | null;
  contractType: ContractType | null;
  planName: string | null;
  selectedVariantId: string | null;
  dentalPlanId: string | null;
  applyDiscount: boolean;
}
