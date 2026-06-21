"use client";

import { Save } from "lucide-react";

export default function PlatformSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="text-neutral-400 mt-1">Configure global platform parameters and fees.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white">Financial & Fees</h2>
          <p className="text-sm text-neutral-400 mt-1">Set default commission rates for new merchants.</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Default Commission Rate (%)</label>
            <input 
              type="number" 
              defaultValue={10}
              className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
            <p className="text-xs text-neutral-500 mt-1">This will apply to all newly registered merchants.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Minimum Payout Amount (VNĐ)</label>
            <input 
              type="number" 
              defaultValue={500000}
              className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white">Security & Access</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Require Pre-approval for Deals</p>
              <p className="text-sm text-neutral-400">If enabled, all new deals must be approved by an Admin before going live.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
