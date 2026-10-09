import styles from "../Sections.module.css";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className={styles.projectsSection}
    >
      <div className={styles.sectionInner}>
        <header className={styles.projectsHeader}>
          <div>
            <p className={styles.kicker}>
              03 / Портфолио
            </p>

            <h2 className={styles.sectionTitle}>
              Реализуем не на словах,
              <br />
              а на проектах
            </h2>
          </div>

          <p className={styles.projectsIntro}>
            Жилая недвижимость, частное строительство
            и девелоперские проекты в Алматы
            и Алматинской области.
          </p>
        </header>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={styles.projectCard}
            >
              <div
                className={styles.projectVisual}
                style={{
                  backgroundImage: `
                    linear-gradient(
                      180deg,
                      rgba(0, 35, 31, 0.06) 10%,
                      rgba(0, 35, 31, 0.78) 100%
                    ),
                    url("${project.image}")
                  `,
                }}
                role="img"
                aria-label={`Визуальное представление проекта ${project.title}`}
              >
                <span className={styles.projectLabel}>
                  ПРОЕКТ: {project.category}
                </span>

                <span className={styles.projectVisualNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.projectBody}>
                <div className={styles.projectMeta}>
                  <span>{project.category}</span>
                  <span>{project.location}</span>
                </div>

                <h3 className={styles.projectTitle}>
                  {project.title}
                </h3>

                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                {project.facts && (
                  <p className={styles.projectFacts}>
                    {project.facts}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}