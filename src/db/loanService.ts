import { db } from './index';
import { loans, drawdowns } from './schema';
import { LoanFormData, Drawdown } from '@/types/loan';
import { eq } from 'drizzle-orm';

export interface SavedLoan {
  id: number;
  loanTerm: number;
  interestRate: number;
  interestPaymentFrequency: string;
  interestAccrualFrequency: string;
  loanType: string;
  createdAt: Date;
  drawdowns: SavedDrawdown[];
}

export interface SavedDrawdown {
  id: number;
  loanId: number;
  amount: number;
  date: string;
  createdAt: Date;
}

/**
 * Save a loan and its drawdowns to the database
 */
export async function saveLoan(loanData: LoanFormData): Promise<number> {
  // Insert the loan record
  const [insertedLoan] = await db.insert(loans).values({
    loanTerm: loanData.loanTerm,
    interestRate: loanData.interestRate,
    interestPaymentFrequency: loanData.interestPaymentFrequency,
    interestAccrualFrequency: loanData.interestAccrualFrequency,
    loanType: loanData.loanType || 'bullet',
  }).returning({ id: loans.id });

  // Get the inserted loan ID
  const loanId = insertedLoan.id;

  // Insert all drawdowns for this loan
  if (loanData.drawdowns && loanData.drawdowns.length > 0) {
    await db.insert(drawdowns).values(
      loanData.drawdowns.map((drawdown: Drawdown) => ({
        loanId,
        amount: drawdown.amount,
        date: typeof drawdown.date === 'string' 
          ? drawdown.date 
          : drawdown.date instanceof Date 
            ? drawdown.date.toISOString() 
            : new Date(drawdown.date).toISOString(),
      }))
    );
  }

  return loanId;
}

/**
 * Get all loans with their drawdowns
 */
export async function getAllLoans(): Promise<SavedLoan[]> {
  // Get all loans
  const loanRecords = await db.select().from(loans);
  
  // For each loan, get its drawdowns
  const result: SavedLoan[] = [];
  
  for (const loan of loanRecords) {
    const drawdownRecords = await db.select().from(drawdowns)
      .where(eq(drawdowns.loanId, loan.id));
    
    result.push({
      id: loan.id,
      loanTerm: loan.loanTerm,
      interestRate: loan.interestRate,
      interestPaymentFrequency: loan.interestPaymentFrequency as string,
      interestAccrualFrequency: loan.interestAccrualFrequency as string,
      loanType: loan.loanType as string,
      createdAt: new Date(loan.createdAt),
      drawdowns: drawdownRecords.map(d => ({
        id: d.id,
        loanId: d.loanId,
        amount: d.amount,
        date: d.date,
        createdAt: new Date(d.createdAt),
      })),
    });
  }
  
  return result;
}

/**
 * Get a loan by ID with its drawdowns
 */
export async function getLoanById(id: number): Promise<SavedLoan | null> {
  // Get the loan
  const [loanRecord] = await db.select().from(loans)
    .where(eq(loans.id, id));
  
  if (!loanRecord) {
    return null;
  }
  
  // Get the drawdowns for this loan
  const drawdownRecords = await db.select().from(drawdowns)
    .where(eq(drawdowns.loanId, id));
  
  return {
    id: loanRecord.id,
    loanTerm: loanRecord.loanTerm,
    interestRate: loanRecord.interestRate,
    interestPaymentFrequency: loanRecord.interestPaymentFrequency as string,
    interestAccrualFrequency: loanRecord.interestAccrualFrequency as string,
    loanType: loanRecord.loanType as string,
    createdAt: new Date(loanRecord.createdAt),
    drawdowns: drawdownRecords.map(d => ({
      id: d.id,
      loanId: d.loanId,
      amount: d.amount,
      date: d.date,
      createdAt: new Date(d.createdAt),
    })),
  };
} 