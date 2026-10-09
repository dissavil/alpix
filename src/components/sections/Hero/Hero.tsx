
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      id="top"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <div
        className={styles.dots}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <div className={styles.copy}>
          <h1
            id="hero-title"
            className={styles.title}
          >
            ALPIX
          </h1>

          <p className={styles.description}>
            Девелопмент и строительство жилой
            недвижимости: от земли и концепции —
            до продаж и ввода в эксплуатацию.
          </p>
        </div>
      </div>
    </section>
  );
}