"use client";
import { useEffect } from "react";
import StudentForm from "./FormStudent";



export default function StudentRegisterPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20">
            <StudentForm></StudentForm>
        </div>
    );
}
