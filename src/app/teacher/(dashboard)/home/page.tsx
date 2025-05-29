"use client";
import SectionTool from "./section-tool";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export default function TeacherHome() {
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);
  return (
    <div className=" ">
      {isMobile && <div className="mt-[100px] ml-[10px]">mobile</div>}
      {!isMobile && <div className="mt-[100px] ml-[100px]">desktop</div>}
    </div>
  );
}
