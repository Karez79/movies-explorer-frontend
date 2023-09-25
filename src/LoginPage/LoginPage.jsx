import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ReactComponent as Logo } from "../images/logo.svg";
import InputWarning from "../components/InputWarning/InputWarning";
import styles from "./LoginPage.module.css";
import { useAuth } from "../utils/hooks/useAuth";

const LoginPage = () => {
  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, signin } = useAuth();
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  useEffect(() => {
    emailInputRef.current.value = localStorage.getItem("email") || "";
    passwordInputRef.current.value = localStorage.getItem("password") || "";
  }, []);
  useEffect(() => {
    if (currentUser.isLogged) navigate("/movies");
  }, [currentUser, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.email.value) return setEmailErr("Введите email");
    if (!event.target.password.value) return setPassErr("Введите пароль");
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    signin(user, () => navigate("/movies", { replace: true }));
    formRef.current.reset();
  };
  const handleChange = () => {
    setEmailErr(false);
    setPassErr(false);
  };

  return (
    <main
      className={`${styles.register} centered container container--register`}
    >
      <div className={styles.header}>
        <Link to="/" className={styles.header__logo}>
          <Logo />
        </Link>
        <h1 className={styles.header__title}>Рады видеть!</h1>
      </div>
      <form
        className={styles.register__form}
        ref={formRef}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label
          htmlFor="email-input"
          className={styles["register__form-label"]}
          data-error={false}
        >
          E-mail
          <input
            name="email"
            id="email-input"
            ref={emailInputRef}
            placeholder="Виталий"
            className={styles["register__form-input"]}
          />
          {emailErr && <InputWarning prop={emailErr} />}
        </label>
        <label
          htmlFor="password-input"
          className={styles["register__form-label"]}
          data-error={true}
        >
          Пароль
          <input
            type="password"
            name="password"
            id="password-input"
            ref={passwordInputRef}
            min={6}
            max={20}
            placeholder="g8429jfweribzc"
            className={styles["register__form-input"]}
          />
          {passErr && <InputWarning prop={passErr} />}
          {!currentUser.isLogged && (
            <InputWarning prop={currentUser.messageError} />
          )}
        </label>
        <button type="submit" className={styles["register__form-submitButton"]}>
          Войти
        </button>
        {/* Можно вынести в отдельный компонент и в зависимости от модификатора\страницы выводить разные данные */}
        <p className={styles["register__form-login"]}>
          Ещё не зарегистрированы?
          <Link to="/signup" className={styles["register__form-loginButton"]}>
            Регистрация
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
