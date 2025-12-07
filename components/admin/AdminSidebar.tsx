'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Handshake,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userRole?: 'admin' | 'editor';
  onNavigate?: () => void; // Called when a nav link is clicked (for mobile close)
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['admin', 'editor'],
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
    roles: ['admin', 'editor'],
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    icon: ImageIcon,
    roles: ['admin', 'editor'],
  },
  {
    title: 'Contacts',
    href: '/admin/contacts',
    icon: MessageSquare,
    roles: ['admin', 'editor'],
  },
  {
    title: 'Leads',
    href: '/admin/leads',
    icon: Users,
    roles: ['admin', 'editor'],
  },
  {
    title: 'Partners',
    href: '/admin/partners',
    icon: Handshake,
    roles: ['admin'],
  },
  {
    title: 'Team',
    href: '/admin/team',
    icon: Shield,
    roles: ['admin'],
  },
];

export default function AdminSidebar({ isCollapsed, onToggle, userRole = 'editor', onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const filteredItems = menuItems.filter((item) => item.roles.includes(userRole));

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
        isCollapsed ? 'w-[70px]' : 'w-[250px]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Bizen"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-gray-900">Bizen Admin</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 relative mx-auto">
            <Image
              src="/logo.png"
              alt="Bizen"
              fill
              className="object-contain"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn('h-8 w-8', isCollapsed && 'hidden')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Toggle button when collapsed */}
      {isCollapsed && (
        <div className="px-3 py-2 border-b border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-full h-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Role Badge */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-gray-100">
          <Badge
            variant={userRole === 'admin' ? 'default' : 'secondary'}
            className={cn(
              'text-xs',
              userRole === 'admin'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-100 text-blue-700'
            )}
          >
            {userRole === 'admin' ? 'Admin' : 'Editor'}
          </Badge>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                isCollapsed && 'justify-center px-2'
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  isActive ? 'text-green-600' : 'text-gray-400'
                )}
              />
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={() => signOut({ redirectUrl: '/' })}
          className={cn(
            'w-full text-gray-600 hover:text-red-600 hover:bg-red-50',
            isCollapsed ? 'justify-center px-2' : 'justify-start'
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}
