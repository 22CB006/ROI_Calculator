import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center" style={{ width: '100%', maxWidth: '1440px', height: '436px', fontFamily: 'Plus Jakarta Sans, sans-serif', backgroundColor: '#04A15B0D', margin: '0 auto', paddingLeft: '64px', paddingRight: '64px' }}>
      <div className="h-full flex flex-col items-center justify-center pt-12 pb-0" style={{ width: '100%' }}>
        <Image src="/logo.png" alt="UnoiaTech" width={180} height={40} className="mb-6" />
        <p
          className="text-center text-gray-700 mb-6"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
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
        <div className="flex flex-row gap-8 mb-8 justify-center" style={{paddingTop: '16px'}}>
          <Link href="#" aria-label="Facebook">
            <Image src="/ant-design_facebook-filled.png" alt="Facebook" width={32} height={32} />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Image src="/ant-design_twitter-outlined.png" alt="Twitter" width={32} height={32} />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Image src="/ant-design_linkedin-filled.png" alt="LinkedIn" width={32} height={32} />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Image src="/ant-design_linkedin-filled (1).png" alt="Instagram" width={32} height={32} />
          </Link>
        </div>
        <div className="flex flex-row mb-8 justify-center text-[16px] text-gray-700 font-normal flex-wrap" style={{paddingTop: '16px'}}>
          <Link href="#" className="hover:text-[#04A15B] mx-6">About us</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Works</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Services</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Blog</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Why Choose Us</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Our Process</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Careers</Link>
          <Link href="#" className="hover:text-[#04A15B] mx-6">Contact Us</Link>
        </div>
        <hr className="border-t border-gray-200 mb-0" style={{ width: 'calc(100% - 64px)', marginLeft: '32px', marginRight: '32px' }} />
        <div className="w-full flex flex-row justify-between items-center py-8" style={{ paddingLeft: '32px', paddingRight: '32px', width: '100%' }}>
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row items-center gap-4">
              <div className="bg-[#04A15B] rounded-full flex items-center justify-center" style={{ width: 48, height: 48 }}>
                <Image src="/call-calling.png" alt="Phone" width={24} height={24} />
              </div>
              <div>
                <div className="text-[14px] text-[#6F7E8A] font-normal">Have a question?</div>
                <div className="text-[16px] text-[#131514] font-normal">+01-123-4567</div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="bg-[#04A15B] rounded-full flex items-center justify-center" style={{ width: 48, height: 48 }}>
                <Image src="/mail.png" alt="Email" width={24} height={24} />
              </div>
              <div>
                <div className="text-[14px] text-[#6F7E8A] font-normal">Contact us at</div>
                <div className="text-[16px] text-[#131514] font-normal">welcome@unoiatech.com</div>
              </div>
            </div>
          </div>
          <div className="text-[16px] text-gray-700 font-normal" style={{ textAlign: 'right', flex: '0 0 auto' }}>
            Copyright @2024 Unoiatech
          </div>
        </div>
      </div>
    </footer>
  );
}
