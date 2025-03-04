import React from "react";
import styles from "./Home.module.scss";
import Header from "./Components/Header/Header.container";

export default function HomePage() {
  return (
    <div className={styles.body__wrapper}>
      <Header />
    </div>
  );
}
