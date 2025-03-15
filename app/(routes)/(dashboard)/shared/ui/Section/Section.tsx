import React, { FC } from "react";
import styles from "./Section.module.scss";

type Section = {
  children: React.ReactNode;
};

const Section: FC<Section> = ({ children }) => {
  return <div className={styles.section}>{children}</div>;
};

export default Section;
