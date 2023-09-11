import { useState, useEffect } from 'react';
import { useDevice } from '../hooks/useDevice';
import Preloader from '../components/Preloader/Preloader';
import MoviesForm from '../components/MoviesForm/MoviesForm';
import SavedMoviesCardList from '../components/MoviesCardList/SavedMoviesCardList';
import styles from './SavedMoviesPage.module.css';

const SavedMoviesPage = () => {
    const device = useDevice();
    const [isLoaded, setIsLoaded] = useState(false);
    // Будет получать значение от количества карточек на странице*.
    // Страница в данном случае - это максимальное количество выводимых карточек за один раз
    const [isMoviesCardListCrowded, setIsMoviesCardListCrowded] = useState(false);

    // Можно вынести в отдельный хук usePreloader,
    // который в зависимость будет получать data
    // data?? timeout = 0;
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
            <SavedMoviesCardList device={device} />
                <div className={`${styles['loadMoreButton-wrapper']} centered`}>
                    {   
                        isMoviesCardListCrowded && 
                            <button
                                type="button"
                                className={`${styles.loadMoreButton} btn`}>
                                Ещё
                            </button>
                    }
                </div>
        </main>
    );
};

export default SavedMoviesPage;