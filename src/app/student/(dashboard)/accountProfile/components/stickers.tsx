export default function Stickers() {
  const achievements = [
    {
      icon: "/stickers/owl.png",
      title: "Ажилсаг зөгий",
      description: "Хичээнгүй",
    },
    {
      icon: "/stickers/toast.png",
      title: "Найрсаг найз",
      description: "Эелдэг нөхөрсөг",
    },
    {
      icon: "/stickers/wreath.png",
      title: "Алтан од",
      description: "Шилдэг сурагч",
    },
    {
      icon: "/stickers/helper.png",
      title: "Бяцхан туслагч",
      description: "Үргэлж тусална",
    },
    {
      icon: "/stickers/speech.png",
      title: "Анхааралтай сурагч",
      description: "Анхааралтай сонсогч",
    },
  ];

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold text-center mb-4 text-white">
        🏅 Шагналууд 🏅
      </h1>
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <div className="grid grid-cols-5 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={achievement.icon}
                alt={achievement.title}
                className="w-16 h-16 mx-auto"
              />
              <span className="mt-3 text-md font-semibold text-gray-800 text-center">
                {achievement.title}
              </span>
              <span className="mt-1 text-xs text-gray-500 text-center">
                {achievement.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
