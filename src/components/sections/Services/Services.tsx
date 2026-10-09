import styles from "../Sections.module.css";

const services = [
  {
    number: "01",
    title: "Девелопмент",
    description:
      "Определяем потенциал территории и формируем экономически обоснованную концепцию.",
    points: [
      "Анализ и аудит земельных участков",
      "Градостроительная и правовая проработка",
      "Концепция застройки",
      "Финансовая модель и стратегия реализации",
    ],
  },
  {
    number: "02",
    title: "Строительство",
    description:
      "Управляем реализацией проекта от подготовительных работ до ввода объекта.",
    points: [
      "Генеральный подряд",
      "Управление подрядчиками",
      "Контроль бюджета, сроков и качества",
      "Сопровождение ввода в эксплуатацию",
    ],
  },
  {
    number: "03",
    title: "Партнёрские проекты",
    description:
      "Объединяем капитал, землю и экспертизу для реализации девелоперских задач.",
    points: [
      "Совместная работа с инвесторами",
      "Проекты с владельцами земли",
      "Гибкие форматы сотрудничества",
      "Прозрачная отчётность",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className={styles.servicesSection}
    >
      <div className={styles.sectionInner}>
        <p className={styles.kicker}>
          04 / Услуги
        </p>

        <h2 className={styles.sectionTitle}>
          Что мы делаем
        </h2>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article
              key={service.number}
              className={styles.serviceCard}
            >
              <span className={styles.serviceIndex}>
                {service.number}
              </span>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}