import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Log the form data
    console.log('Loan form submission:', formData);
    
    // In a real application, you would process the loan data here
    // For example, save to a database, perform calculations, etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Loan details received successfully' 
    });
  } catch (error) {
    console.error('Error processing loan form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process loan details' },
      { status: 500 }
    );
  }
} 