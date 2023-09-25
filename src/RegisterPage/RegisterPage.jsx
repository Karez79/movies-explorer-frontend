import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../images/logo.svg";
import InputWarning from "../components/InputWarning/InputWarning";
import styles from "./RegisterPage.module.css";
import { useAuth } from "../utils/hooks/useAuth";
const validator = require("email-validator");

const RegisterPage = () => {
  const { currentUser, signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isReglValid, setIsRegValid] = useState(false);

  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [regErr, setRegErr] = useState("");

  useEffect(() => {
    if (currentUser.isLogged) navigate("/movies");
  }, [currentUser, navigate]);

  function handleNameChange(e) {
    setName((i) => (i = e.target.value));
    setIsRegValid(false);
    if (e.target.value.match(/\d+/)) {
      setIsNameValid(true);
      setNameErr("Имя не должно содержать цифр");
    } else if (e.target.value.length < 2) {
      setIsNameValid(true);
      setNameErr("Имя должно содержать минимум 2 символа");
    } else {
      setIsNameValid(false);
    }

    if (currentUser.name === e.target.value) {
      setIsNameValid(true);
      setNameErr("Вы уже используете это имя");
    }
  }

  function handleEmailChange(e) {
    setEmail((i) => (i = e.target.value));
    setIsRegValid(false);

    if (!validator.validate(e.target.value)) {
      setIsEmailValid(true);
      setEmailErr("Некорректный email");
    } else {
      setIsEmailValid(false);
    }
  }
  function handlePassChange(e) {
    setPass((i) => (i = e.target.value));
  }

  async function regSubmit(e) {
    e.preventDefault();
    if (name && email && pass && !isNameValid && !isEmailValid) {
      const reg = await signup(name, email, pass);

      setIsRegValid(true);
      setRegErr(reg);
    } else {
      setIsRegValid(true);
      setRegErr("Некорректные данные");
    }
  }

  return (
    <main
      className={`${styles.register} centered container container--register`}
    >
      <div className={styles.header}>
        <Link to="/" className={styles.header__logo}>
          <Logo />
        </Link>
        <h1 className={styles.header__title}>Добро пожаловать!</h1>
      </div>
      <form className={styles.register__form}>
        <label
          htmlFor="name-input"
          className={styles["register__form-label"]}
          data-error={false}
        >
          Имя
          <input
            type="text"
            name="name"
            id="name-input"
            // required={true}
            min={3}
            max={24}
            onChange={handleNameChange}
            className={styles["register__form-input"]}
          />
          {isNameValid && <InputWarning prop={nameErr} />}
        </label>
        <label
          htmlFor="email-input"
          className={styles["register__form-label"]}
          data-error={false}
        >
          E-mail
          <input
            type="email"
            name="email"
            id="email-input"
            // required={true}
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
            // required={true}
            min={6}
            max={20}
            onChange={handlePassChange}
            className={styles["register__form-input"]}
          />
          {isReglValid && <InputWarning prop={regErr} />}
        </label>
        <button
          type="submit"
          className={styles["register__form-submitButton"]}
          onClick={regSubmit}
        >
          Зарегистрироваться
        </button>
        <p className={styles["register__form-login"]}>
          Уже зарегистрированы?
          <Link to="/signin" className={styles["register__form-loginButton"]}>
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
