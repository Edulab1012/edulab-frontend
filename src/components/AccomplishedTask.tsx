"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
const taskData = [
  {
    id: 1,
    img_url: "/data-science.png",
    title: "LMS",
    // content_img_irl: "/data-science.png",
    content_title: "LMS - Суралцахуйн удирдлагын систем",
    content: [
      {
        id: 1,
        option1: "Ирц бүртгэл",
      },
      {
        id: 2,
        option2: "Шалгалт",
      },
    ],
    contect_p:
      "eSchool LMS нь танхим болон сургалтыг хослуулан үр дүнтэйгээр суралцахад чиглэсэн цахим сургалтын систем юм.",
  },
  {
    id: 2,
    img_url: "/teacher.png",
    title: "eTeacher",
    // content_img_irl: "/data-science.png",
    content_title: "LMS - Багшид зориулсан хэсэг хэсэг",
    content: [
      {
        id: 1,
        option1: "Сурагч нэмэх",
      },
      {
        id: 2,
        option2: "Сурагчийн ирц бүртгэх",
      },
    ],
    contect_p:
      "Өдөр тутам тогтмол хийдэг механик, гар ажиллагаатай ажлуудыг хялбараар гүйцэтгэх боломжтой. Мөн тайлан, анализыг хурдан хугацаанд хийж, гол ажилдаа ихэнх цагаа зарцуулах боломжийг танд олгоно.",
  },
  {
    id: 3,
    img_url: "/student.png",
    title: "eStudent",
    // content_img_irl: "/data-science.png",
    content_title: "LMS - Сурагчид зориулсан хэсэг",
    content: [
      {
        id: 1,
        option1: "Хичээлын хуваарь харах",
      },
      {
        id: 2,
        option2: "Шалгалт шүүлэг өгөх",
      },
    ],
    contect_p:
      "Сурагч өөрийн сургалтын үйл ажиллагаатай холбоотой бүхий л мэдээллийг цаг алдалгүй системээс авах боломжтой. Мөн өөрийн сурах төлөвлөгөөг гарган түүнийхээ үр дүнг анализ хийж хөгжих боломжийг олгоно.",
  },
  {
    id: 4,
    img_url: "/family.png",
    title: "eFamily",
    content_img_irl: "/data-science.png",
    content_title: "LMS - Эцэг эхэд зориулсан хэсэг",
    content: [
      {
        id: 1,
        option1: "Хүүхдийн сурлагын явц",
      },
      {
        id: 2,
        option2: "Сургууль болон багшийн зарлал мэдээлэл харах",
      },
    ],
    contect_p:
      "Хүүхдийнхээ сурлага, хүмүүжилтэй холбоотой мэдээлэл болон хүүхдийн сурлагын явцтай холбоотой мэдээллийг цаг алдалгүй авах боломжтой. Мөн сургуулийн удирдлага, багш нартай холбогдон санал хүсэлтээ өгч хамтран ажиллах боломжтой.",
  },
  {
    id: 5,
    img_url: "/school.png",
    title: "eSchool",
    // content_img_irl: "/data-science.png",
    content_title: "LMS - eSchool",
    content: [
      {
        id: 1,
        option1: "Сургуулийн тохиргоо хийх",
      },
    ],
    contect_p:
      "eSchool үндсэн платформын удирдлагуудад зориулсан дэд систем нь eSchool юм. Удирдлагууд багш нарын хичээлийн хуваарь, ирц гэрийн даалгаврын биелэлт болон цахим хичээлийг явцыг хянах боломжтой.",
  },
];
function AccomplishedTask() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [selectedTask, setSelectedTask] = useState(taskData[0]);
  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 60, opacity: 0 });
    }
  }, [isInView, controls]);

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <motion.div
        ref={ref}
        animate={controls}
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-[1200px] h-[600px] bg-teal-200 rounded-4xl border-2 border-blue-400 flex flex-col justify-around items-center"
      >
        <div className="grid grid-cols-5 gap-12">
          {taskData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedTask(item)}
              className={`flex flex-col gap-1 items-center justify-center border-b-2 transition-colors duration-300  ${selectedTask.id === item.id
                ? " border-b-blue-600"
                : " border-b-black"
                } w-[100px] hover:border-b-2 pb-2`}
            >
              {" "}
              <Image
                src={item.img_url}
                width={50}
                height={50}
                alt="data-scient"
              ></Image>
              <p
                className={`font-medium transition-colors duration-300 cursor-pointer ${selectedTask.id === item.id ? "text-blue-500" : "text-black"
                  }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-around items-center bg-white rounded-4xl  w-[1000px] h-[400px]">
          <Image
            src={selectedTask.img_url}
            width={150}
            height={150}
            alt={selectedTask.title}
          />
          <div className="text-3xl font-semibold text-black flex flex-col gap-1">
            <h1 className="mb-2">{selectedTask.content_title}</h1>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <div className="cursor-pointer">
                  {selectedTask.content.map((el, idx) => (
                    <div
                      key={idx}
                      className="text-[14px] font-normal flex flex-col gap-4 cursor-pointer"
                    >
                      {el.option1 && (
                        <div className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 text-green-600" />
                          <p>{el.option1}</p>
                        </div>
                      )}
                      {el.option2 && (
                        <div className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 text-green-600" />
                          <p>{el.option2}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[14px] w-[500px] font-normal mt-3">
                {selectedTask.contect_p}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AccomplishedTask;
