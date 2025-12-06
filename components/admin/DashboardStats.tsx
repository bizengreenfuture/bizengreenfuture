'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  Package,
  Image,
  MessageSquare,
  Users,
  Handshake,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'green' | 'blue' | 'purple' | 'orange' | 'red';
}

function StatCard({ title, value, description, icon: Icon, trend, color }: StatCardProps) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  const iconBgClasses = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
    red: 'bg-red-100',
  };

  return (
    <Card className={`border-2 ${colorClasses[color]}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${!trend.isPositive && 'rotate-180'}`} />
            <span>{trend.isPositive ? '+' : ''}{trend.value}% from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card className="border-2 border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardContent>
    </Card>
  );
}

export default function DashboardStats() {
  const productCounts = useQuery(api.products.getCounts);
  const galleryCounts = useQuery(api.gallery.getCounts);
  const contactCounts = useQuery(api.contacts.getCounts);
  const leadCounts = useQuery(api.leads.getCounts);
  const partnerCounts = useQuery(api.partners.getCount);

  const isLoading = !productCounts || !galleryCounts || !contactCounts || !leadCounts || !partnerCounts;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={productCounts.total}
          description={`${productCounts.published} published`}
          icon={Package}
          color="green"
        />
        <StatCard
          title="Gallery Items"
          value={galleryCounts.total}
          description={`${galleryCounts.published} published`}
          icon={Image}
          color="blue"
        />
        <StatCard
          title="New Contacts"
          value={contactCounts.new}
          description={`${contactCounts.lastSevenDays} in last 7 days`}
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Active Leads"
          value={leadCounts.new + leadCounts.contacted + leadCounts.qualified}
          description={`${leadCounts.converted} converted`}
          icon={Users}
          color="orange"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Draft Products"
          value={productCounts.draft}
          description="Pending review"
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Partners"
          value={partnerCounts.active}
          description={`of ${partnerCounts.total} total`}
          icon={Handshake}
          color="green"
        />
        <StatCard
          title="Responded"
          value={contactCounts.responded}
          description="Contact inquiries"
          icon={CheckCircle}
          color="blue"
        />
        <StatCard
          title="Qualified Leads"
          value={leadCounts.qualified}
          description="Ready for conversion"
          icon={TrendingUp}
          color="purple"
        />
      </div>
    </div>
  );
}
