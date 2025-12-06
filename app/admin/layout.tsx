'use client';

import { useState, useEffect } from 'react';
import { ClerkProvider, useAuth, useUser, SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import MobileSidebar from '@/components/admin/MobileSidebar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, isLoaded } = useUser();
  
  const upsertUser = useMutation(api.users.upsertUser);
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user?.id ? { clerkId: user.id } : 'skip'
  );

  // Sync user with Convex when they sign in
  useEffect(() => {
    if (isLoaded && user) {
      upsertUser({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: user.fullName || user.firstName || 'User',
        avatar: user.imageUrl,
      });
    }
  }, [isLoaded, user, upsertUser]);

  // Show loading state while checking user
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // Show pending approval screen for users who haven't been approved yet
  if (currentUser.role === 'pending' || !currentUser.isActive) {
    return <PendingApprovalScreen userName={currentUser.name} />;
  }

  const userRole = currentUser.role as 'admin' | 'editor';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={userRole}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userRole={userRole}
      />

      {/* Header */}
      <AdminHeader
        onMenuClick={() => setMobileSidebarOpen(true)}
        isSidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[250px]'
        )}
      >
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

function PendingApprovalScreen({ userName }: { userName: string }) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <Card className="max-w-md w-full border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Awaiting Approval
          </h1>
          <p className="text-gray-600 mb-6">
            Hi <span className="font-medium">{userName}</span>! Your account has been created but needs to be approved by an administrator before you can access the dashboard.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6 border border-yellow-200">
            <p className="text-sm text-gray-600">
              An admin will review your request and assign you a role. You'll be able to access the dashboard once approved.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut({ redirectUrl: '/' })}
            className="border-2 border-gray-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  src="/logo.png"
                  alt="Bizen Green Future"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Bizen Admin</h1>
              <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
            </div>
            <SignIn 
              routing="hash"
              forceRedirectUrl="/admin"
              appearance={{
                elements: {
                  rootBox: 'mx-auto',
                  card: 'shadow-xl border border-gray-100',
                  headerTitle: 'text-gray-900',
                  headerSubtitle: 'text-gray-600',
                  formButtonPrimary: 'bg-green-600 hover:bg-green-700',
                },
              }}
            />
          </div>
        </div>
      </SignedOut>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      afterSignInUrl="/admin"
      afterSignUpUrl="/admin"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthWrapper>{children}</AuthWrapper>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
