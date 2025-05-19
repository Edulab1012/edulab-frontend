'use client';

import { CalendarDays, Timer, LineChart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TeacherMainPage() {
  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-white min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📚 Тавтай морил, Багш аа!</h1>
          <p className="text-gray-500 mt-1">Таны өнөөдрийн үйл ажиллагаа энд байна.</p>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-xl">Дараагийн хичээл</CardTitle>
            <Timer className="w-10 h-10 text-blue-500" />
          </CardHeader>
          <CardContent className="text-gray-600 text-sm">
            10:00 - 11А <br /> Геометр
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-sm">Долоо хоногийн ирц</CardTitle>
            <LineChart className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent className="text-gray-600 text-sm">
            <strong>91%</strong> — тогтвортой байна
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-sm">Тестийн дүн</CardTitle>
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent className="text-gray-600 text-sm">
            Сүүлийн тестийн дундаж: <strong>B+</strong>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-sm">Үйл явдлууд</CardTitle>
            <CalendarDays className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-gray-600 text-sm">
            Маргааш эцэг эхийн уулзалт
          </CardContent>
        </Card>
      </div>
    </div>
  );
}