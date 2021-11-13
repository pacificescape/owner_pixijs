import React, { useState } from "react";
import styled from "styled-components";
import styles from "./window.module.css";
import { useStore } from "effector-react";
import { appStore } from "../../../store/appStore";

const Window = () => {
  // const [pos, setPos] = useState({ x: 333, y: 111 });
  const app = useStore(appStore);
  const pos = app.windowPos;

  if (!app.windowVisibility) return null;

  // const css = {
  //   transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
  //   "-o-transform": `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
  //   "-webkit-transform": `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
  //   transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
  //   transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
  // };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Window}>
        <FirstLine />
        Window element
        <span>{JSON.stringify(app).replace(/,/gi, ",\n")}</span>
      </div>
    </div>
  );
};

const FirstLine = () => (
  <div className={styles.FirstLine}>
    <Label />
    <CloseButton />
  </div>
);
const Label = () => <div className={styles.Label}>Window</div>;
const CloseButton = () => {
  return <div className={styles.CloseButton}>X</div>;
};

export default Window;
