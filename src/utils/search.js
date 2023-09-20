export const createData = (data, request) => {
  const { searchString, isShortMovie } = request;
  const regExpForNonWordSymbols = /[!,.\-'";:`{}(%«»]/g;
  if (isShortMovie) {
    return data.filter(
      (movie) =>
        movie.nameRU
          .trim()
          .replace(regExpForNonWordSymbols, '')
          .toLowerCase()
          .includes(searchString.trim().replace(regExpForNonWordSymbols, '').toLowerCase()) &&
        movie.duration <= 40,
    );
  } else {
    return data.filter((movie) =>
      movie.nameRU
        .trim()
        .replace(regExpForNonWordSymbols, '')
        .toLowerCase()
        .includes(searchString.trim().replace(regExpForNonWordSymbols, '').toLowerCase()),
    );
  }
};
