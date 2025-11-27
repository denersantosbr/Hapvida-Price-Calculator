import React, { useEffect, useState } from 'react';
import { PlanSelection, PlanType, CopartType, Segmentation, Accommodation, Beneficiary, ContractType, Region } from '../types';
import { PRICES, ODONTO_PRICE_INDIVIDUAL_PROMO } from '../constants';
import { Check, Info, Percent, Sparkles, Lock, Building2, User, HeartPulse, MapPin } from 'lucide-react';

interface PlanSelectorProps {
  selection: PlanSelection;
  onChange: (newSelection: PlanSelection) => void;
  beneficiaries: Beneficiary[];
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ selection, onChange, beneficiaries }) => {
  const [isCheapestMode, setIsCheapestMode] = useState(false);

  // Helper to calculate total cost for a specific config
  const calculateTotal = (config: PlanSelection) => {
    // Navigate price structure
    const regionPrices = PRICES[config.region];
    const rootPrices = regionPrices?.[config.contractType];
    const copartPrices = rootPrices?.[config.copartType];
    const planPrices = copartPrices?.[config.planType];
    const segPrices = planPrices?.[config.segmentation];
    const accPrices = segPrices?.[config.accommodation];

    let pricesArray: number[] | undefined;

    if (config.contractType === ContractType.INDIVIDUAL) {
        pricesArray = config.includeOdonto ? accPrices?.withOdonto : accPrices?.withoutOdonto;
    } else {
        pricesArray = accPrices;
    }

    if (!pricesArray) return Infinity; // Invalid config

    const healthTotal = beneficiaries.reduce((acc, curr) => {
        let price = pricesArray![curr.ageRangeIndex] || 0;
        if (config.applyDiscount) price = price * 0.85;
        return acc + price;
    }, 0);

    let odontoTotal = 0;
    if (config.contractType === ContractType.INDIVIDUAL && config.includeOdonto) {
        odontoTotal = beneficiaries.length * ODONTO_PRICE_INDIVIDUAL_PROMO;
    }
    
    return healthTotal + odontoTotal;
  };

  // Logic to find cheapest valid configuration
  const findCheapestConfig = () => {
    const validConfigs: Partial<PlanSelection>[] = [];

    const coparts = [CopartType.PARCIAL, CopartType.TOTAL];
    const contractType = selection.contractType;
    const region = selection.region;
    
    coparts.forEach(copart => {
        // --- NOSSO PLANO ---
        if (contractType === ContractType.PME && region === Region.CURITIBA) {
             validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB, accommodation: Accommodation.SEM_ACOM, includeOdonto: false });
        }
        
        validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP, accommodation: Accommodation.ENFERMARIA, includeOdonto: false });
        validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP, accommodation: Accommodation.APARTAMENTO, includeOdonto: false });

        if (contractType === ContractType.INDIVIDUAL) {
            validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP, accommodation: Accommodation.ENFERMARIA, includeOdonto: true });
            validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP, accommodation: Accommodation.APARTAMENTO, includeOdonto: true });
        }

        // --- NOSSO MEDICO (Only in new regions) ---
        if (region !== Region.CURITIBA && contractType === ContractType.INDIVIDUAL) {
             validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_MEDICO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.ENFERMARIA, includeOdonto: false });
             validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_MEDICO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.ENFERMARIA, includeOdonto: true });
        }

        // --- PLENO ---
        // Pleno is generally AMB_HOSP_OBST
        // Note: Check availability per region if needed. Assuming available.
        validConfigs.push({ contractType, copartType: copart, planType: PlanType.PLENO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.ENFERMARIA, includeOdonto: false });
        validConfigs.push({ contractType, copartType: copart, planType: PlanType.PLENO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.APARTAMENTO, includeOdonto: false });

        if (contractType === ContractType.INDIVIDUAL) {
             validConfigs.push({ contractType, copartType: copart, planType: PlanType.PLENO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.ENFERMARIA, includeOdonto: true });
             validConfigs.push({ contractType, copartType: copart, planType: PlanType.PLENO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.APARTAMENTO, includeOdonto: true });
        }
        
         if (contractType === ContractType.INDIVIDUAL) {
            // Nosso Plano often has Obst in Individual
            validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.ENFERMARIA, includeOdonto: false });
            validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.ENFERMARIA, includeOdonto: true });
            validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.APARTAMENTO, includeOdonto: false });
            validConfigs.push({ contractType, copartType: copart, planType: PlanType.NOSSO_PLANO, segmentation: Segmentation.AMB_HOSP_OBST, accommodation: Accommodation.APARTAMENTO, includeOdonto: true });
         }
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
  }, [isCheapestMode, beneficiaries, selection.applyDiscount, selection.contractType, selection.region, onChange]);

  const updateField = (field: keyof PlanSelection, value: any) => {
    if (isCheapestMode && field !== 'contractType' && field !== 'region') setIsCheapestMode(false);

    let newSelection = { ...selection, [field]: value };

    // Region Change Logic
    if (field === 'region') {
        // If switching to a new region, verify contract type availability
        // For now, new regions only have Individual data populated clearly in my context
        if (value !== Region.CURITIBA) {
             newSelection.contractType = ContractType.INDIVIDUAL;
        }
    }

    // Reset logic when switching Contract Type
    if (field === 'contractType') {
        newSelection.applyDiscount = false;
        newSelection.includeOdonto = false;
        newSelection.copartType = CopartType.TOTAL;
        
        if (value === ContractType.INDIVIDUAL) {
            newSelection.segmentation = Segmentation.AMB_HOSP;
            newSelection.accommodation = Accommodation.ENFERMARIA;
            newSelection.planType = PlanType.NOSSO_PLANO;
        } else {
            newSelection.segmentation = Segmentation.AMB_HOSP;
            newSelection.accommodation = Accommodation.ENFERMARIA;
        }
    }

    // Plan Type Constraints
    if (field === 'planType') {
        if (value === PlanType.NOSSO_PLANO) {
             if (newSelection.contractType === ContractType.PME) {
                 newSelection.segmentation = Segmentation.AMB_HOSP;
             } else {
                 newSelection.segmentation = Segmentation.AMB_HOSP;
             }
        } else if (value === PlanType.NOSSO_MEDICO || value === PlanType.PLENO) {
             newSelection.segmentation = Segmentation.AMB_HOSP_OBST;
        }
        newSelection.accommodation = Accommodation.ENFERMARIA;
    }

    if (field === 'segmentation') {
        if (value === Segmentation.AMB) newSelection.accommodation = Accommodation.SEM_ACOM;
        else if (newSelection.accommodation === Accommodation.SEM_ACOM) newSelection.accommodation = Accommodation.ENFERMARIA;
    }

    onChange(newSelection);
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
                const isDisabled = selection.region !== Region.CURITIBA && type === ContractType.PME;
                return (
                    <button
                        key={type}
                        onClick={() => !isDisabled && updateField('contractType', type)}
                        disabled={isDisabled}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            selection.contractType === type
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : isDisabled 
                                ? 'border-slate-100 bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
                                : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50 text-slate-500'
                        }`}
                    >
                        {type === ContractType.PME ? <Building2 size={24} className="mb-2"/> : <User size={24} className="mb-2"/>}
                        <span className="font-bold text-sm text-center">{type}</span>
                        {isDisabled && <span className="text-[10px] text-red-400 mt-1">(Sem dados PME)</span>}
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
                                ? 'Otimizando automaticamente modalidade e odonto.' 
                                : 'Calcula a melhor combinação (Com/Sem Odonto, etc).'}
                        </span>
                    </div>
                </div>
                
                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isCheapestMode ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${isCheapestMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
             </button>
        </div>
        
        {/* Discount / Table Selection */}
        <div className="mb-8 relative">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Tabela Promocional (15% OFF)</label>
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
                            <span className="text-xs text-slate-500 font-medium mt-1 block">
                                Sem desconto promocional
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
                                <Percent size={12} /> 15% (3 primeiras)
                            </span>
                        </div>
                        {selection.applyDiscount && <div className="bg-emerald-500 text-white p-1 rounded-full"><Check size={14} /></div>}
                    </div>
                </button>
            </div>
        </div>

        <div className={`space-y-6 transition-opacity duration-300 ${isCheapestMode ? 'opacity-60 pointer-events-none grayscale-[0.5]' : ''}`}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Modalidade */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Modalidade</label>
                    <div className="flex flex-col gap-2">
                    {[CopartType.PARCIAL, CopartType.TOTAL].map((type) => (
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
                    <div className="flex flex-col gap-2">
                    {[PlanType.NOSSO_PLANO, PlanType.NOSSO_MEDICO, PlanType.PLENO].map((type) => {
                        // Logic to hide/show plans based on region
                        if (type === PlanType.NOSSO_MEDICO && selection.region === Region.CURITIBA) return null;
                        
                        return (
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
                        );
                    })}
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
                        {selection.planType === PlanType.NOSSO_PLANO ? (
                            <>
                            {selection.contractType === ContractType.PME && <option value={Segmentation.AMB}>Ambulatorial</option>}
                            <option value={Segmentation.AMB_HOSP}>Ambulatorial + Hospitalar</option>
                            {selection.contractType === ContractType.INDIVIDUAL && <option value={Segmentation.AMB_HOSP_OBST}>Ambulatorial + Hospitalar + Obstetrícia</option>}
                            </>
                        ) : (
                            <option value={Segmentation.AMB_HOSP_OBST}>Ambulatorial + Hospitalar + Obstetrícia</option>
                        )}
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
                        disabled={isCheapestMode || selection.segmentation === Segmentation.AMB}
                        >
                        {selection.segmentation === Segmentation.AMB ? (
                            <option value={Accommodation.SEM_ACOM}>Sem Acomodação (Ambulatorial)</option>
                        ) : (
                            <>
                            <option value={Accommodation.ENFERMARIA}>Enfermaria</option>
                            <option value={Accommodation.APARTAMENTO}>Apartamento</option>
                            </>
                        )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                             <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Odonto Option */}
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
                            disabled={isCheapestMode} // Let cheapest mode control this
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

        </div>
        
        {/* Helper Text */}
        <div className="flex items-start gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />
            <div className="space-y-1">
                <p>
                    <strong>{selection.region}</strong> • {selection.contractType}
                </p>
                <p>
                    {selection.planType} • {selection.copartType}
                </p>
                <p className="text-xs opacity-80">
                    {selection.applyDiscount 
                        ? "Aplicando 15% de desconto promocional nas 3 primeiras parcelas."
                        : "Tabela base sem desconto promocional de 15%."
                    }
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;