'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Image as ImageIcon,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import GalleryForm from '@/components/admin/GalleryForm';
import { toast } from 'sonner';
import Image from 'next/image';

type GalleryStatus = 'draft' | 'published' | 'archived';
type GalleryCategory = 'supertech' | 'fertilizers' | 'events' | 'impact';

export default function GalleryPage() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<GalleryStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<GalleryCategory | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteItemId, setDeleteItemId] = useState<Id<'gallery'> | null>(null);

  const galleryItems = useQuery(api.gallery.list, {});
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user?.id ? { clerkId: user.id } : 'skip'
  );

  const publishItem = useMutation(api.gallery.publish);
  const unpublishItem = useMutation(api.gallery.unpublish);
  const archiveItem = useMutation(api.gallery.archive);
  const deleteItem = useMutation(api.gallery.remove);

  const isAdmin = currentUser?.role === 'admin';

  const filteredItems = galleryItems?.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handlePublish = async (id: Id<'gallery'>) => {
    if (!user) return;
    try {
      await publishItem({ id, publishedBy: user.id });
      toast.success('Item published successfully');
    } catch (error) {
      toast.error('Failed to publish item');
    }
  };

  const handleUnpublish = async (id: Id<'gallery'>) => {
    try {
      await unpublishItem({ id });
      toast.success('Item unpublished');
    } catch (error) {
      toast.error('Failed to unpublish item');
    }
  };

  const handleArchive = async (id: Id<'gallery'>) => {
    try {
      await archiveItem({ id });
      toast.success('Item archived');
    } catch (error) {
      toast.error('Failed to archive item');
    }
  };

  const handleDelete = async () => {
    if (!deleteItemId) return;
    try {
      await deleteItem({ id: deleteItemId });
      toast.success('Item deleted');
      setDeleteItemId(null);
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    published: 'bg-green-100 text-green-700 border-green-200',
    archived: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const categoryColors = {
    supertech: 'bg-blue-100 text-blue-700',
    fertilizers: 'bg-green-100 text-green-700',
    events: 'bg-purple-100 text-purple-700',
    impact: 'bg-orange-100 text-orange-700',
  };

  if (!galleryItems) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600">Manage your image gallery</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search gallery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as GalleryStatus | 'all')}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value as GalleryCategory | 'all')}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="supertech">Supertech</SelectItem>
            <SelectItem value="fertilizers">Fertilizers</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="impact">Impact</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      {filteredItems?.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first image'}
            </p>
            <Button
              onClick={() => {
                setEditingItem(null);
                setIsFormOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems?.map((item) => (
            <Card
              key={item._id}
              className="group overflow-hidden border-2 border-gray-100 hover:border-green-200 transition-colors"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9"
                    onClick={() => {
                      setEditingItem(item);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-9 w-9"
                    onClick={() => setDeleteItemId(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={statusColors[item.status]}>
                    {item.status}
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
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingItem(item);
                          setIsFormOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {isAdmin && item.status === 'draft' && (
                        <DropdownMenuItem onClick={() => handlePublish(item._id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      {isAdmin && item.status === 'published' && (
                        <DropdownMenuItem onClick={() => handleUnpublish(item._id)}>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Unpublish
                        </DropdownMenuItem>
                      )}
                      {item.status !== 'archived' && (
                        <DropdownMenuItem onClick={() => handleArchive(item._id)}>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteItemId(item._id)}
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
              <CardContent className="p-3">
                <h3 className="font-medium text-gray-900 truncate text-sm">
                  {item.title}
                </h3>
                <Badge
                  variant="secondary"
                  className={`mt-1 text-xs ${categoryColors[item.category]}`}
                >
                  {item.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Gallery Form Dialog */}
      <GalleryForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        item={editingItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteItemId} onOpenChange={() => setDeleteItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
