'use client';

import { usePathname } from 'next/navigation';
import { useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { Menu, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import NotificationBell from './NotificationBell';

interface AdminHeaderProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
}

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/gallery': 'Gallery',
  '/admin/contacts': 'Contacts',
  '/admin/leads': 'Leads',
  '/admin/partners': 'Partners',
  '/admin/team': 'Team Management',
  '/admin/settings': 'Settings',
};

export default function AdminHeader({ onMenuClick, isSidebarCollapsed }: AdminHeaderProps) {
  const pathname = usePathname();
  const { user } = useUser();
  
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user?.id ? { clerkId: user.id } : 'skip'
  );
  
  const currentPage = pageTitles[pathname] || 'Admin';
  const pathSegments = pathname.split('/').filter(Boolean);
  const userRole = (currentUser?.role === 'admin' || currentUser?.role === 'editor') 
    ? currentUser.role 
    : 'editor';

  return (
    <header
      className={`fixed top-0 right-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 transition-all duration-300 left-0 md:left-[250px] ${
        isSidebarCollapsed ? 'md:left-[70px]' : 'md:left-[250px]'
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumbs */}
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                  Admin
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.length > 1 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-gray-900">
                    {currentPage}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Mobile title */}
        <h1 className="md:hidden font-semibold text-gray-900">{currentPage}</h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Back to site */}
        <Link href="/">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Site
          </Button>
        </Link>

        {/* Notifications */}
        <NotificationBell userRole={userRole} />

        {/* User Menu */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-9 w-9',
            },
          }}
        />
      </div>
    </header>
  );
}
