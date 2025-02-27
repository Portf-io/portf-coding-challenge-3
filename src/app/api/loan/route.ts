import { NextResponse } from 'next/server';
import { saveLoan } from '@/db/loanService';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Log the form data
    console.log('Loan form submission:', formData);
    
    // Save the loan data to the database
    const loanId = await saveLoan(formData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Loan details received and saved successfully',
      loanId
    });
  } catch (error) {
    console.error('Error processing loan form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process loan details' },
      { status: 500 }
    );
  }
} 