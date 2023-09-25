import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import MainPage from "./MainPage/MainPage";
import MoviesPage from "./MoviesPage/MoviesPage";
import PageNotFound from "./PageNotFound/PageNotFound";
import SavedMoviesPage from "./SavedMoviesPage/SavedMoviesPage";

import { CurrentUserContext } from "./utils/hoc/CurrentUserContext";

import "./index.css";
import { ProtectedRoute } from "./utils/hoc/ProtectedRoute";

const App = () => {
  return (
    <CurrentUserContext>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute>
                <SavedMoviesPage />
              </ProtectedRoute>
            }
          />

          <Route path="/signup" element={<RegisterPage />} />

          <Route path="/signin" element={<LoginPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </CurrentUserContext>
  );
};

export default App;
