
import React from 'react';
import { PlanSelection, Operator, ContractType, DentalPlan } from '../types';
import { ALL_PLANS, HAPVIDA_DENTAL_PLANS } from '../constants';
import { Building2, User, Check, ChevronRight, MapPin, Tag, Smile, AlertTriangle } from 'lucide-react';

interface PlanSelectorProps {
  selection: PlanSelection;
  onChange: (newSelection: PlanSelection) => void;
  beneficiariesCount: number;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ selection, onChange, beneficiariesCount }) => {
  
  // -- HELPERS TO FILTER DATA --
  
  // 1. Get Operators
  const availableOperators = Array.from(new Set(ALL_PLANS.map(p => p.operator)));

  // 2. Get Regions for selected Operator
  const availableRegions = selection.operator 
    ? Array.from(new Set(ALL_PLANS.filter(p => p.operator === selection.operator).map(p => p.region)))
    : [];

  // 3. Get Contracts for Operator + Region
  const availableContracts = (selection.operator && selection.region)
    ? Array.from(new Set(ALL_PLANS.filter(p => p.operator === selection.operator && p.region === selection.region).map(p => p.contractType)))
    : [];

  // 4. Get Plans for Operator + Region + Contract
  const availablePlans = (selection.operator && selection.region && selection.contractType)
    ? Array.from(new Set(ALL_PLANS.filter(p => 
        p.operator === selection.operator && 
        p.region === selection.region && 
        p.contractType === selection.contractType
      ).map(p => p.planName)))
    : [];

  // 5. Get Variant Details (Accom/Copart) for selected Plan
  const availableVariants = (selection.operator && selection.region && selection.contractType && selection.planName)
    ? ALL_PLANS.filter(p => 
        p.operator === selection.operator && 
        p.region === selection.region && 
        p.contractType === selection.contractType &&
        p.planName === selection.planName
      )
    : [];

  // 6. Get Dental Plans (Hapvida Specific)
  const availableDentalPlans = (selection.operator === Operator.HAPVIDA && selection.contractType)
    ? HAPVIDA_DENTAL_PLANS.filter(d => d.contractType === selection.contractType || d.contractType === 'BOTH')
    : [];

  // Current selected variant full object
  const currentVariant = selection.selectedVariantId 
    ? ALL_PLANS.find(p => p.id === selection.selectedVariantId) 
    : null;

  const currentDental = selection.dentalPlanId
    ? HAPVIDA_DENTAL_PLANS.find(d => d.id === selection.dentalPlanId)
    : null;


  // -- HANDLERS --

  const handleOperatorSelect = (op: Operator) => {
    const regions = Array.from(new Set(ALL_PLANS.filter(p => p.operator === op).map(p => p.region)));
    const defaultRegion = regions.length === 1 ? regions[0] : null;
    
    onChange({
      operator: op,
      region: defaultRegion,
      contractType: null,
      planName: null,
      selectedVariantId: null,
      dentalPlanId: null,
      applyDiscount: false
    });
  };

  const handleRegionSelect = (reg: string) => {
    onChange({ ...selection, region: reg, contractType: null, planName: null, selectedVariantId: null, dentalPlanId: null });
  };

  const handleContractSelect = (ct: ContractType) => {
    onChange({ ...selection, contractType: ct, planName: null, selectedVariantId: null, dentalPlanId: null });
  };

  const handlePlanSelect = (pn: string) => {
    const variants = ALL_PLANS.filter(p => 
      p.operator === selection.operator && 
      p.region === selection.region && 
      p.contractType === selection.contractType &&
      p.planName === pn
    );
    
    if (variants.length === 1) {
      onChange({ ...selection, planName: pn, selectedVariantId: variants[0].id });
    } else {
      onChange({ ...selection, planName: pn, selectedVariantId: variants[0].id });
    }
  };

  const handleVariantChange = (id: string) => {
    onChange({ ...selection, selectedVariantId: id });
  };

  const toggleDiscount = () => {
    onChange({ ...selection, applyDiscount: !selection.applyDiscount });
  };

  const handleDentalSelect = (id: string) => {
    if (selection.dentalPlanId === id) {
      onChange({ ...selection, dentalPlanId: null }); // Deselect
    } else {
      onChange({ ...selection, dentalPlanId: id });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. OPERADORA */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">1. Operadora</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableOperators.map((op) => (
            <button
              key={op}
              onClick={() => handleOperatorSelect(op)}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-2 text-center h-16 ${
                selection.operator === op
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md ring-1 ring-blue-600/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* 2. REGIAO */}
      {selection.operator && (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
           <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">2. Região / Cidade</label>
           {availableRegions.length > 1 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {availableRegions.map(reg => (
                 <button
                   key={reg}
                   onClick={() => handleRegionSelect(reg)}
                   className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                     selection.region === reg
                       ? 'border-blue-500 bg-blue-50 text-blue-800 font-medium'
                       : 'border-slate-200 hover:border-blue-200 text-slate-600'
                   }`}
                 >
                   <MapPin size={18} className={selection.region === reg ? 'text-blue-600' : 'text-slate-400'} />
                   {reg}
                 </button>
               ))}
             </div>
           ) : (
             <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm flex items-center gap-2">
               <MapPin size={16} />
               {availableRegions[0] || "Região Única"}
             </div>
           )}
        </div>
      )}

      {/* 3. TIPO CONTRATO */}
      {selection.operator && selection.region && (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300 delay-75">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">3. Tipo de Contratação</label>
          <div className="flex flex-wrap gap-3">
            {availableContracts.map(ct => (
              <button
                key={ct}
                onClick={() => handleContractSelect(ct)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  selection.contractType === ct
                    ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600/10'
                    : 'border-slate-200 hover:border-blue-200 text-slate-600'
                }`}
              >
                {ct.includes('PME') ? <Building2 size={18} /> : <User size={18} />}
                <span className="font-semibold text-sm">{ct}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. PLANO */}
      {selection.contractType && (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300 delay-100">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">4. Selecione o Plano</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availablePlans.map(pn => {
               const isActive = selection.planName === pn;
               return (
                <button
                    key={pn}
                    onClick={() => handlePlanSelect(pn)}
                    className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                        isActive
                        ? 'border-blue-500 bg-blue-600 text-white shadow-md'
                        : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
                    }`}
                >
                    <div className="flex justify-between items-center relative z-10">
                        <span className="font-bold text-sm">{pn}</span>
                        {isActive && <Check size={18} className="text-blue-200" />}
                    </div>
                </button>
               );
            })}
          </div>
        </div>
      )}

      {/* 5. DETALHES (ACOMODACAO/VARIANTE) */}
      {selection.planName && availableVariants.length > 0 && (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300 delay-150 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ChevronRight size={14} />
                5. Configuração
            </h4>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Acomodação</label>
                    <div className="flex flex-wrap gap-2">
                        {availableVariants.map(v => (
                            <button
                                key={v.id}
                                onClick={() => handleVariantChange(v.id)}
                                className={`px-4 py-2 rounded-lg text-sm border transition-colors flex items-center gap-2 ${
                                    selection.selectedVariantId === v.id
                                    ? 'bg-white border-blue-500 text-blue-700 font-bold shadow-sm'
                                    : 'bg-transparent border-slate-300 text-slate-600 hover:border-slate-400'
                                }`}
                            >
                                {v.accommodation}
                                {selection.selectedVariantId === v.id && <Check size={14}/>}
                            </button>
                        ))}
                    </div>
                </div>

                {currentVariant?.discountAvailable && (
                    <div className="pt-3 border-t border-slate-200 mt-3">
                        <button 
                            onClick={toggleDiscount}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                selection.applyDiscount 
                                ? 'bg-green-50 border-green-200 text-green-700' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Tag size={18} />
                                <span className="text-sm font-semibold">Aplicar Desconto Promocional (15%)</span>
                            </div>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${selection.applyDiscount ? 'bg-green-500' : 'bg-slate-300'}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${selection.applyDiscount ? 'left-6' : 'left-1'}`} />
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

      {/* 6. PLANO ODONTOLOGICO (HAPVIDA SPECIFIC) */}
      {selection.selectedVariantId && availableDentalPlans.length > 0 && (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300 delay-200 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Smile size={14} />
                6. Plano Odontológico
            </h4>
            
            <div className="space-y-3">
                {availableDentalPlans.map(plan => {
                    const isSelected = selection.dentalPlanId === plan.id;
                    return (
                        <button
                            key={plan.id}
                            onClick={() => handleDentalSelect(plan.id)}
                            className={`w-full p-4 rounded-xl border text-left transition-all relative ${
                                isSelected 
                                ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500/20' 
                                : 'bg-white/50 border-indigo-200 hover:bg-white hover:border-indigo-300'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-slate-800 text-sm">{plan.name}</div>
                                    <div className="text-xs text-slate-500 mt-1">{plan.description}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${plan.price === 0 ? 'text-green-600' : 'text-slate-700'}`}>
                                        {plan.price === 0 ? 'GRATUITO' : `R$ ${plan.price.toFixed(2).replace('.', ',')}`}
                                    </div>
                                    {isSelected && <Check size={16} className="text-indigo-600 ml-auto mt-1"/>}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* WARNING FOR REGIME MISTO */}
            {currentDental?.warning && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-800 font-medium leading-relaxed">
                        {currentDental.warning}
                    </p>
                </div>
            )}
        </div>
      )}

    </div>
  );
};

export default PlanSelector;
