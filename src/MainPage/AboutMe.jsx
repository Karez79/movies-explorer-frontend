import Portfolio from './Portfolio';
import styles from './AboutMe.module.css';

const AboutMe = () => {
  return (
    <section className={styles.aboutMe}>
      <div className="container">
        <h2 className={styles.aboutMe__title}>Студент</h2>
        <div className={styles.aboutMe__divider}></div>
        <div className={styles.aboutMe__content}>
          <div className={`
               ${styles['aboutMe__content-item']}
               ${styles['aboutMe__content-item--info']}
          `}>
            <p className={styles['aboutMe__content-title']}>Виталий</p>
            <p className={styles['aboutMe__content-subtitle']}>Фронтенд-разработчик, 30 лет</p>
            <p className={styles['aboutMe__content-text']}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a
              href="https://github.com/Karez79?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className={styles['aboutMe__content-link']}>
              Github
            </a>
          </div>
          <div className={`
               ${styles['aboutMe__content-item']}
               ${styles['aboutMe__content-item--image']}
          `}>
            <img src="./images/landing-page/student.jpg" alt="Моё фото" />
          </div>
        </div>

        <Portfolio />
      </div>
    </section>
  );
};

export default AboutMe;