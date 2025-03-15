"use client";
import { Section } from "@/(routes)/(dashboard)/shared/ui/Section";
import styles from "../styles/kpi.module.scss";
import { useTranslations } from "next-intl";

export default function ManagerAssessmentPageView() {
  const tWidgets = useTranslations("widgets");

  return (
    <Section>
      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("kpi.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("kpi.description")}</p>
          </div>
        </div>
        <div className={styles.widget__body}>
          <div className={styles.tableContainer}>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Rüb</th>
                    <th>Menecer 1</th>
                    <th>Menecer 2</th>
                    <th>Menecer 3</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>9</td>
                    <td>8</td>
                    <td>10</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>10</td>
                    <td>8</td>
                    <td>9</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>8</td>
                    <td>8</td>
                    <td>8</td>
                    <td>8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
