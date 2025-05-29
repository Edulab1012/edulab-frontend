import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const Announcements = () => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light leading-8 mb-5">Сургуулийн мэдэгдэл</h1>
            <Link href={"/school"}><Button
              variant={"outline"}
              className="text-xs text-black cursor-pointer"
            >
              Бүгдийг харах
            </Button></Link>
          </div>
        </CardHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple">
            <div className="bg-lamaSkyLight rounded-md ">
              <div className="flex items-center justify-between">
                <h2 className="text-black font-medium">
                  Эцэг эхийн хурал зарлагдаж байна
                </h2>
                <span className="text-xs text-gray-500 bg-white rounded-md px-1 py-1">
                  2025-05-15
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Эрхэм хүндэт эцэг эхчүүд ээ, та бүхнийг 2025 оны 5 дугаар сарын
                15-ны өдөр болох эцэг эхийн ээлжит хуралд хүрэлцэн ирэхийг урьж
                байна. Хурлаар сургуулийн үйл ажиллагаа болон цаашдын
                зорилтуудын талаар хэлэлцэх болно.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple">
            <div className="flex items-center justify-between">
              <h2 className="text-black font-medium">
                Сургуулийн номын сан шинээр нээгдлээ
              </h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-1 py-1">
                2025-05-10
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Манай сургуулийн шинэчилсэн номын сан өнөөдрөөс эхлэн үүдээ
              нээлээ. Та бүхэн хүрэлцэн ирж, баялаг сантай танилцаж, дуртай
              номоо уншаарай.
            </p>
          </div>
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple">
            <div className="flex items-center justify-between">
              <h2 className="text-black font-medium">
                Спорт өдөрлөг болох гэж байна
              </h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-1 py-1">
                2025-05-20
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Сургуулийн спорт өдөрлөг 2025 оны 5 дугаар сарын 20-ны өдөр болно.
              Бүх сурагчдыг идэвхтэй оролцож, өөрсдийн авхаалж самбааг сорихыг
              уриалж байна.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Announcements;
