
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalender";
import Announcements from "@/components/Announcements";
import { ToastContainer } from "react-toastify";



export default function StudentPage() {
  return (
    <div className="pt-30 pb-10 px-10 flex flex-col gap-10 bg-gray-200">
      <ToastContainer/>
      <div className="p-4 flex gap-10 flex-col xl:flex-row">
        <div className="flex flex-col gap-10 w-2/3">
          <Card>
            <CardContent className="h-full bg-white p-5 rounded-md">
              <CardHeader className="text-2xl font-bold leading-8 ">
                Хичээлийн хуваарь
              </CardHeader>
              <BigCalendar />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader></CardHeader>
            </CardContent>
          </Card>
        </div>

        <div className="w-full xl:w-1/3 flex flex-col gap-8">
          <EventCalendar/>
          <Announcements />
        </div>
      </div>
    </div>
  );
};


