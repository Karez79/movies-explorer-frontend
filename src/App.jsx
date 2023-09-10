import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout/Layout';
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import MainPage from "./MainPage/MainPage";
import MoviesPage from "./MoviesPage/MoviesPage";
import PageNotFound from "./PageNotFound/PageNotFound";
import SavedMoviesPage from "./SavedMoviesPage/SavedMoviesPage";
import './index.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/saved-movies" element={<SavedMoviesPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path='/404' element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" replace /> } />
            </Route>
        </Routes>
    );
};

export default App;