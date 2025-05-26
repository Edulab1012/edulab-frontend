import { Card } from "@/components/ui/card";
import StudentProfileCard from "./components/StudentProfileCard";
import Stickers from "./components/stickers";

export default function ProfilePage() {
  return (
    <div className="w-full h-full p-10 flex items-center justify-center ml-[40px]">
      <Card className="p-10 w-[1100px] h-auto ">
        <StudentProfileCard></StudentProfileCard>
      </Card>
    </div>
  );
}
