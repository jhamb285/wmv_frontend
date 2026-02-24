'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePreset, getDatesByPreset, getPresetFromDates, getPresetLabel } from '@/lib/filters/date-utils';
import { DatePickerModal } from './DatePickerModal';

interface DatePresetsProps {
  activeDates: string[];
  onDateSelect: (dates: string[]) => void;
  availableDates?: string[]; // Available dates from API
}

const DatePresets: React.FC<DatePresetsProps> = ({
  activeDates,
  onDateSelect,
  availableDates = []
}) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  
  // Determine current preset
  const currentPreset = getPresetFromDates(activeDates) || 'custom';
  
  const presets: DatePreset[] = ['today', 'tomorrow', 'this-week', 'custom'];
  
  const handlePresetClick = (preset: DatePreset) => {
    if (preset === 'custom') {
      setShowCustomPicker(true);
    } else {
      const dates = getDatesByPreset(preset);
      onDateSelect(dates);
    }
  };
  
  const handleCustomDatesSelect = (dates: string[]) => {
    onDateSelect(dates);
    setShowCustomPicker(false);
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isActive = currentPreset === preset;
          const isCustomActive = preset === 'custom' && currentPreset === 'custom';
          
          return (
            <Button
              key={preset}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePresetClick(preset)}
              className={`text-xs px-3 py-1.5 h-auto transition-all ${
                isActive
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  : 'bg-white/50 text-gray-700 hover:bg-gray-100 border border-gray-200/50'
              } ${preset === 'custom' ? 'flex items-center gap-1' : ''}`}
            >
              {preset !== 'custom' && (
                <Calendar className="h-3 w-3 mr-1" />
              )}
              {getPresetLabel(preset)}
              {preset === 'custom' && (
                <>
                  {isCustomActive && activeDates.length > 0 && (
                    <span className="ml-1 bg-white/20 rounded-full px-1.5 py-0.5 text-xs">
                      {activeDates.length}
                    </span>
                  )}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </>
              )}
            </Button>
          );
        })}
      </div>
      
      {/* Custom Date Picker Modal */}
      <DatePickerModal
        isOpen={showCustomPicker}
        onClose={() => setShowCustomPicker(false)}
        selectedDates={activeDates}
        onDatesSelect={handleCustomDatesSelect}
        availableDates={availableDates}
      />
    </>
  );
};

export default DatePresets;
