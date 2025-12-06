'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image
              src="/WhatsApp Image 2025-11-29 at 13.45.00_5441cb2b.jpg"
              alt="Bizen Green Future"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <div className="text-xl font-bold text-gray-900">
                Bizen Green Future
              </div>
              <div className="text-xs text-green-600 font-medium">
                Innovation Rooted in Sustainability
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About
            </Link>

            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-green-600 transition-colors">
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  href="/products/supertech"
                  className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-t-lg font-medium transition-colors first:rounded-t-lg"
                >
                  Supertech Combustion
                </Link>
                <Link
                  href="/products/fertilizers"
                  className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                >
                  Fertilizers & Feed
                </Link>
              </div>
            </div>

            <Link
              href="/gallery"
              className={`font-medium transition-colors ${
                isActive('/gallery') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/impact"
              className={`font-medium transition-colors ${
                isActive('/impact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Impact
            </Link>
            <Link
              href="/faq"
              className={`font-medium transition-colors ${
                isActive('/faq') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              title="Admin Dashboard"
            >
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              About
            </Link>

            <div className="space-y-2">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-medium transition-colors w-full"
              >
                <span>Products</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProductsOpen && (
                <div className="pl-4 space-y-2">
                  <Link href="/products/supertech" className="block text-gray-600 hover:text-green-600 font-medium transition-colors">
                    Supertech Combustion
                  </Link>
                  <Link href="/products/fertilizers" className="block text-gray-600 hover:text-green-600 font-medium transition-colors">
                    Fertilizers & Feed
                  </Link>
                </div>
              )}
            </div>

            <Link href="/gallery" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/impact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Impact
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
