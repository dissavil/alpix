"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

import styles from "./ProjectSequence.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectSceneProps = {
  project: Project;
  index: number;
};

function ProjectScene({ project, index }: ProjectSceneProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef<HTMLSpanElement | null>(null);
  const cursorLinkRef = useRef<HTMLAnchorElement | null>(null);

  const cursorActiveRef = useRef(false);
  const xSetter = useRef<((value: number) => void) | null>(null);
  const ySetter = useRef<((value: number) => void) | null>(null);

  const [cursorActive, setCursorActive] = useState(false);

  // Движение кнопки View case за мышью.
  useEffect(() => {
    const cursor = cursorLinkRef.current;

    if (!cursor) {
      return;
    }

    const desktop = window.matchMedia(
      "(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    if (!desktop.matches) {
      return;
    }

    const moveX = gsap.quickTo(cursor, "left", {
      duration: 0.14,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "top", {
      duration: 0.14,
      ease: "power3.out",
    });

    xSetter.current = moveX;
    ySetter.current = moveY;

    return () => {
      xSetter.current = null;
      ySetter.current = null;

      gsap.killTweensOf(cursor, ["left", "top"]);
    };
  }, []);

  // Анимация карточки при прокрутке.
  useEffect(() => {
    const scene = sceneRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;
    const projectIndex = indexRef.current;

    if (!scene || !frame || !content || !projectIndex) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: `project-${project.slug}`,
              trigger: scene,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          });

          // Этап 1: изображение увеличивается.
          timeline.fromTo(
            frame,
            {
              scale: 0.84,
              borderRadius: "22px",
            },
            {
              scale: 1,
              borderRadius: "0px",
              duration: 0.78,
              ease: "none",
            },
            0,
          );

          // Этап 2: после увеличения появляется текст.
          timeline.fromTo(
            [content, projectIndex],
            {
              autoAlpha: 0,
              y: 18,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.15,
              ease: "none",
            },
            0.8,
          );
        }, scene);

        return () => context.revert();
      },
    );

    return () => media.revert();
  }, [project.slug]);

  // Проверяем, находится ли мышь над изображением.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    const frame = frameRef.current;
    const stage = stageRef.current;

    if (!frame || !stage) {
      return;
    }

    const frameRect = frame.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    const insideFrame =
      event.clientX >= frameRect.left &&
      event.clientX <= frameRect.right &&
      event.clientY >= frameRect.top &&
      event.clientY <= frameRect.bottom;

    if (insideFrame) {
      const x = event.clientX - stageRect.left;
      const y = event.clientY - stageRect.top;

      xSetter.current?.(x);
      ySetter.current?.(y);
    }

    if (cursorActiveRef.current !== insideFrame) {
      cursorActiveRef.current = insideFrame;
      setCursorActive(insideFrame);
    }
  }

  function handlePointerLeave() {
    cursorActiveRef.current = false;
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
                  rgba(0, 55, 52, 0.3),
                  rgba(1, 29, 28, 0.2)
                ),
                url("${project.image}")
              `,
            }}
          />

          <div className={styles.projectOverlay} />
        </div>

        <div ref={contentRef} className={styles.projectContent}>
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

        <span ref={indexRef} className={styles.projectIndex}>
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
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </a>

        <a
          className={styles.mobileCaseLink}
          href={`/projects/${project.slug}`}
        >
          Смотреть проект
          <ArrowUpRight size={15} strokeWidth={1.5} />
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