import { useNavigate } from 'react-router-dom';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageNotFound}>
            <div className={styles.pageNotFound__content}>
                <h1 className={styles.pageNotFound__title}>404</h1>
                <p className={styles.pageNotFound__subtitle}>Страница не найдена</p>
            </div>
            <button
                type="button"
                className={styles.goBackBtn}
                onClick={() => navigate(-1)}>
                Назад
            </button>
        </div>
    );
};

export default PageNotFound;