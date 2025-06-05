"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, TrendingUp, Target } from "lucide-react"
import { usePlannerStore } from "@/hooks/usePlannerStore"

export default function PlannerStats() {
  const { stats, fetchStats, isLoading } = usePlannerStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: "Нийт даалгавар",
      value: stats.totalTasks,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Дууссан",
      value: stats.completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Амжилтын хувь",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Хүлээгдэж буй",
      value: stats.totalTasks - stats.completedTasks,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ]

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ерөнхий ахиц дэвшил</CardTitle>
          <CardDescription>Таны даалгаврын гүйцэтгэлийн хувь</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Дууссан даалгаврууд</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {stats.completedTasks}/{stats.totalTasks}
              </span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
            <div className="flex gap-2">
              {Object.entries(stats.tasksByPriority).map(([priority, count]) => (
                <Badge
                  key={priority}
                  variant={priority === "high" ? "destructive" : priority === "medium" ? "default" : "secondary"}
                >
                  {priority === "high" ? "Өндөр" : priority === "medium" ? "Дунд" : "Бага"}: {count}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
