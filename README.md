# Workflow ROI Calculator

A Next.js application that calculates Return on Investment (ROI) for workflow automation, featuring email report delivery.

## Features

- 📊 Interactive ROI calculation based on workforce metrics
- 📧 Automated email report delivery
- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up email configuration (see [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Configuration

The application includes email functionality to send ROI reports. To enable this feature:

1. Copy `.env.local` and configure your email credentials
2. Follow the setup instructions in [EMAIL_SETUP.md](./EMAIL_SETUP.md)
3. Test the functionality by filling out the calculator and providing an email address

## Technology Stack

- **Framework**: Next.js 15.4.1 with App Router
- **Styling**: Tailwind CSS 4
- **Email**: Nodemailer
- **Language**: TypeScript
- **Icons**: Lucide React

## Usage

1. Fill in the workforce metrics (employees, hours, hourly cost)
2. Optionally add error impact data
3. Enter your email address
4. Click "Calculate ROI" to see results and receive an email report
5. Use "Email me the full report" button to resend the report

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
