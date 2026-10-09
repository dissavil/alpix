import styles from "../Sections.module.css";

export default function Geography() {
  return (
    <section
      id="geography"
      className={styles.geographySection}
    >
      <div className={styles.sectionInner}>
        <div className={styles.geographyGrid}>
          <div className={styles.geographyText}>
            <p className={styles.kicker}>
              06 / География
            </p>

            <h2 className={styles.sectionTitle}>
              Знаем регион,
              <br />
              где строим
            </h2>

            <p>
              Работаем в Алматы и Алматинской области.
              Учитываем особенности локального рынка,
              градостроительные ограничения, инфраструктуру
              и порядок согласований.
            </p>
          </div>

          <div className={styles.locationPanel}>
            <p className={styles.locationPanelLabel}>
              Регионы и проекты
            </p>

            <div className={styles.locationItem}>
              <h3>Алматы</h3>

              <p>
                Жилая недвижимость, частные виллы
                и проекты в городской среде.
              </p>
            </div>

            <div className={styles.locationItem}>
              <h3>Горный Гигант</h3>

              <p>
                Blackberry Hills, частные виллы
                и строительство дуплекса.
              </p>
            </div>

            <div className={styles.locationItem}>
              <h3>Бурундай</h3>

              <p>
                Анализ земельного участка и проработка
                потенциала девелоперского проекта.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}