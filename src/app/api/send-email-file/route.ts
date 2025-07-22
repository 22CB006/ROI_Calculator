import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

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

    // Generate HTML email content
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Workflow ROI Calculator Report</title>
        <style>
            body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #04A15B 0%, #038549 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 30px; }
            .metrics-section { margin-bottom: 30px; }
            .metrics-title { color: #101F2F; font-size: 20px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #04A15B; padding-bottom: 5px; }
            .metric-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .metric-label { color: #6F7E8A; font-weight: 500; }
            .metric-value { color: #101F2F; font-weight: 600; }
            .results-section { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .result-card { margin: 15px 0; padding: 20px; border-radius: 8px; text-align: center; }
            .loss-card { background-color: #fee; border-left: 4px solid #dc3545; }
            .break-even-card { background-color: #fff3cd; border-left: 4px solid #ffc107; }
            .savings-card { background-color: #d1ecf1; border-left: 4px solid #28a745; }
            .result-amount { font-size: 32px; font-weight: 700; margin: 10px 0; }
            .loss-text { color: #dc3545; }
            .break-even-text { color: #856404; }
            .savings-text { color: #155724; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6F7E8A; font-size: 14px; }
            .cta-button { display: inline-block; background-color: #04A15B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px; }
            .note { background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin: 20px 0; color: #6F7E8A; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌱 Workflow ROI Calculator Report</h1>
                <p>Your personalized automation ROI analysis</p>
                <p><strong>Recipient:</strong> ${email}</p>
            </div>
            
            <div class="content">
                <div class="metrics-section">
                    <h2 class="metrics-title">Core Workforce Metrics</h2>
                    <div class="metric-row">
                        <span class="metric-label">Employees doing manual work:</span>
                        <span class="metric-value">${teamMembers}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Hours per employee/week:</span>
                        <span class="metric-value">${hoursPerWeek}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Hourly cost (with overhead):</span>
                        <span class="metric-value">$${hourlyRate}</span>
                    </div>
                    ${monthlyErrorCost ? `
                    <div class="metric-row">
                        <span class="metric-label">Monthly error cost:</span>
                        <span class="metric-value">$${monthlyErrorCost.toLocaleString()}</span>
                    </div>` : ''}
                    ${costPerError ? `
                    <div class="metric-row">
                        <span class="metric-label">Cost per error:</span>
                        <span class="metric-value">$${costPerError}</span>
                    </div>` : ''}
                </div>
                
                <div class="results-section">
                    <h2 class="metrics-title">ROI Analysis Results</h2>
                    
                    <div class="result-card loss-card">
                        <h3 class="loss-text">Current Monthly Loss</h3>
                        <div class="result-amount loss-text">$${monthlyLoss.toLocaleString()}</div>
                        <p>You're losing this amount per month due to manual processes</p>
                    </div>
                    
                    <div class="result-card break-even-card">
                        <h3 class="break-even-text">Break-Even Timeline</h3>
                        <div class="result-amount break-even-text">${breakEvenMonths} months</div>
                        <p>Time to recover automation investment</p>
                    </div>
                    
                    <div class="result-card savings-card">
                        <h3 class="savings-text">Annual Savings Potential</h3>
                        <div class="result-amount savings-text">$${annualSavings.toLocaleString()}</div>
                        <p>Net savings after automation implementation</p>
                    </div>
                </div>
                
                <div class="note">
                    <strong>Note:</strong> Results are estimates based on industry averages. Actual savings may vary depending on your specific workflows and automation implementation.
                </div>
            </div>
            
            <div class="footer">
                <p>This report was generated by the Workflow ROI Calculator</p>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Save email to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `roi-report-${timestamp}.html`;
    const filepath = join(process.cwd(), 'email-reports', filename);
    
    try {
      // Create directory if it doesn't exist
      const { mkdirSync } = await import('fs');
      mkdirSync(join(process.cwd(), 'email-reports'), { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
    
    writeFileSync(filepath, htmlContent);

    console.log(`📧 EMAIL REPORT SAVED: ${filepath}`);
    console.log(`📬 Recipient: ${email}`);
    console.log('✅ Open the HTML file in your browser to view the email report');

    return NextResponse.json({ 
      message: `Report saved successfully! Check: email-reports/${filename}`,
      filepath: `email-reports/${filename}`
    });
  } catch (error) {
    console.error('Error saving email report:', error);
    return NextResponse.json(
      { error: 'Failed to save email report' },
      { status: 500 }
    );
  }
}
