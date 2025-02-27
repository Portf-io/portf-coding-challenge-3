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
- API endpoints for form submission and data retrieval
- SQLite database for persistent storage
- View saved loans with all details
- Modern UI using shadcn components

## Technologies Used

- Next.js 14
- TypeScript
- React Hook Form
- Zod for validation
- SQLite with Drizzle ORM
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
- `src/app/loans/page.tsx` - Page to view saved loans
- `src/app/api/loan/route.ts` - API endpoint for loan form submission
- `src/app/api/loans/route.ts` - API endpoint for retrieving loans
- `src/components/LoanForm.tsx` - Main loan form component
- `src/components/DrawdownArrayInput.tsx` - Custom component for managing drawdown inputs
- `src/types/loan.ts` - TypeScript types for loan data
- `src/db/` - Database-related files:
  - `index.ts` - Database connection and initialization
  - `schema.ts` - Database schema definitions
  - `loanService.ts` - Service functions for database operations

## Database

The application uses SQLite for data persistence. The database file is created automatically at the root of the project as `loan-data.db`. The schema includes:

- `loans` table - Stores loan details like term, interest rate, and payment frequencies
- `drawdowns` table - Stores drawdown amounts and dates, linked to loans via foreign key

## License

MIT
