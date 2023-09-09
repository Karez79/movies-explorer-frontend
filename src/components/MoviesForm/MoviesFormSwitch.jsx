import { useState } from "react";
import styles from './MoviesFormSwitch.module.css';

const MoviesFormSwitch = () => {
  // По-хорошему, нужно делать через useEffect с таймером, чтобы не ре-рендерить всю страницу,
  // если пользователь начнёт играть с кнопкой
  const [isFiltered, setIsFiltered] = useState(true);

  // Я бы для удобства пользователей сделал весь блок кликабельным на мобильных
  return (
    <div className={styles.movies__filter}>
      <button
        type="button"
        onClick={() => setIsFiltered(!isFiltered)}
        className={`
          ${styles['movies__filter-checkbox']}
          ${isFiltered ? styles.filtered : ''}
        `}>
        <div className={styles['movies__filter-switch']}></div>
      </button>
      <span className={styles['movies__filter-label']}>Короткометражки</span>
    </div>
  );
};

export default MoviesFormSwitch;