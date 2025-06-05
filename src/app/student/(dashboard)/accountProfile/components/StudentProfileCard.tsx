"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Edit3, Mail, Phone, GraduationCap, Instagram, Facebook, FileText, Sparkles } from "lucide-react"
import Loading from "./loading"
import { useStudentStore } from "@/hooks/useStudentStore"
import { BASE_URL } from "@/constants/baseurl"
import axios from "axios"

const StudentProfileCard = () => {
  const student = useStudentStore()
  const [initialData, setInitialData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<"posts" | "stickers">("posts")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getStudentData = async () => {
      try {
        setLoading(true)
        const studentId = localStorage.getItem("studentId")
        if (studentId) {
          const res = await axios.get(`${BASE_URL}student/${studentId}`)
          console.log("Student data from API:", res.data)
          // Update store if needed
          // student.setStudent(res.data)
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error)
        setError("Failed to load student data")
      } finally {
        setLoading(false)
      }
    }
    getStudentData()
  }, [])

  useEffect(() => {
    if (student?.student) {
      const s = student.student

      const combined = {
        id: s.id ?? "",
        email: s.email ?? "",
        firstName: s.firstName ?? "",
        lastName: s.lastName ?? "",
        avatarUrl: s.avatarUrl ?? "/turtle.png",
        backgroundUrl: s.bgImage ?? "/bg.jpg",
        bio: s.bio ?? "",
        socials: s.socials ?? { instagram: "", facebook: "" },
        grade: s.grade ?? "",
        class: s.class?.name ?? "",
        phoneNumber: s.phoneNumber ?? "",
        teacher: s.teacher ?? "",
      }

      setInitialData(combined)
      setLoading(false)
    }
  }, [student])

  const handleSave = (updatedStudent: any) => {
    setInitialData(updatedStudent)
    setIsEditing(false)
    // Update the store with new data
    // student.updateStudent(updatedStudent)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center mt-20 p-4">
        <Card className="p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    )
  }

  if (!initialData) {
    return <Loading />
  }

  const profileInfo = [
    {
      icon: GraduationCap,
      label: "Анги",
      value: initialData.class || initialData.grade || "",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Phone,
      label: "Утас",
      value: initialData.phoneNumber || "",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Mail,
      label: "Имэйл",
      value: initialData.email || "",
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  const tabs = [
    { id: "posts", label: "Нийтлэлүүд", icon: FileText },
    { id: "stickers", label: "🏅 Миний шагналууд", icon: Sparkles },
  ]

  if (isEditing) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <EditProfile initialData={initialData} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center mt-20 sm:mt-5 p-4 ml-25">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="w-full overflow-hidden shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <div className="w-full relative h-32 sm:h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {initialData.backgroundUrl && initialData.backgroundUrl !== "/bg.jpg" && (
              <img
                src={initialData.backgroundUrl || "/placeholder.svg"}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Засах
            </Button>
          </div>

          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 -mt-16 sm:-mt-12 mb-8">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-white dark:border-slate-700 shadow-xl">
                <AvatarImage
                  src={initialData.avatarUrl || "/placeholder.svg?height=112&width=112"}
                  alt={`${initialData.firstName} ${initialData.lastName}`}
                />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  {initialData.firstName?.charAt(0) || ""}
                  {initialData.lastName?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {initialData.firstName} {initialData.lastName}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {initialData.bio || "Танилцуулга оруулаагүй байна"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {profileInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {item.value || "Мэдээлэл байхгүй"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {(initialData.socials?.instagram || initialData.socials?.facebook) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Сошиал сүлжээ</h3>
                <div className="flex flex-wrap gap-3">
                  {initialData.socials.instagram && (
                    <Badge className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600">
                      <Instagram className="h-4 w-4" />
                      {initialData.socials.instagram}
                    </Badge>
                  )}
                  {initialData.socials.facebook && (
                    <Badge className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700">
                      <Facebook className="h-4 w-4" />
                      {initialData.socials.facebook}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "posts" | "stickers")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${activeTab === tab.id
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  {activeTab === "posts" ? (
                    <FileText className="h-8 w-8 text-slate-400" />
                  ) : (
                    <Sparkles className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  {activeTab === "posts"
                    ? "Миний нийтлэлүүд хараахан байхгүй байна."
                    : "Миний шагнал хараахан байхгүй байна."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default StudentProfileCard
