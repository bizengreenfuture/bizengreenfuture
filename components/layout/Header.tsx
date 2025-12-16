'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  Leaf, 
  Fish, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const productCategories = [
  {
    name: 'SuperTech Combustion',
    description: 'Fuel optimization technology for cleaner emissions',
    href: '/products/supertech',
    icon: Zap,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    stats: '12% fuel savings',
  },
  {
    name: 'Organic Fertilizers',
    description: 'Sustainable soil nutrition from BSF processing',
    href: '/products/fertilizers',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    stats: 'Restore soil health',
  },
  {
    name: 'Animal Feed',
    description: 'Premium Calcifeed for healthy livestock',
    href: '/products/fertilizers#feed',
    icon: Fish,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    stats: 'High protein content',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Impact', href: '/impact' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  // Close desktop dropdown when a link is clicked
  const closeDesktopDropdown = () => {
    setIsProductsOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-emerald-900/20 border-b border-emerald-600/20' 
          : 'bg-gray-900'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={closeMobileMenu}
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90 transition-opacity group"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Bizen Green Future"
                width={48}
                height={48}
                className="object-contain group-hover:scale-105 transition-transform w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                Bizen Green Future Ltd
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <Sparkles className="h-3 w-3" />

              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  isActive(link.href)
                    ? 'text-emerald-400 bg-emerald-600/20'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800'
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Products Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  pathname.includes('/products')
                    ? 'text-emerald-400 bg-emerald-600/20'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800'
                )}
              >
                <span>Products</span>
                <ChevronDown 
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isProductsOpen && 'rotate-180'
                  )} 
                />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={cn(
                  'absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200',
                  isProductsOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                )}
              >
                <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-emerald-900/20 border border-emerald-600/30 p-6 w-[480px]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-emerald-600/20">
                    <div>
                      <h3 className="font-semibold text-white">Our Products</h3>
                      <p className="text-sm text-gray-400">Sustainable solutions for a greener future</p>
                    </div>
                    <Link
                      href="/products/supertech"
                      onClick={closeDesktopDropdown}
                      className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 group"
                    >
                      View all
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Product Cards */}
                  <div className="space-y-2">
                    {productCategories.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        onClick={closeDesktopDropdown}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-600/20'
                        )}>
                          <product.icon className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                              {product.name}
                            </h4>
                            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">
                            {product.description}
                          </p>
                          <span className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-400">
                            {product.stats}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-4 pt-4 border-t border-emerald-600/20">
                    <Link
                      href="/contact"
                      onClick={closeDesktopDropdown}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-600/25"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  isActive(link.href)
                    ? 'text-emerald-400 bg-emerald-600/20'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-gray-800 text-gray-300"
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

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-20 bg-gray-900 border-t border-emerald-600/20 shadow-xl transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-6 space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={cn(
                'block px-4 py-3 rounded-xl font-medium transition-colors',
                isActive(link.href)
                  ? 'text-emerald-400 bg-emerald-600/20'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Products Dropdown */}
          <div className="space-y-2">
            <button
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              className={cn(
                'flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-colors',
                pathname.includes('/products')
                  ? 'text-emerald-400 bg-emerald-600/20'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              <span>Products</span>
              <ChevronDown 
                className={cn(
                  'h-5 w-5 transition-transform duration-200',
                  isMobileProductsOpen && 'rotate-180'
                )} 
              />
            </button>

            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isMobileProductsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="pl-2 space-y-1 py-2">
                {productCategories.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-600/20">
                      <product.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.stats}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={cn(
                'block px-4 py-3 rounded-xl font-medium transition-colors',
                isActive(link.href)
                  ? 'text-emerald-400 bg-emerald-600/20'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
