import { Footer } from "@/components/Footer";

import { MainPage } from "@/components/MainPage";
import StudentFeatureSelector from "@/components/MainPageStudentFeature";

import TeacherFeatureSelector from "@/components/MainPageTeacherFeature";

export default function Home() {
  return (
    <div>
      <MainPage />
      <div className="flex flex-col">
        <StudentFeatureSelector></StudentFeatureSelector>
        <TeacherFeatureSelector></TeacherFeatureSelector>
      </div>

      <Footer />
    </div>
  );
}
