'use client';

import { useRouter, usePathname } from 'next/navigation';
import { HomeIcon, BarChart2, ShoppingBag, LayoutGrid, Settings, Store } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Products', path: '/dashboard/products', icon: LayoutGrid },
  { name: 'Storefront', path: '/dashboard/storefront', icon: Store },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <Image src="/logo.png" alt="Briklyst Logo" width={32} height={32} className="rounded" />
        <span className="font-bold text-lg tracking-tight">Briklyst</span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-2">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-all
              ${pathname === item.path
                ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <item.icon className={`h-5 w-5 ${pathname === item.path ? 'text-white' : 'text-gray-400'}`} />
            {item.name}
          </button>
        ))}
      </nav>
      {/* View My Storefront Button */}
      <div className="px-6 py-6 mt-auto">
        <Button
          className="w-full py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 shadow-md hover:from-orange-500 hover:to-pink-600"
          onClick={() => router.push('/storefronts/' + (session?.user?.name || ''))}
        >
          View My Storefront
        </Button>
      </div>
    </aside>
  );
} 