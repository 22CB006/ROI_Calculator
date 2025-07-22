import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ROICalculator from '@/components/ROICalculator';
import FAQ from '@/components/FAQ';
import AboutUs from '@/components/AboutUs';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="w-full max-w-[1440px] mx-auto px-0 overflow-hidden">
        <Header />
        
        <main className="w-full">
          {/* ROI Calculator Section */}
          <section id="calculator" className="py-8 md:py-16">
            <ROICalculator />
          </section>

          {/* FAQ Section */}
          <section className="py-8 md:py-16 bg-white">
            <FAQ />
          </section>

          {/* About Us Section */}
          <section id="about" className="py-8 md:py-16">
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
