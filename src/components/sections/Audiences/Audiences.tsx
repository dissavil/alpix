import styles from "../Sections.module.css";

const audiences = [
  {
    number: "01",
    title: "Инвесторам",
    description:
      "Понятная экономика, контролируемые риски и прозрачная модель участия.",
    points: [
      "Совместная реализация девелоперских проектов",
      "Структура входа и выхода",
      "Контроль бюджета, сроков и продаж",
    ],
  },
  {
    number: "02",
    title: "Владельцам земли",
    description:
      "Превращаем участок в проект с реальным рыночным потенциалом.",
    points: [
      "Анализ потенциала участка",
      "Концепция застройки",
      "Партнёрство или выкуп",
    ],
  },
  {
    number: "03",
    title: "Частным клиентам",
    description:
      "Продуманная архитектура, качество исполнения и долгосрочная ликвидность.",
    points: [
      "Виллы, таунхаусы и индивидуальные дома",
      "Строительство под ключ",
      "Контроль инженерии, качества и сроков",
    ],
  },
];

export default function Audiences() {
  return (
    <section
      id="audiences"
      className={styles.audiencesSection}
    >
      <div className={styles.sectionInner}>
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>
            02 / Для кого мы работаем
          </p>

          <h2 className={styles.sectionTitle}>
            Кому мы помогаем
          </h2>

          <p className={styles.sectionLead}>
            Мы работаем с теми, кто думает в категории результата.
          </p>
        </header>

        <div className={styles.audiencesGrid}>
          {audiences.map((audience) => (
            <article
              key={audience.number}
              className={styles.audienceCard}
            >
              <span className={styles.cardNumber}>
                {audience.number}
              </span>

              <h3>{audience.title}</h3>

              <p>{audience.description}</p>

              <ul>
                {audience.points.map((point) => (
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