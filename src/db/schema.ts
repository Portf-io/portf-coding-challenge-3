import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Loans table
export const loans = sqliteTable('loans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  loanTerm: integer('loan_term').notNull(), // in months
  interestRate: real('interest_rate').notNull(), // percentage
  interestPaymentFrequency: text('interest_payment_frequency', { enum: ['monthly', 'quarterly', 'yearly'] }).notNull(),
  interestAccrualFrequency: text('interest_accrual_frequency', { enum: ['daily', 'monthly'] }).notNull(),
  loanType: text('loan_type', { enum: ['bullet'] }).notNull().default('bullet'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Drawdowns table with foreign key to loans
export const drawdowns = sqliteTable('drawdowns', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  loanId: integer('loan_id').notNull().references(() => loans.id),
  amount: real('amount').notNull(),
  date: text('date').notNull(), // Store as ISO string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}); 