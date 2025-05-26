import { Card } from "@/components/ui/card";
import StudentProfileCard from "./components/profileCard";
import Stickers from "./components/stickers";

export default function ProfilePage() {
  return (
    <div className="w-full h-full bg-teal-400 p-10 flex items-center justify-center ml-[40px]">
      <Card className="p-10 w-[1100px] h-auto ">
        <StudentProfileCard className="w-50"></StudentProfileCard>
      </Card>
    </div>
  );
}
