'use client';

import Link from 'next/link';
import { COMPANY_NAME } from '../constants/text';

export default function Hero() {
  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e] via-[#2d4a3e]/90 to-[#1a2f26]"></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
              Transform Your<br />Outdoor Space
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mb-8 leading-relaxed">
              With over a decade of experience, we create stunning, customized landscapes that bring your vision to life. Serving Markham and the Greater Toronto Area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/free-quote"
                className="bg-[#8B6F47] text-white px-8 py-4 hover:bg-[#784C3B] transition-all transform hover:scale-105 text-center font-medium"
              >
                Get a Free Quote
              </Link>
              <Link 
                href="/gallery"
                className="border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-[#2d4a3e] transition-all transform hover:scale-105 text-center font-medium"
              >
                View Our Work
              </Link>
            </div>
            
            {/* Key Features */}
            <div className="mt-12 flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                <span className="text-white/80 text-sm">10+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                <span className="text-white/80 text-sm">141+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                <span className="text-white/80 text-sm">Fully Licensed & Insured</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="hidden lg:block">
            <img 
              src="/home/hero.png" 
              alt={`Beautiful landscaping project by ${COMPANY_NAME}`}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
