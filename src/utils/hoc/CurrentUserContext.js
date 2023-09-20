import React, { useEffect, useState } from "react";
import {
  addtoSavedMovieApi,
  checkToken,
  deleteMovieApi,
  getSavedMoviesApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../MainApi";
import { useNavigate } from "react-router-dom";
import { useGetCookie } from "../hooks/useGetCookie";
import { useRemoveCookie } from "../hooks/useRemoveCookie";
import { useSetCookie } from "../hooks/useSetCookie";
import Cookies from "js-cookie";

export const UserContext = React.createContext(null);

export const CurrentUserContext = ({ children }) => {
  const navigate = useNavigate();
  const SetCookie = useSetCookie;
  const RemoveCookie = useRemoveCookie;
  const GetCookie = useGetCookie;
  const [currentUser, setCurrentUser] = useState({
    isLogged: GetCookie() ? true : false,
  });

  useEffect(() => {
    if (Cookies.get("accessToken")) updateUser();
  }, []);

  const updateUser = async () => {
    try {
      const res = await checkToken();

      const resSavedMovies = await getSavedMoviesApi();

      setCurrentUser({
        name: res.name,
        email: res.email,
        error: false,
        isLogged: true,
        savedMovies: resSavedMovies || [],
      });
    } catch (err) {
      const res = await err.json();
      if (res.message === "Карточки не были найдены") return;
      console.error(res.message);
    }
  };

  const signup = async (name, email, password) => {
    try {
      await registerUserApi(email, name, password);
      signin({ email, password }, async () => {
        navigate("/movies", { replace: true });
      });
    } catch (err) {
      const res = await err.json();
      return res.message;
    }
  };
  const signupdate = (name, email) => {
    updateUserApi(name, email)
      .then((res) => {
        updateUser();
        return res;
      })

      .catch(async (err) => {
        const res = await err.json();
        setCurrentUser({
          error: true,
          messageError: res.message,
          isLogged: false,
        });
      });
  };

  const signin = (user, meth) => {
    loginUserApi(user)
      .then((res) => {
        if (res.token) {
          RemoveCookie();
          SetCookie(res.token);
          console.log("Log success");
        }
        updateUser();
        meth();
      })

      .catch(async (err) => {
        const res = await err.json();
        setCurrentUser({
          error: true,
          messageError: res.message,
          isLogged: false,
          savedMovies: [],
        });
      });
  };

  const signout = () => {
    try {
      RemoveCookie();
      localStorage.clear();
      setCurrentUser({ isLogged: false });
    } catch (err) {
      console.error(err);
    }
  };

  const onSave = (movie) => {
    try {
      addtoSavedMovieApi(movie);
      updateUser();
    } catch (err) {
      console.error(err);
    }
  };
  const onDelete = (id) => {
    try {
      deleteMovieApi(id);
    } catch (err) {
      console.error(err);
    }
  };
  const value = {
    currentUser,
    signin,
    signup,
    signout,
    signupdate,
    onSave,
    onDelete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
