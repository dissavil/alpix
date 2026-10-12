import Image from "next/image";
import { ArrowUpRight, MapPin, MoveRight } from "lucide-react";

import { projects } from "@/data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <header className={styles.sectionHeader}>
        <div className={styles.headerMain}>
          <p className={styles.eyebrow}>ПОРТФОЛИО ALPIX</p>

          <h2 id="projects-title" className={styles.sectionTitle}>
            Проекты, которые
            <br />
            становятся реальностью.
          </h2>
        </div>

        <p className={styles.headerDescription}>
          Жилая недвижимость и девелопмент в Алматы
          и Алматинской области. Каждый проект —
          отдельная задача, локация и решение.
        </p>
      </header>

      <div className={styles.projectList}>
        {projects.map((project) => {
          const images = project.images?.length
            ? project.images
            : [project.image];

          return (
            <article
              className={styles.project}
              key={project.slug}
              aria-labelledby={`project-${project.slug}`}
            >
              <div className={styles.projectHeader}>
                <div className={styles.projectIdentity}>
                  <p className={styles.projectCategory}>
                    {project.category}
                  </p>

                  <h3
                    id={`project-${project.slug}`}
                    className={styles.projectTitle}
                  >
                    {project.title}
                  </h3>

                  <p className={styles.projectLocation}>
                    <MapPin size={14} strokeWidth={1.6} />
                    {project.location}
                  </p>
                </div>

                <div className={styles.projectSummary}>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>

                  {project.facts && (
                    <p className={styles.projectFacts}>
                      {project.facts}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`${styles.gallery} ${
                  images.length === 1 ? styles.singleImage : ""
                }`}
                tabIndex={0}
                role="group"
                aria-label={`Галерея проекта ${project.title}`}
              >
                <div className={styles.galleryTrack}>
                  {images.map((image, index) => (
                    <figure
                      className={styles.slide}
                      key={image}
                    >
                      <Image
                        src={image}
                        alt={
                          index === 0
                            ? `${project.title} — ${project.category}`
                            : `${project.title} — фотография ${index + 1}`
                        }
                        fill
                        sizes="(max-width: 760px) 90vw, 88vw"
                        className={styles.projectImage}
                        priority={
                          project.slug === "blackberry-hills" &&
                          index === 0
                        }
                      />

                      {index === 0 && (
                        <figcaption className={styles.imageCaption}>
                          <span>{project.title}</span>
                          <ArrowUpRight
                            size={20}
                            strokeWidth={1.5}
                          />
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <div className={styles.galleryHint}>
                  <span>Листайте, чтобы увидеть больше</span>
                  <MoveRight size={16} strokeWidth={1.4} />
                </div>
              )}

              <div className={styles.projectFooter}>
                <span>{project.location}</span>

                <span className={styles.projectType}>
                  {project.category}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}