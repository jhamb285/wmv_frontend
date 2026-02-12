'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, X } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDates: string[];
  onDatesSelect: (dates: string[]) => void;
  availableDates?: string[]; // Available dates from API to show indicators
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  selectedDates,
  onDatesSelect,
  availableDates = []
}) => {
  const [tempSelectedDates, setTempSelectedDates] = useState<Date[]>([]);
  
  // Convert string dates to Date objects when modal opens
  useEffect(() => {
    if (isOpen) {
      const dateObjects = selectedDates
        .map(dateStr => {
          try {
            // Try different date formats
            const formats = ['dd MMM yy', 'yyyy-MM-dd', 'MM/dd/yyyy'];
            for (const fmt of formats) {
              const parsed = parse(dateStr, fmt, new Date());
              if (isValid(parsed)) return parsed;
            }
            // Fallback to Date constructor
            const fallback = new Date(dateStr);
            return isValid(fallback) ? fallback : null;
          } catch {
            return null;
          }
        })
        .filter((date): date is Date => date !== null);
      
      setTempSelectedDates(dateObjects);
    }
  }, [isOpen, selectedDates]);
  
  // Convert available dates to Date objects for calendar indicators
  const availableDateObjects = availableDates
    .map(dateStr => {
      try {
        const formats = ['dd MMM yy', 'yyyy-MM-dd', 'MM/dd/yyyy'];
        for (const fmt of formats) {
          const parsed = parse(dateStr, fmt, new Date());
          if (isValid(parsed)) return parsed;
        }
        const fallback = new Date(dateStr);
        return isValid(fallback) ? fallback : null;
      } catch {
        return null;
      }
    })
    .filter((date): date is Date => date !== null);
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setTempSelectedDates(prev => {
      const isAlreadySelected = prev.some(d => 
        d.getTime() === date.getTime()
      );
      
      if (isAlreadySelected) {
        return prev.filter(d => d.getTime() !== date.getTime());
      } else {
        return [...prev, date];
      }
    });
  };
  
  const handleApply = () => {
    const formattedDates = tempSelectedDates
      .map(date => format(date, 'dd MMM yy'))
      .sort();
    
    onDatesSelect(formattedDates);
  };
  
  const handleCancel = () => {
    onClose();
  };
  
  const handleClearAll = () => {
    setTempSelectedDates([]);
  };
  
  // Custom day content to show indicators for available dates
  const dayContent = (date: Date) => {
    const hasEvents = availableDateObjects.some(d => 
      d.getTime() === date.getTime()
    );
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span>{date.getDate()}</span>
        {hasEvents && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/95 border border-gray-200/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <CalendarDays className="h-5 w-5" />
            Select Custom Dates
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Selected dates display */}
          {tempSelectedDates.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">
                Selected Dates ({tempSelectedDates.length}):
              </div>
              <div className="flex flex-wrap gap-1">
                {tempSelectedDates
                  .sort((a, b) => a.getTime() - b.getTime())
                  .map((date, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                      onClick={() => handleDateSelect(date)}
                    >
                      {format(date, 'MMM dd, yyyy')}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
              </div>
            </div>
          )}
          
          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="multiple"
              selected={tempSelectedDates}
              onSelect={(dates) => {
                if (Array.isArray(dates)) {
                  setTempSelectedDates(dates.filter((date): date is Date => date !== undefined));
                }
              }}
              className="rounded-md border border-gray-200"
              components={{
                Day: ({ date, ...props }) => (
                  <div {...props} className={props.className}>
                    {dayContent(date)}
                  </div>
                )
              }}
            />
          </div>
          
          {availableDates.length > 0 && (
            <div className="text-xs text-gray-500 text-center">
              • Dates with events have blue dots
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={tempSelectedDates.length === 0}
            className="text-gray-600 hover:text-gray-800"
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply ({tempSelectedDates.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
