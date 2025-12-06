'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { formatDistanceToNow } from 'date-fns';
import {
  MessageSquare,
  Users,
  Package,
  Image,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

export default function RecentActivity() {
  const contacts = useQuery(api.contacts.list, { status: 'new' });
  const leads = useQuery(api.leads.list, { status: 'new' });
  const products = useQuery(api.products.list, { status: 'draft' });
  const gallery = useQuery(api.gallery.list, { status: 'draft' });

  const activities = [
    ...(contacts?.slice(0, 3).map((c) => ({
      type: 'contact' as const,
      title: `New contact from ${c.name}`,
      description: c.message.slice(0, 60) + (c.message.length > 60 ? '...' : ''),
      time: c.createdAt,
      icon: MessageSquare,
      href: '/admin/contacts',
    })) || []),
    ...(leads?.slice(0, 3).map((l) => ({
      type: 'lead' as const,
      title: `New lead: ${l.name}`,
      description: `Interested in ${l.interest}`,
      time: l.createdAt,
      icon: Users,
      href: '/admin/leads',
    })) || []),
    ...(products?.slice(0, 2).map((p) => ({
      type: 'product' as const,
      title: `Product draft: ${p.name}`,
      description: `Category: ${p.category}`,
      time: p.createdAt,
      icon: Package,
      href: '/admin/products',
    })) || []),
    ...(gallery?.slice(0, 2).map((g) => ({
      type: 'gallery' as const,
      title: `Gallery draft: ${g.title}`,
      description: `Category: ${g.category}`,
      time: g.createdAt,
      icon: Image,
      href: '/admin/gallery',
    })) || []),
  ]
    .sort((a, b) => b.time - a.time)
    .slice(0, 8);

  const typeColors = {
    contact: 'bg-purple-100 text-purple-600',
    lead: 'bg-orange-100 text-orange-600',
    product: 'bg-green-100 text-green-600',
    gallery: 'bg-blue-100 text-blue-600',
  };

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <Link
                  key={index}
                  href={activity.href}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(activity.time, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
