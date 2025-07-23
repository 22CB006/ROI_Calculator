'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "What is this calculator for?",
    answer: "This tool helps you estimate how much money you're losing due to manual processes and calculate how much you could save by automating those processes. It's designed to help businesses understand the ROI of workflow automation."
  },
  {
    question: "Is the result 100% accurate?",
    answer: "The calculator provides estimates based on your inputs and industry standards. Actual results may vary depending on the complexity of your processes, implementation costs, and other factors specific to your business."
  },
  {
    question: "Why do you ask for my email?",
    answer: "We ask for your email to send you a detailed report with your results and additional insights. This also allows us to follow up with more information about how automation could benefit your specific business needs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto px-4" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      <div className="bg-white w-full" style={{ paddingBottom: '40px' }}>
        <h2 className="text-[48px] font-plus-jakarta-sans leading-[140%] tracking-[-0.05em] text-[#131514] text-center mb-6 lg:mb-8" style={{ fontWeight: '600' }}>
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 max-w-[800px] mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 lg:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span
                  className="pr-4"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '150%',
                    color: '#131514',
                    letterSpacing: '0%'
                  }}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div>
                  <div className="px-4 lg:px-6">
                    <hr className="border-gray-200 border-t" />
                  </div>
                  <div className="px-4 lg:px-6 py-4">
                    <p className="text-[18px] font-plus-jakarta-sans text-[#6F7E8A] leading-[140%] tracking-[0%]" style={{ fontWeight: '400' }}>{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
