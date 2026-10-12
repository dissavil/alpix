"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ProjectSequence.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectMetric = {
  value: string;
  label: string;
};

type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  metrics?: ProjectMetric[];
};

const projects: Project[] = [
  {
    slug: "blackberry-hills",
    title: "Blackberry Hills",
    category: "Жилой комплекс",
    location: "Горный Гигант",
    description:
      "Жилой проект, объединяющий приватность загородной жизни и архитектуру современного жилого комплекса.",
    image: "/images/projects/blackberry-hills.webp",
    metrics: [
      { value: "6", label: "блоков" },
      { value: "43", label: "таунхауса" },
    ],
  },
  {
    slug: "private-villas",
    title: "Private Villas",
    category: "Частные виллы",
    location: "Горный Гигант",
    description:
      "Две частные виллы с индивидуальной архитектурой и продуманным жилым пространством.",
    image: "/images/projects/private-villas.webp",
    metrics: [
      { value: "2", label: "виллы" },
      { value: "350 м²", label: "каждая" },
    ],
  },
  {
    slug: "ethno-residence",
    title: "ETHNO RESIDENCE",
    category: "Жилой комплекс",
    location: "Алматинская область",
    description:
      "Жилой проект с собственной архитектурной концепцией.",
    image: "/images/projects/ethno-residence.webp",
  },
  {
    slug: "duplex",
    title: "Duplex",
    category: "Жилая недвижимость",
    location: "Горный Гигант",
    description:
      "Проектирование и строительство современного двухсекционного жилого дома.",
    image: "/images/projects/duplex.webp",
  },
  {
    slug: "burunday",
    title: "Burunday",
    category: "Девелопмент территории",
    location: "Бурундай",
    description:
      "Территория под масштабное жилое развитие с проработкой потенциала участка.",
    image: "/images/projects/burunday.webp",
    metrics: [
      { value: "6,67 га", label: "площадь участка" },
      { value: "3 201", label: "квартира" },
      { value: "258", label: "парковочных мест" },
    ],
  },
];

type ProjectSceneProps = {
  project: Project;
  index: number;
};

function ProjectScene({ project, index }: ProjectSceneProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cursorLinkRef = useRef<HTMLAnchorElement | null>(null);

  const isCursorActiveRef = useRef(false);
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;

    if (!scene || !stage || !frame || !content) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
      () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.7)}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Карточка увеличивается до размеров экрана.
        timeline.fromTo(
          frame,
          {
            scale: 0.84,
            borderRadius: "24px",
          },
          {
            scale: 1,
            borderRadius: "0px",
            duration: 1,
            ease: "none",
          },
          0,
        );

        // Текст появляется в процессе увеличения карточки.
        timeline.fromTo(
          content,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: "none",
          },
          0.44,
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      },
    );

    return () => media.revert();
  }, []);

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType !== "mouse") {
      return;
    }

    const stage = stageRef.current;
    const frame = frameRef.current;
    const cursorLink = cursorLinkRef.current;

    if (!stage || !frame || !cursorLink) {
      return;
    }

    const frameRect = frame.getBoundingClientRect();

    const insideFrame =
      event.clientX >= frameRect.left &&
      event.clientX <= frameRect.right &&
      event.clientY >= frameRect.top &&
      event.clientY <= frameRect.bottom;

    const stageRect = stage.getBoundingClientRect();

    if (insideFrame) {
      // Координаты мыши относительно сцены,
      // а не масштабируемой карточки.
      cursorLink.style.left =
        `${event.clientX - stageRect.left}px`;

      cursorLink.style.top =
        `${event.clientY - stageRect.top}px`;
    }

    if (isCursorActiveRef.current !== insideFrame) {
      isCursorActiveRef.current = insideFrame;
      setCursorActive(insideFrame);
    }
  }

  function handlePointerLeave() {
    isCursorActiveRef.current = false;
    setCursorActive(false);
  }

  const projectNumber = String(index + 1).padStart(2, "0");
  const projectId = `project-title-${project.slug}`;

  return (
    <article
      ref={sceneRef}
      className={styles.projectScene}
      aria-labelledby={projectId}
    >
      <div
        ref={stageRef}
        className={styles.projectStage}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={frameRef}
          className={styles.projectFrame}
          aria-hidden="true"
        >
          <div
            className={styles.projectImage}
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  rgba(0, 55, 52, 0.35),
                  rgba(1, 29, 28, 0.25)
                ),
                url("${project.image}")
              `,
            }}
          />

          <div className={styles.projectOverlay} />
        </div>

        <div
          ref={contentRef}
          className={styles.projectContent}
        >
          <div className={styles.projectMeta}>
            <span>{project.category}</span>
            <span>{project.location}</span>
          </div>

          <h2 id={projectId} className={styles.projectTitle}>
            {project.title}
          </h2>

          <p className={styles.projectDescription}>
            {project.description}
          </p>

          {project.metrics && (
            <div className={styles.projectMetrics}>
              {project.metrics.map((metric) => (
                <div
                  className={styles.projectMetric}
                  key={`${metric.value}-${metric.label}`}
                >
                  <span className={styles.metricValue}>
                    {metric.value}
                  </span>

                  <span className={styles.metricLabel}>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <span className={styles.projectIndex}>
          {projectNumber}
          <span className={styles.projectIndexDivider}>/</span>
          {String(projects.length).padStart(2, "0")}
        </span>

        <a
          ref={cursorLinkRef}
          href={`/projects/${project.slug}`}
          className={[
            styles.viewCaseCursor,
            cursorActive ? styles.viewCaseCursorActive : "",
          ].join(" ")}
          aria-label={`View case: ${project.title}`}
        >
          <span>View case</span>
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </a>

        <a
          className={styles.mobileCaseLink}
          href={`/projects/${project.slug}`}
        >
          Смотреть проект
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </a>
      </div>
    </article>
  );
}

export default function ProjectSequence() {
  return (
    <section
      id="projects"
      className={styles.projectSequence}
      aria-label="Проекты ALPIX"
    >
      {projects.map((project, index) => (
        <ProjectScene
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
    </section>
  );
}