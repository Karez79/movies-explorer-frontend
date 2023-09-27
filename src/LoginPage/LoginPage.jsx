import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../images/logo.svg";
import InputWarning from "../components/InputWarning/InputWarning";
import styles from "./LoginPage.module.css";
import { useAuth } from "../utils/hooks/useAuth";
const validator = require("email-validator");

const LoginPage = () => {
  const navigate = useNavigate();
  const { currentUser, signin } = useAuth();
  const [emailErr, setEmailErr] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [pass, setPass] = useState(localStorage.getItem("password") || "");

  useEffect(() => {
    if (currentUser.isLogged) navigate("/movies");
  }, [currentUser, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail(event.target.email.value);
    setPass(event.target.password.value);

    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    signin(user, () => navigate("/movies", { replace: true }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!validator.validate(event.target.value)) {
      setIsEmailValid(true);
      setEmailErr("Некорректный email");
    } else {
      setIsEmailValid(false);
    }
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
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
      <form className={styles.register__form} onSubmit={handleSubmit}>
        <label
          htmlFor="email-input"
          className={styles["register__form-label"]}
          data-error={false}
        >
          E-mail
          <input
            name="email"
            id="email-input"
            value={email}
            placeholder="Виталий"
            onChange={handleEmailChange}
            className={styles["register__form-input"]}
          />
          {isEmailValid && <InputWarning prop={emailErr} />}
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
            value={pass}
            min={6}
            max={20}
            placeholder="g8429jfweribzc"
            onChange={handlePassChange}
            className={styles["register__form-input"]}
          />
          {passErr && <InputWarning prop={passErr} />}
          {!currentUser.isLogged && (
            <InputWarning prop={currentUser.messageError} />
          )}
        </label>
        <button
          type="submit"
          className={styles["register__form-submitButton"]}
          disabled={!email || !pass || isEmailValid}
        >
          Войти
        </button>
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
