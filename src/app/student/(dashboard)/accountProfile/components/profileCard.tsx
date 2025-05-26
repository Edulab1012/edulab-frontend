import { Trophy, Medal, Smile, Users, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Stickers from "./stickers";

interface Props {
  className?: string;
}

export default function StudentProfileCard({ className }: Props) {
  const student = {
    name: "Alex Johnson",
    grade: "11A",
    avatarUrl: "/student.png",
    achievements: [
      { icon: <Trophy className="text-yellow-400" />, title: "Conqueror" },
      { icon: <Medal className="text-gray-400" />, title: "Team Player" },
      { icon: <Smile className="text-pink-500" />, title: "Positive" },
      { icon: <Users className="text-blue-500" />, title: "Helps Others" },
      { icon: <ThumbsUp className="text-green-500" />, title: "Good Teammate" },
    ],
    stickers: [
      "/stickers/sticker1.png",
      "/stickers/sticker2.png",
      "/stickers/sticker3.png",
    ],
  };

  return (
    <Card
      className={`${className}shadow-xl bg-gradient-to-br from-purple-200 bg-blue-400
       to-pink-200 rounded-2xl p-5`}
    >
      <CardHeader className="flex flex-col items-center text-center ">
        <Avatar className="w-24 h-24 mb-4 shadow-lg">
          <AvatarImage src={student.avatarUrl} alt={student.name} />
          <AvatarFallback>{student.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-white">{student.name}</h2>
        <span className="text-white">Grade: {student.grade}</span>
      </CardHeader>

      <CardContent className="flex gap-5">
        <Stickers></Stickers>
      </CardContent>
    </Card>
  );
}
