"use client";

import LoginDecor from "./loginLeft";
import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden bg-center bg-cover bg-no-repeat sm:mt-19 mt-22 p-3 gap-4"
    >
      <LoginDecor />
      <LoginForm />
    </div>




  );
}