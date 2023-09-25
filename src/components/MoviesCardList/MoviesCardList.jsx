import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesCardList.module.css";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({
  device,
  movies,
  setMovies,
  masMovie,
  page,
  setPage,
}) => {
  const location = useLocation();
  const [renderCount, setRenderCount] = useState(0);
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);

  useEffect(() => {
    const configForFilmsRender = {
      desktop: {
        renderCount: 16,
        additionalRender: 4,
      },
      tablet: {
        renderCount: 8,
        additionalRender: 2,
      },
      mobile: {
        renderCount: 5,
        additionalRender: 2,
      },
    };

    setRenderCount(
      configForFilmsRender[device].renderCount +
        configForFilmsRender[device].additionalRender * page
    );

    movies.length >= renderCount
      ? setShowMoreFilmsButton(true)
      : setShowMoreFilmsButton(false);
  }, [device, movies, renderCount, page]);
  const editSort = (id) => setMovies(movies.filter((item) => item._id !== id));

  const renderMovies = (renderCount) => {
    if (movies.length > 0) {
      return movies.slice(0, renderCount).map((movie) => {
        return (
          <MovieCard
            key={movie.id || movie._id}
            movie={movie}
            editSort={editSort}
          />
        );
      });
    }
  };

  const renderSaveMovies = () => {
    if (movies.length > 0) {
      return movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id || movie._id}
            movie={movie}
            editSort={editSort}
          />
        );
      });
    }
  };

  const handleClickRenderMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <section
      className={`${styles.movies__cardList} container ${
        device === "mobile" ? "container--promo" : ""
      }`}
    >
      {/* {movies.length && location.pathname === "/movies"
        ? renderMovies(renderCount)
        : masMovie.length !== 0 && <h2>Фильмов не найдено!</h2>}
		 */}
      {location.pathname === "/movies"
        ? movies.length && location.pathname === "/movies"
          ? renderMovies(renderCount)
          : masMovie.length !== 0 && <h2>Фильмов не найдено!</h2>
        : movies.length
        ? renderSaveMovies()
        : masMovie.length !== 0 && <h2>Фильмов не найдено!</h2>}

      <div className={`${styles["loadMoreButton-wrapper"]} centered`}>
        {showMoreFilmsButton && location.pathname === "/movies" && (
          <button
            type="button"
            className={`${styles.loadMoreButton} btn`}
            onClick={handleClickRenderMore}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
