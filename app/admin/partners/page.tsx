'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import {
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  Handshake,
  ExternalLink,
  Eye,
  EyeOff,
  GripVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';
import Image from 'next/image';

export default function PartnersPage() {
  const { user } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [deletePartnerId, setDeletePartnerId] = useState<Id<'partners'> | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: '',
  });

  const partners = useQuery(api.partners.list);
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user?.id ? { clerkId: user.id } : 'skip'
  );

  const createPartner = useMutation(api.partners.create);
  const updatePartner = useMutation(api.partners.update);
  const toggleActive = useMutation(api.partners.toggleActive);
  const deletePartner = useMutation(api.partners.remove);

  const isAdmin = currentUser?.role === 'admin';

  // Redirect if not admin
  if (currentUser && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="border-2 border-red-100 bg-red-50 max-w-md">
          <CardContent className="py-8 text-center">
            <Handshake className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-red-900 mb-2">Access Denied</h3>
            <p className="text-red-700">
              Only admins can manage partners. Contact an admin for access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const openForm = (partner?: any) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        logo: partner.logo,
        website: partner.website || '',
        description: partner.description || '',
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        logo: '',
        website: '',
        description: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.logo) {
      toast.error('Please upload a logo');
      return;
    }
    try {
      if (editingPartner) {
        await updatePartner({
          id: editingPartner._id,
          name: formData.name,
          logo: formData.logo,
          website: formData.website || undefined,
          description: formData.description || undefined,
        });
        toast.success('Partner updated successfully');
      } else {
        await createPartner({
          name: formData.name,
          logo: formData.logo,
          website: formData.website || undefined,
          description: formData.description || undefined,
        });
        toast.success('Partner added successfully');
      }
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to save partner');
    }
  };

  const handleToggleActive = async (id: Id<'partners'>) => {
    try {
      await toggleActive({ id });
      toast.success('Partner status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deletePartnerId) return;
    try {
      await deletePartner({ id: deletePartnerId });
      toast.success('Partner deleted');
      setDeletePartnerId(null);
    } catch (error) {
      toast.error('Failed to delete partner');
    }
  };

  if (!partners) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-600">Manage your official partners and their logos</p>
        </div>
        <Button onClick={() => openForm()} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Partners Grid */}
      {partners?.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="py-12 text-center">
            <Handshake className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No partners yet</h3>
            <p className="text-gray-500 mb-4">Add your first partner to display on the website</p>
            <Button onClick={() => openForm()} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners?.map((partner) => (
            <Card
              key={partner._id}
              className={`group overflow-hidden border-2 transition-colors ${
                partner.isActive
                  ? 'border-gray-100 hover:border-green-200'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {/* Logo */}
              <div className="relative h-32 bg-white flex items-center justify-center p-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    className={
                      partner.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {partner.isActive ? 'Active' : 'Hidden'}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openForm(partner)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(partner._id)}>
                        {partner.isActive ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show
                          </>
                        )}
                      </DropdownMenuItem>
                      {partner.website && (
                        <DropdownMenuItem asChild>
                          <a href={partner.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeletePartnerId(partner._id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 border-t">
                <h3 className="font-semibold text-gray-900 truncate">{partner.name}</h3>
                {partner.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {partner.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Partner Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPartner ? 'Edit Partner' : 'Add Partner'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Logo *</Label>
              <ImageUploader
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                endpoint="partnerLogoUploader"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Partner Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Supertech Italia"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the partnership"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePartnerId} onOpenChange={() => setDeletePartnerId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Partner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this partner? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
