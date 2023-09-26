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

  const [disabl, setDisabl] = useState(true);

  function handleNameChange(e) {
    setName((i) => (i = e.target.value));
    if (!e.target.value.match(/^[а-яА-ЯёЁa-zA-Z -]+$/)) {
      setIsNameValid(true);
      setNameErr("Имя не должно содержать недопустимых символов");
    } else if (e.target.value.length < 2) {
      setIsNameValid(true);
      setNameErr("Имя должно содержать минимум 2 символа");
    } else {
      setIsNameValid(false);
      setIsNameChange(false);
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
                disabled={disabl}
              />
            </td>
          </tr>
          <th colspan="2">
            {(isNameValid || isNameChange) && <InputWarning prop={nameErr} />}
          </th>

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
                disabled={disabl}
              />
            </td>
          </tr>
          <th colspan="2">
            {isEmailValid && <InputWarning prop={emailErr} />}
          </th>
        </tbody>
      </table>

      <div className={`${styles.profile__actions} centered`}>
        {disabl && (
          <button
            type="button"
            onClick={() => setDisabl(false)}
            className={`${styles.profile__editButton} btn btn--regular`}
          >
            Редактировать
          </button>
        )}
        {!disabl && (
          <button
            type="button"
            onClick={handleInfoSubmit}
            className={`${styles.profile__saveButton}  `}
            disabled={
              !(
                (currentUser.name !== name || currentUser.email !== email) &&
                !isNameValid &&
                !isEmailValid
              )
            }
          >
            Сохранить
          </button>
        )}

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
