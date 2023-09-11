import Portfolio from './Portfolio';
import styles from './AboutMe.module.css';

const AboutMe = ({isTablet}) => {
  return (
    <section className={styles.aboutMe}>
       <div className={`container ${isTablet ? 'container--sub' : ''}`}>
        <h2 className={styles.aboutMe__title}>Студент</h2>
        <div className={styles.aboutMe__divider}></div>
        <div className={styles.aboutMe__content}>
          <div
            className={`
              ${styles['aboutMe__content-item']}
              ${styles['aboutMe__content-item--info']}
            `}>
            <h3 className={styles['aboutMe__content-title']}>Виталий</h3>
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
          <div
            className={`
              ${styles['aboutMe__content-item']}
              ${styles['aboutMe__content-item--image']}
            `}>
            <img
              src="./images/landing-page/student.jpg"
              alt={`Моё фото. Здесь я выдавливаю из себя улыбку, чтобы хорошо получиться на фото, потому что это фото будет ещё долго висеть на моём сайте-портфолио, а ведь этот проет теперь та ${"одёжка"}, по которой меня будут встречать. Прямо как в той поговорке. Едва ли мне удаётся, ведь я уже несколько недель усердно занимаюсь разработкой этого проекта. Моя усталось даёт о себе знать и даже при беглом взгляде на фото заметно, что улыбка фальшивая и нужна лишь для привлечения клиентов. Здесь я одет в чёрный худи. У меня светлые ржаного цвета волосы. Немного длинные и зачёсаны к теменной зоне с помощью геля и фиксатора, так, что кажется, что они влажные. Я стою на фоне белой стены, вдруг это важная информация для этого тега. Кстати, я и сам белый 👦🏻.`} />
          </div>
        </div>

        <Portfolio />
      </div>
    </section>
  );
};

export default AboutMe;