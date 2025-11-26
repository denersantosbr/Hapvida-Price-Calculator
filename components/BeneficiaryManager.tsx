import React from 'react';
import { Beneficiary } from '../types';
import { AGE_RANGES } from '../constants';
import { UserPlus, Trash2, Users, User } from 'lucide-react';

interface BeneficiaryManagerProps {
  beneficiaries: Beneficiary[];
  onChange: (list: Beneficiary[]) => void;
}

const BeneficiaryManager: React.FC<BeneficiaryManagerProps> = ({ beneficiaries, onChange }) => {
  
  const addBeneficiary = () => {
    const newBeneficiary: Beneficiary = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Beneficiário ${beneficiaries.length + 1}`,
      ageRangeIndex: 0
    };
    onChange([...beneficiaries, newBeneficiary]);
  };

  const removeBeneficiary = (id: string) => {
    onChange(beneficiaries.filter(b => b.id !== id));
  };

  const updateAge = (id: string, newIndex: number) => {
    onChange(beneficiaries.map(b => b.id === id ? { ...b, ageRangeIndex: newIndex } : b));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">2</div>
          Beneficiários
        </h2>
        <button
          onClick={addBeneficiary}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors text-sm font-semibold"
        >
          <UserPlus size={18} />
          Adicionar
        </button>
      </div>

      {beneficiaries.length === 0 ? (
        <div className="text-center py-12 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200 hover:bg-slate-50 transition-colors">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Users size={32} />
          </div>
          <p className="text-slate-600 font-medium">Nenhum beneficiário adicionado</p>
          <p className="text-sm text-slate-400 mt-1">Clique no botão acima para adicionar vidas ao plano</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {beneficiaries.map((beneficiary, index) => (
            <div key={beneficiary.id} className="relative group bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Identificação</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={beneficiary.name}
                                onChange={(e) => {
                                    const newName = e.target.value;
                                    onChange(beneficiaries.map(b => b.id === beneficiary.id ? { ...b, name: newName } : b));
                                }}
                                placeholder="Nome do beneficiário"
                                className="w-full bg-slate-50 border-0 rounded-lg px-3 py-2.5 text-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all placeholder:text-slate-400"
                            />
                        </div>
                     </div>
                     
                     <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Faixa Etária</label>
                        <div className="relative">
                            <select
                                value={beneficiary.ageRangeIndex}
                                onChange={(e) => updateAge(beneficiary.id, Number(e.target.value))}
                                className="w-full bg-slate-50 border-0 rounded-lg px-3 py-2.5 text-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                {AGE_RANGES.map((range, idx) => (
                                <option key={idx} value={idx}>{range}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                     </div>
                </div>

                <button
                    onClick={() => removeBeneficiary(beneficiary.id)}
                    className="self-center p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Remover beneficiário"
                >
                    <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeneficiaryManager;