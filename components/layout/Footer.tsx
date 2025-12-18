'use client';

import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Bizen Green Future"
                width={40}
                height={40}
                className="object-contain bg-white rounded-full p-1"
              />
              <div>
                <div className="font-bold text-lg">Bizen Green Future</div>
                <div className="text-xs text-green-400">Ltd</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pioneering sustainability in Uganda through clean energy,
              regenerative agriculture, and circular innovation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-emerald-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products/supertech" className="hover:text-emerald-600 transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-emerald-600 transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Our Solutions</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 mt-1 text-emerald-600 flex-shrink-0" />
                <Link href="/products/supertech" className="hover:text-emerald-600 transition-colors">
                  Supertech Combustion Technology
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 mt-1 text-emerald-600 flex-shrink-0" />
                <Link href="/products/fertilizers" className="hover:text-emerald-600 transition-colors">
                  Organic Fertilizers
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 mt-1 text-emerald-600 flex-shrink-0" />
                <Link href="/products/fertilizers" className="hover:text-emerald-600 transition-colors">
                  Animal Feed (Calcifeed)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Supertech Uganda Rubaga Road Kampala</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+256752460012" className="hover:text-emerald-600 transition-colors">+256 751 460 012</a>
                  <a href="tel:+256783844158" className="hover:text-emerald-600 transition-colors">+256 783 844 158</a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <a href="mailto:info@bizengreenfuture.com" className="hover:text-emerald-600 transition-colors">info@bizengreenfuture.com</a>
                  <a href="mailto:calcigrubtrading@gmail.com" className="hover:text-emerald-600 transition-colors">calcigrubtrading@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Bizen Green Future Ltd. All rights
            reserved.
          </p>
          <p className="mt-2 text-emerald-600 font-medium">
            Innovation Rooted in Sustainability
          </p>
        </div>
      </div>
    </footer>
  );
}
