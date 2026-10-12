export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  facts?: string;
}

export const projects: Project[] = [
  {
    slug: "blackberry-hills",
    title: "Blackberry Hills",
    category: "Жилой комплекс",
    location: "Алматы, Горный Гигант",
    description:
      "Жилой комплекс с несколькими блоками таунхаусов в окружении горного ландшафта.",
    image: "/images/projects/blackberry-hills/cover.webp",
    facts: "6 блоков · 43 таунхауса",
  },
  {
    slug: "private-villas",
    title: "Частные виллы",
    category: "Частное строительство",
    location: "Алматы, Горный Гигант",
    description:
      "Разработка проекта и реализация двух индивидуальных вилл.",
    image: "/images/projects/private-villas/cover.webp",
    facts: "2 виллы · по 350 м²",
  },
  {
    slug: "ethno-residence",
    title: "ETHNO RESIDENCE",
    category: "Жилой комплекс",
    location: "Алматы",
    description:
      "Жилой проект, представленный в портфолио ALPIX.",
    image: "/images/projects/ethno-residence/cover.webp",
  },
  {
    slug: "duplex",
    title: "Дуплекс",
    category: "Строительство",
    location: "Алматы, Горный Гигант",
    description:
      "Проект и строительство дуплекса в жилой локации города.",
    image: "/images/projects/duplex/cover.webp",
  },
  {
    slug: "burunday",
    title: "Участок в Бурундае",
    category: "Девелопмент",
    location: "Алматинская область, Бурундай",
    description:
      "Анализ потенциала земельного участка и подготовка технико-экономических показателей для проекта застройки.",
    image: "/images/projects/burunday/cover.webp",
    facts: "6,67 га · 3 201 квартира · 258 парковочных мест",
  },
];
