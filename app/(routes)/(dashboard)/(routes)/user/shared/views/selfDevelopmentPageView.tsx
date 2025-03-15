"use client";
import { Section } from "@/(routes)/(dashboard)/shared/ui/Section";
import styles from "../styles/kpi.module.scss";
import { useTranslations } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { IAlertData } from "@/shared/types";
import { TriangleIconFilled } from "@/resources/icons";
import { useSelfDevelopment } from "@/(routes)/(dashboard)/shared/services/selfDevelopment/queries";
import Skeleton from "react-loading-skeleton";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function SelfDevelopmentPageView() {
  const tButtons = useTranslations("buttons");
  const tWidgets = useTranslations("widgets");
  const tModals = useTranslations("modals");

  const { auth } = useAuth();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);
  const [showEvaluateModal, setShowEvaluateModal] = useState(false);

  const { data: selfDevelopment, isLoading: isSelfDevelopmentLoading, refetch: refetchFailedTasks } = useSelfDevelopment();

  console.log(selfDevelopment);

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
          {isSelfDevelopmentLoading ? (
            <Skeleton height={452} />
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Ad</th>
                      <th>Təqdimatın mövzusu</th>
                      <th>Haqqında məlumat</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selfDevelopment?.map((development: any, index: number) => (
                      <tr key={development.id}>
                        <td>#{index + 1}</td>
                        <td>{development.name || "-"}</td>
                        <td>{development?.presentation.title || "-"}</td>
                        <td>{development?.presentation.description || "-"}</td>
                        <td className={styles.table__actions}>
                          <Button
                            designType="primary"
                            onClick={() => setShowEvaluateModal(true)}
                          >
                            Qiymətləndir
                          </Button>
                        </td>
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
