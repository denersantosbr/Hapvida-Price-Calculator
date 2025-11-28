
import React from 'react';
import { Beneficiary, PlanSelection } from '../types';
import { ALL_PLANS, AGE_RANGES, ADESAO_FEE } from '../constants';
import { FileDown, Users, Tag } from 'lucide-react';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface SummaryProps {
  selection: PlanSelection;
  beneficiaries: Beneficiary[];
}

const Summary: React.FC<SummaryProps> = ({ selection, beneficiaries }) => {
  
  // Find current plan data from flat list
  const variant = selection.selectedVariantId 
    ? ALL_PLANS.find(p => p.id === selection.selectedVariantId) 
    : null;

  // Find correct price table based on total lives (Volume Pricing)
  const getPriceTable = () => {
      if (!variant) return null;
      const count = beneficiaries.length || 1;
      return variant.priceTables.find(t => count >= t.min_lives && count <= t.max_lives) || variant.priceTables[0];
  };

  const activePriceTable = getPriceTable();

  const calculateCost = (ageIndex: number) => {
    if (!activePriceTable) return 0;
    let price = activePriceTable.prices[ageIndex] || 0;
    
    // Apply 15% discount if enabled and available
    if (selection.applyDiscount && variant?.discountAvailable) {
        price = price * 0.85; // 15% off
    }
    return price;
  };

  // Calculate Totals
  const healthTotalMonthly = beneficiaries.reduce((acc, curr) => acc + calculateCost(curr.ageRangeIndex), 0);
  
  // Format currency
  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const generatePDF = () => {
    if (!variant) return;
    const doc = new jsPDF();
    // @ts-ignore
    const autoTableFn = autoTable.default || autoTable;

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(selection.operator || "Proposta", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(selection.region || "Paraná", 14, 26);
    doc.text("Simulação de Plano de Saúde", 150, 18);
    doc.text(new Date().toLocaleDateString(), 150, 23);

    // Plan Info
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.text("Resumo da Contratação", 14, 45);
    
    const infoData = [
        ["Operadora", selection.operator || "-"],
        ["Região", selection.region || "-"],
        ["Plano", variant.planName],
        ["Segmentação", variant.segmentation],
        ["Acomodação", variant.accommodation],
        ["Coparticipação", variant.coparticipation],
        ["Vidas", beneficiaries.length.toString()]
    ];

    if (selection.applyDiscount) {
        infoData.push(["Condição", "COM DESCONTO PROMOCIONAL 15%"]);
    }

    autoTableFn(doc, {
        startY: 50,
        body: infoData,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 1 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
    });

    // Beneficiaries
    const lastY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("Detalhamento de Vidas", 14, lastY);

    const rows = beneficiaries.map((b, i) => [
        b.name,
        AGE_RANGES[b.ageRangeIndex],
        fmt(calculateCost(b.ageRangeIndex))
    ]);

    autoTableFn(doc, {
        startY: lastY + 5,
        head: [['Nome', 'Idade', 'Valor']],
        body: rows,
        theme: 'striped',
        headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
        styles: { textColor: 50 }
    });

    // Totals
    const totalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Mensal: ${fmt(healthTotalMonthly)}`, 140, totalY, { align: 'right' });
    
    if (selection.applyDiscount) {
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(0, 150, 0);
        doc.text("* Valor com desconto aplicado nas primeiras mensalidades.", 140, totalY + 6, { align: 'right' });
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150);
    doc.text("Valores estimados sujeitos a alteração e análise de crédito. Válido para Out/2025.", 105, 280, { align: 'center' });

    doc.save("simulacao_saude.pdf");
  };

  if (!variant) return <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center text-slate-400">Selecione um plano para ver o resumo.</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden sticky top-6">
      <div className="bg-slate-900 p-6 text-white relative">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">
            Mensalidade Estimada
        </h3>
        <div className="flex items-end gap-2">
            <div className="text-4xl font-bold tracking-tight">{fmt(healthTotalMonthly)}</div>
            {selection.applyDiscount && (
                <div className="mb-2 text-green-400 bg-green-900/30 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                    <Tag size={10} /> -15%
                </div>
            )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-500">Plano</span>
                <span className="font-bold text-slate-800 text-right">{variant.planName}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-500">Região</span>
                <span className="font-medium text-slate-700">{selection.region}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-500">Acomodação</span>
                <span className="font-medium text-slate-700">{variant.accommodation}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-500">Vidas</span>
                <div className="flex items-center gap-2">
                    <Users size={14} className="text-slate-400"/>
                    <span className="font-medium text-slate-700">{beneficiaries.length}</span>
                </div>
            </div>
        </div>

        <button 
            onClick={generatePDF}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
            <FileDown size={20} />
            Baixar Proposta PDF
        </button>
      </div>
    </div>
  );
};

export default Summary;
