"use client";

import { Search, Ban, Unlock } from "lucide-react";
import { useState } from "react";

const MOCK_USERS = [
  { id: 1, name: "Nguyen Tuan", phone: "0901234567", email: "tuan@example.com", status: "active", wallet: "150,000đ" },
  { id: 2, name: "Tran Mai", phone: "0912345678", email: "mai@example.com", status: "banned", wallet: "0đ" },
];

export default function UserManagement() {
  const [users] = useState(MOCK_USERS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
        <p className="text-neutral-400 mt-1">Manage consumers, wallets, and account statuses.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by phone or email..." 
              className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-neutral-900/50 text-xs uppercase border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-medium text-neutral-300">Name</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Contact</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Wallet Balance</th>
                <th className="px-6 py-4 font-medium text-neutral-300">Status</th>
                <th className="px-6 py-4 font-medium text-neutral-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                  <td className="px-6 py-4">
                    <p>{user.phone}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">{user.wallet}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.status === 'active' ? (
                      <button className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors" title="Ban User">
                        <Ban className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-colors" title="Unban">
                        <Unlock className="w-4 h-4" />
                      </button>
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
