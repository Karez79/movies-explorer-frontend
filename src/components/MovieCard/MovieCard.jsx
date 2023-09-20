import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as RemoveIcon } from "./cross-icon.svg";
import styles from "./MovieCard.module.css";
import { MOVIES_URL } from "../../utils/const";
import { useAuth } from "../../utils/hooks/useAuth";

export const MovieCard = ({ movie, page }) => {
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
  return (
    <div
      id={movie.id}
      className={`
        ${styles.movie}
        ${page === "saved" ? styles["movie--saved"] : ""}
    `}
    >
      <Link
        to={`${movie.trailerLink}`}
        className={`${styles.movie__preview} centered`}
      >
        <img src={MOVIES_URL + movie.image.url} alt={movie.nameEN} />
      </Link>

      <div className={styles.movie__body}>
        <div className={styles["movie__body-top"]}>
          <Link to={`${movie.trailerLink}`} className={styles.movie__name}>
            {movie.nameRU}
          </Link>

          {page !== "saved" &&
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

          {page === "saved" && (
            <button
              type="button"
              className={`${styles.removeButton} centered`}
              onClick={() => setIsFavorite(false)}
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
