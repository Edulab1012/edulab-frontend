import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GradeGroupProps = {
  setField: (field: string, value: string) => void;
};

type Group = {
  id: string;
  name: string;
  gradeId: string;
  grade: {
    id: string;
    number: number;
    schoolId: string | null;
  };
};

export default function SelectClass({ setField }: GradeGroupProps) {
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [grades, setGrades] = useState<{ id: string; number: number }[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [groups, setGroups] = useState<
    { id: string; name: string; gradeId: string }[]
  >([]);

  // fetch all group with grade inside
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/class/group");
      const data: Group[] = res.data;
      // `${BASE_URL}class/group`
      setGroupData(data);

      // 🔹 unique grades гаргах
      const uniqueGradesMap = new Map<number, Group>();
      data.forEach((item) => {
        if (!uniqueGradesMap.has(item.grade.number)) {
          uniqueGradesMap.set(item.grade.number, item);
        }
      });

      const uniqueGrades = Array.from(uniqueGradesMap.values()).map((item) => ({
        id: item.grade.id,
        number: item.grade.number,
      }));

      setGrades(uniqueGrades);
    };

    fetchGroups();
  }, []);

  // 🔄 анги сонгоход харгалзах бүлэгүүдийг шүүж гаргах
  useEffect(() => {
    if (selectedGradeId) {
      const filteredGroups = groupData.filter(
        (g) => g.gradeId === selectedGradeId
      );
      setGroups(
        filteredGroups.map(({ id, name, gradeId }) => ({ id, name, gradeId }))
      );
    }
  }, [selectedGradeId, groupData]);

  return (
    <div className="flex gap-2">
      {/* Grade select */}
      <Select
        onValueChange={(val) => {
          setSelectedGradeId(val);
          setField("grade", val);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Анги" />
        </SelectTrigger>
        <SelectContent>
          {grades.map((grade) => (
            <SelectItem key={grade.id} value={grade.id}>
              {grade.number}-р анги
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Group select */}
      <Select
        onValueChange={(val) => {
          setField("group", val);
        }}
        disabled={!selectedGradeId}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Бүлэг" />
        </SelectTrigger>
        <SelectContent>
          {groups.length === 0 ? (
            <div className="px-4 py-2 text-muted-foreground text-sm">
              Эхлээд ангиа сонгоно уу
            </div>
          ) : (
            groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}-р бүлэг
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
