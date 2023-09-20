import { useState, useEffect } from "react";
import { useDevice } from "../utils/hooks/useDevice";
import Preloader from "../components/Preloader/Preloader";
import MoviesForm from "../components/MoviesForm/MoviesForm";
import SavedMoviesCardList from "../components/MoviesCardList/SavedMoviesCardList";
import styles from "./SavedMoviesPage.module.css";
import { getSavedMoviesApi } from "../utils/MainApi";
import InputWarning from "../components/InputWarning/InputWarning";

const SavedMoviesPage = () => {
  const device = useDevice();

  const isMoviesCardListCrowded = false;
  const [preload, setPreload] = useState(true);

  const [saveMovies, setSaveMovies] = useState([]);
  const [nameErr, setNameErr] = useState("");

  useEffect(() => {
    getSaveMovies();
  }, []);
  console.log(saveMovies.length);

  const getSaveMovies = async () => {
    try {
      const res = await getSavedMoviesApi();
      setSaveMovies(res);
      setPreload(false);
    } catch (err) {
      const res = await err.json();
      setPreload(false);
      setNameErr(res.message);
    }
  };

  return preload ? (
    <Preloader />
  ) : (
    <main className={styles.movies}>
      <MoviesForm /> 
      <SavedMoviesCardList device={device} /> 
      <div className={`${styles["loadMoreButton-wrapper"]} centered`}>
        {nameErr && <InputWarning prop={nameErr} />}
        {isMoviesCardListCrowded && (
          <button type="button" className={`${styles.loadMoreButton} btn`}>
            Ещё
          </button>
        )}
      </div>
    </main>
  );
};

export default SavedMoviesPage;
