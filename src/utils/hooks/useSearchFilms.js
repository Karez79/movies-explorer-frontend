import { useEffect, useState } from "react";
import { createData } from "../search";

export function useSearchFilms({
  movies,
  isSavedPage,
  isMoviesPage,
  setPreload,
  getMovies,
  setPage,
}) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [searchQueryDate, setSearchQueryDate] = useState({
    queryString: "",
    isShortMovie: false,
    data: [],
  });

  useEffect(() => {
    if (isSavedPage) {
      setSortedMovies(movies);
    }
  }, [isSavedPage, movies]);

  useEffect(() => {
    if ("searchQueryDate" in localStorage) {
      setSearchQueryDate(JSON.parse(localStorage.getItem("searchQueryDate")));
    }
  }, [isMoviesPage]);

  useEffect(() => {
    if (isMoviesPage) {
      setSortedMovies(searchQueryDate.data);
    }
  }, [isMoviesPage, searchQueryDate]);

  const handleSearch = async (searchQuery) => {
    if (!sortedMovies.length) setPreload(true);

    const data = createData(
      movies.length === 0 ? await getMovies() : movies,
      searchQuery
    );
    setPage(0);
    setSortedMovies(data);

    if (!searchQuery.searchString) {
      setSortedMovies([]);
    }

    setTimeout(() => {
      setPreload(false);
    }, 400);
    if (isMoviesPage) {
      localStorage.setItem(
        "searchQueryDate",
        JSON.stringify({
          searchString: searchQuery.searchString,
          isShortMovie: searchQuery.isShortMovie,
          data: data,
        })
      );
    }
  };

  return { sortedMovies, handleSearch };
}
