import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../utils/hooks/useAuth";
import { useState } from "react";
import InputWarning from "../components/InputWarning/InputWarning";

const validator = require("email-validator");
const ProfilePage = () => {
  const { currentUser, signout, signupdate } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
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
    }

    if (currentUser.name === e.target.value) {
      setIsNameValid(true);
      setNameErr("Вы уже используете это имя");
    }
  }

  function handleEmailChange(e) {
    setEmail((i) => (i = e.target.value));
    if (!validator.validate(e.target.value)) {
      setIsEmailValid(true);
      setEmailErr("Некорректный email");
    } else {
      setIsEmailValid(false);
    }
  }

  async function handleInfoSubmit(e) {
    e.preventDefault();
    if (name && email && !isNameValid && !isEmailValid) {
      signupdate(name, email);
      setIsNameValid(true);
      setNameErr(`${name}, Ваши данные успещно изменены`);
    }
  }

  return (
    <main className={`${styles.profile} container container--profile`}>
      <h1 className={styles.profile__title}>Привет, {currentUser.name}!</h1>
      <table className={styles.profile__table}>
        <tbody>
          <tr className={styles["profile__table-row"]}>
            <th>Имя</th>
            <td>
              <input
                className={styles.profile__input}
                type="text"
                placeholder={currentUser.name}
                onChange={handleNameChange}
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
                placeholder={currentUser.email}
                onChange={handleEmailChange}
                value={email}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={`${styles.profile__err}`}>
        {isNameValid && <InputWarning prop={nameErr} />}
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
