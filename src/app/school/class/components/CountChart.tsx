"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  return (
    <Card className="bg-white rounded-xl w-full h-full ">
      <CardContent>

        <CardHeader className="text-2xl font-light leading-8 p-0">
          Сурагчдын тоо
        </CardHeader>


        <div className="relative w-full h-[65%]">
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="100%"
              barSize={32}
              data={data}
            >
              <RadialBar background dataKey="count" />
            </RadialBarChart>
          </ResponsiveContainer>
          <Users
            width={50}
            height={50}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="flex justify-center gap-16">
          <div className="flex flex-col gap-1">
            <div className="w-5 h-5 bg-lamaSky rounded-full" />
            <h1 className="font-light text-xl">1,234</h1>
            <h2 className="text-xs text-gray-500">Boys (55%)</h2>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-5 h-5 bg-lamaYellow rounded-full" />
            <h1 className="font-light text-xl">1,234</h1>
            <h2 className="text-xs text-gray-500">Girls (45%)</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountChart;
