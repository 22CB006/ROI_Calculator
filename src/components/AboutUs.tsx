export default function AboutUs() {
  return (
    <div className="relative flex justify-center items-center" style={{ width: '100%', maxWidth: '1440px', height: '692px', backgroundColor: '#04A15B05', margin: '0 auto', paddingBottom: 0 }}>
      {/* BG effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAFC] to-[#E6F7F1] opacity-80 pointer-events-none" style={{zIndex:0}}></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-[830px] mx-auto px-4 md:px-6 lg:px-0" style={{padding: '16px'}}>
          <h2 className="text-center text-2xl md:text-3xl lg:text-[48px] font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8" style={{fontFamily:'Plus Jakarta Sans, sans-serif', marginTop:'24px', lineHeight:'140%', letterSpacing:'-0.05em'}}>About Us</h2>
          <p className="text-center text-base md:text-lg lg:text-[24px] text-gray-700 mb-4 md:mb-5 lg:mb-6 px-2 md:px-4 lg:px-0" style={{fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:'140%'}}>
            We specialize in custom software development, automation, and AI-driven solutions that help businesses eliminate inefficiencies, scale their operations, and unlock new growth opportunities.
          </p>
          <p className="text-center text-base md:text-lg lg:text-[24px] text-gray-700 mb-8 md:mb-10 lg:mb-12 px-2 md:px-4 lg:px-0" style={{fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:'140%'}}>
            Our clients are mid-sized to large businesses looking to modernize their systems, integrate automation, or build entirely new software solutions to stay ahead of their competition.
          </p>
          <h3 className="text-center text-lg md:text-xl lg:text-[20px] font-bold text-gray-900 mb-6 md:mb-7 lg:mb-8" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>Industries We Serve</h3>
          <div className="w-full mx-auto flex flex-wrap justify-center items-center gap-2 md:gap-2.5 lg:gap-3" style={{marginBottom:'32px'}}>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-xs md:text-sm lg:text-[14px] font-semibold shadow-sm text-center px-2 md:px-2.5 lg:px-3 py-2 md:py-2.5 lg:py-3 h-10 md:h-11 lg:h-12" style={{fontFamily:'Plus Jakarta Sans, sans-serif', fontWeight:600}}>Healthcare and Dental Practices</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-xs md:text-sm lg:text-[14px] font-semibold shadow-sm text-center px-2 md:px-2.5 lg:px-3 py-2 md:py-2.5 lg:py-3 h-10 md:h-11 lg:h-12" style={{fontFamily:'Plus Jakarta Sans, sans-serif', fontWeight:600}}>Real Estate and Property Management</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-xs md:text-sm lg:text-[14px] font-semibold shadow-sm text-center px-2 md:px-2.5 lg:px-3 py-2 md:py-2.5 lg:py-3 h-10 md:h-11 lg:h-12" style={{fontFamily:'Plus Jakarta Sans, sans-serif', fontWeight:600}}>SaaS and Tech Startups</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-xs md:text-sm lg:text-[14px] font-semibold shadow-sm text-center px-2 md:px-2.5 lg:px-3 py-2 md:py-2.5 lg:py-3 h-10 md:h-11 lg:h-12" style={{fontFamily:'Plus Jakarta Sans, sans-serif', fontWeight:600}}>Finance and Accounting Firms</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-xs md:text-sm lg:text-[14px] font-semibold shadow-sm text-center px-2 md:px-2.5 lg:px-3 py-2 md:py-2.5 lg:py-3 h-10 md:h-11 lg:h-12" style={{fontFamily:'Plus Jakarta Sans, sans-serif', fontWeight:600}}>eCommerce and Retail</span>
          </div>
        </div>
      </div>
    </div>
  );
}
