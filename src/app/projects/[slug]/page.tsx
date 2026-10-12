import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import styles from "./ProjectDetail.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Проект не найден" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main" className={styles.page}>
      <div className={styles.topBar}>
        <Link href="/#projects" className={styles.backLink}>
          <ArrowLeft size={16} />
          Все проекты
        </Link>

        <span className={styles.brand}>ALPIX</span>
      </div>

      <header className={styles.header}>
        <p className={styles.category}>{project.category}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.location}>
          <MapPin size={16} />
          {project.location}
        </p>
      </header>

      <div
        className={styles.visual}
        role="img"
        aria-label={project.title + " — " + project.category}
        style={{ backgroundImage: 'url("' + project.image + '")' }}
      >
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <section className={styles.details} aria-label="Описание проекта">
        <div>
          <p className={styles.label}>О ПРОЕКТЕ</p>
          <p className={styles.description}>{project.description}</p>
        </div>

        {project.facts && (
          <div className={styles.factsBlock}>
            <p className={styles.label}>КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ</p>
            <p className={styles.facts}>{project.facts}</p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <Link href="/#projects" className={styles.backLink}>
          <ArrowLeft size={16} />
          Вернуться к портфолио
        </Link>
        <Link href="/#contact" className={styles.contactLink}>
          Обсудить проект
        </Link>
      </footer>
    </main>
  );
}
