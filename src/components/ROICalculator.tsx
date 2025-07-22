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

  // Helper function to format break-even time with approximate days
  const formatBreakEvenTime = (months: number) => {
    if (months < 1) {
      const days = Math.round(months * 30); // Approximate days in a month
      return {
        primary: `${months.toFixed(2)} months`,
        secondary: `(≈ ${days} days)`
      };
    } else if (months < 12) {
      return {
        primary: `${months.toFixed(1)} months`,
        secondary: ''
      };
    } else {
      const years = (months / 12).toFixed(1);
      return {
        primary: `${years} years`,
        secondary: ''
      };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // For numeric fields, ensure no negative values
      const numericValue = Number(value);
      if (value === '' || numericValue >= 0) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }));
      }
      // If user tries to enter negative value, don't update the state
      // The input will remain at its previous value
    }
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

    // Check for negative values
    if (formData.teamMembers < 0) {
      toast.error('Number of employees cannot be negative');
      return;
    }
    
    if (formData.hoursPerWeek < 0) {
      toast.error('Hours per employee/week cannot be negative');
      return;
    }
    
    if (formData.hourlyRate < 0) {
      toast.error('Hourly cost cannot be negative');
      return;
    }
    
    if (formData.monthlyErrorCost < 0) {
      toast.error('Monthly error cost cannot be negative');
      return;
    }
    
    if (formData.costPerError < 0) {
      toast.error('Cost per error cannot be negative');
      return;
    }

    // Additional logical validations
    if (formData.hoursPerWeek > 168) { // 168 hours in a week
      toast.error('Hours per week cannot exceed 168 (total hours in a week)');
      return;
    }

    setIsLoading(true);
    toast.loading('Calculating & Sending Report...', { id: 'calculation' });

    const laborCostPerMonth = formData.teamMembers * formData.hoursPerWeek * formData.hourlyRate * 4;
    const totalMonthlyCost = laborCostPerMonth + formData.monthlyErrorCost;
    const automationCost = 18000;
    const breakEvenMonths = totalMonthlyCost > 0 ? automationCost / totalMonthlyCost : 0;
    const annualSavings = (totalMonthlyCost * 12) - automationCost;

    const calculatedResults = {
      monthlyLoss: totalMonthlyCost,
      breakEvenMonths: breakEvenMonths, // Keep exact decimal value
      annualSavings: Math.max(0, annualSavings)
    };

    setResults(calculatedResults);
    setShowResults(true);

    // Send email with the results
    try {
      // Use mock email service if configured
      const emailEndpoint = process.env.NEXT_PUBLIC_USE_MOCK_EMAIL === 'true' ? '/api/send-email-mock' : '/api/send-email';
      
      const response = await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          teamMembers: formData.teamMembers,
          hoursPerWeek: formData.hoursPerWeek,
          hourlyRate: formData.hourlyRate,
          monthlyErrorCost: formData.monthlyErrorCost,
          costPerError: formData.costPerError,
          monthlyLoss: calculatedResults.monthlyLoss,
          breakEvenMonths: calculatedResults.breakEvenMonths,
          annualSavings: calculatedResults.annualSavings,
        }),
      });

      if (response.ok) {
        toast.success('Report sent to your email successfully!', { id: 'calculation' });
      } else {
        const errorData = await response.json();
        if (response.status === 503) {
          toast.error('Email service not configured. Please contact support for report delivery.', { id: 'calculation' });
        } else {
          toast.error(`Email sending failed: ${errorData.error || 'Unknown error'}`, { id: 'calculation' });
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Email service temporarily unavailable. Please try again later.', { id: 'calculation' });
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailReport = async () => {
    if (!formData.email || !results) {
      toast.error('Email or results not available');
      return;
    }

    setIsLoading(true);
    toast.loading('Sending report...', { id: 'email-report' });

    try {
      // Use mock email service if configured
      const emailEndpoint = process.env.NEXT_PUBLIC_USE_MOCK_EMAIL === 'true' ? '/api/send-email-mock' : '/api/send-email';
      
      const response = await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          teamMembers: formData.teamMembers,
          hoursPerWeek: formData.hoursPerWeek,
          hourlyRate: formData.hourlyRate,
          monthlyErrorCost: formData.monthlyErrorCost,
          costPerError: formData.costPerError,
          monthlyLoss: results.monthlyLoss,
          breakEvenMonths: results.breakEvenMonths,
          annualSavings: results.annualSavings,
        }),
      });

      if (response.ok) {
        toast.success('Full report sent to your email successfully!', { id: 'email-report' });
      } else {
        const errorData = await response.json();
        if (response.status === 503) {
          toast.error('Email service not configured. Please contact support for report delivery.', { id: 'email-report' });
        } else {
          toast.error(`Failed to send email: ${errorData.error || 'Unknown error'}`, { id: 'email-report' });
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Email service temporarily unavailable. Please try again later.', { id: 'email-report' });
    } finally {
      setIsLoading(false);
    }
  };

  if (showResults && results) {
    return (
      <div className="w-full flex justify-center items-center min-h-[908px] bg-transparent">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 w-[1440px] flex flex-col gap-0 md:gap-8">
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
                <div className="flex flex-col">
                  <span className="text-[32px] font-bold text-yellow-800 leading-none">{formatBreakEvenTime(results.breakEvenMonths).primary}</span>
                  {formatBreakEvenTime(results.breakEvenMonths).secondary && (
                    <span className="text-[18px] font-medium text-yellow-700 leading-none mt-1">{formatBreakEvenTime(results.breakEvenMonths).secondary}</span>
                  )}
                  <span className="text-[16px] font-medium text-yellow-800 leading-none mt-2">if automated</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col">
                <span className="text-[16px] font-medium text-green-700 mb-1">Annual savings potential:</span>
                <span className="text-[40px] font-bold text-green-700 leading-none">${results.annualSavings.toLocaleString()}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={sendEmailReport}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[#04A15B] font-medium hover:bg-gray-50 transition-colors text-[16px] whitespace-nowrap disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Email me the full report'}
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
    <>
      <div style={{ width: '1440px', height: '980px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
        <div className="bg-white shadow-lg border border-gray-200" style={{ width: '900px', height: '808px', paddingTop: '20px', paddingRight: '40px', paddingBottom: '40px', paddingLeft: '40px', borderRadius: '12px' }}>
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
                    step="0.01"
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
                  step="0.01"
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
                  step="0.01"
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
