"use client"

import { useState } from "react"
import { columnsWithActions } from "./components/columns"
import { DataTable } from "./components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"
import { Modal } from "./components/modal"
import { FaPlus } from "react-icons/fa"

export type Class = {
  id: string
  className: string
  teacherName: string
  studentCount: string
  groupName: string
}

export default function Page() {
  const [classlist, setClasslist] = useState<Class[]>([])

  const [newClassName, setNewClassName] = useState("")
  const [newTeacherName, setNewTeacherName] = useState("")
  const [newStudentCount, setNewStudentCount] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [editClassId, setEditClassId] = useState<string | null>(null)
  const [editClassName, setEditClassName] = useState("")
  const [editTeacherName, setEditTeacherName] = useState("")
  const [editStudentCount, setEditStudentCount] = useState("")
  const [editGroupName, setEditGroupName] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAdd = () => {
    if (
      !newClassName.trim() ||
      !newGroupName.trim() ||
      !newTeacherName.trim() ||
      Number(newStudentCount) <= 0
    )
      return

    const newClass: Class = {
      id: uuidv4(),
      className: newClassName,
      groupName: newGroupName,
      teacherName: newTeacherName,
      studentCount: newStudentCount,
    }

    setClasslist(prev => [...prev, newClass])
    setNewClassName("")
    setNewGroupName("")
    setNewTeacherName("")
    setNewStudentCount("")
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setClasslist(prev => prev.filter(cls => cls.id !== id))
  }

  const handleEdit = (
    id: string,
    className: string,
    groupName: string,
    teacherName: string,
    studentCount: string,
  ) => {
    setEditClassId(id)
    setEditClassName(className)
    setEditGroupName(groupName)
    setEditTeacherName(teacherName)
    setEditStudentCount(studentCount)
    setIsModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (
      editClassId &&
      editClassName.trim() &&
      editGroupName.trim() &&
      editTeacherName.trim() &&
      Number(editStudentCount) > 0
    ) {
      setClasslist(prev =>
        prev.map(cls =>
          cls.id === editClassId
            ? {
              ...cls,
              className: editClassName,
              teacherName: editTeacherName,
              studentCount: editStudentCount,
              groupName: editGroupName,
            }
            : cls
        )
      )
      setIsModalOpen(false)
      setEditClassId(null)
      setEditClassName("")
      setEditTeacherName("")
      setEditStudentCount("")
      setEditGroupName("")
    }
  }

  return (
    <div className="p-6 pt-24 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">📚 Ангиудын жагсаалт</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white border border-blue-400 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600"
          >
            <FaPlus className="text-lg" />
            Шинэ анги нэмэх
          </Button>
        </div>

        <DataTable
          columns={columnsWithActions(handleDelete, handleEdit)}
          data={classlist}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {editClassId ? (
            <>
              <h2 className="text-xl font-light mb-4">Засах</h2>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Ангиоо"
                  value={editClassName}
                  onChange={(e) => setEditClassName(e.target.value)} />
                <Input
                  placeholder="Бүлэг"
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)} />
                <Input
                  placeholder="Анги даасан багш"
                  value={editTeacherName}
                  onChange={(e) => setEditTeacherName(e.target.value)} />
                <Input
                  placeholder="Сурагчдын тоо"
                  value={editStudentCount}
                  onChange={(e) => setEditStudentCount(e.target.value)} />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}>
                  Цуцлах
                </Button>
                <Button
                  onClick={handleSaveEdit}>
                  Хадгалах
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-light mb-4">Шинэ анги нэмэх</h2>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Анги"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)} />
                <Input
                  placeholder="Бүлэг"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)} />
                <Input
                  placeholder="Анги даасан багш"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)} />
                <Input
                  placeholder="Сурагчдын тоо"
                  value={newStudentCount}
                  onChange={(e) => setNewStudentCount(e.target.value)} />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}>
                  Цуцлах
                </Button>
                <Button
                  onClick={handleAdd}>
                  Нэмэх
                </Button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  )
}
