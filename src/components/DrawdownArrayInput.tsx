"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawdown } from '@/types/loan';

interface DrawdownArrayInputProps {
  value: Drawdown[];
  onChange: (value: Drawdown[]) => void;
}

export function DrawdownArrayInput({ value, onChange }: DrawdownArrayInputProps) {
  const [drawdowns, setDrawdowns] = useState<Drawdown[]>(value || []);

  const addDrawdown = () => {
    const newDrawdowns = [...drawdowns, { amount: 0, date: new Date() }];
    setDrawdowns(newDrawdowns);
    onChange(newDrawdowns);
  };

  const removeDrawdown = (index: number) => {
    const newDrawdowns = drawdowns.filter((_, i) => i !== index);
    setDrawdowns(newDrawdowns);
    onChange(newDrawdowns);
  };

  const updateDrawdown = (index: number, field: keyof Drawdown, value: number | Date) => {
    const newDrawdowns = [...drawdowns];
    newDrawdowns[index] = { ...newDrawdowns[index], [field]: value };
    setDrawdowns(newDrawdowns);
    onChange(newDrawdowns);
  };

  return (
    <div className="space-y-4">
      {drawdowns.map((drawdown, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={drawdown.amount}
              onChange={(e) => updateDrawdown(index, 'amount', parseFloat(e.target.value) || 0)}
              placeholder="Enter amount"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !drawdown.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {drawdown.date ? format(drawdown.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={drawdown.date}
                  onSelect={(date) => updateDrawdown(index, 'date', date as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={() => removeDrawdown(index)}
            className="mt-6"
          >
            X
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addDrawdown} variant="outline">
        Add Drawdown
      </Button>
    </div>
  );
} 