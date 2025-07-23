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
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const calculateROI = async () => {
    // Check for required fields
    if (!formData.email) {
      toast.error('Email is required');
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
    const breakEvenMonths = automationCost / totalMonthlyCost;
    const annualSavings = totalMonthlyCost * 12;

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

  const sendEmailReport = () => {
    toast.success('Report sent to your email!');
  };

  const bookConsult = () => {
    toast('Booking page coming soon!');
  };

  return (
    <>
      {showResults && results ? (
        <div style={{ width: '100%', maxWidth: '900px', height: '808px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', padding: '0 20px' }}>
          <div className="bg-white shadow-lg border border-gray-200 flex flex-row" style={{ width: '900px', height: '808px', borderRadius: '12px', padding: '40px' }}>
            {/* Left: Editable Input Fields */}
            <div className="flex flex-col justify-start w-1/2 pr-8 gap-6">
              {/* Employees doing manual work */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                    Employees doing manual work <span className="text-red-500">*</span>
                  </label>
                  <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2" />
                </div>
                <input
                  type="number"
                  name="teamMembers"
                  value={formData.teamMembers || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="e.g., 20"
                />
              </div>
              {/* Hours per employee/week */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                    Hours per employee/week <span className="text-red-500">*</span>
                  </label>
                  <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2" />
                </div>
                <input
                  type="number"
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek || ''}
                  onChange={handleInputChange}
                  min="0"
                  max="168"
                  step="1"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="e.g., 40"
                />
              </div>
              {/* Hourly cost (with overhead) */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                    Hourly cost (with overhead) <span className="text-red-500">*</span>
                  </label>
                  <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2" />
                </div>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="e.g., 50"
                />
              </div>
              {/* Monthly error cost (optional) */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                    Monthly error cost <span className="text-gray-500">(optional)</span>
                  </label>
                  <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2" />
                </div>
                <input
                  type="number"
                  name="monthlyErrorCost"
                  value={formData.monthlyErrorCost || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="e.g., 1000"
                />
              </div>
              {/* Cost per error (optional) */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]">
                    Cost per error <span className="text-gray-500">(optional)</span>
                  </label>
                  <Image src="/material-symbols_info-rounded.png" alt="Info icon" width={16} height={16} className="w-4 h-4 ml-2" />
                </div>
                <input
                  type="number"
                  name="costPerError"
                  value={formData.costPerError || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            {/* Right: Results/Outputs */}
            <div className="flex flex-col justify-start w-1/2 pl-8 gap-6">
              {/* You're losing */}
              <div className="bg-[#FFECEC] rounded-lg p-6 mb-4">
                <div className="text-[#EF4444] text-[16px] font-normal mb-1">You&rsquo;re losing</div>
                <div className="text-[#EF4444] text-[40px] font-bold leading-[1.1]">${results.monthlyLoss.toLocaleString()}</div>
                <div className="text-[#EF4444] text-[16px] font-normal">per month</div>
              </div>
              {/* Break-even */}
              <div className="bg-[#FFF7E6] rounded-lg p-6 mb-4">
                <div className="text-[#B8840B] text-[16px] font-normal mb-1">Break-even in</div>
                <div className="text-[#B8840B] text-[40px] font-bold leading-[1.1]">{results.breakEvenMonths} months</div>
                <div className="text-[#B8840B] text-[16px] font-normal">if automated</div>
              </div>
              {/* Annual savings potential */}
              <div className="bg-[#E6F9ED] rounded-lg p-6 mb-4">
                <div className="text-[#04A15B] text-[16px] font-normal mb-1">Annual savings potential:</div>
                <div className="text-[#04A15B] text-[40px] font-bold leading-[1.1]">${results.annualSavings.toLocaleString()}</div>
              </div>
              {/* Re-Calculate Button */}
              <button
                onClick={calculateROI}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-white border border-[#04A15B] text-[#04A15B] rounded-lg hover:bg-[#E6F9ED] transition-colors text-[14px] font-semibold leading-[140%] tracking-[0%] disabled:opacity-50 mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <Image src="/recalculate.png" alt="Recalculate icon" width={20} height={20} />
                Re-Calculate
              </button>
              {/* Action Buttons */}
              <div className="flex flex-row gap-4 mb-4">
                <button
                  onClick={sendEmailReport}
                  disabled={isLoading}
                  className="flex-1 px-8 py-3 bg-white border border-[#04A15B] text-[#04A15B] rounded-lg hover:bg-[#E6F9ED] transition-colors text-[14px] font-semibold leading-[140%] tracking-[0%] disabled:opacity-50"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Email me the full report
                </button>
                <button
                  onClick={bookConsult}
                  className="flex-1 px-8 py-3 bg-[#04A15B] text-white rounded-lg hover:bg-[#038549] transition-colors text-[14px] font-semibold leading-[140%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Book a free 30-min consult &rarr;
                </button>
              </div>
              {/* Note */}
              <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-lg px-6 py-4 text-[15px]" style={{color:'#6F7E8A'}}>
                <b>Note:</b> Results are estimates based on industry averages. Actual savings may vary depending on your specific workflows and automation implementation.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '1440px', height: '980px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', padding: '0 20px' }}>
          <div className="bg-white shadow-lg border border-gray-200" style={{ width: '100%', maxWidth: '900px', height: '808px', paddingTop: '20px', paddingRight: '40px', paddingBottom: '40px', paddingLeft: '40px', borderRadius: '12px' }}>
            {/* Header */}
            <div className="mb-6 lg:mb-8">
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
            <div className="mb-6 lg:mb-8">
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
                      <Image 
                        src="/material-symbols_info-rounded.png" 
                        alt="Info icon" 
                        width={16} 
                        height={16}
                        className="w-4 h-4 ml-2"
                      />
                    </div>
                    <input
                      type="number"
                      name="teamMembers"
                      value={formData.teamMembers || ''}
                      onChange={handleInputChange}
                      min="0"
                      step="1"
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
                      <Image 
                        src="/material-symbols_info-rounded.png" 
                        alt="Info icon" 
                        width={16} 
                        height={16}
                        className="w-4 h-4 ml-2"
                      />
                    </div>
                    <input
                      type="number"
                      name="hoursPerWeek"
                      value={formData.hoursPerWeek || ''}
                      onChange={handleInputChange}
                      min="0"
                      max="168"
                      step="1"
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
                      <Image 
                        src="/material-symbols_info-rounded.png" 
                        alt="Info icon" 
                        width={16} 
                        height={16}
                        className="w-4 h-4 ml-2"
                      />
                    </div>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate || ''}
                      onChange={handleInputChange}
                      min="0"
                      step="1"
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
                    <Image 
                      src="/material-symbols_info-rounded.png" 
                      alt="Info icon" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 ml-2"
                    />
                  </div>
                  <input
                    type="number"
                    name="monthlyErrorCost"
                    value={formData.monthlyErrorCost || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    placeholder="e.g., 1000"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Cost per error <span className="text-gray-500">(optional)</span>
                    </label>
                    <Image 
                      src="/material-symbols_info-rounded.png" 
                      alt="Info icon" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 ml-2"
                    />
                  </div>
                  <input
                    type="number"
                    name="costPerError"
                    value={formData.costPerError || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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
                <div className="mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Your email <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="Your@gmail.com"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
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
