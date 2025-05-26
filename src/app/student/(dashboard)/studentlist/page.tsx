"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const students = [
  {
    name: "Б.Номи",
    img: "/em.jpg",
    phone: "99123456",
    email: "nomi@example.com",
    emergencyContact: "99012345",
  },
  {
    name: "Э.Батаа",
    img: "/er.jpg",
    phone: "99223344",
    email: "bataa@example.com",
    emergencyContact: "99112233",
  },
  {
    name: "О.Саруул",
    img: "/er.jpg",
    phone: "99334455",
    email: "saruul@example.com",
    emergencyContact: "99012222",
  },
  {
    name: "М.Ундраа",
    img: "/em.jpg",
    phone: "99445566",
    email: "undraa@example.com",
    emergencyContact: "99887766",
  },
  {
    name: "С.Тэмүүжин",
    img: "/er.jpg",
    phone: "99556677",
    email: "temu@example.com",
    emergencyContact: "99776655",
  },
  {
    name: "Т.Оюука",
    img: "/em.jpg",
    phone: "99667788",
    email: "oyuka@example.com",
    emergencyContact: "99668877",
  },
  {
    name: "Ц.Энхээ",
    img: "/er.jpg",
    phone: "99778899",
    email: "enhee@example.com",
    emergencyContact: "99889988",
  },
  {
    name: "Т.Наран",
    img: "/em.jpg",
    phone: "99889900",
    email: "naran@example.com",
    emergencyContact: "99990011",
  },
];

export default function StudentList() {
  // const navigate = useNavigate();

  return (
    <div className="px-10 pt-30 pb-10 w-full bg-teal-400">
      <div className="flex flex-col gap-10 ml-[100px]">
        <Card>
          <CardContent>
            <CardHeader className="text-3xl w-full font-bold leading-8 text-center">
              11 a aнгийн сурагчдын жагсаалт
            </CardHeader>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {students.map((student, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 rounded-2xl border border-gray-200 bg-white"
            >
              <CardContent className="flex flex-col items-center p-5">
                <div className="w-32 h-32 relative mb-4">
                  {student.img ? (
                    <Image
                      src={student.img}
                      alt={`${student.name}-profile`}
                      width={128}
                      height={128}
                      className="object-cover rounded-full border-4 border-white shadow"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                      <span className="text-lg text-gray-500">
                        Зураг байхгүй
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-lg font-medium">{student.name}</div>
                <div className="text-sm text-gray-500 mt-2 text-center">
                  <p>Утасны дугаар: {student.phone}</p>
                  <p>Имэйл: {student.email}</p>
                  <div className="mt-1">
                    <p>Холбогдох :</p>

                    <div className="flex justify-center">
                      <Button
                        //  onClick={() => navigate(`/chat/${student.id}`)}
                        className="flex items-center justify-center bg-white border-2 border-green-500 gap-2 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out text-green-500 font-bold mt-3 cursor-pointer"
                      >
                        <MessageCircle className="w-6 h-6" />
                        <span>Чат бичих</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
