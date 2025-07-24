'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ROICalculator from '@/components/ROICalculator';
import FAQ from '@/components/FAQ';
import AboutUs from '@/components/AboutUs';
import CTA from '@/components/CTA';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleCalculatorActiveChange = (isActive: boolean) => {
    setActiveSection(isActive ? 'calculator' : '');
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="w-full px-0 overflow-hidden">
        <Header activeSection={activeSection} />
        
        <main className="w-full">
          {/* ROI Calculator Section */}
          <section id="calculator" style={{ marginTop: '-25px' }}>
            <ROICalculator onActiveChange={handleCalculatorActiveChange} />
          </section>

          {/* FAQ Section */}
          <section className="bg-white" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <FAQ />
          </section>

          {/* About Us Section */}
          <section id="about" style={{ marginTop: '-30px', paddingTop: '32px', paddingBottom: '16px' }}>
            <AboutUs />
          </section>

          {/* CTA Section */}
          <CTA />
        </main>

        <Footer />
      </div>
    </div>
  );
}
