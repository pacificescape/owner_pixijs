import React from "react";
import styles from "./login.module.css";
import { loginFX } from "../../../store/connectionStore";

const Login = () => {
  return (
    <div className={styles.LoginPopup}>
      <h3>Авторизация</h3>
      <span>Войдите в игру через телеграм или бота</span>
      <button onClick={loginFX}>Войти</button>
    </div>
  );
};

export default Login;
