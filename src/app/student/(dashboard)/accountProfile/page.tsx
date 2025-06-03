import { Card } from "@/components/ui/card";
import StudentProfileCard from "./components/StudentProfileCard";
import Stickers from "./components/stickers";

export default function ProfilePage() {
  return (
    <div className="w-full h-fullflex items-center justify-center">
      <StudentProfileCard></StudentProfileCard>
    </div>
  );
}
