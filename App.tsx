
import React, { useState } from 'react';
import PlanSelector from './components/PlanSelector';
import BeneficiaryManager from './components/BeneficiaryManager';
import Summary from './components/Summary';
import { PlanSelection, Beneficiary, Operator } from './types';
import { Activity, Lock, User, ArrowRight, KeyRound, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [selection, setSelection] = useState<PlanSelection>({
    operator: Operator.HAPVIDA, // Default to Hapvida
    region: null,
    contractType: null,
    planName: null,
    selectedVariantId: null,
    dentalPlanId: null,
    applyDiscount: false,
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', name: 'Titular', ageRangeIndex: 4 }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'unipamadm' && password === 'UniHap5008$') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Acesso Negado');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 pb-6 text-center">
             <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <Activity className="text-white" size={24} />
             </div>
             <h1 className="text-xl font-bold text-slate-900">Simulador Unipam</h1>
             <p className="text-slate-400 text-sm mt-1">Acesso Restrito</p>
          </div>

          <form onSubmit={handleLogin} className="px-8 pb-8 space-y-4">
            <div className="space-y-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all placeholder:text-slate-400"
                  placeholder="Usuário"
                />
            </div>
            <div className="space-y-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all placeholder:text-slate-400"
                  placeholder="Senha"
                />
            </div>

            {loginError && <p className="text-red-500 text-xs text-center font-medium">{loginError}</p>}

            <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all text-sm">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-inter text-slate-600">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50/80 backdrop-blur-md bg-white/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    U
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-slate-800 tracking-tight leading-tight">Unipam <span className="font-normal text-slate-400">Simulador</span></span>
                    {selection.operator && <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{selection.operator}</span>}
                </div>
            </div>
            
            <button onClick={handleLogout} className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                SAIR <LogOut size={12}/>
            </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            <div className="flex-1 space-y-6 w-full">
                <PlanSelector 
                    selection={selection} 
                    onChange={setSelection}
                    beneficiariesCount={beneficiaries.length}
                />
                
                <BeneficiaryManager 
                    beneficiaries={beneficiaries} 
                    onChange={setBeneficiaries} 
                />
            </div>

            <div className="lg:w-80 w-full shrink-0">
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
