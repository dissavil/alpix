"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Project } from "@/data/projects";
import CursorViewCase from "./CursorViewCase";
import styles from "./ProjectScene.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectSceneProps = {
  project: Project;
  index: number;
};

export default function ProjectScene({ project, index }: ProjectSceneProps) {
  const sequenceRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const info = infoRef.current;
    const details = detailsRef.current;

    if (!sequence || !stage || !frame || !info || !details) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "project-" + project.slug,
              trigger: sequence,
              start: "top top",
              end: () => "+=" + Math.round(window.innerHeight * 1.6),
              pin: stage,
              pinSpacing: false,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.fromTo(
            frame,
            { scale: 0.84, borderRadius: "20px" },
            { scale: 1, borderRadius: "0px", ease: "none", duration: 1 },
            0,
          );

          timeline.to(
            info,
            {
              y: -22,
              autoAlpha: 0.88,
              ease: "none",
              duration: 0.7,
            },
            0.15,
          );

          timeline.to(
            details,
            {
              y: -10,
              autoAlpha: 0,
              ease: "none",
              duration: 0.32,
            },
            0.55,
          );
        }, sequence);

        return () => context.revert();
      },
    );

    return () => media.revert();
  }, [project.slug]);

  return (
    <section
      ref={sequenceRef}
      className={styles.projectSequenceItem}
      aria-labelledby={"project-title-" + project.slug}
    >
      <div ref={stageRef} className={styles.projectStage}>
        <div ref={frameRef} className={styles.projectFrame}>
          <div
            className={styles.projectMedia}
            aria-hidden="true"
            style={{ backgroundImage: 'url("' + project.image + '")' }}
          />

          <div className={styles.projectShade} aria-hidden="true" />
          <span className={styles.projectNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div ref={infoRef} className={styles.projectInfo}>
            <p className={styles.projectCategory}>{project.category}</p>

            <h3
              id={"project-title-" + project.slug}
              className={styles.projectTitle}
            >
              {project.title}
            </h3>

            <p className={styles.projectLocation}>
              <MapPin size={15} strokeWidth={1.5} />
              {project.location}
            </p>

            <div ref={detailsRef} className={styles.projectDetails}>
              <p className={styles.projectDescription}>
                {project.description}
              </p>

              {project.facts && (
                <p className={styles.projectFacts}>{project.facts}</p>
              )}
            </div>
          </div>
        </div>

        <CursorViewCase
          targetRef={stageRef}
          href={"/projects/" + project.slug}
          title={project.title}
        />
      </div>
    </section>
  );
}
