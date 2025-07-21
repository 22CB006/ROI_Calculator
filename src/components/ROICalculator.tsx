'use client';

import { useState } from 'react';
import { TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';
import Image from 'next/image';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'email' ? value : Number(value)
    }));
  };

  const calculateROI = () => {
    const laborCostPerMonth = formData.teamMembers * formData.hoursPerWeek * formData.hourlyRate * 4;
    const totalMonthlyCost = laborCostPerMonth + formData.monthlyErrorCost;
    const automationCost = 18000;
    const breakEvenMonths = totalMonthlyCost > 0 ? automationCost / totalMonthlyCost : 0;
    const annualSavings = (totalMonthlyCost * 12) - automationCost;

    const calculatedResults = {
      monthlyLoss: totalMonthlyCost,
      breakEvenMonths: Math.ceil(breakEvenMonths),
      annualSavings: Math.max(0, annualSavings)
    };

    setResults(calculatedResults);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData({
      teamMembers: 0,
      hoursPerWeek: 0,
      hourlyRate: 0,
      monthlyErrorCost: 0,
      costPerError: 0,
      email: ''
    });
    setResults(null);
    setShowResults(false);
  };

  if (showResults && results) {
    return (
      <div className="w-full flex justify-center items-center min-h-[808px] bg-transparent">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 w-[900px] flex flex-col gap-0 md:gap-8">
          {/* Centered Title */}
          <div className="flex items-center justify-center mb-8 w-full">
            <Image src="/garden_growth-chart-fill-16.png" alt="Growth chart icon" width={28} height={28} className="w-7 h-7 mr-2" />
            <h2 className="text-[28px] font-bold text-[#101F2F]">Workflow ROI Calculator</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Left: User Inputs (read-only) */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-[16px] font-medium text-[#101F2F] mb-1">Employees doing manual work</label>
                  <input type="number" value={formData.teamMembers} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-[#101F2F] text-[16px]" />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#101F2F] mb-1">Hours per employee/week</label>
                  <input type="number" value={formData.hoursPerWeek} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-[#101F2F] text-[16px]" />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#101F2F] mb-1">Hourly cost (with overhead)</label>
                  <input type="number" value={formData.hourlyRate} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-[#101F2F] text-[16px]" />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#101F2F] mb-1">Monthly error cost (optional)</label>
                  <input type="number" value={formData.monthlyErrorCost} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-[#101F2F] text-[16px]" />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#101F2F] mb-1">Cost per error (optional)</label>
                  <input type="number" value={formData.costPerError} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-[#101F2F] text-[16px]" />
                </div>
              </div>
            </div>
            {/* Right: Output Cards */}
            <div className="flex-1 flex flex-col gap-4 justify-center md:justify-center md:min-h-[420px] md:self-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col">
                <span className="text-[16px] font-medium text-red-600 mb-1">You&apos;re losing</span>
                <div className="flex items-end gap-2">
                  <span className="text-[40px] font-bold text-red-600 leading-none">${results.monthlyLoss.toLocaleString()}</span>
                  <span className="text-[18px] font-medium text-red-600 leading-none mb-1">per month</span>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex flex-col">
                <span className="text-[16px] font-medium text-yellow-800 mb-1">Break-even in</span>
                <div className="flex items-end gap-2">
                  <span className="text-[40px] font-bold text-yellow-800 leading-none">{results.breakEvenMonths} months</span>
                  <span className="text-[18px] font-medium text-yellow-800 leading-none mb-1">if automated</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col">
                <span className="text-[16px] font-medium text-green-700 mb-1">Annual savings potential:</span>
                <span className="text-[40px] font-bold text-green-700 leading-none">${results.annualSavings.toLocaleString()}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={resetCalculator}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[#04A15B] font-medium hover:bg-gray-50 transition-colors text-[16px] whitespace-nowrap"
                >
                  Email me the full report
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-[#04A15B] text-white rounded-lg hover:bg-[#038549] transition-colors text-[16px] font-medium whitespace-nowrap"
                >
                  Book a free 30-min consult <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
          {/* Note Section Full Width */}
          <div className="w-full mt-8">
            <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-lg px-6 py-4 text-[15px]" style={{color:'#6F7E8A'}}>
              <span className="font-semibold whitespace-nowrap" style={{color:'#101F2F'}}>
                Note: <span className="font-normal whitespace-nowrap" style={{color:'#6F7E8A'}}>Results</span>
              </span>
              <span style={{color:'#6F7E8A'}}>
                are estimates based on industry averages. Actual savings may vary depending on your specific
              </span>
              <br />
              <span style={{color:'#6F7E8A'}}>
                workflows and automation implementation.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#04A15B] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="relative z-10 w-[390px] lg:w-[900px] h-[917px] lg:h-[808px] mx-auto p-4 lg:p-0">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-200 w-full h-full overflow-hidden">
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
            
            <div className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Employees doing manual work
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
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    placeholder="e.g., 20"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Hours per employee/week
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
                      Hourly cost (with overhead)
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
                    Monthly error cost (optional)
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none text-[#101F2F] text-[16px] font-normal leading-[150%] tracking-[0%]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  placeholder="e.g., 1000"
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-[18px] font-normal text-[#101F2F] leading-[150%] tracking-[0%]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Cost per error (optional)
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
                  Your email
                </label>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
              className="w-full px-8 py-3 bg-[#04A15B] text-white rounded-lg hover:bg-[#038549] transition-colors text-[14px] font-semibold leading-[140%] tracking-[0%]"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Calculate ROI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
