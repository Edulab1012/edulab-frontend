"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, GripVertical, Check } from "lucide-react"

interface Task {
  id: string
  title: string
  day: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

const initialTasks: Task[] = [
  { id: "1", title: "📚 Math homework", day: "Monday", completed: false, priority: "high" },
  { id: "2", title: "🧪 Science project", day: "Tuesday", completed: false, priority: "medium" },
  { id: "3", title: "🎨 Art class", day: "Wednesday", completed: true, priority: "low" },
  { id: "4", title: "📝 Essay writing", day: "Thursday", completed: false, priority: "high" },
  { id: "5", title: "🏀 Basketball practice", day: "Friday", completed: false, priority: "medium" },
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const priorityColors = {
  low: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
  medium: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700",
  high: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
}

export default function ImprovedSelfPlannerDragDrop() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [newTaskInputs, setNewTaskInputs] = useState<Record<string, string>>({})

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeTask = tasks.find((t) => t.id === active.id)
    if (!activeTask) return

    // Check if dropping on a day column
    if (days.includes(over.id as string)) {
      const newDay = over.id as string
      setTasks((prev) => prev.map((t) => (t.id === active.id ? { ...t, day: newDay } : t)))
      return
    }

    // Handle reordering within the same day or moving to different day
    const overTask = tasks.find((t) => t.id === over.id)
    if (!overTask) return

    const activeIndex = tasks.findIndex((t) => t.id === active.id)
    const overIndex = tasks.findIndex((t) => t.id === over.id)

    if (activeTask.day === overTask.day) {
      // Reordering within the same day
      setTasks((prev) => arrayMove(prev, activeIndex, overIndex))
    } else {
      // Moving to a different day
      setTasks((prev) => prev.map((t) => (t.id === active.id ? { ...t, day: overTask.day } : t)))
    }
  }

  const addTask = (day: string) => {
    const title = newTaskInputs[day]?.trim()
    if (!title) return

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      day,
      completed: false,
      priority: "medium",
    }

    setTasks((prev) => [...prev, newTask])
    setNewTaskInputs((prev) => ({ ...prev, [day]: "" }))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const cyclePriority = (id: string) => {
    const priorities: Array<"low" | "medium" | "high"> = ["low", "medium", "high"]
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const currentIndex = priorities.indexOf(t.priority)
          const nextIndex = (currentIndex + 1) % priorities.length
          return { ...t, priority: priorities[nextIndex] }
        }
        return t
      }),
    )
  }

  const getTasksForDay = (day: string) => {
    return tasks.filter((task) => task.day === day)
  }

  return (
    <main className="p-4 md:p-6 min-h-screen bg-gradient-to-br from-[#F5F6FA] to-[#E0E7FF] dark:from-[#121220] dark:to-[#1E1B4B] font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center text-[#6B5AED] mb-6 md:mb-8"
      >
        🗓️ Weekly Planner
      </motion.h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {days.map((day, index) => {
            const dayTasks = getTasksForDay(day)
            const completedCount = dayTasks.filter((t) => t.completed).length

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1f1d42] p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#6B5AED] text-center flex-1">{day}</h2>
                  {dayTasks.length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {completedCount}/{dayTasks.length}
                    </div>
                  )}
                </div>

                <SortableContext items={dayTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3 min-h-[120px] mb-4">
                    <AnimatePresence>
                      {dayTasks.map((task) => (
                        <SortableTask
                          key={task.id}
                          task={task}
                          onDelete={deleteTask}
                          onToggleComplete={toggleTaskCompletion}
                          onCyclePriority={cyclePriority}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </SortableContext>

                {/* Add new task input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add task..."
                    value={newTaskInputs[day] || ""}
                    onChange={(e) =>
                      setNewTaskInputs((prev) => ({
                        ...prev,
                        [day]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTask(day)
                      }
                    }}
                    className="text-sm"
                  />
                  <Button onClick={() => addTask(day)} size="sm" className="bg-[#6B5AED] hover:bg-[#5A4BD4] shrink-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div
              className={`p-3 rounded-xl shadow-lg border-2 ${priorityColors[activeTask.priority]} opacity-90 cursor-grabbing`}
            >
              <span className={`text-sm font-medium ${activeTask.completed ? "line-through opacity-60" : ""}`}>
                {activeTask.title}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  )
}

function SortableTask({
  task,
  onDelete,
  onToggleComplete,
  onCyclePriority,
}: {
  task: Task
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onCyclePriority: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`
        ${priorityColors[task.priority]} 
        p-3 rounded-xl shadow-sm border-2 group hover:shadow-md transition-all duration-200
        ${isDragging ? "opacity-50" : ""}
        ${task.completed ? "opacity-75" : ""}
      `}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-400"}
          `}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <span
          className={`
            text-sm font-medium flex-1 cursor-pointer
            ${task.completed ? "line-through opacity-60" : "text-gray-700 dark:text-gray-200"}
          `}
          onClick={() => onCyclePriority(task.id)}
          title="Click to change priority"
        >
          {task.title}
        </span>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-black/10 rounded"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Priority indicator */}
      <div className="flex justify-end mt-1">
        <div
          className={`
          w-2 h-2 rounded-full
          ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}
        `}
        />
      </div>
    </motion.div>
  )
}
