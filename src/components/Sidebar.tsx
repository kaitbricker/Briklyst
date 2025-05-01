'use client';

import { useRouter, usePathname } from 'next/navigation';
import { HomeIcon, ChartBarIcon, CogIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useStorefront } from '@/hooks/useStorefront';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Storefront Customization', path: '/dashboard/storefront', icon: ShoppingBagIcon },
  { name: 'Analytics', path: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Settings', path: '/dashboard/settings', icon: CogIcon },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { storefront } = useStorefront();

  const handleNavigation = (path: string) => {
    if (path === '/dashboard/storefront' && !storefront) {
      router.push('/dashboard/settings');
      return;
    }
    router.push(path);
  };

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      pathname === item.path ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 