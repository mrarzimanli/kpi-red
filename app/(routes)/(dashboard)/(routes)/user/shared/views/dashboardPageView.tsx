"use client";
import classNames from "classnames";
import styles from "../styles/dashboard.module.scss";
import { Button } from "@/shared/ui/Button";
import { AppRoutes } from "@/shared/types/enums";
import { useTranslations } from "next-intl";
import ReactECharts from "echarts-for-react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { Section } from "@/(routes)/(dashboard)/shared/ui/Section";
import { SectionHeader } from "@/(routes)/(dashboard)/shared/ui/SectionHeader";
import { capitalizeWords } from "@/shared/utils/capitalizeWords";
import { useDashboardMetrics } from "@/(routes)/(dashboard)/shared/services/dashboardMetrics/queries";
import { useFailedTasks } from "@/(routes)/(dashboard)/shared/services/failedTasks/queries";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashboardPageView() {
  const tButtons = useTranslations("buttons");
  const tWidgets = useTranslations("widgets");
  const tDashboard = useTranslations("dashboard");
  const tMenu = useTranslations("menu");
  const { auth } = useAuth();

  const { data: dashboardMetrics, isLoading: isDashboardMetricsLoading } = useDashboardMetrics();
  const { data: failedTasks, isLoading: isFailedTasksLoading } = useFailedTasks();

  const pieOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Category",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: dashboardMetrics?.kpi?.task_result?.score,
            name: tMenu("taskResults.title"),
          },
          {
            value: dashboardMetrics?.kpi.manager_score,
            name: tMenu("managerAssessment.title"),
          },
          {
            value: dashboardMetrics?.kpi.code_quality,
            name: tMenu("codeQuality.title"),
          },
          {
            value: dashboardMetrics?.kpi.self_develop,
            name: tMenu("selfDevelopment.title"),
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.1)",
          },
        },
        color: ["#7c94e0", "#de9b26", "#7ce09e", "#cc71b8"],
      },
    ],
  };

  return (
    <Section>
      <SectionHeader
        title={`${tDashboard("header.title")}, ${auth?.user?.name ? capitalizeWords(auth?.user?.name) : ""}`}
        desc={`${tDashboard("header.description")}`}
      />

      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("kpi.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("kpi.description")}</p>
          </div>
          <div className={styles.widget__header__actions}>
            <Button
              as="link"
              href={AppRoutes.USER_TASK_RESULT}
              designType="text"
            >
              {tButtons("seeMore")}
            </Button>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isDashboardMetricsLoading ? (
            <Skeleton height={208} />
          ) : (
            <div className={styles.statsWrapper}>
              <div className={styles.stat}>
                <span className={styles.stat__title}>{tMenu("taskResults.title")}</span>
                <span className={styles.stat__value}>{dashboardMetrics?.kpi?.task_result?.score * 10}%</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__title}>{tMenu("managerAssessment.title")}</span>
                <span className={styles.stat__value}>{dashboardMetrics?.kpi.manager_score}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__title}>{tMenu("codeQuality.title")}</span>
                <span className={styles.stat__value}>{dashboardMetrics?.kpi.code_quality}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__title}>{tMenu("selfDevelopment.title")}</span>
                <span className={styles.stat__value}>{dashboardMetrics.kpi.self_develop}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__body}>
          <div className={styles.widgetsWrapper}>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>Cari rüb üzrə yekun KPI (100%)</span>
                </div>
                <div className={styles.widget__header__actions}>
                  <Button
                    as="link"
                    href={AppRoutes.USER_CODE_QUALITY}
                    designType="text"
                  >
                    {tButtons("seeMore")}
                  </Button>
                </div>
              </div>
              <div className={styles.widget__body}>
                {isFailedTasksLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.progress}>
                    <CircularProgressbar
                      value={dashboardMetrics?.kpi?.kpi_score}
                      maxValue={100}
                      text={`${dashboardMetrics?.kpi?.kpi_score}%`}
                      styles={{
                        trail: {
                          stroke: "#f2f4fc",
                        },
                        path: {
                          stroke: "#7c94e0",
                        },
                        text: {
                          fill: "#121f4a",
                          fontSize: "16px",
                          fontWeight: "bold",
                        },
                        background: {
                          fill: "#fff",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("kpi.title")}</span>
                </div>
                <div className={styles.widget__header__actions}>
                  <Button
                    as="link"
                    href={AppRoutes.USER_TASK_RESULT}
                    designType="text"
                  >
                    {tButtons("seeMore")}
                  </Button>
                </div>
              </div>

              <div className={styles.widget__body}>
                {isFailedTasksLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {failedTasks?.length > 0 && (
                      <ReactECharts
                        option={pieOption}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>Cari rüb üzrə uğursuz tapşırıqların siyahısı</span>
          </div>
          <div className={styles.widget__header__actions}>
            <Button
              as="link"
              href={AppRoutes.USER_TASK_RESULT}
              designType="text"
            >
              {tButtons("seeMore")}
            </Button>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isFailedTasksLoading ? (
            <Skeleton height={452} />
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Tapşırığın adı</th>
                      <th>Təsdiq statusu</th>
                      <th>İl</th>
                      <th>Rüb</th>
                    </tr>
                  </thead>
                  <tbody>
                    {failedTasks?.slice(0, 10)?.map((task: any, index: number) => (
                      <tr key={task.id}>
                        <td>#{index + 1}</td>
                        <td>{task?.task_title || "-"}</td>
                        <td>{task?.valid ? "Təsdiqlənib" : "Təsdiqlənməyib"}</td>
                        <td>{task?.year || 0}</td>
                        <td>{task?.quarter || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
