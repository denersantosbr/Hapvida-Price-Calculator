import React, { useEffect, useState } from 'react';
import { PlanSelection, PlanType, CopartType, Segmentation, Accommodation, Beneficiary, ContractType, Region, Operator } from '../types';
import { PRICES, ODONTO_PRICE_INDIVIDUAL_PROMO } from '../constants';
import { Check, Info, Percent, Sparkles, Building2, User, HeartPulse, MapPin, Stethoscope } from 'lucide-react';

interface PlanSelectorProps {
  selection: PlanSelection;
  onChange: (newSelection: PlanSelection) => void;
  beneficiaries: Beneficiary[];
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ selection, onChange, beneficiaries }) => {
  const [isCheapestMode, setIsCheapestMode] = useState(false);

  // Calculate total cost helper
  const calculateTotal = (config: PlanSelection) => {
    const opPrices = PRICES[config.operator];
    const regionPrices = opPrices?.[config.region];
    const rootPrices = regionPrices?.[config.contractType];
    const copartPrices = rootPrices?.[config.copartType];
    const planPrices = copartPrices?.[config.planType];
    const segPrices = planPrices?.[config.segmentation];
    const accPrices = segPrices?.[config.accommodation];

    let pricesArray: number[] | undefined;

    if (config.operator === Operator.HAPVIDA && config.contractType === ContractType.INDIVIDUAL) {
        pricesArray = config.includeOdonto ? accPrices?.withOdonto : accPrices?.withoutOdonto;
    } else {
        pricesArray = accPrices;
    }

    if (!pricesArray) return Infinity;

    const healthTotal = beneficiaries.reduce((acc, curr) => {
        let price = pricesArray![curr.ageRangeIndex] || 0;
        if (config.applyDiscount) price = price * 0.85; // Hapvida/Select Promo
        
        // MedSênior Special Logic: If age < 49, price is often invalid/not target
        if (config.operator === Operator.MEDSENIOR && curr.ageRangeIndex < 7) {
             // 7 is 49-53 index
             // Assuming 0 cost or invalid for younger in MedSenior for this calc
             price = 0; 
        }
        
        return acc + price;
    }, 0);

    let odontoTotal = 0;
    if (config.operator === Operator.HAPVIDA && config.contractType === ContractType.INDIVIDUAL && config.includeOdonto) {
        odontoTotal = beneficiaries.length * ODONTO_PRICE_INDIVIDUAL_PROMO;
    }
    
    return healthTotal + odontoTotal;
  };

  const findCheapestConfig = () => {
    const validConfigs: Partial<PlanSelection>[] = [];
    const { contractType, region, operator } = selection;
    
    // Iterate through available options for the CURRENT operator
    // This needs to be dynamic based on the operator's structure in CONSTANTS
    // For simplicity in this complex update, we'll stick to basic iteration if prices exist
    
    // Helper to check existence
    const check = (copart: CopartType, plan: PlanType, seg: Segmentation, accom: Accommodation) => {
        const p = PRICES[operator]?.[region]?.[contractType]?.[copart]?.[plan]?.[seg]?.[accom];
        if (p) {
             validConfigs.push({ copartType: copart, planType: plan, segmentation: seg, accommodation: accom, includeOdonto: false });
             if (operator === Operator.HAPVIDA && contractType === ContractType.INDIVIDUAL) {
                 validConfigs.push({ copartType: copart, planType: plan, segmentation: seg, accommodation: accom, includeOdonto: true });
             }
        }
    };

    Object.values(CopartType).forEach(cp => {
        Object.values(PlanType).forEach(pt => {
            Object.values(Segmentation).forEach(sg => {
                Object.values(Accommodation).forEach(ac => {
                    check(cp, pt, sg, ac);
                });
            });
        });
    });

    let bestConfig = selection;
    let minPrice = Infinity;

    validConfigs.forEach(config => {
        const fullConfig = { ...selection, ...config }; 
        const price = calculateTotal(fullConfig);
        if (price < minPrice && price > 0) {
            minPrice = price;
            bestConfig = fullConfig;
        }
    });

    return bestConfig;
  };

  useEffect(() => {
    if (isCheapestMode && beneficiaries.length > 0) {
        const best = findCheapestConfig();
        if (
            best.copartType !== selection.copartType ||
            best.planType !== selection.planType ||
            best.segmentation !== selection.segmentation ||
            best.accommodation !== selection.accommodation ||
            best.includeOdonto !== selection.includeOdonto
        ) {
            onChange(best);
        }
    }
  }, [isCheapestMode, beneficiaries, selection.applyDiscount, selection.contractType, selection.region, selection.operator, onChange]);

  const updateField = (field: keyof PlanSelection, value: any) => {
    if (isCheapestMode && field !== 'contractType' && field !== 'region') setIsCheapestMode(false);
    let newSelection = { ...selection, [field]: value };
    
    // Reset sub-fields when Operator Changes
    if (field === 'operator') {
        newSelection.contractType = ContractType.PME;
        newSelection.applyDiscount = false;
        newSelection.includeOdonto = false;
        // Defaults to be safe, useEffect or render logic will fix if invalid
        if (value === Operator.HAPVIDA) newSelection.planType = PlanType.NOSSO_PLANO;
        else if (value === Operator.MEDSENIOR) newSelection.planType = PlanType.ESSENCIAL;
        else if (value === Operator.MEDSUL) newSelection.planType = PlanType.EXECUTIVE_DIRECT;
        else if (value === Operator.NOSSA_SAUDE) newSelection.planType = PlanType.LIDER_100;
        else if (value === Operator.PARANA_CLINICAS) newSelection.planType = PlanType.STANDARD_PLUS;
        else if (value === Operator.SELECT) newSelection.planType = PlanType.SELECT_100;
        else if (value === Operator.UNIMED) newSelection.planType = PlanType.FLEX;
    }

    // Reset when Contract Type changes
    if (field === 'contractType') {
        if (value === ContractType.INDIVIDUAL) {
             if (newSelection.operator === Operator.NOSSA_SAUDE) newSelection.planType = PlanType.VIDA_LEVE;
        }
    }

    onChange(newSelection);
  };

  // Dynamic Lists based on current selection
  const getAvailableContractTypes = () => {
      const op = PRICES[selection.operator]?.[selection.region];
      if (!op) return [];
      return Object.values(ContractType).filter(ct => op[ct] && Object.keys(op[ct]).length > 0);
  };

  const getAvailableCoparts = () => {
      const op = PRICES[selection.operator]?.[selection.region]?.[selection.contractType];
      if (!op) return [];
      return Object.values(CopartType).filter(cp => op[cp]);
  };

  const getAvailablePlans = () => {
      const op = PRICES[selection.operator]?.[selection.region]?.[selection.contractType]?.[selection.copartType];
      if (!op) return [];
      return Object.values(PlanType).filter(pt => op[pt]);
  };

  const getAvailableSegs = () => {
      const op = PRICES[selection.operator]?.[selection.region]?.[selection.contractType]?.[selection.copartType]?.[selection.planType];
      if (!op) return [];
      return Object.values(Segmentation).filter(sg => op[sg]);
  };

  const getAvailableAccoms = () => {
      const op = PRICES[selection.operator]?.[selection.region]?.[selection.contractType]?.[selection.copartType]?.[selection.planType]?.[selection.segmentation];
      if (!op) return [];
      return Object.values(Accommodation).filter(ac => op[ac]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8 relative">
      <div>
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">1</div>
            Configuração do Plano
            </h2>
        </div>

        {/* Operator Selection */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Stethoscope size={16} className="text-blue-500" />
                Operadora
            </label>
            <div className="relative">
                <select
                    value={selection.operator}
                    onChange={(e) => updateField('operator', e.target.value)}
                    className="w-full p-3 pl-4 pr-10 rounded-xl border border-blue-200 bg-blue-50/30 text-blue-900 font-bold appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    {Object.values(Operator).map((op) => (
                        <option key={op} value={op}>{op}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Region Selection */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                Cidade / Região
            </label>
            <div className="relative">
                <select
                    value={selection.region}
                    onChange={(e) => updateField('region', e.target.value)}
                    className="w-full p-3 pl-4 pr-10 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    disabled={isCheapestMode}
                >
                    {Object.values(Region).map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Contract Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            {[ContractType.PME, ContractType.INDIVIDUAL].map((type) => {
                const available = getAvailableContractTypes().includes(type);
                return (
                    <button
                        key={type}
                        onClick={() => available && updateField('contractType', type)}
                        disabled={!available}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            selection.contractType === type
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : !available 
                                ? 'border-slate-100 bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
                                : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50 text-slate-500'
                        }`}
                    >
                        {type === ContractType.PME ? <Building2 size={24} className="mb-2"/> : <User size={24} className="mb-2"/>}
                        <span className="font-bold text-sm text-center">{type}</span>
                    </button>
                );
            })}
        </div>

        {/* Cheapest Option Toggle */}
        <div className="mb-8">
             <button
                onClick={() => setIsCheapestMode(!isCheapestMode)}
                className={`w-full group relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                    isCheapestMode 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md ring-1 ring-indigo-500/20' 
                    : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                }`}
             >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${isCheapestMode ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <Sparkles size={20} />
                    </div>
                    <div className="text-left">
                        <span className={`block font-bold ${isCheapestMode ? 'text-indigo-800' : 'text-slate-600'}`}>
                            {isCheapestMode ? 'Opção Mais Barata Ativada' : 'Encontrar Opção Mais Barata'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium block">
                            {isCheapestMode 
                                ? 'Otimizando automaticamente.' 
                                : 'Calcula a melhor combinação.'}
                        </span>
                    </div>
                </div>
                
                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isCheapestMode ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${isCheapestMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
             </button>
        </div>
        
        {/* Discount / Table Selection (Hapvida/Select Only) */}
        {(selection.operator === Operator.HAPVIDA || selection.operator === Operator.SELECT) && (
        <div className="mb-8 relative">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Tabela Promocional</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={() => updateField('applyDiscount', false)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        !selection.applyDiscount
                            ? 'border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-600/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <span className={`block font-bold text-lg ${!selection.applyDiscount ? 'text-blue-700' : 'text-slate-600'}`}>
                                Tabela Padrão
                            </span>
                        </div>
                        {!selection.applyDiscount && <div className="bg-blue-600 text-white p-1 rounded-full"><Check size={14} /></div>}
                    </div>
                </button>

                <button
                    onClick={() => updateField('applyDiscount', true)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selection.applyDiscount
                            ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-1 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <span className={`block font-bold text-lg ${selection.applyDiscount ? 'text-emerald-700' : 'text-slate-600'}`}>
                                Com Desconto
                            </span>
                            <span className="text-xs text-emerald-600 font-bold mt-1 block flex items-center gap-1">
                                <Percent size={12} /> {selection.operator === Operator.SELECT ? '5%' : '15%'}
                            </span>
                        </div>
                        {selection.applyDiscount && <div className="bg-emerald-500 text-white p-1 rounded-full"><Check size={14} /></div>}
                    </div>
                </button>
            </div>
        </div>
        )}

        <div className={`space-y-6 transition-opacity duration-300 ${isCheapestMode ? 'opacity-60 pointer-events-none grayscale-[0.5]' : ''}`}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Modalidade */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Modalidade</label>
                    <div className="flex flex-col gap-2">
                    {getAvailableCoparts().map((type) => (
                        <label
                        key={type}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            selection.copartType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                        >
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="copartType"
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                checked={selection.copartType === type}
                                onChange={() => updateField('copartType', type)}
                                disabled={isCheapestMode}
                            />
                            <span className="text-sm font-medium">{type}</span>
                        </div>
                        </label>
                    ))}
                    </div>
                </div>

                {/* Plano */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Plano</label>
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {getAvailablePlans().map((type) => (
                        <label
                        key={type}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            selection.planType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                        >
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="planType"
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                checked={selection.planType === type}
                                onChange={() => updateField('planType', type)}
                                disabled={isCheapestMode}
                            />
                            <span className="text-sm font-medium">{type}</span>
                        </div>
                        </label>
                    ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Segmentação */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Segmentação</label>
                    <div className="relative">
                        <select
                        value={selection.segmentation}
                        onChange={(e) => updateField('segmentation', e.target.value)}
                        className="w-full p-3 pl-4 pr-10 rounded-lg border border-slate-300 bg-white text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-slate-50 disabled:text-slate-500"
                        disabled={isCheapestMode}
                        >
                        {getAvailableSegs().map(seg => (
                            <option key={seg} value={seg}>{seg}</option>
                        ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Acomodação */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Acomodação</label>
                    <div className="relative">
                        <select
                        value={selection.accommodation}
                        onChange={(e) => updateField('accommodation', e.target.value)}
                        className="w-full p-3 pl-4 pr-10 rounded-lg border border-slate-300 bg-white text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-slate-50 disabled:text-slate-500"
                        disabled={isCheapestMode}
                        >
                        {getAvailableAccoms().map(acc => (
                            <option key={acc} value={acc}>{acc}</option>
                        ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                             <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Odonto Option (Hapvida only) */}
            {selection.operator === Operator.HAPVIDA && (
             <div className="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-200 transition-all bg-slate-50/50">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="block font-bold text-slate-700 flex items-center gap-2">
                            <HeartPulse size={18} className="text-pink-500"/>
                            Plano Odontológico
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block max-w-xs">
                            {selection.contractType === ContractType.INDIVIDUAL 
                             ? "Contratação conjunta garante DESCONTO na mensalidade da saúde (Tabela Médica 1)."
                             : "Adicione proteção odontológica completa por um pequeno valor adicional."}
                        </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={selection.includeOdonto}
                            onChange={(e) => updateField('includeOdonto', e.target.checked)}
                            disabled={isCheapestMode} 
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            )}

        </div>
        
        {/* Helper Text */}
        <div className="flex items-start gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />
            <div className="space-y-1">
                <p>
                    <strong>{selection.operator}</strong> • {selection.region}
                </p>
                <p>
                    {selection.planType} • {selection.copartType}
                </p>
                {selection.operator === Operator.MEDSENIOR && (
                    <p className="text-xs text-amber-600">
                        <strong>Nota:</strong> MedSênior é focado em 49+. Preços para idades menores podem não estar disponíveis.
                    </p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;