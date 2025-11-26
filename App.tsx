import React, { useState } from 'react';
import PlanSelector from './components/PlanSelector';
import BeneficiaryManager from './components/BeneficiaryManager';
import Summary from './components/Summary';
import { PlanSelection, Beneficiary, CopartType, PlanType, Segmentation, Accommodation } from './types';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [selection, setSelection] = useState<PlanSelection>({
    copartType: CopartType.TOTAL, // Default to the cheaper/standard one
    planType: PlanType.NOSSO_PLANO,
    segmentation: Segmentation.AMB_HOSP,
    accommodation: Accommodation.ENFERMARIA,
    applyDiscount: false, // User explicitly asked for Table 1 (No Discount) or Table 2 (Discount), implementing as toggle
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', name: 'Titular', ageRangeIndex: 4 } // Default 34-38
  ]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-700">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold leading-tight">Hapvida</h1>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">TABELA DE VENDAS CURITIBA - PR</p>
                </div>
            </div>
            <div className="text-xs text-right text-slate-400 hidden sm:block">
                Vigência: 01/10/2025 - 31/12/2025<br/>
                ANS - nº 34.078-2
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Controls */}
            <div className="flex-1 space-y-6">
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Instruções:</strong> Selecione a modalidade da tabela (Com ou Sem Coparticipação Parcial), configure o plano e adicione os beneficiários para visualizar o orçamento. Use a opção de desconto para simular o valor promocional de 15%.
                    </p>
                </div>

                <PlanSelector 
                    selection={selection} 
                    onChange={setSelection} 
                />
                
                <BeneficiaryManager 
                    beneficiaries={beneficiaries} 
                    onChange={setBeneficiaries} 
                />

                {/* Footer Notes from PDF */}
                <div className="text-xs text-slate-400 space-y-1 mt-8 p-4 border-t border-slate-200">
                    <p className="font-semibold">Notas Legais:</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Taxa de adesão de R$ 15,00 por usuário.</li>
                        <li>O desconto de 15% (se aplicado) incide nas 3 primeiras parcelas.</li>
                        <li>O desconto não incide sobre valores de coparticipação e/ou franquia.</li>
                        <li>Valores sujeitos a alteração conforme regras da ANS e da operadora.</li>
                        <li>Tabela referente a planos Porte I (2 a 15 vidas) e Porte II (16 a 29 vidas).</li>
                    </ul>
                </div>
            </div>

            {/* Right Column: Sticky Summary */}
            <div className="lg:w-96 shrink-0">
                <Summary 
                    selection={selection} 
                    beneficiaries={beneficiaries} 
                />
            </div>

        </div>
      </main>
    </div>
  );
};

export default App;
