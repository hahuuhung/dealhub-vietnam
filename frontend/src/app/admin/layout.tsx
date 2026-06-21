import Link from 'next/link';
import { Shield, LayoutDashboard, Users, Store, Tags, CreditCard, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">DealHub Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem href="/admin" icon={<LayoutDashboard />} label="Dashboard" />
          <NavItem href="/admin/merchants" icon={<Store />} label="Merchants" />
          <NavItem href="/admin/users" icon={<Users />} label="Users" />
          <NavItem href="/admin/deals" icon={<Tags />} label="Deals" />
          <NavItem href="/admin/payouts" icon={<CreditCard />} label="Payouts" />
          <NavItem href="/admin/settings" icon={<Settings />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-500" />
            <span className="font-bold">DealHub Admin</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-900">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  // In a real app, use usePathname() to detect active state
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-transparent rounded-lg transition-all"
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
