import React from 'react';
import { Beneficiary, PlanSelection } from '../types';
import { PRICES, ADESAO_FEE, ODONTO_PRICE, AGE_RANGES } from '../constants';
import { Calculator, DollarSign, Users, FileText, Printer, CheckCircle2 } from 'lucide-react';

interface SummaryProps {
  selection: PlanSelection;
  beneficiaries: Beneficiary[];
}

const Summary: React.FC<SummaryProps> = ({ selection, beneficiaries }) => {
  const { copartType, planType, segmentation, accommodation, applyDiscount } = selection;

  // Get Base Prices Array based on selection
  const pricesArray = PRICES[copartType]?.[planType]?.[segmentation]?.[accommodation] || [];

  const calculateCost = (ageIndex: number) => {
    let price = pricesArray[ageIndex] || 0;
    if (applyDiscount) {
      price = price * 0.85; // 15% discount
    }
    return price;
  };

  const totalMonthly = beneficiaries.reduce((acc, curr) => acc + calculateCost(curr.ageRangeIndex), 0);
  const totalAdesao = beneficiaries.length * ADESAO_FEE;
  
  // Format currency
  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden sticky top-6 flex flex-col h-fit">
      <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calculator size={100} />
        </div>
        <div className="relative z-10">
            <h3 className="text-lg font-medium text-slate-300 uppercase tracking-widest text-xs mb-1">Total Estimado</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">{fmt(totalMonthly)}</span>
                <span className="text-sm font-medium text-slate-400">/mês</span>
            </div>
            {applyDiscount && (
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs font-bold mt-2 border border-emerald-500/30">
                    <CheckCircle2 size={12} />
                    Desconto de 15% aplicado
                </div>
            )}
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Breakdown */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <Users size={16} className="text-blue-600"/>
                    Detalhamento por Vida
                </h4>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                    {beneficiaries.length} {beneficiaries.length === 1 ? 'Vida' : 'Vidas'}
                </span>
            </div>

            {beneficiaries.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <p className="text-sm text-slate-400">Nenhum beneficiário selecionado</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {beneficiaries.map((b) => {
                        const cost = calculateCost(b.ageRangeIndex);
                        return (
                            <div key={b.id} className="group flex justify-between items-center p-3 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                                <div>
                                    <div className="font-medium text-slate-800 text-sm flex items-center gap-2">
                                        {b.name}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                        Faixa: {AGE_RANGES[b.ageRangeIndex]}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-slate-700 text-sm">{fmt(cost)}</div>
                                    <div className="text-[10px] text-slate-400">Valor individual</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* Technical Details */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
            <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Resumo do Plano</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="block text-xs text-slate-400 mb-0.5">Plano</span>
                    <span className="font-medium text-slate-700">{planType}</span>
                </div>
                <div>
                    <span className="block text-xs text-slate-400 mb-0.5">Acomodação</span>
                    <span className="font-medium text-slate-700">{accommodation}</span>
                </div>
                <div className="col-span-2 border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="text-slate-500 text-xs">Taxa de Adesão (Única)</span>
                    <span className="font-medium text-slate-700">{fmt(totalAdesao)}</span>
                </div>
            </div>
        </div>

        <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex justify-center items-center gap-2 group"
            onClick={() => window.print()}
        >
            <Printer size={18} className="group-hover:text-blue-100" />
            Imprimir Proposta
        </button>
      </div>
    </div>
  );
};

export default Summary;