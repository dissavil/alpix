"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import styles from "./DevelopmentStory.module.css";

const stages = [
  {
    title: "Участок",
    description:
      "Анализ локации, градостроительных ограничений и потенциала земли.",
  },
  {
    title: "Концепция",
    description:
      "Формирование концепции и принципов размещения объектов на участке.",
  },
  {
    title: "Экономика",
    description:
      "Расчёт технико-экономических показателей, затрат и сценариев реализации.",
  },
  {
    title: "Реализация",
    description:
      "Переход от проектирования к строительству и дальнейшей реализации проекта.",
  },
];

type AnimatedMetricProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  active: boolean;
};

function AnimatedMetric({
  value,
  decimals = 0,
  suffix = "",
  label,
  active,
}: AnimatedMetricProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    const duration = 1400;
    let startTime = 0;
    let frameId = 0;

    function animate(time: number) {
      if (startTime === 0) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Плавное замедление к концу анимации.
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCurrent(value * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [active, value]);

  const formattedValue = current.toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div className={styles.metric}>
      <span
        className={styles.metricNumber}
        aria-label={`${value.toLocaleString("ru-RU", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`}
      >
        {formattedValue}
        {suffix}
      </span>

      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

export default function DevelopmentStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Не запускаем анимацию, пока блок далеко за экраном.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className={`${styles.story} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="story-title"
    >
      {/* Заголовок и описание подхода ALPIX */}
      <div className={styles.storyHeader}>
        <div className={styles.storyCopy}>
          <h2 id="story-title" className={styles.title}>
            От земли — к реализуемому проекту
          </h2>

          <p className={styles.intro}>
            Девелопмент начинается задолго до строительства.
            Мы анализируем участок, формируем концепцию и
            проверяем экономику, прежде чем переходить к реализации.
          </p>
        </div>

        <p className={styles.sideNote}>
          Каждый этап должен отвечать на конкретный вопрос:
          что можно построить, для кого и на каких условиях.
        </p>
      </div>

      {/* Схематичный генплан */}
      <div className={styles.planPanel}>
        <svg
          className={styles.plan}
          viewBox="700 190 650 500"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Схематичная визуализация земельного участка и размещения зданий"
        >
          <defs>
            <pattern
              id="planGrid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(245,244,236,0.07)"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>

          {/* Техническая сетка */}
          <rect
            x="700"
            y="190"
            width="650"
            height="500"
            fill="url(#planGrid)"
          />

          {/* Условные линии рельефа */}
          <g className={styles.terrainLines} fill="none">
            <path d="M690 270 C830 190 950 240 1080 205 S1280 235 1370 190" />
            <path d="M690 290 C830 210 950 260 1080 225 S1280 255 1370 210" />
            <path d="M690 315 C830 235 950 285 1080 250 S1280 280 1370 235" />
            <path d="M690 585 C830 505 950 555 1080 520 S1280 550 1370 505" />
            <path d="M690 610 C830 530 950 580 1080 545 S1280 575 1370 530" />
          </g>

          {/* Контур земельного участка */}
          <path
            className={styles.plotBoundary}
            d="M820 300 L1050 250 L1245 365 L1200 590 L1000 670 L825 535 Z"
          />

          {/* Условные дороги и связи */}
          <g className={styles.roads} fill="none">
            <path d="M845 355 L1015 320 L1212 410" />
            <path d="M850 485 L1010 545 L1185 495" />
            <path d="M1000 267 L1018 405 L1000 650" />
            <path d="M870 420 L1170 450" />
          </g>

          {/* Условные пятна застройки */}
          <g className={styles.buildings}>
            <polygon points="875,347 950,330 960,355 885,374" />
            <polygon points="982,322 1020,313 1028,340 990,350" />
            <polygon points="1063,343 1120,367 1108,391 1052,369" />

            <polygon points="872,405 940,427 930,451 862,430" />
            <polygon points="990,411 1062,433 1052,458 980,436" />
            <polygon points="1102,437 1160,455 1152,479 1095,460" />

            <polygon points="898,486 967,509 957,533 888,510" />
            <polygon points="1001,493 1067,514 1057,538 991,518" />
          </g>

          {/* Внутренние границы и связи */}
          <g className={styles.planDetails} fill="none">
            <path d="M885 382 L980 358 L1050 380 L1167 420" />
            <path d="M862 465 L975 490 L1090 524" />
            <path d="M1035 349 L1070 399 L1075 432" />
          </g>

          {/* Геометрические точки по границам */}
          <g className={styles.plotPoints}>
            <circle cx="820" cy="300" r="3.5" />
            <circle cx="1050" cy="250" r="3.5" />
            <circle cx="1245" cy="365" r="3.5" />
            <circle cx="1200" cy="590" r="3.5" />
            <circle cx="1000" cy="670" r="3.5" />
            <circle cx="825" cy="535" r="3.5" />
          </g>
        </svg>

        <p className={styles.planCaption}>
          Проект в Бурундае. Показатели проекта приведены ниже.
          Изображение генплана пока схематичное.
        </p>
      </div>

      {/* Подтверждённые показатели проекта в Бурундае */}
      <div
        className={styles.metrics}
        aria-label="Показатели проекта в Бурундае"
      >
        <AnimatedMetric
          value={6.67}
          decimals={2}
          suffix=" га"
          label="Площадь участка"
          active={isVisible}
        />

        <AnimatedMetric
          value={3201}
          label="Квартир в проекте"
          active={isVisible}
        />

        <AnimatedMetric
          value={258}
          label="Парковочных мест"
          active={isVisible}
        />
      </div>

      {/* Этапы работы */}
      <div className={styles.stages}>
        {stages.map((stage, index) => (
          <article className={styles.stage} key={stage.title}>
            <span
              className={styles.stageLine}
              style={
                {
                  "--stage-index": index,
                } as CSSProperties
              }
              aria-hidden="true"
            />

            <h3>{stage.title}</h3>

            <p>{stage.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}