export default function Stickers() {
  const achievements = [
    {
      icon: "/stickers/owl.png",
      title: "Ажилсаг зөгий",
      description: "Хичээнгүй",
      bgColor: "bg-blue-200",
    },
    {
      icon: "/stickers/toast.png",
      title: "Найрсаг найз",
      description: "Эелдэг нөхөрсөг",
      bgColor: "bg-yellow-200",

    },
    {
      icon: "/stickers/wreath.png",
      title: "Алтан од",
      description: "Шилдэг сурагч",
      bgColor: "bg-green-200",

    },
    {
      icon: "/stickers/helper.png",
      title: "Бяцхан туслагч",
      description: "Үргэлж тусална",
      bgColor: "bg-violet-200",

    },
    {
      icon: "/stickers/speech.png",
      title: "Анхааралтай сурагч",
      description: "Анхааралтай сонсогч",
      bgColor: "bg-red-300",

    },
  ];

  return (
  <div className="font-sans">
  <h1 className="text-sm font-semibold text-center mb-4">
    🏅 Шагналууд 🏅
  </h1>

  <div className="bg-pink-200 shadow-xl rounded-2xl w-[600px] p-4">
    <div className="grid grid-cols-5 gap-4">
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-1"
        >
          <div
            className={`w-14 h-14 rounded-full ${achievement.bgColor} flex items-center justify-center shadow`}
          >
            <div className={`w-8 h-8 rounded-full ${achievement.bgColor} flex items-center justify-center overflow-hidden`}>
              <img
                src={achievement.icon}
                alt={achievement.title}
                className="w-8 h-8"
              />
            </div>
          </div>

          <span className="text-xs font-semibold text-gray-800 text-center">
            {achievement.title}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
