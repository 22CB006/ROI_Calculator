export default function CTA() {
  return (
    <div className="w-full flex justify-center items-center py-12" style={{background:'transparent'}}>
      <div className="relative w-[1240px] h-[270px] rounded-[16px] flex items-center px-[48px]" style={{background:'linear-gradient(90deg, #181C1B 80%, #0CA15B 100%)', boxShadow:'0 2px 24px 0 rgba(0,0,0,0.08)'}}>
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-[16px]" style={{background:'url(/grid.svg)', opacity:0.18}}></div>
        <div className="relative flex flex-row w-full items-center justify-between z-10">
          {/* Left: Content */}
          <div className="flex flex-col justify-center" style={{maxWidth:'700px'}}>
            <h2 className="text-white text-[40px] font-semibold mb-6" style={{fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:'56px', letterSpacing:'-0.05em'}}>Get Started Today</h2>
            <p className="text-white text-[16px] font-normal mb-0" style={{fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:'24px', letterSpacing:'0em'}}>
              Apply now and start referring high-value businesses that need custom software development, automation, and AI-powered solutions.
            </p>
          </div>
          {/* Right: Buttons */}
          <div className="flex flex-col gap-4 items-end min-w-[180px]">
            <a
              href="#"
              className="w-[152px] h-[48px] bg-[#04A15B] text-white rounded-[8px] flex items-center justify-center font-semibold text-[16px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', boxShadow:'0 2px 8px 0 rgba(4,161,91,0.12)'}}>
              Apply Now
            </a>
            <a
              href="#"
              className="w-[152px] h-[48px] bg-[#222] text-white rounded-[8px] flex items-center justify-center font-semibold text-[16px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', opacity:0.85}}>
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
