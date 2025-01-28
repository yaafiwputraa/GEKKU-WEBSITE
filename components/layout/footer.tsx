// components/layout/footer.tsx
import React from 'react';
import { Instagram, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-zinc-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-wide">GEKKU</h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
              Menghadirkan pencahayaan yang memadukan estetika dan fungsi untuk 
              menciptakan suasana yang sempurna di ruang Anda.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/gekku" 
                className="p-2 rounded-full border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/62123456789" 
                className="p-2 rounded-full border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-light tracking-widest after:content-[''] after:block after:w-12 after:h-0.5 after:bg-orange-500 after:mt-4">
              NAVIGATION
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="/" className="hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-orange-500 transition-colors duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-light tracking-widest after:content-[''] after:block after:w-12 after:h-0.5 after:bg-orange-500 after:mt-4">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                Email: info@gekkudesign.com
              </li>
              <li className="hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                Phone: +62 123 456 789
              </li>
              <li className="hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                Address: Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-center text-sm text-zinc-500">
            © 2024 GEKKU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}