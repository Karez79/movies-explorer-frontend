import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesCardList.module.css";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({ device, movies, isLoad, setMovies }) => {
  const [renderCount, setRenderCount] = useState(0);
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);
  const [isPagginationLoading, setPagginationLoading] = useState(false);
  const [page, setPage] = useState(0);

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

  const handleClickRenderMore = () => {
    setShowMoreFilmsButton(false);
    setPagginationLoading(true);

    setTimeout(() => {
      setShowMoreFilmsButton(true);
      setPagginationLoading(false);
      setPage((prev) => prev + 1);
    }, 200);
  };
  return (
    <section
      className={`${styles.movies__cardList} container ${
        device === "mobile" ? "container--promo" : ""
      }`}
    >
      {isLoad ? (
        <Preloader />
      ) : movies.length ? (
        renderMovies(renderCount)
      ) : (
        <h2>Фильмов не найдено!</h2>
      )}
      <div className={`${styles["loadMoreButton-wrapper"]} centered`}>
        {showMoreFilmsButton && (
          <button
            type="button"
            className={`${styles.loadMoreButton} btn`}
            onClick={handleClickRenderMore}
          >
            Ещё
          </button>
        )}
        {isPagginationLoading && <Preloader />}
      </div>
    </section>
  );
};

export default MoviesCardList;
