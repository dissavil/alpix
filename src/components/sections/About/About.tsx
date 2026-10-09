import styles from "../Sections.module.css";

export default function About() {
  return (
    <section
      id="about"
      className={styles.aboutSection}
    >
      <div className={styles.sectionInner}>
        <header className={styles.aboutHeader}>
          <p className={styles.kicker}>01 / О компании</p>

          <h2 className={styles.sectionTitle}>
            ALPIX — это управление строительством и деньгами
          </h2>
        </header>

        <div className={styles.aboutGrid}>
          <p className={`${styles.sectionLead} ${styles.aboutLead}`}>
            Девелоперско-строительная компания на стыке
            инженерии, экономики и рынка недвижимости.
          </p>

          <div className={styles.aboutCopy}>
            <p>
              Каждый проект начинается с анализа локации,
              градостроительных ограничений, себестоимости
              и реального спроса.
            </p>

            <p>
              Мы соединяем земельный потенциал, концепцию,
              финансовую модель и строительство в единую
              систему управления.
            </p>

            <p>
              От земли до готового продукта — с понятными
              этапами, сроками и ответственностью.
            </p>

            <div className={styles.aboutPrinciple}>
              <span>НАШ ПРИНЦИП</span>

              <p>
                Не начинаем строительство, пока не понимаем,
                кому и зачем нужен объект, за какую цену он
                будет реализован и какую экономику предполагает.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}