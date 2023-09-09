import styles from './Promo.module.css';

const Promo = ({isGadgets, aboutProjectSection}) => {
  const handleScrollToAboutProjectSection = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: aboutProjectSection.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.promo}>
      <div className={`${styles.promo__inner} container ${isGadgets ? 'container--sub' : ''}`}>
        <div className={styles.promo__content}>
          <h1 className={styles.promo__title}>
            Учебный проект студента <br className='hideOnMobile'/>
            факультета <br className='hideOnDevices'/>
            Веб-разработки.
          </h1>
          <p className={styles.promo__text}>
            Листайте ниже, чтобы узнать больше про этот<br />
            проект и его создателя.
          </p>
          <button
            type="button"
            className={`btn btn--white ${styles.promo__button}`}
            onClick={handleScrollToAboutProjectSection}>
            Узнать больше
          </button>
        </div>
        <div className={styles.promo__image}>
          <img src="/images/landing-page/promo-planet-optimized.svg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Promo;