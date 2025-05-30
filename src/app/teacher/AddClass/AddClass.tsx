import {
    Root as Dialog,
    Trigger as DialogTrigger,
    Content as DialogContent,
    Title as DialogTitle,
    Description as DialogDescription,
    Close as DialogClose,
    Overlay as DialogOverlay,
} from "@radix-ui/react-dialog";
import { useState } from "react";

export default function AddClass() {
    const [className, setClassName] = useState("");
    const [promoCode, setPromoCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            className,
            promoCode: promoCode || undefined, 
        };

        console.log("Илгээж буй өгөгдөл:", payload);
   
    };

    return (
        <Dialog>
            <DialogTrigger className="px-5 py-2.5 bg-gradient-to-r from-indigo-100 to-blue-400 text-white rounded-xl shadow hover:opacity-90 transition font-light">
                ➕ Анги нэмэх
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

            <DialogContent className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-light text-zinc-900 dark:text-white">
                        🏫 Шинэ анги нэмэх
                    </DialogTitle>
                    <DialogClose className="text-gray-400 hover:text-gray-600 text-2xl font-bold dark:hover:text-white">
                        &times;
                    </DialogClose>
                </div>

                <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 font-light">
                    Анги үүсгэх мэдээллээ оруулна уу.
                </DialogDescription>

                <form className="space-y-4 font-light" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Анги нэр"
                        className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ангийн код (сурагчид бүртгэхэд ашиглана)"
                        className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-light"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-light py-2 rounded-lg transition"
                    >
                        ✅ Анги үүсгэх
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}