'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { menus } from '../data/menuData';
import { COMPANY_NAME } from '../constants/text';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center gap-4" onClick={closeMobileMenu}>
            <Image
              src="/logo.png"
              alt={`${COMPANY_NAME} Logo`}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
            <div>
              <h1 className="text-2xl font-bold text-[#2d4a3e] leading-tight">
                {COMPANY_NAME}
              </h1>
              <p className="text-xs text-[#7a9085] font-light">
                Customized design within budget
              </p>
            </div>
          </Link>

          {/* Navigation - Desktop (horizontal) & Mobile (vertical when open) */}
          <nav
            id="mobile-menu"
            className={`
              ${isMobileMenuOpen ? 'flex' : 'hidden'}
              lg:flex
              flex-col lg:flex-row
              items-stretch lg:items-center
              gap-3 lg:gap-8
              absolute lg:static
              top-[76px] lg:top-auto
              left-0 lg:left-auto
              right-0 lg:right-auto
              bg-white lg:bg-transparent
              border-t lg:border-t-0
              border-gray-100
              py-4 lg:py-0
              px-6 lg:px-0
              shadow-md lg:shadow-none
              animate-in fade-in slide-in-from-top-2 lg:animate-none
              duration-200
            `}
            aria-label="Main navigation"
          >
            {menus.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className={`
                  ${
                    item.cta
                      ? 'bg-[#2d4a3e] text-white hover:bg-[#1a2f26] hover:shadow-md px-6 py-2.5 text-center lg:text-left mt-4 lg:mt-0'
                      : 'text-[#3d3d3d] hover:text-[#2d4a3e] py-2 lg:py-0 lg:relative lg:after:absolute lg:after:bottom-[-4px] lg:after:left-0 lg:after:h-[2px] lg:after:w-0 lg:after:bg-[#2d4a3e] lg:after:transition-all lg:hover:after:w-full'
                  }
                  text-sm font-semibold
                  transition-all
                  block lg:inline-block
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#3d3d3d] hover:text-[#2d4a3e] transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
