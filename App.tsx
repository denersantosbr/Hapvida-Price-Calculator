import React, { useState } from 'react';
import PlanSelector from './components/PlanSelector';
import BeneficiaryManager from './components/BeneficiaryManager';
import Summary from './components/Summary';
import { PlanSelection, Beneficiary, CopartType, PlanType, Segmentation, Accommodation, ContractType } from './types';
import { Activity, Lock, User, ArrowRight, KeyRound, LogOut } from 'lucide-react';

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // App State
  const [selection, setSelection] = useState<PlanSelection>({
    contractType: ContractType.PME,
    copartType: CopartType.TOTAL,
    planType: PlanType.NOSSO_PLANO,
    segmentation: Segmentation.AMB_HOSP,
    accommodation: Accommodation.ENFERMARIA,
    applyDiscount: false,
    includeOdonto: false
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', name: 'Titular', ageRangeIndex: 4 } // Default 34-38
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'unipamadm' && password === 'UniHap5008$') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
             <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  <Activity size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Acesso Restrito</h1>
                <p className="text-blue-100 text-sm">Simulador Hapvida Curitiba</p>
             </div>
             {/* Decorative circles */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-2xl"></div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Usuário</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
                <Lock size={16} />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex justify-center items-center gap-2 group"
            >
              Entrar no Sistema
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4">
              Acesso exclusivo para administradores autorizados.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
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
            
            <div className="flex items-center gap-6">
              <div className="text-xs text-right text-slate-400 hidden sm:block">
                  Vigência: 01/10/2025 - 31/12/2025<br/>
                  ANS - nº 34.078-2
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-3 py-2 rounded-lg"
                title="Sair"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sair</span>
              </button>
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
                        <strong>Instruções:</strong> Escolha entre PME ou Individual. Para Individual, a inclusão do Plano Odontológico pode reduzir o valor da mensalidade de saúde (Tabela Médica 1).
                    </p>
                </div>

                <PlanSelector 
                    selection={selection} 
                    onChange={setSelection}
                    beneficiaries={beneficiaries}
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
                        <li>O desconto promocional de 15% (se aplicado) incide nas 3 primeiras parcelas.</li>
                        <li><strong>Individual:</strong> Tabela com Odonto (Médica 1) aplicável mediante contratação conjunta.</li>
                        <li><strong>PME:</strong> Tabela referente a planos Porte I (2 a 15 vidas) e Porte II (16 a 29 vidas).</li>
                        <li>Valores sujeitos a alteração conforme regras da ANS e da operadora.</li>
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