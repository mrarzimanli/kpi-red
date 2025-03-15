"use client";
import styles from "../styles/settings.module.scss";
import { Input } from "@/shared/ui/Input";
import { useTranslations } from "use-intl";
import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { LinkIcon, TriangleIconFilled } from "@/resources/icons";
import { IAlertData } from "@/shared/types";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import { useAuth } from "@/providers/AuthProvider";

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function UserSettingPageView() {
  const tButtons = useTranslations("buttons");
  const tInputs = useTranslations("inputs");
  const tModals = useTranslations("modals");
  const tSettings = useTranslations("settings");

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);
  const [userData, setUserData] = useState({ jira_username: "", jira_password: "" });

  const { auth, refetchUser } = useAuth();
  const user = auth?.user;
  // const { mutate: mutateConnectJira, isLoading: isConnectJiraLoading } = useConnectJira();

  const handleConnectJira = () => {
    // mutateConnectJira(
    //   {
    //     userId: auth?.user?.id,
    //   },
    //   {
    //     onSuccess: async () => {
    //       setAlertData({ type: "success", icon: <TriangleIconFilled />, title: tModals("successfulOperation.title"), description: tModals("successfulOperation.description") });
    //       setShowAlertModal(true);
    //     },
    //     onError: () => {
    //       setAlertData({ type: "danger", icon: <TriangleIconFilled />, title: tModals("unexpectedError.title"), description: tModals("unexpectedError.description") });
    //       setShowAlertModal(true);
    //     },
    //   }
    // );
  };

  const handleInputChange = (key: string, value: string) => {
    setUserData((p) => ({ ...p, [key]: value }));
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.section}>
          <div className={styles.section__header}>
            <div className={styles.section__header__content}>
              <span className={styles.section__header__title}>{tSettings("userJiraConnection.title")}</span>
              <p className={styles.section__header__desc}>{tSettings("userJiraConnection.description")}</p>
            </div>
          </div>
          <div className={styles.section__body}>
            <div className={styles.accountInfo}>
              <Input
                name="username"
                label={tInputs("jiraUsername.label")}
                placeholder={tInputs("jiraUsername.placeholder")}
                value={user?.jira_username || userData.jira_username}
                readOnly={!!user?.jira_username}
                onChange={(e) => handleInputChange("jiraUsername", e.target.value)}
              />
              <Input
                name="password"
                label={tInputs("jiraPassword.label")}
                placeholder={tInputs("jiraPassword.placeholder")}
                value={user?.jira_password || userData.jira_password}
                readOnly={!!user?.jira_password}
                onChange={(e) => handleInputChange("jiraPassword", e.target.value)}
              />
              <Button
                prefix={<LinkIcon />}
                onClick={handleConnectJira}
                disabled={!!user?.jira_username || !!user?.jira_password}
              >
                {tButtons("connect")}
              </Button>
            </div>
          </div>
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
    </>
  );
}
