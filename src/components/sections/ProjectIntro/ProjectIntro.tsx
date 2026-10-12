import { ArrowDownRight } from "lucide-react";

import styles from "./ProjectIntro.module.css";

export default function ProjectIntro() {
  return (
    <section
      id="project-intro"
      className={styles.intro}
      aria-labelledby="project-intro-title"
    >
      <div className={styles.top}>
        <p className={styles.eyebrow}>
          <span className={styles.indicator} />
          Портфолио ALPIX
          <span className={styles.eyebrowIndex}>01 — 05</span>
        </p>

        <h2 id="project-intro-title" className={styles.title}>
          От потенциала территории —
          <span> к пространству для жизни.</span>
        </h2>
      </div>

      <div className={styles.bottom}>
        <p className={styles.description}>
          Каждый проект начинается с понимания места.
          Мы объединяем работу с территорией, архитектурную
          концепцию и строительство в единый процесс.
        </p>

        <a className={styles.link} href="#projects">
          Исследовать проекты
          <ArrowDownRight size={19} strokeWidth={1.5} />
        </a>
      </div>

      <div className={styles.footer}>
        <span>Девелопмент · Архитектура · Строительство</span>
        <span>Алматы, Казахстан</span>
      </div>
    </section>
  );
}