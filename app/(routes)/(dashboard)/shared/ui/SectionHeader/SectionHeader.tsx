import React, { FC } from "react";
import styles from "./SectionHeader.module.scss";

type SectionHeader = {
  title: string;
  desc?: string;
  buttons?: React.ReactNode;
};

const SectionHeader: FC<SectionHeader> = (props) => {
  const { title, desc, buttons } = props;
  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <span className={styles.header__title}>{title}</span>
        {desc && <p className={styles.header__desc}>{desc}</p>}
      </div>
      {buttons && <div className={styles.header__buttons}>{buttons}</div>}
    </div>
  );
};

export default SectionHeader;
