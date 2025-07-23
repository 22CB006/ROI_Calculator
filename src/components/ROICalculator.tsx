'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  teamMembers: number;
  hoursPerWeek: number;
  hourlyRate: number;
  monthlyErrorCost: number;
  costPerError: number;
  email: string;
}

interface Results {
  monthlyLoss: number;
  breakEvenMonths: number;
  annualSavings: number;
}

export default function ROICalculator() {
  const [formData, setFormData] = useState<FormData>({
    teamMembers: 0,
    hoursPerWeek: 0,
    hourlyRate: 0,
    monthlyErrorCost: 0,
    costPerError: 0,
    email: ''
  });

  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    // Only allow positive decimal numbers, block negatives, specials, and alpha
    if (type === 'number') {
      // Accept decimals, block negatives, specials, alpha
      if (/^(\d*\.?\d*)$/.test(value) || value === '') {
        setFormData((prev) => ({
          ...prev,
          [name]: value === '' ? 0 : Number(value)
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateROI = async () => {
    // Check for required fields
    if (!formData.email) {
      toast.error('Email is required');
      return;
    }
    // Email format validation
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Enter a valid email address');
      return;
    }
    if (!formData.teamMembers) {
      toast.error('Number of employees is required');
      return;
    }
    if (!formData.hoursPerWeek) {
      toast.error('Hours per employee/week is required');
      return;
    }
    if (!formData.hourlyRate) {
      toast.error('Hourly cost is required');
      return;
    }

    setIsLoading(true);

    const laborCostPerMonth = formData.teamMembers * formData.hoursPerWeek * formData.hourlyRate * 4;
    const totalMonthlyCost = laborCostPerMonth + formData.monthlyErrorCost;
    const automationCost = 18000;
    const breakEvenMonths = totalMonthlyCost > 0 ? automationCost / totalMonthlyCost : 0;
    const annualSavings = (totalMonthlyCost * 12) - automationCost;

    const calculatedResults = {
      monthlyLoss: totalMonthlyCost,
      breakEvenMonths: parseFloat(breakEvenMonths.toFixed(1)),
      annualSavings: annualSavings
    };

    setResults(calculatedResults);
    setShowResults(true);
    setIsLoading(false);
    toast.success('ROI calculated successfully!');
  };

  const sendEmailReport = async () => {
    if (!formData.email) {
      toast.error('Email is required');
      return;
    }
    // Email format validation
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Enter a valid email address');
      return;
    }
    if (!results) {
      toast.error('Please calculate ROI first.');
      return;
    }
    await toast.promise(
      (async () => {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            teamMembers: formData.teamMembers,
            hoursPerWeek: formData.hoursPerWeek,
            hourlyRate: formData.hourlyRate,
            monthlyErrorCost: formData.monthlyErrorCost,
            costPerError: formData.costPerError,
            monthlyLoss: results.monthlyLoss,
            breakEvenMonths: results.breakEvenMonths,
            annualSavings: results.annualSavings
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to send email');
        }
        return data;
      })(),
      {
        loading: 'Sending report...',
        success: 'Report sent to your email!',
        error: (err) => err.message || 'Error sending email',
      }
    );
  };

  const bookConsult = () => {
    toast('Booking page coming soon!');
  };

  return (
    <>
      {showResults && results ? (
        <div style={{ width: '100%', maxWidth: '1440px', height: '908px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', padding: '0 20px' }}>
          <div className="bg-white shadow-lg border border-gray-200 flex flex-col" style={{ width: '900px', height: '808px', borderRadius: '12px', padding: '20px 0' }}>
            {/* Editable Header with Icon */}
            <div className="flex items-center justify-center mb-6">
              <Image src="/garden_growth-chart-fill-16.png" alt="Growth chart icon" width={32} height={32} className="mr-2" />
              <h2 className="text-[32px] font-semibold text-[#101F2F] leading-[40px] tracking-[-0.02em]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} contentEditable suppressContentEditableWarning={true}>
                Workflow ROI Calculator
              </h2>
            </div>
            <div className="flex flex-row flex-1" style={{ padding: '0 40px' }}>
              {/* Left: Editable Input Fields */}
              <div className="flex flex-col justify-start w-1/2 pr-0 gap-2" style={{ paddingLeft: '0px', marginLeft: '-12px' }}>
                {/* Employees doing manual work */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                      Employees doing manual work <span className="text-red-500">*</span>
                    </label>
                    <span className="relative group">
                      <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2 cursor-pointer" />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        Enter how many team members handle repetitive, manual tasks weekly.
                      </span>
                    </span>
                  </div>
                  <input
                    type="number"
                    step="any"
                    name="teamMembers"
                    value={formData.teamMembers === 0 ? '' : formData.teamMembers}
                    onChange={handleInputChange}
                    min="0"
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                    placeholder="e.g., 20"
                  />
                </div>
                {/* Hours per employee/week */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                      Hours per employee/week <span className="text-red-500">*</span>
                    </label>
                    <span className="relative group">
                      <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2 cursor-pointer" />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        Average hours each employee spends on manual work in a typical week.
                      </span>
                    </span>
                  </div>
                  <input
                    type="number"
                    step="any"
                    name="hoursPerWeek"
                    value={formData.hoursPerWeek === 0 ? '' : formData.hoursPerWeek}
                    onChange={handleInputChange}
                    min="0"
                    max="168"
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                    placeholder="e.g., 40"
                  />
                </div>
                {/* Hourly cost (with overhead) */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                      Hourly cost (with overhead) <span className="text-red-500">*</span>
                    </label>
                    <span className="relative group">
                      <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2 cursor-pointer" />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        Include base wage + overhead costs (e.g., tools, benefits, office space).
                      </span>
                    </span>
                  </div>
                  <input
                    type="number"
                    step="any"
                    name="hourlyRate"
                    value={formData.hourlyRate === 0 ? '' : formData.hourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                    placeholder="e.g., 50"
                  />
                </div>
                {/* Monthly error cost (optional) */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                      Monthly error cost <span className="text-gray-500">(optional)</span>
                    </label>
                    <span className="relative group">
                      <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2 cursor-pointer" />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        How much do errors from manual work cost you monthly (in ₹/$)?
                      </span>
                    </span>
                  </div>
                  <input
                    type="number"
                    name="monthlyErrorCost"
                    value={formData.monthlyErrorCost === 0 ? '' : formData.monthlyErrorCost}
                    onChange={e => {
                      const val = e.target.value;
                      if (/^\d+$/.test(val) || val === '') {
                        handleInputChange(e);
                      }
                    }}
                    min="0"
                    step="1"
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                    placeholder="e.g., 1000"
                    onKeyDown={e => {
                      if (["e", "E", ".", "-", "+"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {/* Cost per error (optional) */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                      Cost per error <span className="text-gray-500">(optional)</span>
                    </label>
                    <span className="relative group">
                      <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2 cursor-pointer" />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        Estimated average cost every time a manual error occurs (e.g., ₹100).
                      </span>
                    </span>
                  </div>
                  <input
                    type="number"
                    name="costPerError"
                    value={formData.costPerError === 0 ? '' : formData.costPerError}
                    onChange={e => {
                      const val = e.target.value;
                      if (/^\d+$/.test(val) || val === '') {
                        handleInputChange(e);
                      }
                    }}
                    min="0"
                    step="1"
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                    placeholder="e.g., 100"
                    onKeyDown={e => {
                      if (["e", "E", ".", "-", "+"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
              {/* Right: Results/Outputs */}
              <div className="flex flex-col items-center justify-center w-1/2 pl-8 gap-0">
                {/* Output Boxes - Reduced Spacing */}
                <div className="flex flex-col gap-2 w-full items-center">
                  {/* You're losing */}
                  <div className="bg-[#FFECEC] rounded-lg flex flex-col items-start justify-center" style={{ width: '476px', height: '108px', border: '1px solid #FCA5A5', padding: '12px 20px' }}>
                    <div className="flex flex-col w-full">
                      <div className="text-[#D23B3B] text-[24px] font-medium mb-1" style={{lineHeight:'32px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>You&rsquo;re losing</div>
                      <div className="flex flex-row items-baseline w-full">
                        <span className="text-[#D73131] text-[36px] font-bold leading-[44px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>${results.monthlyLoss.toLocaleString()}</span>
                        <span className="text-[#D73131] text-[24px] font-medium ml-2" style={{lineHeight:'32px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>per month</span>
                      </div>
                    </div>
                  </div>
                  {/* Break-even */}
                  <div className="bg-[#FEF4CD] rounded-lg flex flex-col items-start justify-center" style={{ width: '476px', height: '108px', border: '1px solid #FDE68A', padding: '12px 20px' }}>
                    <div className="flex flex-col w-full">
                      <div className="text-[#D97706] text-[24px] font-medium mb-1" style={{lineHeight:'32px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>Break-even in</div>
                      <div className="flex flex-row items-baseline w-full">
                        <span className="text-[#D97706] text-[36px] font-bold leading-[44px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>{results.breakEvenMonths}</span>
                        <span className="text-[#D97706] text-[24px] font-medium ml-2" style={{lineHeight:'32px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>months if automated</span>
                      </div>
                    </div>
                  </div>
                  {/* Annual savings potential */}
                  <div className="bg-[#E6F9ED] rounded-lg flex flex-col items-start justify-center" style={{ width: '476px', height: '108px', border: '1px solid #A7F3D0', padding: '12px 20px' }}>
                    <div className="flex flex-col w-full">
                      <div className="text-[#04A15B] text-[24px] font-medium mb-1" style={{lineHeight:'32px', fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>Annual savings potential:</div>
                      <div className="flex flex-row items-baseline w-full">
                        <span className="text-[#04A15B] text-[36px] font-bold leading-[44px]" style={{fontFamily:'Plus Jakarta Sans, sans-serif', letterSpacing:'-2%'}}>${results.annualSavings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  {/* Re-Calculate Button - aligned under Annual Savings */}
                  <div className="flex flex-row justify-start mt-3 mb-2" style={{ width: '476px' }}>
                    <button
                      onClick={calculateROI}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-[#04A15B] text-[#04A15B] rounded-[8px] bg-white hover:bg-[#04A15B] hover:text-white transition-colors text-[14px] font-medium leading-[20px] disabled:opacity-50 whitespace-nowrap"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', height: '32px', minWidth: '142px', maxWidth: '142px' }}
                    >
                      <Image src="/recalculate.png" alt="Recalculate icon" width={32} height={32} className="mr-2" />
                      Re-Calculate
                    </button>
                  </div>
                </div>
                {/* Email/Book Buttons - Single row below Re-Calculate */}
                <div className="flex flex-row gap-2 justify-center w-full">
                  <button
                    onClick={sendEmailReport}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-[#04A15B] text-[#04A15B] rounded-[8px] bg-white hover:bg-[#04A15B] hover:text-white transition-colors text-[14px] font-medium leading-[20px] disabled:opacity-50"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', height: '48px', minWidth: '202px', maxWidth: '202px' }}
                  >
                    Email me the full report
                  </button>
                  <button
                    onClick={bookConsult}
                    className="flex-1 px-4 py-2 border border-[#04A15B] text-[#04A15B] rounded-[8px] bg-white hover:bg-[#04A15B] hover:text-white transition-colors text-[14px] font-medium leading-[20px]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', height: '48px', minWidth: '264px', maxWidth: '264px' }}
                  >
                    Book a free 30–min consult →
                  </button>
                </div>
              </div>
            </div>
            {/* Note Section - Full Width at Bottom */}
            <div className="w-full mt-6" style={{ padding: '0 40px' }}>
              <div
                className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-lg px-6 py-4 flex items-start"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#64748B' }}
              >
                <span
                  className="mr-2"
                  style={{ fontWeight: 600, fontSize: '18px', lineHeight: '28px', color: '#64748B', letterSpacing: 0 }}
                >
                  Note:
                </span>
                <span
                  style={{ fontWeight: 400, fontSize: '18px', lineHeight: '28px', color: '#64748B', letterSpacing: 0 }}
                >
                  Results are estimates based on industry averages. Actual savings may vary depending on your specific workflows and automation implementation.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '1440px', height: '980px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', margin: '0 auto', padding: '0 20px' }}>
          <div className="bg-white shadow-lg border border-gray-200" style={{ width: '100%', maxWidth: '900px', height: '808px', paddingTop: '30px', paddingRight: '40px', paddingBottom: '120px', paddingLeft: '40px', borderRadius: '12px', marginTop: '86px' }}>
            {/* Header */}
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mr-3">
                  <Image 
                    src="/garden_growth-chart-fill-16.png" 
                    alt="Growth chart icon" 
                    width={24} 
                    height={24}
                    className="w-6 h-6 lg:w-8 lg:h-8"
                  />
                </div>
                <h2 className="text-[32px] font-semibold text-[#101F2F] leading-[40px] tracking-[-0.02em]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Workflow ROI Calculator
                </h2>
              </div>
            </div>

            {/* Core Workforce Metrics Section */}
            <div className="mb-6 lg:mb-8" style={{ marginTop: '40px' }}>
              <div className="flex items-center mb-4 lg:mb-6">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3">
                  <Image 
                    src="/uil_bullseye.png" 
                    alt="Bullseye icon" 
                    width={24} 
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-[20px] font-semibold text-[#6F7E8A] leading-[28px] tracking-[-0.02em]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Core Workforce Metrics
                </h3>
              </div>
              
              <div className="mb-4 text-sm text-gray-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Fields marked with <span className="text-red-500">*</span> are required. All values must be positive numbers.
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Employees doing manual work <span className="text-red-500">*</span>
                      </label>
                      <span className="relative group">
                        <Image 
                          src="/material-symbols_info-rounded.png" 
                          alt="Info icon" 
                          width={16} 
                          height={16}
                          className="w-4 h-4 ml-2 cursor-pointer"
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                        Enter how many team members handle repetitive, manual tasks weekly.
                        </span>
                      </span>
                    </div>
                    <input
                    type="number"
                    step="any"
                    name="teamMembers"
                    value={formData.teamMembers === 0 ? '' : formData.teamMembers}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    placeholder="e.g., 20"
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Hours per employee/week <span className="text-red-500">*</span>
                      </label>
                      <span className="relative group">
                        <Image 
                          src="/material-symbols_info-rounded.png" 
                          alt="Info icon" 
                          width={16} 
                          height={16}
                          className="w-4 h-4 ml-2 cursor-pointer"
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                          Average hours each employee spends on manual work in a typical week.
                        </span>
                      </span>
                    </div>
                    <input
                    type="number"
                    step="any"
                    name="hoursPerWeek"
                    value={formData.hoursPerWeek === 0 ? '' : formData.hoursPerWeek}
                    onChange={handleInputChange}
                    min="0"
                    max="168"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    placeholder="e.g., 40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Hourly cost (with overhead) <span className="text-red-500">*</span>
                      </label>
                      <span className="relative group">
                        <Image 
                          src="/material-symbols_info-rounded.png" 
                          alt="Info icon" 
                          width={16} 
                          height={16}
                          className="w-4 h-4 ml-2 cursor-pointer"
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                          Include base wage + overhead costs (e.g., tools, benefits, office space).
                        </span>
                      </span>
                    </div>
                    <input
                    type="number"
                    step="any"
                    name="hourlyRate"
                    value={formData.hourlyRate === 0 ? '' : formData.hourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    placeholder="e.g., 50"
                    />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Error Impact Section */}
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center mb-4 lg:mb-6">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3">
                  <Image 
                    src="/material-symbols_shield-outline-rounded.png" 
                    alt="Shield icon" 
                    width={24} 
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-[20px] font-semibold text-[#6F7E8A] leading-[28px] tracking-[-0.02em]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Error Impact (Optional)
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Monthly error cost <span className="text-gray-500">(optional)</span>
                    </label>
                      <span className="relative group">
                        <Image 
                          src="/material-symbols_info-rounded.png" 
                          alt="Info icon" 
                          width={16} 
                          height={16}
                          className="w-4 h-4 ml-2 cursor-pointer"
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                          How much do errors from manual work cost you monthly (in ₹/$)?
                        </span>
                      </span>
                  </div>
                  <input
                      type="number"
                      step="any"
                      name="monthlyErrorCost"
                      value={formData.monthlyErrorCost === 0 ? '' : formData.monthlyErrorCost}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                      placeholder="e.g., 1000"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Cost per error <span className="text-gray-500">(optional)</span>
                    </label>
                      <span className="relative group">
                        <Image 
                          src="/material-symbols_info-rounded.png" 
                          alt="Info icon" 
                          width={16} 
                          height={16}
                          className="w-4 h-4 ml-2 cursor-pointer"
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                          Estimated average cost every time a manual error occurs (e.g., ₹100).
                        </span>
                      </span>
                  </div>
                  <input
                      type="number"
                      step="any"
                      name="costPerError"
                      value={formData.costPerError === 0 ? '' : formData.costPerError}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                      placeholder="e.g., 100"
                  />
                </div>
              </div>
            </div>

            {/* Get Your Report Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4 lg:mb-6">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3">
                  <Image 
                    src="/lets-icons_message-light.png" 
                    alt="Message icon" 
                    width={24} 
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-[20px] font-semibold text-[#6F7E8A] leading-[28px] tracking-[-0.02em]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Get Your Report
                </h3>
              </div>
              <div>
                <div className="mb-2 flex items-center">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Your email <span className="text-red-500">*</span>
                  </label>
                  <span className="relative group ml-2">
                    <Image 
                      src="/material-symbols_info-rounded.png" 
                      alt="Info icon" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 hidden group-hover:block bg-[#101F2F] text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg" style={{fontFamily:'Plus Jakarta Sans, sans-serif'}}>
                      We’ll email your full savings report—no spam, promise.
                    </span>
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', width: '340px', height: '48px' }}
                  placeholder="Your@gmail.com"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center" style={{ marginBottom: '40px' }}>
              <button
                onClick={calculateROI}
                disabled={isLoading}
                className="w-full px-8 py-3 bg-[#04A15B] text-white rounded-lg hover:bg-[#038549] transition-colors text-[14px] font-semibold leading-[140%] tracking-[0%] disabled:opacity-50"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {isLoading ? 'Calculating & Sending Report...' : 'Calculate ROI'}
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#101F2F',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#04A15B',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}
