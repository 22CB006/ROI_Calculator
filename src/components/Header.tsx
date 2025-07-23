'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 w-full max-w-[1440px] h-16 lg:h-[88px] flex items-center relative mx-auto" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
      <div className="w-full flex items-center" style={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="UnoiaTech"
            width={140}
            height={40}
            className="h-6 lg:h-8 w-auto"
          />
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-[24px] flex-shrink" style={{ marginLeft: '40px' }}>
          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            Portfolio
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap"
              style={{ fontFamily: 'PP Mori, sans-serif' }}
            >
              Services
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04A15B]">
                    Web Development
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04A15B]">
                    Mobile App Development
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04A15B]">
                    SaaS Development
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04A15B]">
                    Workflow Automation
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04A15B]">
                    AI Integration
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04A15B]">
                    Cloud Solutions
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            Why Choose Us
          </Link>
          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            ROI Calculator
          </Link>
          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            About Us
          </Link>
          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            Our Process
          </Link>
          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            Blog
          </Link>
          <Link href="#" className="text-[#131514] hover:text-[#04A15B] transition-colors text-[14px] font-normal leading-[100%] tracking-[0%] whitespace-nowrap" style={{ fontFamily: 'PP Mori, sans-serif' }}>
            Contact Us
          </Link>
        </nav>

        {/* Let's Talk Button - Desktop */}
        <div className="hidden lg:flex items-center flex-shrink-0" style={{ marginLeft: 'auto' }}>
          <Link
            href="#"
            className="bg-[#04A15B] text-white px-4 xl:px-6 py-3 rounded-[8px] text-sm font-medium hover:bg-[#038549] transition-colors h-[48px] flex items-center justify-center whitespace-nowrap"
            style={{ minWidth: '100px' }}
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-50">
          <div className="px-4 py-2 space-y-2">
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              Portfolio
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              Services
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              Why Choose Us
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              ROI Calculator
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              About Us
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              Our Process
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              Blog
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-[#04A15B] text-sm font-medium">
              Contact Us
            </Link>
            <Link
              href="#"
              className="bg-[#04A15B] text-white px-6 py-3 rounded-[8px] text-sm font-medium hover:bg-[#038549] transition-colors mt-4 h-[48px] flex items-center justify-center"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
