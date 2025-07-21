
export default function AboutUs() {
  return (
    <div className="relative flex justify-center items-center" style={{ width: '1440px', height: '692px', backgroundColor: '#04A15B05', margin: '0 auto', paddingBottom: 0 }}>
      {/* BG effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAFC] to-[#E6F7F1] opacity-80 pointer-events-none" style={{zIndex:0}}></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="max-w-[800px] w-full mx-auto px-4">
          <h2 className="text-center text-[40px] font-bold text-gray-900 mb-2" style={{fontFamily:'Plus Jakarta Sans, sans-serif', marginTop:'24px'}}>About Us</h2>
          <p className="text-center text-[20px] text-gray-700 mb-6" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
            We specialize in custom software development, automation, and AI-driven solutions that help businesses eliminate inefficiencies, scale their operations, and unlock new growth opportunities.
          </p>
          <p className="text-center text-[20px] text-gray-700 mb-10" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
            Our clients are mid-sized to large businesses looking to modernize their systems, integrate automation, or build entirely new software solutions to stay ahead of their competition.
          </p>
          <h3 className="text-center text-[20px] font-semibold text-gray-900 mb-6" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>Industries We Serve</h3>
          <div className="w-[1290px] max-w-full mx-auto flex flex-row flex-nowrap justify-center items-center gap-4 mb-16" style={{minWidth:'800px'}}>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-[14px] font-semibold shadow-sm whitespace-nowrap text-center" style={{width:'250px', minWidth:'250px', maxWidth:'250px', height:'48px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'0', lineHeight:'100%'}}>Healthcare and Dental Practices</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-[14px] font-semibold shadow-sm whitespace-nowrap text-center ml-2" style={{width:'292px', minWidth:'292px', maxWidth:'292px', height:'48px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'0', lineHeight:'100%'}}>Real Estate and Property Management</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-[14px] font-semibold shadow-sm whitespace-nowrap text-center ml-2" style={{width:'192px', minWidth:'192px', maxWidth:'192px', height:'48px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'0', lineHeight:'100%'}}>SaaS and Tech Startups</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-[14px] font-semibold shadow-sm whitespace-nowrap text-center ml-2" style={{width:'236px', minWidth:'236px', maxWidth:'236px', height:'48px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'0', lineHeight:'100%'}}>Finance and Accounting Firms</span>
            <span className="inline-flex items-center justify-center bg-white rounded-lg border border-gray-200 text-[#131514] text-[14px] font-semibold shadow-sm whitespace-nowrap text-center ml-2" style={{width:'188px', minWidth:'188px', maxWidth:'188px', height:'48px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'0', lineHeight:'100%'}}>eCommerce and Retail</span>
          </div>
        </div>
      </div>
    </div>
  );
}
