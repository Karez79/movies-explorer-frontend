import styles from "./MoviesFormSwitch.module.css";

const MoviesFormSwitch = ({
  handleChangeCheckbox,
  searchQuery, 
}) => {
  const changeChec = () => {
    handleChangeCheckbox();  
  };

  return (
    <div className={styles.movies__filter}>
      <button
        type="button"
        onClick={() => changeChec()}
        className={`
          ${styles["movies__filter-checkbox"]}
          ${searchQuery.isShortMovie ? styles.filtered : ""}
        `}
      >
        <div className={styles["movies__filter-switch"]}></div>
      </button>
      <span className={styles["movies__filter-label"]}>Короткометражки</span>
    </div>
  );
};

export default MoviesFormSwitch;
