import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../utils/hooks/useAuth";
import { useState } from "react";
import InputWarning from "../components/InputWarning/InputWarning";

const validator = require("email-validator");
const ProfilePage = () => {
	const { currentUser, signout, signupdate } = useAuth();
 

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameChange, setIsNameChange] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");

  function handleNameChange(e) {
    setName((i) => (i = e.target.value));
    if (e.target.value.match(/\d+/)) {
      setIsNameValid(true);
      setNameErr("Имя не должно содержать цифр");
    } else if (e.target.value.length < 2) {
      setIsNameValid(true);
      setNameErr("Имя должно содержать минимум 2 символа");
    } else {
      setIsNameValid(false);
      setIsNameChange(false);
    }

    if (currentUser.name === e.target.value) {
      // sdsf
      setIsNameChange(true);
      setNameErr("Вы уже используете это имя");
    }
  }

  function handleEmailChange(e) {
    setEmail((i) => (i = e.target.value));
    if (!validator.validate(e.target.value)) {
      setIsEmailValid(true);
      setEmailErr("Некорректный email");
    } else {
      setIsNameChange(false);
      setIsEmailValid(false);
    }
  }

  async function handleInfoSubmit(e) {
    e.preventDefault();
    if (
      (name || email) &&
      !isNameValid &&
      !isEmailValid &&
      (name !== currentUser.name || email !== currentUser.email)
    ) {
      await signupdate(name, email);
      setIsNameChange(true);
      setNameErr(`${name}, Ваши данные успешно изменены`);
    }
  }

  return (
    <main className={`${styles.profile} container container--profile`}>
      <h1 className={styles.profile__title}>
        Привет, {localStorage.getItem("name")}!
      </h1>
      <table className={styles.profile__table}>
        <tbody>
          <tr className={styles["profile__table-row"]}>
            <th>Имя</th>
            <td>
              <input
                className={styles.profile__input}
                type="text" 
                onChange={handleNameChange}
                value={name}
              />
            </td>
          </tr>
          <tr
            className={`
            ${styles["profile__table-row"]}
            ${styles["profile__table-row--last"]}
          `}
          >
            <th>E-mail</th>
            <td>
              <input
                className={styles.profile__input}
                type="text" 
                onChange={handleEmailChange}
                value={email}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={`${styles.profile__err}`}>
        {(isNameValid || isNameChange) && <InputWarning prop={nameErr} />}
      </div>
      <div className={`${styles.profile__err}`}>
        {isEmailValid && <InputWarning prop={emailErr} />}
      </div>

      <div className={`${styles.profile__actions} centered`}>
        <button
          type="button"
          onClick={handleInfoSubmit}
          className={`${styles.profile__editButton} btn btn--regular`}
        >
          Редактировать
        </button>
        <Link
          to="/"
          className={styles.profile__logoutButton}
          onClick={() => signout()}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
};

export default ProfilePage;
