"use client";

import { CheckCircle, XCircle, Search, Download } from "lucide-react";
import { useState } from "react";

const MOCK_PAYOUTS = [
  { id: "PAY-1001", merchant: "Spa VIP 5 Sao", amount: "12,500,000đ", bank: "Vietcombank - 0123456789", status: "pending", date: "2026-06-20" },
  { id: "PAY-1002", merchant: "Nha Khoa Nụ Cười", amount: "5,000,000đ", bank: "Techcombank - 9876543210", status: "completed", date: "2026-06-18" },
];

export default function PayoutManagement() {
  const [payouts] = useState(MOCK_PAYOUTS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Payouts & Finance</h1>
          <p className="text-neutral-400 mt-1">Manage withdrawal requests and platform financial records.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <p className="text-neutral-400 font-medium text-sm">Pending Payouts</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">12,500,000đ</p>
          <p className="text-sm text-neutral-500 mt-1">1 request requires action</p>
        </div>
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <p className="text-neutral-400 font-medium text-sm">Total Disbursed (This Month)</p>
          <p className="text-3xl font-bold text-emerald-500 mt-2">145,800,000đ</p>
        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by ID or Merchant..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-neutral-900/50 text-xs uppercase border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-medium text-neutral-300">Request ID</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Merchant</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Amount</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Bank Details</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Status</th>
                <th className="px-6 py-4 font-medium text-neutral-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{p.id}</td>
                  <td className="px-6 py-4">{p.merchant}</td>
                  <td className="px-6 py-4 text-white font-bold">{p.amount}</td>
                  <td className="px-6 py-4">{p.bank}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors text-xs font-medium">
                          Mark Paid
                        </button>
                        <button className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
