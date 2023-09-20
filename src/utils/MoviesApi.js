import { MOVIES_URL } from "./const";

export async function getMoviesApi() {
  const url = `${MOVIES_URL}/beatfilm-movies`;
  const response = await fetch(url, { 
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) return await response.json();
  else return Promise.reject(response);
}
