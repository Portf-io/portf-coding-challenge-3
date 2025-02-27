import Link from 'next/link';
import { getAllLoans } from '@/db/loanService';

export default async function LoansPage() {
  // Fetch loans directly from the database service
  const loans = await getAllLoans();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Loan Management System</h1>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Saved Loans</h2>
            <div className="space-x-4">
              <Link href="/" className="text-blue-500 hover:underline">
                Add New Loan
              </Link>
            </div>
          </div>

          {loans.length === 0 ? (
            <p className="text-center py-4">No loans found. Create your first loan!</p>
          ) : (
            <div className="space-y-6">
              {loans.map((loan) => (
                <div key={loan.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Loan #{loan.id}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><span className="font-medium">Type:</span> {loan.loanType === 'bullet' ? 'Bullet Loan' : loan.loanType}</p>
                      <p><span className="font-medium">Term:</span> {loan.loanTerm} months</p>
                      <p><span className="font-medium">Interest Rate:</span> {loan.interestRate}%</p>
                      <p><span className="font-medium">Payment Frequency:</span> {loan.interestPaymentFrequency}</p>
                      <p><span className="font-medium">Accrual Frequency:</span> {loan.interestAccrualFrequency}</p>
                      <p><span className="font-medium">Created:</span> {new Date(loan.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Drawdowns:</p>
                      <ul className="list-disc pl-5">
                        {loan.drawdowns.map((drawdown) => (
                          <li key={drawdown.id}>
                            ${drawdown.amount.toLocaleString()} on {new Date(drawdown.date).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 