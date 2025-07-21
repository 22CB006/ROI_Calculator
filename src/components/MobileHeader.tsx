'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="UnoiaTech"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              About us
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Works
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Services
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Blog
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Why Choose Us
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Our Process
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Careers
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors text-sm lg:text-base">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                About us
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Works
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Services
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Blog
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Why Choose Us
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Our Process
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Careers
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#04A15B] transition-colors py-2">
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
