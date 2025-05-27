"use client";
import React from "react";

interface FooterProps {
  onSelectSection: (section: "home" | "attendance") => void;
  activeSection: "home" | "attendance";
  markAllPresent?: () => void;
  markAllAbsent?: () => void;
}

function Footer({
  onSelectSection,
  activeSection,
  markAllPresent,
  markAllAbsent,
}: FooterProps) {
  //   const submitAttendance = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) throw new Error("No token found");

  //       const res = await fetch(
  //         "http://localhost:8000/api/v1/teacher/attendance",
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             attendanceData: studentStatus,
  //           }),
  //         }
  //       );

  //       if (!res.ok) {
  //         const errorData = await res.json().catch(() => res.text());
  //         throw new Error(
  //           typeof errorData === "object" ? errorData.message : errorData
  //         );
  //       }

  //       const data = await res.json();
  //       alert("Attendance submitted successfully!");
  //     } catch (err: any) {
  //       alert(`Error submitting attendance: ${err.message}`);
  //     }
  //   };

  return (
    <div className="fixed bottom-0 w-[1240px] ml-[120px] h-[80px] bg-blue-400 border-t-2 border-t-white">
      <div className="h-full w-full flex justify-center items-center text-white">
        {activeSection === "home" && (
          <div className="h-full w-full flex justify-center items-center text-white">
            <button
              onClick={() => onSelectSection("attendance")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Ирц
            </button>
            <button
              onClick={() => alert("random")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px] w-[220px] h-full flex items-center justify-center"
            >
              Санамсаргүй сонголт
            </button>
            <button
              onClick={() => alert("timer")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Хугацаа хэмжигч
            </button>
            <button
              onClick={() => alert("group")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Бүлэгт хуваах
            </button>
          </div>
        )}
        {activeSection === "attendance" && (
          <div className="h-full w-full flex justify-center items-center text-white">
            <button
              onClick={markAllPresent}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Бүгд ирсэн
            </button>
            <button
              onClick={markAllAbsent}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Бүгд ирээгүй
            </button>
            <button
              onClick={() => onSelectSection("home")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Буцах
            </button>
            <button
              //   onClick={submitAttendance}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out hover:border-4 hover:border-teal-400 p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Ирц баталгаажуулах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
