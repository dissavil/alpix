import { projects } from "@/data/projects";

import ProjectScene from "./ProjectScene";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <header className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>ПОРТФОЛИО ALPIX</p>
          <h2 id="projects-title" className={styles.sectionTitle}>
            Проекты, которые
            <br />
            становятся реальностью.
          </h2>
        </div>

        <p className={styles.sectionDescription}>
          Жилая недвижимость, частное строительство и девелопмент
          в Алматы и Алматинской области. Каждый проект — отдельная
          локация, задача и архитектурное решение.
        </p>
      </header>

      <div className={styles.projectSequence}>
        {projects.map((project, index) => (
          <ProjectScene
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
