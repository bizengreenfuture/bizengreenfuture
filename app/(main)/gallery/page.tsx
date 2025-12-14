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
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Gallery
            </h1>
            <p className="text-xl text-gray-300">
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
                className="pl-10 py-3 text-lg bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600"
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
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-600/25'
                      : 'border-2 border-emerald-600/30 text-gray-300 hover:border-emerald-600 hover:text-emerald-400 bg-gray-800/50'
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

      <section className="py-20 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(16 185 129) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {!galleryItems ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl bg-gray-800/50" />
              ))}
            </div>
          ) : filteredItems && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item: GalleryItem) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative bg-gray-800/80 backdrop-blur-sm border border-emerald-600/20 hover:border-emerald-600/40 rounded-2xl overflow-hidden">
                    <div className="relative h-64 overflow-hidden bg-gray-900">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 rounded-full text-sm font-medium mb-3">
                        {categories.find((c) => c.id === item.category)?.label}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-400">No items found</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                variant="outline"
                className="mt-4 border-emerald-600/30 text-gray-300 hover:border-emerald-600 hover:text-emerald-400 bg-gray-800/50"
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
