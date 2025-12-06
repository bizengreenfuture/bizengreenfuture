'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, Image, Users, Handshake } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useUser();
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user?.id ? { clerkId: user.id } : 'skip'
  );

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'User'}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your content today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              New Product
            </Button>
          </Link>
          <Link href="/admin/gallery">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add to Gallery
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/products" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-3 text-green-600" />
                Manage Products
              </Button>
            </Link>
            <Link href="/admin/gallery" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Image className="h-4 w-4 mr-3 text-blue-600" />
                Manage Gallery
              </Button>
            </Link>
            <Link href="/admin/leads" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-3 text-orange-600" />
                View Leads
              </Button>
            </Link>
            {isAdmin && (
              <Link href="/admin/partners" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Handshake className="h-4 w-4 mr-3 text-purple-600" />
                  Manage Partners
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity - spans 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Role Info */}
      {!isAdmin && (
        <Card className="border-2 border-blue-100 bg-blue-50">
          <CardContent className="py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Editor Access</p>
                <p className="text-sm text-blue-700">
                  You can create and edit content. Contact an admin to publish your changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
