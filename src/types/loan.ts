export interface Drawdown {
  amount: number;
  date: Date;
}

export type InterestPaymentFrequency = 'monthly' | 'quarterly' | 'yearly';
export type InterestAccrualFrequency = 'daily' | 'monthly';
export type LoanType = 'bullet';

export interface LoanFormData {
  drawdowns: Drawdown[];
  loanTerm: number; // in months
  interestRate: number; // percentage
  interestPaymentFrequency: InterestPaymentFrequency;
  interestAccrualFrequency: InterestAccrualFrequency;
  loanType: LoanType; // bullet loan
} 