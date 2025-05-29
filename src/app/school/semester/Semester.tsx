"use client";
import { useEffect, useState } from "react";
import { Calendar, Plus } from "lucide-react";

interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export default function SemesterManager() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [newSemester, setNewSemester] = useState({
    name: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const fetchSemesters = async () => {
    const res = await fetch("http://localhost:8000/api/v1/semester");
    const data = await res.json();
    setSemesters(data);
  };

  const createSemester = async () => {
    await fetch("http://localhost:8000/api/v1/semester", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSemester),
    });
    fetchSemesters();
  };

  const setCurrentSemester = async (id: string) => {
    await fetch(`http://localhost:8000/api/v1/semester/${id}/set-current`, {
      method: "PATCH",
    });
    fetchSemesters();
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
        <Calendar className="w-6 h-6 text-white" /> Semester Management
      </h2>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-medium mb-3 text-white">Create New Semester</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Semester Name"
            className="p-2 border rounded"
            value={newSemester.name}
            onChange={(e) =>
              setNewSemester({ ...newSemester, name: e.target.value })
            }
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newSemester.startDate}
            onChange={(e) =>
              setNewSemester({ ...newSemester, startDate: e.target.value })
            }
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newSemester.endDate}
            onChange={(e) =>
              setNewSemester({ ...newSemester, endDate: e.target.value })
            }
          />
          <button
            onClick={createSemester}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>
      </div>

      {/* Semester List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Start Date</th>
              <th className="px-6 py-3 text-left">End Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester) => (
              <tr key={semester.id} className="border-t">
                <td className="px-6 py-4">{semester.name}</td>
                <td className="px-6 py-4">
                  {new Date(semester.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(semester.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {semester.isCurrent ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      Current
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {!semester.isCurrent && (
                    <button
                      onClick={() => setCurrentSemester(semester.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Set as Current
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
