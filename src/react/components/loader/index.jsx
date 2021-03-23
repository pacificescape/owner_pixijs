import React from "react";
import styles from "./loader.module.css";
import { useStore } from "effector-react";
import { connetionStore } from "../../../control/store";

const Loader = () => {
  const store = useStore(connetionStore);

  if (store.status !== 0) return;
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Loader}></div>
    </div>
  );
};

export default Loader;
