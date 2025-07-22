import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      teamMembers, 
      hoursPerWeek, 
      hourlyRate, 
      monthlyErrorCost, 
      costPerError,
      monthlyLoss,
      breakEvenMonths,
      annualSavings
    } = body;

    // Validate required fields
    if (!email || !teamMembers || !hoursPerWeek || !hourlyRate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log the email content to console (for development purposes)
    console.log('📧 MOCK EMAIL SENT:');
    console.log('To:', email);
    console.log('Subject: Your Workflow ROI Calculator Report');
    console.log('Content:');
    console.log(`
      ROI Calculator Report
      =====================
      Core Workforce Metrics:
      - Employees doing manual work: ${teamMembers}
      - Hours per employee/week: ${hoursPerWeek}
      - Hourly cost (with overhead): $${hourlyRate}
      ${monthlyErrorCost ? `- Monthly error cost: $${monthlyErrorCost.toLocaleString()}` : ''}
      ${costPerError ? `- Cost per error: $${costPerError}` : ''}
      
      ROI Analysis Results:
      - Monthly Loss: $${monthlyLoss.toLocaleString()}
      - Break-even Timeline: ${breakEvenMonths} months
      - Annual Savings Potential: $${annualSavings.toLocaleString()}
      
      Note: This is a mock email for development purposes.
      Configure real email credentials to send actual emails.
    `);

    return NextResponse.json({ 
      message: 'Mock email sent successfully (check console for email content)' 
    });
  } catch (error) {
    console.error('Error in mock email service:', error);
    return NextResponse.json(
      { error: 'Mock email service failed' },
      { status: 500 }
    );
  }
}
