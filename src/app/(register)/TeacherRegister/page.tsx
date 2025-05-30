"use client";
import { useEffect } from "react";
import TeacherForm from "./FormTeacher";

export default function TeacherRegisterPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-white">
            <TeacherForm></TeacherForm>
        </div>

    )
}