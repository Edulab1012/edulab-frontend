"use client";
import { BASE_URL } from "@/constants/baseurl";
import {
  Root as Dialog,
  Trigger as DialogTrigger,
  Content as DialogContent,
  Title as DialogTitle,
  Description as DialogDescription,
  Close as DialogClose,
  Overlay as DialogOverlay,
} from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiX,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
interface AddClassProps {
  children?: React.ReactNode;
}

export default function AddClass({ children }: AddClassProps) {
  const [className, setClassName] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    const teacherId = localStorage.getItem("userId");

    if (!teacherId) {
      toast.error("Багшийн мэдээлэл олдсонгүй. Та дахин нэвтэрнэ үү.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${BASE_URL}class/create`, {
        name: className,
        userId: teacherId,
        promoCode: promoCode ? promoCode : null,
      });

      setIsSuccess(true);
      toast.success("Анги амжилттай үүсгэгдлээ!", {
        icon: <FiCheckCircle className="text-green-500" />,
        style: {
          background: "#f0fdf4",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
      });

      setTimeout(() => {
        setClassName("");
        setPromoCode("");
        setIsSuccess(false);
        setOpen(false);
      }, 1500);
    } catch (err: any) {
      let errorMessage = "🚫 Анги үүсгэхэд алдаа гарлаа.";

      if (err.response?.status === 409) {
        errorMessage = "❗ Промо код давхцаж байна. Өөр код ашиглана уу.";
      } else if (err.response?.status === 400) {
        errorMessage = "❗ Анги нэр эсвэл багшийн ID дутуу байна.";
      }

      toast.error(errorMessage, {
        icon: <FiAlertCircle className="text-red-500" />,
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      <DialogTrigger asChild>
        {children || (
          <motion.div
            className="w-[240px] h-[240px] cursor-pointer bg-[#2C3A4A] dark:bg-[#e1aa77] text-white dark:text-[#2C3A4A] rounded-2xl shadow-2xl flex flex-col justify-center items-center transition-colors duration-300 hover:bg-[#3a4b5e] dark:hover:bg-[#d19a6a]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="bg-[#e1aa77] dark:bg-[#2C3A4A] p-2 rounded-full transition-colors duration-300"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <FiPlus className="text-lg text-white dark:text-[#e1aa77]" />
            </motion.div>
            <span className="mt-2 font-medium">Анги нэмэх</span>
          </motion.div>
        )}
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn" />
      <DialogContent className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-[#f5f5f5] dark:bg-[#2C3A4A] p-6 rounded-2xl shadow-xl animate-scaleIn border border-[#e1aa77]/30">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-medium text-[#2C3A4A] dark:text-[#e1aa77]">
            🏫 Шинэ анги нэмэх
          </DialogTitle>
          <DialogClose className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-[#e1aa77] transition-colors">
            <FiX className="text-xl" />
          </DialogClose>
        </div>

        <DialogDescription className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-4">
          Анги үүсгэх мэдээллээ оруулна уу.
        </DialogDescription>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-[#2C3A4A] dark:text-[#e1aa77] mb-1"
            >
              Анги нэр
            </label>
            <input
              id="className"
              type="text"
              placeholder="Ангийн нэр"
              className="w-full border border-gray-300 dark:border-[#3a4b5e] bg-white dark:bg-[#3a4b5e] text-[#2C3A4A] dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e1aa77]/50 focus:border-[#e1aa77] transition-all"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              disabled={isLoading || isSuccess}
            />
          </div>

          <div>
            <label
              htmlFor="promoCode"
              className="block text-sm font-medium text-[#2C3A4A] dark:text-[#e1aa77] mb-1"
            >
              Ангийн код (заавал биш)
            </label>
            <input
              id="promoCode"
              type="text"
              placeholder="Ангийн код (заавал биш)"
              className="w-full border border-gray-300 dark:border-[#3a4b5e] bg-white dark:bg-[#3a4b5e] text-[#2C3A4A] dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e1aa77]/50 focus:border-[#e1aa77] transition-all"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={isLoading || isSuccess}
            />
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              isLoading
                ? "bg-[#e1aa77]/70 cursor-not-allowed"
                : isSuccess
                ? "bg-green-500"
                : "bg-[#e1aa77] hover:bg-[#d19a6a]"
            } text-[#2C3A4A] font-medium shadow-md`}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" />
                Боловсруулж байна...
              </>
            ) : isSuccess ? (
              <>
                <FiCheckCircle />
                Амжилттай
              </>
            ) : (
              "✅ Анги үүсгэх"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
