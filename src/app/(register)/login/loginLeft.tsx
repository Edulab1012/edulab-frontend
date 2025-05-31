"use client";

export default function LoginDecor() {
    return (

        <div className="relative w-full h-auto rounded-3xl ml-5"
            style={{
                backgroundImage: "url('/loginImage.jpg')", backgroundSize: "cover", backgroundPosition: "center"
            }}
        >
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">


                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 rounded-xl" />

                <h1 className="text-3xl md:text-4xl font-light  dark:text-black drop-shadow-sm text-center mt-10 text-white backdrop-blur-sm p-5 rounded-3xl">
                    ClassHero-д тавтай морил!
                </h1>
                <p className="mt-4 text-zinc-700 dark:text-zinc-300 max-w-sm">
                    Хичээл бүрийг хөгжилтэй, урамтай, хамтдаа!
                </p>
            </div>


        </div>
    );
}