import { useRef } from 'react';
import { ReactComponent as SendFormIcon } from './send-form-icon.svg';
import MoviesFormSwitch from './MoviesFormSwitch';
import styles from './MoviesForm.module.css';

const MoviesForm = () => {
  // Пока не нужно, но будет необходимо для получения данных из формы
  const searchInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchInputRef.current.value = '';
  }

  return (
    <div className={`${styles['movies__form-wrapper']} container`}>
      <form
        className={styles.movies__form}
        onSubmit={handleSubmit}>
        <input
          type="search"
          name="movie search"
          className={styles['movies__form-searchInput']}
          id="movie-search-input"
          ref={searchInputRef}
          placeholder='Фильм' />
        <button
          type="submit"
          className={`${styles['movies__form-submitButton']}`}>
          <SendFormIcon />
        </button>
      </form>
      <MoviesFormSwitch />
    </div>
  );
};

export default MoviesForm;