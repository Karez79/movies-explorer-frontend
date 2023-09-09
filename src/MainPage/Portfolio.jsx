import styles from './Portfolio.module.css';

const Portfolio = () => {
  return (
    <div className={`${styles.portfolio} ${styles['portfolio--aboutMe']}`}>
      <h3 className={styles.portfolio__title}>Портфолио</h3>
      <ul className={styles.portfolio__links}>
        <a
          href="https://karez79.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
          className={styles.portfolio__link}>
          Статичный сайт
          <span className={styles['portfolio__link-arrow']}>↗</span>
        </a>
        <a
          href="https://karez79.github.io/mesto/"
          target="_blank"
          rel="noreferrer"
          className={styles.portfolio__link}>
          Адаптивный сайт
          <span className={styles['portfolio__link-arrow']}>↗</span>
        </a>
        <a
          href="https://github.com/Karez79/how-to-learn"
          target="_blank"
          rel="noreferrer"
          className={styles.portfolio__link}>
          Одностраничное приложение
          <span className={styles['portfolio__link-arrow']}>↗</span>
        </a>
      </ul>
    </div>
  );
};

export default Portfolio;