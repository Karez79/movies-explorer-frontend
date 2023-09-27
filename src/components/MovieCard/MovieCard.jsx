import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as RemoveIcon } from "./cross-icon.svg";
import styles from "./MovieCard.module.css";
import { MOVIES_URL } from "../../utils/const";
import { useAuth } from "../../utils/hooks/useAuth";

export const MovieCard = ({ movie, editSort }) => {
  const location = useLocation();
  const { currentUser, onSave, onDelete } = useAuth();
  const savedMovies = currentUser.savedMovies || [];
  const saved = savedMovies.find((item) =>
    item.movieId === movie.id ? true : false
  );
  const [isFavorite, setIsFavorite] = useState(saved ? true : false);

  const calcDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours > 0 ? hours + "ч. " : ""}${minutes}м.`;
  };

  const editSaveData = () => {
    setIsFavorite(!isFavorite);
    const imageUp = MOVIES_URL + movie.image.url;
    onSave(movie, imageUp);
  };
  const editDeleteData = () => {
    setIsFavorite(!isFavorite);
    const id = saved._id.toString();
    onDelete(id);
  };
  const editSaveDeleteData = async () => {
    try {
      const id = movie._id.toString();
      await onDelete(id);
      editSort(id);
    } catch (err) {
      console.log(err);
    }
  };

  const url = () => {
    const stateUrl =
      location.pathname !== "/saved-movies"
        ? MOVIES_URL + movie.image.url
        : movie.image;
    return stateUrl;
  };

  return (
    <div
      id={movie.id}
      className={`
        ${styles.movie}
        ${location.pathname === "/saved-movies" ? styles["movie--saved"] : ""}
    `}
    >
      <Link
        to={`${movie.trailerLink}`}
        className={`${styles.movie__preview} centered`}
      >
        <img src={url()} alt={movie.nameEN} />
      </Link>

      <div className={styles.movie__body}>
        <div className={styles["movie__body-top"]}>
          <Link to={`${movie.trailerLink}`} className={styles.movie__name}>
            {movie.nameRU}
          </Link>

          {location.pathname !== "/saved-movies" &&
            (isFavorite ? (
              <button
                type="button"
                className={`${styles.movie__favorite} ${styles.active}`}
                onClick={() => editDeleteData()}
              ></button>
            ) : (
              <button
                type="button"
                className={styles.movie__favorite}
                onClick={() => editSaveData()}
              ></button>
            ))}

          {location.pathname === "/saved-movies" && (
            <button
              type="button"
              className={`${styles.removeButton} centered`}
              onClick={() => editSaveDeleteData()}
            >
              <RemoveIcon />
            </button>
          )}
        </div>
        <span className={styles.movie__length}>
          {calcDuration(movie.duration)}
        </span>
      </div>
    </div>
  );
};
