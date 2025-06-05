export default function Loading() {
    return (
        <div className="mt-[-10%] w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
            {/* ✨ Bouncing Dots Loader */}
            <div className="flex space-x-2 mt-4">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
            </div>

            {/* 📩 Center Icon */}
            <div className="mt-6">
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 8h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>

            {/* Text */}
            <p className="mt-4 text-lg text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                Түр хүлээнэ үү...
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Таны өгөгдөл бэлтгэгдэж байна
            </p>
        </div>
    );
}