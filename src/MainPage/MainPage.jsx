import { useState, useEffect, useRef } from 'react';
import { useGadgets } from '../hooks/useDevice';
import Preloader from '../components/Preloader/Preloader';
import Promo from './Promo';
import AboutProject from './AboutProject';
import AboutMe from './AboutMe';
import Techs from './Techs';
import styles from './MainPage.module.css';

const Main = () => {
    const isGadgets = useGadgets();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);
        return () => clearTimeout(timer);
      }, [isLoaded]);

    const aboutProjectSection = useRef(null);

    return (
        !isLoaded ? <Preloader /> :
        <main className={styles.main}>
            <Promo isGadgets={isGadgets} aboutProjectSection={aboutProjectSection} />
            <AboutProject ref={aboutProjectSection} isGadgets={isGadgets} />
            <Techs isGadgets={isGadgets} />
            <AboutMe isGadgets={isGadgets} />
        </main>
    );
};

export default Main;