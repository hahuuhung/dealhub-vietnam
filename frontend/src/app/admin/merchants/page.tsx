"use client";

import { Search, Filter, MoreVertical, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const MOCK_MERCHANTS = [
  { id: 1, name: "Spa VIP 5 Sao", owner: "Nguyen Van A", status: "active", commission: "10%", joined: "2026-05-15" },
  { id: 2, name: "Nha Khoa Nụ Cười", owner: "Tran Thi B", status: "pending", commission: "15%", joined: "2026-06-20" },
  { id: 3, name: "Buffet Hải Sản 68", owner: "Le Van C", status: "suspended", commission: "12%", joined: "2026-01-10" },
];

export default function MerchantManagement() {
  const [merchants] = useState(MOCK_MERCHANTS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Merchant Management</h1>
          <p className="text-neutral-400 mt-1">Approve, reject, and monitor partner businesses.</p>
        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search merchants by name or owner..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white hover:bg-neutral-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-neutral-900/50 text-xs uppercase border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-medium text-neutral-300">Business Name</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Owner</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Status</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Commission</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Joined Date</th>
                <th className="px-6 py-4 font-medium text-neutral-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{merchant.name}</td>
                  <td className="px-6 py-4">{merchant.owner}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      merchant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      merchant.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{merchant.commission}</td>
                  <td className="px-6 py-4">{merchant.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {merchant.status === 'pending' && (
                        <>
                          <button className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-colors" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 text-neutral-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
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
