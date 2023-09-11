import { useState, useEffect } from 'react';
import { useDevice } from '../hooks/useDevice';
import Preloader from '../components/Preloader/Preloader';
import MoviesCardList from '../components/MoviesCardList/MoviesCardList';
import MoviesForm from '../components/MoviesForm/MoviesForm';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
    const device = useDevice();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, [isLoaded]);

    return (
        !isLoaded ? <Preloader /> :
        <main className={styles.movies}>
            <MoviesForm />
            <MoviesCardList device={device} />
            <div className={`${styles['loadMoreButton-wrapper']} centered`}>
                <button type="button" className={`${styles.loadMoreButton} btn`}>Ещё</button>
            </div>
        </main>
    );
};

export default MoviesPage;