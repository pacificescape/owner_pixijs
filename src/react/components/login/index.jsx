import React from "react";
import styles from "./login.module.css";
import { loginFX } from "../../../store/connectionStore";

const logQuery =
  "?id=993298773&first_name=%F3%A0%80%A0pasuisicescape%20%F0%9F%87%AA%F0%9F%87%AA&username=pacificescape&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FkAQBCPwUL4jyA9I8mGt15WCWRi-ejsy07PDOqNbkei0.jpg&auth_date=1617132774&hash=f641f7a73c87a86743e7810e6796066dda10e053741c34d2e78a5e9449e73aed";

const Login = () => {
  return (
    <div className={styles.LoginPopup}>
      <h3>Авторизация</h3>
      <span>Войдите в игру через телеграм или бота</span>
      <button onClick={() => loginFX(logQuery)}>Войти</button>
    </div>
  );
};

export default Login;
