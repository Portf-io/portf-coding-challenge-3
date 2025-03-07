import { LoanForm } from '@/components/LoanForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Loan Management System</h1>
        <div className="flex justify-center mb-6">
          <Link 
            href="/loans" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View Saved Loans
          </Link>
        </div>
        <LoanForm />
      </div>
    </main>
  );
}
