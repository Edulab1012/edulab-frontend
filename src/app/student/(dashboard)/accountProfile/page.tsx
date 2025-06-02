import { Card } from "@/components/ui/card";
import StudentProfileCard from "./components/StudentProfileCard";
import Stickers from "./components/stickers";

export default function ProfilePage() {
  return (
    <div className="w-full h-full p-10 flex items-center justify-center ml-[40px] ">
      <Card className="w-full ml-10 ">

        <StudentProfileCard></StudentProfileCard>
      </Card>
    </div>
  );
}
