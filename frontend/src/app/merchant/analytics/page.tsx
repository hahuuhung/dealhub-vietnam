"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Filter, Download } from 'lucide-react';

export default function MerchantAnalytics() {
  const [data, setData] = useState<{ funnel: any[], retention: any[] } | null>(null);

  useEffect(() => {
    api.get('/analytics/advanced').then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <div className="p-8 text-neutral-400">Loading AI insights...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Advanced Analytics & AI Insights</h1>
          <p className="text-neutral-500">Phân tích chuyên sâu hành vi khách hàng</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium">
            <Filter className="w-4 h-4" /> 30 Ngày qua
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Download className="w-4 h-4" /> Xuất Báo Cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 dark:text-white">Phễu Chuyển Đổi (Conversion Funnel)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.funnel} layout="vertical" margin={{ left: 50, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="step" type="category" stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                <Bar dataKey="count" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <p className="text-sm text-indigo-800 dark:text-indigo-300">
              <span className="font-bold">AI Insight:</span> Tỉ lệ rớt từ "Click xem Deal" sang "Thêm vào giỏ" là 73%. Bạn nên tối ưu lại hình ảnh mô tả Deal hoặc thêm các Highlight nổi bật hơn.
            </p>
          </div>
        </div>

        {/* Retention Chart */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 dark:text-white">Tỉ lệ giữ chân (Customer Retention)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.retention} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="cohort" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <span className="font-bold">AI Insight:</span> Nhóm khách hàng Tuần 2 giảm mạnh (45%). Hãy thiết lập chiến dịch gửi thông báo Push Notification (Voucher 10%) để lôi kéo họ quay lại.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
