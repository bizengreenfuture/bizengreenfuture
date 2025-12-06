'use client';

import { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ImageUploader from './ImageUploader';
import { toast } from 'sonner';

interface GalleryFormProps {
  isOpen: boolean;
  onClose: () => void;
  item?: {
    _id: Id<'gallery'>;
    title: string;
    category: 'supertech' | 'fertilizers' | 'events' | 'impact';
    description: string;
    image: string;
    status: 'draft' | 'published' | 'archived';
  };
}

const getInitialFormData = (item?: GalleryFormProps['item']) => ({
  title: item?.title || '',
  category: item?.category || 'supertech',
  description: item?.description || '',
  image: item?.image || '',
});

export default function GalleryForm({ isOpen, onClose, item }: GalleryFormProps) {
  const { user } = useUser();
  const createGallery = useMutation(api.gallery.create);
  const updateGallery = useMutation(api.gallery.update);

  const [formData, setFormData] = useState(() => getInitialFormData(item));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when item changes or dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(item));
    }
  }, [isOpen, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    try {
      if (item) {
        await updateGallery({
          id: item._id,
          title: formData.title,
          category: formData.category as 'supertech' | 'fertilizers' | 'events' | 'impact',
          description: formData.description,
          image: formData.image,
        });
        toast.success('Gallery item updated successfully');
      } else {
        await createGallery({
          title: formData.title,
          category: formData.category as 'supertech' | 'fertilizers' | 'events' | 'impact',
          description: formData.description,
          image: formData.image,
          createdBy: user.id,
        });
        toast.success('Gallery item created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save gallery item');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {item ? 'Edit Gallery Item' : 'Add Gallery Item'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image */}
          <div className="space-y-2">
            <Label>Image *</Label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              endpoint="galleryUploader"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter image title"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  category: value as 'supertech' | 'fertilizers' | 'events' | 'impact',
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supertech">Supertech</SelectItem>
                <SelectItem value="fertilizers">Fertilizers</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="impact">Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the image"
              rows={3}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
