'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminSidebar from './AdminSidebar';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'admin' | 'editor';
}

export default function MobileSidebar({ isOpen, onClose, userRole = 'editor' }: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-[250px]">
        <AdminSidebar
          isCollapsed={false}
          onToggle={onClose}
          userRole={userRole}
        />
      </SheetContent>
    </Sheet>
  );
}
