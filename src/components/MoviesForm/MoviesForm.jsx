import { useEffect, useState } from "react";
import { ReactComponent as SendFormIcon } from "./send-form-icon.svg";
import MoviesFormSwitch from "./MoviesFormSwitch";
import styles from "./MoviesForm.module.css";
import { useLocation } from "react-router-dom";

const MoviesForm = ({ onSubmit, isLoad }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState({
    searchString: "",
    isShortMovie: false,
  });
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("searchQueryDate")
    ) {
      const { searchString, isShortMovie } = JSON.parse(
        localStorage.getItem("searchQueryDate")
      );
      setSearchQuery({
        searchString,
        isShortMovie,
      });
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.searchString.trim()) {
      return setSearchQuery({ ...searchQuery, searchString: "" });
    }
    onSubmit(searchQuery);
  };

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeCheckbox = () => {
    if (!searchQuery.searchString.trim()) {
      return setSearchQuery({ ...searchQuery, searchString: "" });
    }

    setSearchQuery({ ...searchQuery, isShortMovie: !searchQuery.isShortMovie });

    onSubmit({ ...searchQuery, isShortMovie: !searchQuery.isShortMovie });
  };

  return (
    <section className={`${styles["movies__form-wrapper"]} container`}>
      <form className={styles.movies__form} onSubmit={handleSubmit}>
        <div className={styles["movies__form-field"]}>
          <input
            type="search"
            name="searchString"
            className={styles["movies__form-searchInput"]}
            id="movie-search-input"
            value={searchQuery.searchString}
            required={true}
            placeholder="Фильм"
            disabled={isLoad}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`${styles["movies__form-submitButton"]}`}
          >
            <SendFormIcon />
          </button>
        </div>
        {location.pathname !== "/saved-movies" && (
          <MoviesFormSwitch
            handleChangeCheckbox={handleChangeCheckbox}
            searchQuery={searchQuery}
          />
        )}
      </form>
    </section>
  );
};

export default MoviesForm;
