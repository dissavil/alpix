import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";

import { projects } from "@/data/projects";
import styles from "./ProjectDetail.module.css";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <Link href="/#projects" className={styles.backLink}>
          <ArrowLeft size={16} />
          Все проекты
        </Link>

        <Link href="/#contact" className={styles.contactLink}>
          Обсудить проект
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <section
        className={styles.hero}
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(1, 29, 28, 0.82),
              rgba(1, 29, 28, 0.15)
            ),
            linear-gradient(
              0deg,
              rgba(1, 29, 28, 0.72),
              transparent 65%
            ),
            url("${project.image}")
          `,
        }}
      >
        <div className={styles.heroContent}>
          <p className={styles.category}>{project.category}</p>

          <h1 className={styles.title}>{project.title}</h1>

          <p className={styles.location}>
            <MapPin size={16} />
            {project.location}
          </p>
        </div>
      </section>

      <section className={styles.details}>
        <div>
          <p className={styles.eyebrow}>О проекте</p>
          <p className={styles.description}>
            {project.description}
          </p>
        </div>

        {project.metrics && (
          <div className={styles.metrics}>
            {project.metrics.map((metric) => (
              <div
                key={`${metric.value}-${metric.label}`}
                className={styles.metric}
              >
                <span>{metric.value}</span>
                <small>{metric.label}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}