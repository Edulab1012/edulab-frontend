"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/hooks/useUserStore"

export default function RegisterButton() {
    const router = useRouter()
    const { role, setRole } = useUserStore((state) => ({
        role: state.user?.role,
        setRole: state.setRole,
    }))

    const ClickTeacher = () => {
        setRole("teacher")
        router.push("/TeacherRegister")


    }

    const ClickStudent = () => {
        setRole("student")
        router.push("/StudentRegister")
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"

                    className="group relative overflow-hidden border-2 border-[#FF9C42] text-[#2C3A4A] dark:text-[#FFD3A1] px-8 py-4 rounded-full text-lg font-light shadow-lg transition-all duration-500 hover:scale-105 hover:text-white hover:border-white "
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#FF9C42] to-[#FF6B42] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full"></span>
                    <span className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(255,156,66,0)] group-hover:shadow-[0_0_15px_rgba(255,156,66,0.7)] transition-shadow duration-500"></span>
                    <span className="relative z-10 flex items-center">
                        Бүртгүүлэх
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className=" h-auto border-0 bg-white/40 dark:bg-[#2C3A4A]/30 backdrop-blur-xl rounded-2xl p-0 shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-2xl w-[80vw] sm:w-[550px]  border-white/20 dark:border-white/10">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-white/30 to-amber-500/20 dark:from-[#2C3A4A]/40 dark:via-[#3D4E61]/30 dark:to-[#2C3A4A]/50"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,156,66,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(255,156,66,0.1),transparent_70%)]"></div>
                </div>

                <DialogTitle className="text-4xl text-center pt-10 pb-6 bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent font-light tracking-wide">
                    ✏️ Бүртгүүлэх
                </DialogTitle>

                <DialogDescription className="px-8 pb-10 flex flex-col md:flex-row gap-8 items-center justify-center ">
                    <button
                        className={buttonStyle}
                        onClick={ClickTeacher}>
                        <div className="absolute inset-0 bg-[url('')] bg-cover opacity-10 dark:opacity-10 group-hover:opacity-20 dark:group-hover:opacity-20 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                                👩‍🏫
                            </div>
                            <span className="text-xl font-medium text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-100 transition-colors duration-300">
                                Багш
                            </span>

                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>

                    <button className={buttonStyle}
                        onClick={ClickStudent}>
                        <div className="absolute inset-0 bg-[url('/')] bg-cover opacity-10 dark:opacity-10 group-hover:opacity-20 dark:group-hover:opacity-20 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                                🧑‍🎓
                            </div>
                            <span className="text-xl font-medium text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-100 transition-colors duration-300">
                                Сурагч
                            </span>

                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                </DialogDescription>

            </DialogContent>
        </Dialog>
    )
}

const buttonStyle = "relative w-44 h-44 rounded-2xl bg-white/50 dark:bg-[#2C3A4A]/50 shadow-lg group overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl border border-white/50 dark:border-white/10"