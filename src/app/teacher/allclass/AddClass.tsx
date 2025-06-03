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
  onSuccess?: () => void;
}

export default function AddClass({ children, onSuccess }: AddClassProps) {
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
        promoCode: promoCode || null,
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

      if (onSuccess) onSuccess();

      setTimeout(() => {
        setClassName("");
        setPromoCode("");
        setIsSuccess(false);
        setOpen(false);
      }, 1500);
    } catch (err: any) {
      let errorMessage = "Анги үүсгэхэд алдаа гарлаа";
      const status = err.response?.status;

      if (status === 409) {
        errorMessage = "Энэ промо код аль хэдийн бүртгэгдсэн байна";
      } else if (status === 400) {
        errorMessage = "Ангийн нэр оруулаагүй байна";
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
      <DialogTrigger asChild>
        {children || (
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus className="text-lg" />
            <span>Шинэ анги</span>
          </motion.button>
        )}
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 focus:outline-none border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Шинэ анги үүсгэх
          </DialogTitle>
          <DialogClose className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-full p-1">
            <FiX className="w-5 h-5" />
          </DialogClose>
        </div>

        <DialogDescription className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Ангийн мэдээллийг бөглөн үүсгэнэ үү
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Ангийн нэр *
            </label>
            <input
              id="className"
              type="text"
              placeholder="Жишээ: Математик 10А"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              disabled={isLoading || isSuccess}
            />
          </div>

          <div>
            <label
              htmlFor="promoCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Промо код (заавал биш)
            </label>
            <input
              id="promoCode"
              type="text"
              placeholder="Жишээ: MATH10A"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={isLoading || isSuccess}
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : isSuccess
                ? "bg-green-500"
                : "bg-indigo-600 hover:bg-indigo-700"
              } text-white transition-colors`}
            disabled={isLoading || isSuccess}
            whileHover={!isLoading && !isSuccess ? { scale: 1.02 } : {}}
            whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" />
                Хадгалж байна...
              </>
            ) : isSuccess ? (
              <>
                <FiCheckCircle />
                Амжилттай
              </>
            ) : (
              "Анги үүсгэх"
            )}
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
