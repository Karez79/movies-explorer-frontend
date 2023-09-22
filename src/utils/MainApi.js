// import { MAIN_URL, MOVIES_URL } from "./const";

// export async function checkToken() {
//   const url = `${MAIN_URL}/users/me`;
//   const response = await fetch(url, {
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }

// export async function registerUserApi(email, name, password) {
//   const url = `${MAIN_URL}/signup`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, name, password }),
//   });

//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }

// export async function loginUserApi(user) {
//   const url = `${MAIN_URL}/signin`;
//   const { email, password } = user;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }
// export async function updateUserApi(name, email) {
//   const url = `${MAIN_URL}/users/me`;
//   const response = await fetch(url, {
//     method: "PATCH",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, name }),
//   });

//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }

// // Movies

// export async function getSavedMoviesApi() {
//   const url = `${MAIN_URL}/movies`;
//   const response = await fetch(url, {
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }

// export async function addtoSavedMovieApi(data = {}) {
//   const url = `${MAIN_URL}/movies`;
//   const response = await fetch(url, {
//     credentials: "include",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       country: data.country || "country",
//       director: data.director || "director",
//       duration: data.duration || 0,
//       year: data.year || "year",
//       description: data.description || "description",
//       image: MOVIES_URL + (data?.image?.url) || null,
//       trailerLink: data.trailerLink || "http://google.com",
//       thumbnail: data.thumbnail || "http://google.com",
//       nameRU: data.nameRU || "Без названия",
//       nameEN: data.nameEN || "no name",
//       movieId: data.id || 0,
//     }),
//   });
//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }

// export async function deleteMovieApi(id) {
//   const url = `${MAIN_URL}/movies/${id}`;
//   const response = await fetch(url, {
//     method: "DELETE",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) return await response.json();
//   else return Promise.reject(response);
// }

import { MAIN_URL, MOVIES_URL } from "./const";

export async function checkToken() {
  const url = `${MAIN_URL}/users/me`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      Accept: "*/*",
    },
  });

  if (response.ok) return await response.json();
  else return Promise.reject(response);
}

export async function registerUserApi(email, name, password) {
  const url = `${MAIN_URL}/signup`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  });

  if (response.ok) return await response.json();
  else return Promise.reject(response);
}

export async function loginUserApi(user) {
  const url = `${MAIN_URL}/signin`;
  const { email, password } = user;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) return await response.json();
  else return Promise.reject(response);
}
export async function updateUserApi(name, email) {
  const url = `${MAIN_URL}/users/me`;
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  });

  if (response.ok) return await response.json();
  else return Promise.reject(response);
}

// Movies

export async function getSavedMoviesApi() {
  const url = `${MAIN_URL}/movies`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      Accept: "*/*",
    },
  });

  if (response.ok) return await response.json();
  else return Promise.reject(response);
}

export async function addtoSavedMovieApi(data = {}) {
  const url = `${MAIN_URL}/movies`;
  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      Accept: "*/*",
    },

    body: JSON.stringify({
      country: data.country || "country",
      director: data.director || "director",
      duration: data.duration || 0,
      year: data.year || "year",
      description: data.description || "description",
      image: MOVIES_URL + data?.image?.url || null,
      trailerLink: data.trailerLink || "http://google.com",
      thumbnail: data.thumbnail || "http://google.com",
      nameRU: data.nameRU || "Без названия",
      nameEN: data.nameEN || "no name",
      movieId: data.id || 0,
    }),
  });
  if (response.ok) return await response.json();
  else return Promise.reject(response);
}

export async function deleteMovieApi(id) {
  const url = `${MAIN_URL}/movies/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      Accept: "*/*",
    },
  });
  if (response.ok) return await response.json();
  else return Promise.reject(response);
}
