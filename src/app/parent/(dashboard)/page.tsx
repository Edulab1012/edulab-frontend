'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalender";
import Announcements from "@/components/Announcements";
import { getUserAndPost } from "@/lib/CreateTestUser";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BASE_URL, LOCAL_BASE_URL } from "@/constants/baseurl";


export default function Page() {

  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "school"
  const Role = searchParams.get("role")


  useEffect(() => {
    getUserAndPost(`${BASE_URL}auth/testUser`, role)
    console.log(role);
    console.log(Role);

  }, [role])




  const student = {
    lastName: "Бат",
    firstName: "Ариунжаргал",
    gender: "Эм",
    email: "arii@example.com",
    class: "10А",
    group: "2-р бүлэг",
    teacher: "Должин",
    teacherPhone: "99112233",
  };
  return (
    <div className="pt-30 pb-10 px-10 flex flex-col gap-10 bg-gray-200">
      <div className="p-4 flex gap-10 flex-col xl:flex-row">
        <div className="flex gap-10 flex-col w-2/3">
          <Card>
            <CardContent className="box-border">
              <CardHeader className="text-2xl font-bold leading-8 mb-5">
                Сурагч Арии
              </CardHeader>
              <div className="flex w-full flex-row justify-around box-border">
                <Image
                  alt="student.pro"
                  src={"/avatar.png"}
                  width={150}
                  height={300}
                />

                <div className="[&_div]:flex [&_div]:justify-between [&_div]:w-full w-fit">
                  <div className="_div">
                    <h1>Овог:</h1> <span>{student.lastName}</span>
                  </div>
                  <div className="_div">
                    <h1>Нэр:</h1> <span>{student.firstName}</span>
                  </div>
                  <div className="_div">
                    <h1>Хүйс:</h1> <span>{student.gender}</span>
                  </div>
                  <div className="_div">
                    <h1>Майл хаяг:</h1> <span>{student.email}</span>
                  </div>
                  <div className="_div">
                    <h1>Анги:</h1> <span>{student.class}</span>
                  </div>
                  <div className="_div">
                    <h1>Бүлэг:</h1> <span>{student.group}</span>
                  </div>
                  <div className="_div">
                    <h1>Ангийн багш:</h1> <span>{student.teacher}</span>
                  </div>
                  <div className="_div">
                    <h1>Багшийн утас:</h1> <span>{student.teacherPhone}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <Button>Сургуулийн тодорхойлолт авах</Button>
                  <Button>Чөлөөний хүсэлт</Button>
                  <Button>Шилжих хүсэлт хүсэлт</Button>
                  <Button>Багштай холбоотой гомдол гаргах</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full bg-white p-5 rounded-md">
              <CardHeader className="text-2xl font-bold leading-8 ">
                Хичээлийн хуваарь
              </CardHeader>
              <BigCalendar />
            </CardContent>
          </Card>
        </div>
        <div className="w-full xl:w-1/3 flex flex-col gap-10">
          <EventCalendar />
          <Announcements />
        </div>
      </div>
    </div>
  );
}
