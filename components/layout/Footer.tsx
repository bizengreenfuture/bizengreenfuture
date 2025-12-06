'use client';

import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/WhatsApp Image 2025-11-29 at 13.45.00_5441cb2b.jpg"
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
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering sustainability in Uganda through clean energy,
              regenerative agriculture, and circular innovation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-green-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-green-400 transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-green-400 transition-colors">
                  Impact
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Our Solutions</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 mt-1 text-green-400 flex-shrink-0" />
                <span>Supertech Combustion Technology</span>
              </li>
              <li className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 mt-1 text-green-400 flex-shrink-0" />
                <span>Organic Fertilizers</span>
              </li>
              <li className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 mt-1 text-green-400 flex-shrink-0" />
                <span>Calcifeed Animal Feed</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>+256 XXX XXXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>info@bizengreen.co.ug</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Bizen Green Future Ltd. All rights
            reserved.
          </p>
          <p className="mt-2 text-green-400 font-medium">
            Innovation Rooted in Sustainability
          </p>
        </div>
      </div>
    </footer>
  );
}
