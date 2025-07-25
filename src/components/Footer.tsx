import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-4 md:px-8 lg:px-16" style={{ width: '100%', maxWidth: '1440px', minHeight: '436px', fontFamily: 'Plus Jakarta Sans, sans-serif', backgroundColor: '#04A15B0D', margin: '0 auto' }}>
      <div className="h-full flex flex-col items-center justify-center pt-8 md:pt-10 lg:pt-12 pb-0" style={{ width: '100%' }}>
        <Image src="/logo.png" alt="UnoiaTech" width={180} height={40} className="mb-4 md:mb-5 lg:mb-6 w-32 md:w-36 lg:w-auto" />
                  <p
          className="text-center text-gray-700 mb-6 md:mb-7 px-4 md:px-6 lg:px-0 text-sm md:text-base lg:text-base"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 500,
            lineHeight: '150%',
            maxWidth: '788px',
            margin: '0 auto',
            letterSpacing: '0',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          UnoiaTech provides expert web, SaaS, and mobile app development services for various industries, including fintech and healthcare.
        </p>
        <div className="flex flex-row gap-6 md:gap-7 lg:gap-8 mb-6 md:mb-7 lg:mb-8 justify-center" style={{paddingTop: '16px'}}>
          <Link href="#" aria-label="Facebook">
            <Image src="/ant-design_facebook-filled.png" alt="Facebook" width={32} height={32} className="w-8 h-8 lg:w-8 lg:h-8" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Image src="/ant-design_twitter-outlined.png" alt="Twitter" width={32} height={32} className="w-8 h-8 lg:w-8 lg:h-8" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Image src="/ant-design_linkedin-filled.png" alt="LinkedIn" width={32} height={32} className="w-8 h-8 lg:w-8 lg:h-8" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Image src="/ant-design_linkedin-filled (1).png" alt="Instagram" width={32} height={32} className="w-8 h-8 lg:w-8 lg:h-8" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-row mb-6 md:mb-7 lg:mb-8 justify-center text-xs md:text-sm lg:text-[14px] text-gray-700 font-normal gap-4 md:gap-6 lg:gap-0" style={{paddingTop: '16px'}}>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">About us</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Works</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Services</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Blog</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Why Choose Us</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Our Process</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Careers</Link>
          <Link href="#" className="hover:text-[#04A15B] text-center lg:text-left lg:mx-6">Contact Us</Link>
        </div>
        <hr className="border-t border-gray-200 mb-0 w-full" />
        <div className="w-full flex flex-col lg:flex-row justify-between items-center py-6 md:py-7 lg:py-8 gap-4 md:gap-5 lg:gap-0 px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-5 lg:gap-6 w-full lg:w-auto">
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="bg-[#04A15B] rounded-full flex items-center justify-center" style={{ width: 48, height: 48 }}>
                <Image src="/call-calling.png" alt="Phone" width={24} height={24} />
              </div>
              <div className="text-center lg:text-left">
              <div className="text-xs md:text-sm lg:text-[14px] text-[#6F7E8A]" style={{ fontWeight: 500 }}>Have a question?</div>
              <div className="text-sm md:text-base lg:text-[16px] text-[#131514]" style={{ fontWeight: 500 }}>+01-123-4567</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="bg-[#04A15B] rounded-full flex items-center justify-center" style={{ width: 48, height: 48 }}>
                <Image src="/mail.png" alt="Email" width={24} height={24} />
              </div>
              <div className="text-center lg:text-left">
              <div className="text-xs md:text-sm lg:text-[14px] text-[#6F7E8A]" style={{ fontWeight: 500 }}>Contact us at</div>
              <div className="text-sm md:text-base lg:text-[16px] text-[#131514]" style={{ fontWeight: 500 }}>welcome@unoiatech.com</div>
              </div>
            </div>
          </div>
          <div className="text-sm md:text-base lg:text-[16px] text-gray-700 font-normal text-center lg:text-right" style={{ flex: '0 0 auto' }}>
            Copyright @2024 Unoiatech
          </div>
        </div>
      </div>
    </footer>
  );
}
