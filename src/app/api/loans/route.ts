import { NextResponse } from 'next/server';
import { getAllLoans, getLoanById } from '@/db/loanService';

// GET /api/loans - Get all loans
export async function GET(request: Request) {
  try {
    // Check if there's an ID in the query params
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      // Get a specific loan by ID
      const loanId = parseInt(id, 10);
      if (isNaN(loanId)) {
        return NextResponse.json(
          { success: false, message: 'Invalid loan ID' },
          { status: 400 }
        );
      }
      
      const loan = await getLoanById(loanId);
      if (!loan) {
        return NextResponse.json(
          { success: false, message: 'Loan not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ 
        success: true, 
        loan 
      });
    } else {
      // Get all loans
      const loans = await getAllLoans();
      return NextResponse.json({ 
        success: true, 
        loans 
      });
    }
  } catch (error) {
    console.error('Error retrieving loans:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve loans' },
      { status: 500 }
    );
  }
} 