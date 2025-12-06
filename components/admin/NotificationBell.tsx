'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import {
  Bell,
  Check,
  CheckCheck,
  User,
  Mail,
  Target,
  FileText,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Icon mapping for notification types
const notificationIcons: Record<string, React.ReactNode> = {
  user_pending: <User className="h-4 w-4 text-yellow-600" />,
  user_approved: <Check className="h-4 w-4 text-green-600" />,
  contact_new: <Mail className="h-4 w-4 text-blue-600" />,
  lead_new: <Target className="h-4 w-4 text-purple-600" />,
  lead_assigned: <Target className="h-4 w-4 text-orange-600" />,
  content_published: <FileText className="h-4 w-4 text-green-600" />,
};

// Background colors for notification types
const notificationBgColors: Record<string, string> = {
  user_pending: 'bg-yellow-50',
  user_approved: 'bg-green-50',
  contact_new: 'bg-blue-50',
  lead_new: 'bg-purple-50',
  lead_assigned: 'bg-orange-50',
  content_published: 'bg-green-50',
};

interface NotificationBellProps {
  userRole: 'admin' | 'editor';
}

export default function NotificationBell({ userRole }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const notifications = useQuery(
    api.notifications.getForUser,
    user?.id ? { clerkId: user.id, role: userRole, limit: 20 } : 'skip'
  );

  const unreadCount = useQuery(
    api.notifications.getUnreadCount,
    user?.id ? { clerkId: user.id, role: userRole } : 'skip'
  );

  const markAsRead = useMutation(api.notifications.markAsRead);
  const markAllAsRead = useMutation(api.notifications.markAllAsRead);
  const removeNotification = useMutation(api.notifications.remove);

  const handleMarkAllAsRead = async () => {
    if (user?.id) {
      await markAllAsRead({ clerkId: user.id, role: userRole });
    }
  };

  const handleNotificationClick = async (notificationId: string, link?: string) => {
    await markAsRead({ id: notificationId as any });
    if (link) {
      setIsOpen(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent, notificationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await removeNotification({ id: notificationId as any });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount !== undefined && unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 md:w-96 p-0" 
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount !== undefined && unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs text-green-600 hover:text-green-700 h-8"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {!notifications || notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No notifications yet</p>
              <p className="text-gray-400 text-xs mt-1">
                You'll see updates here when something happens
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={cn(
                    'group relative px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer',
                    !notification.isRead && 'bg-blue-50/50'
                  )}
                  onClick={() => handleNotificationClick(notification._id, notification.link)}
                >
                  {notification.link ? (
                    <Link href={notification.link} className="block">
                      <NotificationContent notification={notification} />
                    </Link>
                  ) : (
                    <NotificationContent notification={notification} />
                  )}
                  
                  {/* Remove button */}
                  <button
                    onClick={(e) => handleRemove(e, notification._id)}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                    aria-label="Remove notification"
                  >
                    <X className="h-3.5 w-3.5 text-gray-400" />
                  </button>

                  {/* Unread indicator */}
                  {!notification.isRead && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

function NotificationContent({ notification }: { notification: any }) {
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          notificationBgColors[notification.type] || 'bg-gray-100'
        )}
      >
        {notificationIcons[notification.type] || <Bell className="h-4 w-4 text-gray-500" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate pr-6">
          {notification.title}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
