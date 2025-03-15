"use client";
import { Section } from "@/(routes)/(dashboard)/shared/ui/Section";
import styles from "../styles/kpi.module.scss";
import { AppRoutes } from "@/shared/types/enums";
import { Button } from "@/shared/ui/Button";
import { useTranslations } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";
import { useChangeFailedTasksStatus, useFailedTasks } from "@/(routes)/(dashboard)/shared/services/failedTasks/queries";
import Skeleton from "react-loading-skeleton";
import { CheckIcon, CloseIcon, TriangleIconFilled } from "@/resources/icons";
import { useState } from "react";
import { IAlertData } from "@/shared/types";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function TaskResultPageView() {
  const tButtons = useTranslations("buttons");
  const tWidgets = useTranslations("widgets");
  const tModals = useTranslations("modals");

  const { auth } = useAuth();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);

  const { data: failedTasks, isLoading: isFailedTasksLoading, refetch: refetchFailedTasks } = useFailedTasks();
  const { mutate: mutateChangeFailedTaskStatus, isLoading: isChangeFailedTasksStatusLoading } = useChangeFailedTasksStatus();

  const handleChangeTaskStatus = (id: number, status: boolean) => {
    mutateChangeFailedTaskStatus(
      {
        id: id,
        valid: !status,
      },
      {
        onSuccess: async (res: any) => {
          refetchFailedTasks();
          setAlertData({
            type: "success",
            icon: <TriangleIconFilled />,
            title: tModals("successfulOperation.title"),
            description: tModals("successfulOperation.description"),
          });
          setShowAlertModal(true);
        },
        onError: (e: any) => {
          setAlertData({
            type: "danger",
            icon: <TriangleIconFilled />,
            title: tModals("unexpectedError.title"),
            description: e?.message,
          });
          setShowAlertModal(true);
        },
      }
    );
  };

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
                      <th>Rüb</th>
                      <th>İl</th>
                      <th>Təsdiq statusu</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {failedTasks?.map((task: any, index: number) => (
                      <tr key={task.id}>
                        <td>#{index + 1}</td>
                        <td>{task.task_title || "-"}</td>
                        <td>{task.quarter || 0}</td>
                        <td>{task.year || 0}</td>
                        <td>{task.valid ? "Təsdiqlənib" : "Təsdiqlənməyib"}</td>
                        <td className={styles.table__actions}>{task.valid ? <CloseIcon onClick={() => handleChangeTaskStatus(task.id, task.valid)} /> : <CheckIcon onClick={() => handleChangeTaskStatus(task.id, task.valid)} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal((p) => !p)}
        animation="translate"
        color={alertData.type}
        size="sm"
        center={true}
      >
        <ModalHeader
          icon={alertData.icon}
          title={alertData.title}
          desc={alertData.description}
          onClose={() => setShowAlertModal((p) => !p)}
        />
        <ModalFooter
          buttons={
            <>
              <Button onClick={() => setShowAlertModal((p) => !p)}>{tButtons("okay")}</Button>
              <Button
                color="gray"
                onClick={() => setShowAlertModal((p) => !p)}
              >
                {tButtons("close")}
              </Button>
            </>
          }
        />
      </Modal>
    </Section>
  );
}
