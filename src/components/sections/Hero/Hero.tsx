import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      id="top"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <svg
        className={styles.terrain}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none">
          {/* Линии рельефа */}
          <path
            className={`${styles.contour} ${styles.contour1}`}
            d="M-100 210 C120 40 300 100 470 210 S790 340 970 205 S1300 55 1540 180"
          />
          <path
            className={`${styles.contour} ${styles.contour2}`}
            d="M-100 255 C120 85 320 140 490 250 S800 375 990 250 S1310 100 1540 220"
          />
          <path
            className={`${styles.contour} ${styles.contour3}`}
            d="M-100 305 C130 140 340 195 510 295 S820 420 1010 300 S1320 150 1540 265"
          />
          <path
            className={`${styles.contour} ${styles.contour4}`}
            d="M-100 365 C140 200 360 255 535 355 S830 480 1030 365 S1330 215 1540 320"
          />
          <path
            className={`${styles.contour} ${styles.contour5}`}
            d="M100 900 C250 730 400 690 590 730 S930 830 1100 680 S1370 570 1540 640"
          />
          <path
            className={`${styles.contour} ${styles.contour6}`}
            d="M-100 700 C120 560 300 580 470 660 S780 790 970 680 S1300 540 1540 600"
          />

          {/* Контур земельного участка */}
          <path
            className={styles.plotBoundary}
            d="M820 300 L1050 250 L1245 365 L1200 590 L1000 670 L825 535 Z"
          />

          {/* Условные линии внутри участка */}
          <path
            className={styles.plotDetail}
            d="M850 390 L1035 345 L1215 435"
          />
          <path
            className={styles.plotDetail}
            d="M1000 270 L1020 410 L1010 655"
          />
          <path
            className={styles.plotDetail}
            d="M835 510 L1015 565 L1205 500"
          />

          {/* Точки на границах участка */}
          <circle className={styles.plotPoint} cx="820" cy="300" r="4" />
          <circle className={styles.plotPoint} cx="1050" cy="250" r="4" />
          <circle className={styles.plotPoint} cx="1245" cy="365" r="4" />
          <circle className={styles.plotPoint} cx="1200" cy="590" r="4" />
          <circle className={styles.plotPoint} cx="1000" cy="670" r="4" />
          <circle className={styles.plotPoint} cx="825" cy="535" r="4" />
        </g>
      </svg>

      <div className={styles.content}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            ALPIX
          </h1>

          <p className={styles.description}>
            Девелопмент и строительство жилой недвижимости:
            от земли и концепции — до продаж и ввода в эксплуатацию.
          </p>
        </div>
      </div>
    </section>
  );
}