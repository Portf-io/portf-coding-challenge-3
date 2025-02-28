# Loan Management System

A simple Next.js application for capturing and managing loan details.

## Features

- Form to capture loan details:
  - Multiple drawdowns (amount and date)
  - Loan term in months
  - Interest rate percentage
  - Interest payment frequency (monthly/quarterly/yearly)
  - Interest accrual frequency (daily/monthly)
  - Bullet loan structure (principal repaid in full at maturity)
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

## Take-Home Test Instructions

### Objective
Extend the Loan Management System to include an interest calculation engine and transaction schedule. This will demonstrate your ability to implement complex business logic, work with financial calculations, and integrate new features into an existing codebase.

### Requirements

1. **Interest Schedule Generation**
   - Create a new API endpoint `/api/loans/{id}/schedule` that generates an interest payment schedule for a loan
   - The schedule should account for:
     - Multiple drawdowns at different dates
     - The loan's interest rate
     - Interest payment frequency (monthly/quarterly/yearly)
     - Interest accrual frequency (daily/monthly)
     - The loan term in months
   - All loans are structured as bullet loans, where the principal is repaid in full at the end of the loan term

2. **Transaction Model**
   - Design and implement a database schema for transactions that supports these transaction types:
     - Drawdowns (money borrowed)
     - Interest accruals (calculated interest)
     - Interest payments (paid interest)
     - Principal repayment (single payment at the end of the loan term)
   - Each transaction record should include these fields:
     - Transaction type (identifying which of the above types it is)
     - Amount (the monetary value)
     - Date (when the transaction occurred)
     - Reference to the loan (foreign key to the loans table)

3. **Database Schema**
   - Extend the database schema to store transactions
   - Create appropriate indexes for efficient querying

4. **UI Implementation**
   - Create a new page to display the interest schedule for a specific loan
   - Include a summary section showing:
     - Total interest over the life of the loan
     - Average interest per payment
     - Final payment date
   - Implement a transaction table with the following columns:
     - Transaction type (Drawdown, Interest Payment, Principal Repayment)
     - Amount (the transaction amount)
     - Date (when the transaction occurred)
     - Loan Principal (the total principal amount at that point in time)
   
   Example transaction table for a bullet loan:
   
   ```
   | Date       | Transaction Type   | Amount     | Loan Principal |
   |------------|-------------------|------------|----------------|
   | 2023-01-15 | Drawdown          | $10,000.00 | $10,000.00     |
   | 2023-02-15 | Interest Accrual  | $41.67     | $10,000.00     |
   | 2023-02-15 | Interest Payment  | $41.67     | $10,000.00     |
   | 2023-03-01 | Drawdown          | $5,000.00  | $15,000.00     |
   | 2023-03-15 | Interest Accrual  | $62.50     | $15,000.00     |
   | 2023-03-15 | Interest Payment  | $62.50     | $15,000.00     |
   | 2023-04-15 | Interest Accrual  | $62.50     | $15,000.00     |
   | 2023-04-15 | Interest Payment  | $62.50     | $15,000.00     |
   | 2023-05-15 | Interest Accrual  | $62.50     | $15,000.00     |
   | 2023-05-15 | Interest Payment  | $62.50     | $15,000.00     |
   | 2023-06-15 | Interest Accrual  | $62.50     | $15,000.00     |
   | 2023-06-15 | Interest Payment  | $62.50     | $15,000.00     |
   | 2023-06-15 | Principal Repayment | $15,000.00 | $0.00        |
   ```
   Note: In a bullet loan structure, the principal remains unchanged until the final repayment at maturity.

5. **Interest Calculation Logic**
   - Use the "Actual/365" day count convention for all interest calculations
     - This means using the actual number of days in the interest period divided by 365 days
     - For leap years, still use 365 as the denominator (not 366)
   - Implement simple interest calculation
   - Handle edge cases such as:
     - Partial periods
     - Leap years
     - Multiple drawdowns within a single interest period
   - Formula for daily interest: Principal × (Interest Rate / 365) × Actual Days in Period

6. **Testing**
   - Write comprehensive unit tests for the interest calculation logic
   - Include integration tests for the API endpoints
   - Add UI tests for the new components
   - Include specific test cases for the "Actual/365" methodology, verifying calculations across month and year boundaries

### Evaluation Criteria

Your submission will be evaluated based on:

1. **Code Quality**
   - Clean, maintainable code following best practices
   - Proper error handling and edge case management
   - Effective use of TypeScript for type safety

2. **System Design**
   - Appropriate architecture for the new features
   - Efficient database schema and query design
   - Separation of concerns between UI, API, and business logic

3. **Financial Accuracy**
   - Correct implementation of "Actual/365" interest calculations
   - Proper handling of financial edge cases
   - Accuracy in the generated schedule
   - Precision in decimal calculations (use appropriate rounding strategies for financial calculations)

4. **User Experience**
   - Intuitive UI for viewing complex financial data
   - Responsive design that works on various screen sizes
   - Appropriate loading states and error handling

5. **Testing**
   - Test coverage (inc. Edge case testing)
   - Performance testing for large datasets (Bonus)

### Submission Guidelines

1. Fork this repository
2. Implement the required features
3. Submit a pull request with your changes
4. Include a README explaining your approach, any assumptions made, and instructions for running your solution
5. Be prepared to discuss your implementation in a follow-up interview

### Time Expectation
We expect this task to take approximately 4-6 hours for a senior engineer. Please don't spend more than 8 hours on this task.

## License

MIT
