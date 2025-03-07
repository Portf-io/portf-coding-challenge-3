"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DrawdownArrayInput } from '@/components/DrawdownArrayInput';

// Define the form schema with Zod
const formSchema = z.object({
  drawdowns: z.array(
    z.object({
      amount: z.number().min(1, 'Amount must be greater than 0'),
      date: z.date(),
    })
  ).min(1, 'At least one drawdown is required'),
  loanTerm: z.number().int().min(1, 'Loan term must be at least 1 month'),
  interestRate: z.number().min(0, 'Interest rate must be positive'),
  interestPaymentFrequency: z.enum(['monthly', 'quarterly', 'yearly']),
  interestAccrualFrequency: z.enum(['daily', 'monthly']),
  loanType: z.enum(['bullet']),
});

export function LoanForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Initialize the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drawdowns: [{ amount: 0, date: new Date() }],
      loanTerm: 12,
      interestRate: 5,
      interestPaymentFrequency: 'monthly',
      interestAccrualFrequency: 'daily',
      loanType: 'bullet',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setSubmitResult(result);
      
      if (result.success) {
        // Redirect to the loans page after a short delay
        setTimeout(() => {
          router.push('/loans');
        }, 1500);
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'An error occurred while submitting the form',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Loan Details Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bullet">Bullet Loan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Bullet loan: Principal is repaid in full at the end of the loan term
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="drawdowns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drawdowns</FormLabel>
                <FormControl>
                  <DrawdownArrayInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Term (months)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestPaymentFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Payment Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestAccrualFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Accrual Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Loan Details'}
          </Button>

          {submitResult && (
            <div className={`mt-4 p-4 rounded ${submitResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
              {submitResult.message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
} 