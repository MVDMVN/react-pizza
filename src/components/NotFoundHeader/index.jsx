import React from "react";

import styles from "./NotFoundBlock.module.scss";

function NotFoundHeader() {
  return (
    <div className={styles.root}>
      <h1 className={styles.header}>Ничего не найдено 😔</h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
}

export default NotFoundHeader;
