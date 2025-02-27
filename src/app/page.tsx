import { LoanForm } from '@/components/LoanForm';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Loan Management System</h1>
        <LoanForm />
      </div>
    </main>
  );
}
