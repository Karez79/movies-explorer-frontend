import { useState, useEffect } from "react";
import { useDevice } from "../utils/hooks/useDevice";
import Preloader from "../components/Preloader/Preloader";
import MoviesCardList from "../components/MoviesCardList/MoviesCardList";
import MoviesForm from "../components/MoviesForm/MoviesForm";
import styles from "./MoviesPage.module.css";

import { getMoviesApi } from "../utils/MoviesApi";
import { useSearchFilms } from "../utils/hooks/useSearchFilms";

const MoviesPage = () => {
  const device = useDevice();
  const [movies, setMovies] = useState([]);
  const [preload, setPreload] = useState(true);

  useEffect(() => {
    getMovies();
  }, []);

  const { sortedMovies, handleSearch } = useSearchFilms({
    movies,
    savedPage: false,
    isMoviesPage: true,
    setPreload,
  });

  const getMovies = async () => {
    try {
      const res = await getMoviesApi();
      setMovies(res);
      setPreload(false);
    } catch (err) {
      console.error(err);
    }
  };
  return preload ? (
    <Preloader />
  ) : (
    <main className={styles.movies}>
      <MoviesForm onSubmit={handleSearch} isLoad={preload} />

      <MoviesCardList device={device} movies={sortedMovies} isLoad={preload} />
    </main>
  );
};

export default MoviesPage;
