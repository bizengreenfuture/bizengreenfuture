'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  // Product Form State
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    category: 'supertech',
    description: '',
    price: '',
    image: '',
  });

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState({
    id: '',
    title: '',
    category: 'supertech',
    description: '',
    image: '',
  });

  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingGallery, setEditingGallery] = useState<string | null>(null);

  // Product Handlers
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Boilerplate - user will add logic
    console.log('Product submitted:', productForm);
    setProductForm({
      id: '',
      name: '',
      category: 'supertech',
      description: '',
      price: '',
      image: '',
    });
  };

  const handleProductEdit = (product: any) => {
    setProductForm(product);
    setEditingProduct(product.id);
  };

  const handleProductDelete = (id: string) => {
    // Boilerplate - user will add logic
    console.log('Delete product:', id);
  };

  // Gallery Handlers
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Boilerplate - user will add logic
    console.log('Gallery item submitted:', galleryForm);
    setGalleryForm({
      id: '',
      title: '',
      category: 'supertech',
      description: '',
      image: '',
    });
  };

  const handleGalleryEdit = (item: any) => {
    setGalleryForm(item);
    setEditingGallery(item.id);
  };

  const handleGalleryDelete = (id: string) => {
    // Boilerplate - user will add logic
    console.log('Delete gallery item:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Site</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button
              variant="outline"
              className="border-2 border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => {
                // Boilerplate - user will add logout logic
                console.log('Logout');
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white border-2 border-gray-200 p-1">
            <TabsTrigger value="products" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-8 mt-8">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter product name"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({ ...productForm, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      >
                        <option value="supertech">Supertech</option>
                        <option value="fertilizers">Fertilizers</option>
                        <option value="feed">Animal Feed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      placeholder="Enter product description"
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (Optional)
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter price"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <Input
                        type="url"
                        placeholder="Enter image URL"
                        value={productForm.image}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            image: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                    {editingProduct && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingProduct(null);
                          setProductForm({
                            id: '',
                            name: '',
                            category: 'supertech',
                            description: '',
                            price: '',
                            image: '',
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>Products List</CardTitle>
              </CardHeader>
              <CardContent>
                {products.length > 0 ? (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleProductEdit(product)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => handleProductDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No products yet. Add one above.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-8 mt-8">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>
                  {editingGallery ? 'Edit Gallery Item' : 'Add Gallery Item'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGallerySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter gallery item title"
                        value={galleryForm.title}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      >
                        <option value="supertech">Supertech</option>
                        <option value="fertilizers">Fertilizers</option>
                        <option value="events">Events</option>
                        <option value="impact">Impact</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      placeholder="Enter gallery item description"
                      value={galleryForm.description}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      value={galleryForm.image}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          image: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {editingGallery ? 'Update Item' : 'Add Item'}
                    </Button>
                    {editingGallery && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingGallery(null);
                          setGalleryForm({
                            id: '',
                            title: '',
                            category: 'supertech',
                            description: '',
                            image: '',
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>Gallery Items</CardTitle>
              </CardHeader>
              <CardContent>
                {galleryItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-300 transition-colors"
                      >
                        <div className="relative h-32 bg-gray-200">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-3">{item.category}</p>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 flex-1"
                              onClick={() => handleGalleryEdit(item)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 border-red-500 text-red-600 hover:bg-red-50 flex-1"
                              onClick={() => handleGalleryDelete(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No gallery items yet. Add one above.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
