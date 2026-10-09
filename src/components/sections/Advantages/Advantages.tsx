import styles from "../Sections.module.css";

const advantages = [
  {
    title: "Инженерная экспертиза",
    description:
      "Понимаем, как объект строится в реальности, а не только выглядит на визуализации.",
  },
  {
    title: "Контроль себестоимости",
    description:
      "Работаем с бюджетом и техническими решениями без компромиссов в безопасности.",
  },
  {
    title: "Понимание рынка",
    description:
      "Оцениваем проект с позиции реального спроса и платёжеспособности покупателей.",
  },
  {
    title: "Прозрачность",
    description:
      "Понятные этапы, цифры, отчётность и ответственность на протяжении проекта.",
  },
  {
    title: "Комплексный подход",
    description:
      "Учитываем земельные участки, инфраструктуру, градостроительные требования и реализацию.",
  },
];

export default function Advantages() {
  return (
    <section
      id="advantages"
      className={styles.advantagesSection}
    >
      <div className={styles.sectionInner}>
        <p className={styles.kicker}>
          05 / Наш подход
        </p>

        <h2 className={styles.sectionTitle}>
          Почему нам доверяют
        </h2>

        <div className={styles.advantagesGrid}>
          {advantages.map((advantage, index) => (
            <article
              key={advantage.title}
              className={styles.advantageItem}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{advantage.title}</h3>

              <p>{advantage.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}