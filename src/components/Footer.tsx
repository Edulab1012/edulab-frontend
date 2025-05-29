import {
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-screen px-20 py-3 border-t-white border-t-2 bg-[#8ED6F0]  dark:bg-white">
        <p className="text-black text-center text-[10px]">
          © 2025 Powered Edu Management edulab company
        </p>
      </div>
    </div>
  );
};
