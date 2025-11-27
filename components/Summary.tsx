import React, { useState } from 'react';
import { Beneficiary, PlanSelection, ContractType, Operator } from '../types';
import { PRICES, ADESAO_FEE, ODONTO_PRICE_PME, ODONTO_PRICE_INDIVIDUAL_PROMO, AGE_RANGES } from '../constants';
import { Calculator, Users, FileDown, CheckCircle2, ToggleLeft, ToggleRight, PlusCircle, HeartPulse } from 'lucide-react';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface SummaryProps {
  selection: PlanSelection;
  beneficiaries: Beneficiary[];
}

const Summary: React.FC<SummaryProps> = ({ selection, beneficiaries }) => {
  const { copartType, planType, segmentation, accommodation, applyDiscount, contractType, includeOdonto, region, operator } = selection;
  const [includeAdesao, setIncludeAdesao] = useState(false);

  // Determine correct price array
  const opPrices = PRICES[operator];
  const regionPrices = opPrices?.[region];
  const rootPrices = regionPrices?.[contractType];
  const copartPrices = rootPrices?.[copartType];
  const planPrices = copartPrices?.[planType];
  const segPrices = planPrices?.[segmentation];
  const accPrices = segPrices?.[accommodation];

  let pricesArray: number[] = [];
  
  if (operator === Operator.HAPVIDA && contractType === ContractType.INDIVIDUAL) {
      pricesArray = includeOdonto ? accPrices?.withOdonto : accPrices?.withoutOdonto;
  } else {
      pricesArray = accPrices;
  }
  
  pricesArray = pricesArray || [];

  const calculateCost = (ageIndex: number) => {
    let price = pricesArray[ageIndex] || 0;
    
    // MedSenior Specific Logic: If price is 0 (underage in OCR table), it returns 0.
    // Hapvida Discount
    if (operator === Operator.HAPVIDA && applyDiscount) {
      price = price * 0.85; 
    }
    // Select Discount
    if (operator === Operator.SELECT && applyDiscount) {
        price = price * 0.95; // 5% discount
    }

    return price;
  };

  // Calculate Health Total
  const healthTotalMonthly = beneficiaries.reduce((acc, curr) => acc + calculateCost(curr.ageRangeIndex), 0);
  
  // Calculate Odonto Total (Hapvida Only for now)
  let odontoPricePerLife = 0;
  if (operator === Operator.HAPVIDA && includeOdonto) {
      odontoPricePerLife = contractType === ContractType.INDIVIDUAL ? ODONTO_PRICE_INDIVIDUAL_PROMO : ODONTO_PRICE_PME;
  }
  const odontoTotal = beneficiaries.length * odontoPricePerLife;

  // Calculate Fees
  const totalAdesao = beneficiaries.length * ADESAO_FEE;
  
  // Final Total
  const finalTotal = healthTotalMonthly + odontoTotal + (includeAdesao ? totalAdesao : 0);

  // Format currency
  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // @ts-ignore
    const autoTableFn = autoTable.default || autoTable;

    // --- Header ---
    doc.setFillColor(243, 244, 246);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.text(operator, 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text(`Simulação - ${contractType}`, 14, 26);
    doc.text(`${region}`, 14, 30);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 35);

    // --- Plan Configuration ---
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Resumo do Plano", 14, 50);

    const configData = [
      ["Operadora", operator],
      ["Região", region],
      ["Tipo de Contratação", contractType],
      ["Modalidade", selection.copartType],
      ["Plano", selection.planType],
      ["Segmentação", selection.segmentation],
      ["Acomodação", selection.accommodation],
      ["Tabela Promocional", selection.applyDiscount ? "SIM" : "NÃO"],
    ];

    if (operator === Operator.HAPVIDA) {
        configData.push(["Plano Odontológico", selection.includeOdonto ? "INCLUSO" : "NÃO"]);
    }

    autoTableFn(doc, {
      startY: 55,
      body: configData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2, textColor: 50 },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 50, textColor: 0 },
        1: { cellWidth: 'auto' }
      },
    });

    // --- Beneficiaries Table ---
    const lastY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY : 70;
    
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Detalhamento por Vida", 14, lastY + 15);

    const tableRows = beneficiaries.map((b, index) => {
      const health = calculateCost(b.ageRangeIndex);
      return [
        b.name || `Beneficiário ${index + 1}`,
        AGE_RANGES[b.ageRangeIndex],
        includeOdonto ? fmt(health + odontoPricePerLife) : fmt(health)
      ];
    });

    autoTableFn(doc, {
      startY: lastY + 20,
      head: [['Nome', 'Faixa Etária', 'Valor Mensal (Saúde + Odonto)']],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 50 },
        2: { cellWidth: 50, halign: 'right' }
      }
    });

    // --- Totals ---
    const totalsY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : lastY + 50;
    const rightMargin = 196; 

    doc.setFontSize(11);
    doc.setTextColor(50);
    
    let currentY = totalsY;
    
    doc.text(`Saúde Mensal:`, 130, currentY, { align: 'right' });
    doc.text(fmt(healthTotalMonthly), rightMargin, currentY, { align: 'right' });
    currentY += 6;

    if (includeOdonto && operator === Operator.HAPVIDA) {
        doc.text(`Odonto Mensal:`, 130, currentY, { align: 'right' });
        doc.text(fmt(odontoTotal), rightMargin, currentY, { align: 'right' });
        currentY += 6;
    }

    if (includeAdesao) {
      doc.text(`Taxa de Adesão (Única):`, 130, currentY, { align: 'right' });
      doc.text(fmt(totalAdesao), rightMargin, currentY, { align: 'right' });
      currentY += 6;
    }

    currentY += 4;
    doc.setDrawColor(200);
    doc.line(100, currentY - 5, rightMargin, currentY - 5);

    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    const totalLabel = includeAdesao ? "Total 1º Mês:" : "Mensalidade Total:";
    doc.text(totalLabel, 130, currentY, { align: 'right' });
    doc.text(fmt(finalTotal), rightMargin, currentY, { align: 'right' });

    // --- Footer ---
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.setFont("helvetica", "normal");
    
    const footerText = [
      "__________________________________________________________________________",
      "Valores sujeitos a alteração conforme regras da operadora e ANS.",
      "Proposta gerada automaticamente.",
    ];
    
    let footerY = 270;
    footerText.forEach(line => {
      doc.text(line, 105, footerY, { align: 'center' });
      footerY += 5;
    });

    doc.save(`Proposta_${operator}_${region}.pdf`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden sticky top-6 flex flex-col h-fit">
      <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calculator size={100} />
        </div>
        <div className="relative z-10">
            <h3 className="text-lg font-medium text-slate-300 uppercase tracking-widest text-xs mb-1">
                {includeAdesao ? 'Total 1º Mês (Com Adesão)' : 'Mensalidade Total'}
            </h3>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">{fmt(finalTotal)}</span>
                <span className="text-sm font-medium text-slate-400">
                    {includeAdesao ? '/primeiro mês' : '/mês'}
                </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
                {applyDiscount && (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs font-bold border border-emerald-500/30">
                        <CheckCircle2 size={12} />
                        Desconto Aplicado
                    </div>
                )}
                 {includeOdonto && operator === Operator.HAPVIDA && (
                    <div className="inline-flex items-center gap-1.5 bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-xs font-bold border border-pink-500/30">
                        <HeartPulse size={12} />
                        Odonto
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Toggle Adesao */}
        <button
            onClick={() => setIncludeAdesao(!includeAdesao)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${includeAdesao ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    <PlusCircle size={18} />
                </div>
                <div className="text-left">
                    <span className="block text-sm font-semibold text-slate-700">Incluir Taxa de Adesão</span>
                    <span className="text-xs text-slate-500">Adicionar R$ 15,00 por vida ao total</span>
                </div>
            </div>
            <div className={`text-2xl transition-colors ${includeAdesao ? 'text-blue-600' : 'text-slate-300'}`}>
                {includeAdesao ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </div>
        </button>

        {/* Breakdown */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <Users size={16} className="text-blue-600"/>
                    Detalhamento
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
                        const health = calculateCost(b.ageRangeIndex);
                        const totalItem = health + odontoPricePerLife;
                        
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
                                    <div className="font-bold text-slate-700 text-sm">{fmt(totalItem)}</div>
                                    <div className="text-[10px] text-slate-400">
                                        {includeOdonto && operator === Operator.HAPVIDA ? 'Saúde + Odonto' : 'Apenas Saúde'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* Technical Details */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
            <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Composição de Preço</h5>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">Saúde</span>
                    <span className="font-medium text-slate-700">{fmt(healthTotalMonthly)}</span>
                </div>
                {includeOdonto && operator === Operator.HAPVIDA && (
                     <div className="flex justify-between">
                        <span className="text-slate-500">Odonto ({beneficiaries.length}x)</span>
                        <span className="font-medium text-slate-700">{fmt(odontoTotal)}</span>
                    </div>
                )}
                {includeAdesao && (
                    <div className="flex justify-between text-blue-600">
                        <span>Taxa de Adesão</span>
                        <span className="font-bold">{fmt(totalAdesao)}</span>
                    </div>
                )}
            </div>
        </div>

        <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex justify-center items-center gap-2 group"
            onClick={generatePDF}
        >
            <FileDown size={18} className="group-hover:text-blue-100" />
            Gerar Proposta
        </button>
      </div>
    </div>
  );
};

export default Summary;