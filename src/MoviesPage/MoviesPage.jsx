import { useState } from "react";
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
  const [preload, setPreload] = useState(false);
  const [page, setPage] = useState(0);

  const getMovies = async () => {
    try {
      const res = await getMoviesApi();

      setMovies(res);
      setPreload(false);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const { sortedMovies, handleSearch } = useSearchFilms({
    movies,
    isSavedPage: false,
    isMoviesPage: true,
    setPreload,
    getMovies,  
    setPage,
  });

  return preload ? (
    <Preloader />
  ) : (
    <main className={styles.movies}>
      <MoviesForm onSubmit={handleSearch} isLoad={preload} />

      <MoviesCardList
        device={device}
        movies={sortedMovies}
        isLoad={preload}
        masMovie={movies}
        page={page}
        setPage={setPage}
      />
    </main>
  );
};

export default MoviesPage;
