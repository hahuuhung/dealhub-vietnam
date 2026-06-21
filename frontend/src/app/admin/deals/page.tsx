"use client";

import { Search, Filter, ShieldCheck, EyeOff } from "lucide-react";
import { useState } from "react";

const MOCK_DEALS = [
  { id: 1, title: "Combo Massage Body 90 phút", merchant: "Spa VIP 5 Sao", status: "published", reports: 0, price: "199,000đ" },
  { id: 2, title: "Lấy Cao Răng Siêu Âm", merchant: "Nha Khoa Nụ Cười", status: "pending_review", reports: 0, price: "99,000đ" },
  { id: 3, title: "Buffet Nướng BBQ Không Giới Hạn", merchant: "Buffet Hải Sản 68", status: "hidden", reports: 5, price: "250,000đ" },
];

export default function DealModeration() {
  const [deals] = useState(MOCK_DEALS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Deal Moderation</h1>
        <p className="text-neutral-400 mt-1">Review content, manage reports, and ensure quality.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search deals by title..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-neutral-900/50 text-xs uppercase border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-medium text-neutral-300">Deal Title</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Merchant</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Price</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Status</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Reports</th>
                <th className="px-6 py-4 font-medium text-neutral-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{deal.title}</td>
                  <td className="px-6 py-4">{deal.merchant}</td>
                  <td className="px-6 py-4">{deal.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      deal.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      deal.status === 'pending_review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {deal.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {deal.reports > 0 ? (
                      <span className="text-rose-500 font-bold">{deal.reports}</span>
                    ) : "0"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-colors" title="Force Publish">
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors" title="Hide/Remove">
                        <EyeOff className="w-4 h-4" />
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
