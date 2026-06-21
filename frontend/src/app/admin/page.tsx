"use client";

import { Activity, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000, commission: 240 },
  { name: 'Feb', revenue: 3000, commission: 139 },
  { name: 'Mar', revenue: 2000, commission: 980 },
  { name: 'Apr', revenue: 2780, commission: 390 },
  { name: 'May', revenue: 1890, commission: 480 },
  { name: 'Jun', revenue: 2390, commission: 380 },
  { name: 'Jul', revenue: 3490, commission: 430 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Platform Overview</h1>
        <p className="text-neutral-400 mt-1">Monitor your DealHub ecosystem in real-time.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total GMV" 
          value="452,000,000đ" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<DollarSign className="w-6 h-6 text-emerald-500" />} 
        />
        <MetricCard 
          title="Platform Commission" 
          value="45,200,000đ" 
          trend="+15.2%" 
          trendUp={true} 
          icon={<TrendingUp className="w-6 h-6 text-indigo-500" />} 
        />
        <MetricCard 
          title="Active Merchants" 
          value="1,245" 
          trend="+4.3%" 
          trendUp={true} 
          icon={<Store className="w-6 h-6 text-blue-500" />} 
        />
        <MetricCard 
          title="Total Consumers" 
          value="45,892" 
          trend="-0.5%" 
          trendUp={false} 
          icon={<Users className="w-6 h-6 text-rose-500" />} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Revenue vs Commission (7 Months)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" tick={{fill: '#737373'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#737373" tick={{fill: '#737373'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e5e5' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="commission" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCom)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Large Transactions</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Order #100{i}</p>
                    <p className="text-neutral-400 text-xs">Spa VIP 5 Sao</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-sm">+2,500,000đ</p>
                  <p className="text-neutral-500 text-xs">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: any) {
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-400 font-medium text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="p-3 bg-neutral-900 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={`flex items-center font-medium ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trendUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-neutral-500">vs last month</span>
      </div>
    </div>
  );
}

// Temporary import for Store icon
function Store(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
