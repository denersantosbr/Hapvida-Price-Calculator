import React from 'react';
import { PlanSelection, PlanType, CopartType, Segmentation, Accommodation } from '../types';
import { Check, Info, ToggleLeft, ToggleRight, Percent, FileText } from 'lucide-react';

interface PlanSelectorProps {
  selection: PlanSelection;
  onChange: (newSelection: PlanSelection) => void;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ selection, onChange }) => {
  
  const updateField = (field: keyof PlanSelection, value: any) => {
    // Reset dependent fields when parent changes
    if (field === 'planType') {
      const defaultSeg = value === PlanType.NOSSO_PLANO ? Segmentation.AMB_HOSP : Segmentation.AMB_HOSP_OBST;
      const defaultAcc = value === PlanType.NOSSO_PLANO ? Accommodation.ENFERMARIA : Accommodation.ENFERMARIA;
      
      onChange({ 
        ...selection, 
        [field]: value,
        segmentation: defaultSeg,
        accommodation: defaultAcc
      });
      return;
    }

    if (field === 'segmentation') {
        let newAcc = selection.accommodation;
        if (value === Segmentation.AMB) newAcc = Accommodation.SEM_ACOM;
        else if (selection.accommodation === Accommodation.SEM_ACOM) newAcc = Accommodation.ENFERMARIA;

        onChange({
            ...selection,
            [field]: value,
            accommodation: newAcc
        });
        return;
    }

    onChange({ ...selection, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">1</div>
          Configuração do Plano
        </h2>
        
        {/* Discount Toggle - Styled as Table Selection */}
        <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Tabela de Preços</label>
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
                                Tabela 1
                            </span>
                            <span className="text-xs text-slate-500 font-medium mt-1 block">
                                Preço Padrão (Sem Desconto)
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
                                Tabela 2
                            </span>
                            <span className="text-xs text-emerald-600 font-bold mt-1 block flex items-center gap-1">
                                <Percent size={12} /> Com 15% de Desconto
                            </span>
                        </div>
                        {selection.applyDiscount && <div className="bg-emerald-500 text-white p-1 rounded-full"><Check size={14} /></div>}
                    </div>
                    {selection.applyDiscount && (
                        <div className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
                            Promocional
                        </div>
                    )}
                </button>
            </div>
        </div>

        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tipo de Tabela / Coparticipação */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Modalidade (Coparticipação)</label>
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
                    {[PlanType.NOSSO_PLANO, PlanType.PLENO].map((type) => (
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
                        className="w-full p-3 pl-4 pr-10 rounded-lg border border-slate-300 bg-white text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                        >
                        {selection.planType === PlanType.NOSSO_PLANO ? (
                            <>
                            <option value={Segmentation.AMB}>Ambulatorial</option>
                            <option value={Segmentation.AMB_HOSP}>Ambulatorial + Hospitalar</option>
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
                        className="w-full p-3 pl-4 pr-10 rounded-lg border border-slate-300 bg-white text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:bg-slate-100 disabled:text-slate-400"
                        disabled={selection.segmentation === Segmentation.AMB}
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
        </div>
        
        {/* Helper Text */}
        <div className="flex items-start gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />
            <div className="space-y-1">
                <p>
                    Configuração atual: <strong>{selection.copartType}</strong> — <strong>{selection.planType}</strong>
                </p>
                <p className="text-xs opacity-80">
                    {selection.applyDiscount 
                        ? "Os valores exibidos abaixo incluem o desconto promocional de 15% nas 3 primeiras parcelas."
                        : "Os valores exibidos são referentes à tabela padrão sem o desconto promocional."
                    }
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;