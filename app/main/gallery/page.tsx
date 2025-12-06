'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

type GalleryCategory = 'supertech' | 'fertilizers' | 'events' | 'impact';

interface GalleryItem {
  _id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  image: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: number;
}

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const galleryItems = useQuery(api.gallery.listPublished) as GalleryItem[] | undefined;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'supertech', label: 'Supertech' },
    { id: 'fertilizers', label: 'Fertilizers' },
    { id: 'events', label: 'Events' },
    { id: 'impact', label: 'Impact' },
  ];

  const filteredItems = galleryItems?.filter((item: GalleryItem) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Gallery
            </h1>
            <p className="text-xl text-gray-600">
              Explore our work, impact, and solutions in action
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search gallery items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedFilter(category.id)}
                  variant={selectedFilter === category.id ? 'default' : 'outline'}
                  className={`${
                    selectedFilter === category.id
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {!galleryItems ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : filteredItems && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item: GalleryItem) => (
                <div
                  key={item._id}
                  className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
                      {categories.find((c) => c.id === item.category)?.label}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500">No items found</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                variant="outline"
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
