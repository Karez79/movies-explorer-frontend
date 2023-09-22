import { useEffect, useState } from "react";
import { useDevice } from "../utils/hooks/useDevice";
import Preloader from "../components/Preloader/Preloader";
import MoviesForm from "../components/MoviesForm/MoviesForm";
import styles from "./SavedMoviesPage.module.css";
import { useSearchFilms } from "../utils/hooks/useSearchFilms";
import MoviesCardList from "../components/MoviesCardList/MoviesCardList";
import { getSavedMoviesApi } from "../utils/MainApi";

const SavedMoviesPage = () => {
  const device = useDevice();
  const [movies, setMovies] = useState([]);
  const [preload, setPreload] = useState(true);

  useEffect(() => {
    getSaveMovies();
  }, []);

  const { sortedMovies, handleSearch } = useSearchFilms({
    movies: movies,
    isSavedPage: true,
    isMoviesPage: false,
    setPreload,
  });

  const getSaveMovies = async () => {
    try {
      const res = await getSavedMoviesApi();
      setPreload(false);
      setMovies(res);
    } catch (err) {
      console.error(err);
    }
  };

  return preload ? (
    <Preloader />
  ) : (
    <main className={styles.movies}>
      <MoviesForm onSubmit={handleSearch} isLoad={preload} />

      <MoviesCardList
        device={device}
        movies={sortedMovies}
        isLoad={preload}
        setMovies={setMovies}
      />
    </main>
  );
};

export default SavedMoviesPage;
