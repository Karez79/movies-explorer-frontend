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
      localStorage.setItem("name", res.name);
      localStorage.setItem("email", res.email);

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
      localStorage.clear();
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      signin({ email, password }, async () => {
        navigate("/movies", { replace: true });
      });
    } catch (err) {
      const res = await err.json();
      return res.message;
    }
  };
  const signupdate = async (name, email) => {
    await updateUserApi(name, email)
      .then(async () => {
        await updateUser();
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
          localStorage.setItem("accessToken", res.token);
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
      setCurrentUser({ isLogged: false });
    } catch (err) {
      console.error(err);
    }
  };

  const onSave = async (movie) => {
    try {
      const res = await addtoSavedMovieApi(movie);

      const update = [...currentUser.savedMovies, res];
      setCurrentUser({
        name: currentUser.name,
        email: currentUser.email,
        error: false,
        isLogged: true,
        savedMovies: update || [],
      });
    } catch (err) {
      console.error(err);
    }
  };
  const onDelete = async (id) => {
    try {
      await deleteMovieApi(id);
      const delUp = currentUser;
      delUp.savedMovies = currentUser.savedMovies.filter(
        (item) => item._id !== id
      );
      setCurrentUser(delUp);
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
