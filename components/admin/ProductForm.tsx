'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { X, Plus, Trash2 } from 'lucide-react';
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

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    _id: Id<'products'>;
    name: string;
    category: 'supertech' | 'fertilizers' | 'feed';
    description: string;
    shortDescription?: string;
    price?: string;
    image?: string;
    benefits?: string[];
    specifications?: { label: string; value: string }[];
    status: 'draft' | 'published' | 'archived';
  };
}

export default function ProductForm({ isOpen, onClose, product }: ProductFormProps) {
  const { user } = useUser();
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'supertech',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    price: product?.price || '',
    image: product?.image || '',
    benefits: product?.benefits || [''],
    specifications: product?.specifications || [{ label: '', value: '' }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const cleanedBenefits = formData.benefits.filter((b) => b.trim() !== '');
      const cleanedSpecs = formData.specifications.filter(
        (s) => s.label.trim() !== '' && s.value.trim() !== ''
      );

      if (product) {
        await updateProduct({
          id: product._id,
          name: formData.name,
          category: formData.category as 'supertech' | 'fertilizers' | 'feed',
          description: formData.description,
          shortDescription: formData.shortDescription || undefined,
          price: formData.price || undefined,
          image: formData.image || undefined,
          benefits: cleanedBenefits.length > 0 ? cleanedBenefits : undefined,
          specifications: cleanedSpecs.length > 0 ? cleanedSpecs : undefined,
        });
        toast.success('Product updated successfully');
      } else {
        await createProduct({
          name: formData.name,
          category: formData.category as 'supertech' | 'fertilizers' | 'feed',
          description: formData.description,
          shortDescription: formData.shortDescription || undefined,
          price: formData.price || undefined,
          image: formData.image || undefined,
          benefits: cleanedBenefits.length > 0 ? cleanedBenefits : undefined,
          specifications: cleanedSpecs.length > 0 ? cleanedSpecs : undefined,
          createdBy: user.id,
        });
        toast.success('Product created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { label: '', value: '' }],
    });
  };

  const removeSpecification = (index: number) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index),
    });
  };

  const updateSpecification = (index: number, field: 'label' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as 'supertech' | 'fertilizers' | 'feed' })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supertech">Supertech</SelectItem>
                  <SelectItem value="fertilizers">Fertilizers</SelectItem>
                  <SelectItem value="feed">Animal Feed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief description for listings"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (optional)</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g., Contact for pricing, UGX 500,000"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Benefits</Label>
              <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                <Plus className="h-4 w-4 mr-1" />
                Add Benefit
              </Button>
            </div>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder="Enter a benefit"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Specifications</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-1" />
                Add Spec
              </Button>
            </div>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={spec.label}
                  onChange={(e) => updateSpecification(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="flex-1"
                />
                <Input
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
