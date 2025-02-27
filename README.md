# Loan Management System

A simple Next.js application for capturing and managing loan details.

## Features

- Form to capture loan details:
  - Multiple drawdowns (amount and date)
  - Loan term in months
  - Interest rate percentage
  - Interest payment frequency (monthly/quarterly/yearly)
  - Interest accrual frequency (daily/monthly)
- Form validation using Zod
- API endpoint for form submission
- Modern UI using shadcn components

## Technologies Used

- Next.js 14
- TypeScript
- React Hook Form
- Zod for validation
- shadcn UI components
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/page.tsx` - Main page component
- `src/app/api/loan/route.ts` - API endpoint for loan form submission
- `src/components/LoanForm.tsx` - Main loan form component
- `src/components/DrawdownArrayInput.tsx` - Custom component for managing drawdown inputs
- `src/types/loan.ts` - TypeScript types for loan data

## License

MIT
