'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import TodayDateCard from '@/components/TodayDate';

export default function AttendanceHomePage() {
  const [mode, setMode] = useState<'main' | 'other' | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const isReady =
    (mode === 'main' && selectedDate) ||
    (mode === 'other' && selectedClass && selectedDate);

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      <h1 className="text-3xl font-light text-gray-800">📋 Ирц бүртгэл</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Choose mode */}
        <Card>
          <CardHeader>
            <CardTitle>1. Анги сонгох</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant={mode === 'main' ? 'default' : 'outline'}
              onClick={() => {
                setMode('main');
                setSelectedClass(null);
              }}
              className="w-full"
            >
              🏫 Миний Даасан анги (жишээ: 11A)
            </Button>

            <Button
              variant={mode === 'other' ? 'default' : 'outline'}
              onClick={() => setMode('other')}
              className="w-full"
            >
              🏫 Бусад анги
            </Button>

            {/* Step 2: If other class, choose which class */}
            {mode === 'other' && (
              <Select onValueChange={(value) => setSelectedClass(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Анги сонгох (ж: 10B, 12C...)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10A">10A</SelectItem>
                  <SelectItem value="11B">11B</SelectItem>
                  <SelectItem value="12C">12C</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>

        {/* Step 3: Select date */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>2. Огноо сонгох</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Step 4: Continue Button */}
      <div className="pt-4">
        <Button
          disabled={!isReady}
          className="px-6 py-2"
          onClick={() => {
            const target = mode === 'main' ? 'Даасан анги' : selectedClass;
            alert(
              `📅 Ирц бүртгэл рүү шилжиж байна: ${target} | ${selectedDate?.toLocaleDateString()}`
            );
          }}
        >
          Ирц бүртгэх рүү шилжих →
        </Button>
      </div>
      <TodayDateCard></TodayDateCard>
    </div>
  );
}