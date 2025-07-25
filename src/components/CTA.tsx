export default function CTA() {
  return (
    <div className="w-full flex justify-center items-center" style={{background:'transparent', paddingTop: '40px', paddingBottom: '60px'}}>
      <div className="relative w-full max-w-[1240px] min-h-[270px] rounded-[16px] flex items-center px-4 md:px-8 lg:px-[48px] mx-4 md:mx-6 lg:mx-0" style={{background:'linear-gradient(90deg, #181C1B 80%, #0CA15B 100%)', boxShadow:'0 2px 24px 0 rgba(0,0,0,0.08)'}}>
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-[16px]" style={{background:'url(/grid.svg)', opacity:0.18}}></div>
        <div className="relative flex flex-col lg:flex-row w-full items-center justify-between z-10 gap-6 md:gap-8 lg:gap-0 py-8 md:py-10 lg:py-0">
          {/* Left: Content */}
          <div className="flex flex-col justify-center w-full lg:w-auto text-center lg:text-left" style={{maxWidth:'900px'}}>
            <h2 className="text-white text-2xl md:text-3xl lg:text-[40px] font-normal mb-4 md:mb-5 lg:mb-6" style={{fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:'1.4 lg:56px', letterSpacing:'-0.05em'}}>Get Started Today</h2>
            <p className="text-white text-sm md:text-base lg:text-[16px] font-normal mb-0 px-2 md:px-4 lg:px-0" style={{fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:'1.5', letterSpacing:'0em'}}>
              Apply now and start referring high-value businesses that need custom software development, automation, and AI-powered solutions.
            </p>
          </div>
          {/* Right: Buttons */}
          <div className="flex flex-col gap-4 md:gap-5 items-center lg:items-end min-w-[180px] w-full lg:w-auto">
            <a
              href="#"
              className="w-full md:w-[140px] lg:w-[152px] h-[48px] bg-[#04A15B] text-white rounded-[8px] flex items-center justify-center font-normal text-sm md:text-base lg:text-[16px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', boxShadow:'0 2px 8px 0 rgba(4,161,91,0.12)'}}>
              Apply Now
            </a>
            <a
              href="#"
              className="w-full md:w-[140px] lg:w-[152px] h-[48px] bg-[#222] text-white rounded-[8px] flex items-center justify-center font-normal text-sm md:text-base lg:text-[16px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', opacity:0.85}}>
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
