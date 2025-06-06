import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Task {
  id: string
  title: string
  day: string
  completed: boolean
  priority: "low" | "medium" | "high"
  userId: string
  order: number
  createdAt: string
  updatedAt: string
}

interface CreateTaskData {
  title: string
  day: string
  priority: "low" | "medium" | "high"
}

interface UpdateTaskData {
  title?: string
  day?: string
  completed?: boolean
  priority?: "low" | "medium" | "high"
  order?: number
}

interface ReorderTaskData {
  id: string
  order: number
}

interface PlannerStore {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  createTask: (data: CreateTaskData) => Promise<Task>
  updateTask: (id: string, data: UpdateTaskData) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  reorderTasks: (reorderData: ReorderTaskData[]) => Promise<void>
  clearError: () => void
}

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      error: null,

      fetchTasks: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch("/api/planner/tasks", {
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch tasks")
          }

          const tasks = await response.json()
          set({ tasks, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error occurred",
            isLoading: false,
          })
        }
      },

      createTask: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch("/api/planner/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            throw new Error("Failed to create task")
          }

          const newTask = await response.json()
          set((state) => ({
            tasks: [...state.tasks, newTask],
            isLoading: false,
          }))

          return newTask
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error occurred",
            isLoading: false,
          })
          throw error
        }
      },

      updateTask: async (id, data) => {
        set({ error: null })
        try {
          const response = await fetch(`/api/planner/tasks/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            throw new Error("Failed to update task")
          }

          const updatedTask = await response.json()
          set((state) => ({
            tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error occurred",
          })
          throw error
        }
      },

      deleteTask: async (id) => {
        set({ error: null })
        try {
          const response = await fetch(`/api/planner/tasks/${id}`, {
            method: "DELETE",
          })

          if (!response.ok) {
            throw new Error("Failed to delete task")
          }

          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error occurred",
          })
          throw error
        }
      },

      reorderTasks: async (reorderData) => {
        set({ error: null })
        try {
          const response = await fetch("/api/planner/tasks/reorder", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasks: reorderData }),
          })

          if (!response.ok) {
            throw new Error("Failed to reorder tasks")
          }

          // Refresh tasks after reordering
          await get().fetchTasks()
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error occurred",
          })
          throw error
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "planner-storage",
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
)
