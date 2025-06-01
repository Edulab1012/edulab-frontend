import React from "react";
import Image from "next/image";
function Class() {
  return (
    <div className="w-[200px] h-[200px]  bg-[#2C3A4A] dark:bg-white rounded-2xl shadow-2xl flex flex-col relative">
      <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8  rounded-full ">
        {" "}
        <Image
          src={"/myclass/cogwheel.png"}
          width={20}
          height={20}
          alt="earth"
          className=""
        ></Image>
      </div>
      <div className="w-full h-full flex flex-col items-center ">
        <Image
          src={"/myclass/earth.png"}
          width={60}
          height={60}
          alt="earth"
          className="pt-12"
        ></Image>
        <div className="w-full flex flex-col items-center pt-4">
          <h1 className="text-white dark:text-[#e1aa77]">Ms.Ursa's Анги</h1>
          <p className="text-white dark:text-[#e1aa77]">0 students</p>
        </div>
      </div>
    </div>
  );
}

export default Class;
