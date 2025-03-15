"use client";
import Image from "next/image";
import styles from "../shared/styles/page.module.scss";

import { Form, FormBody, FormFooter, FormHeader } from "@/shared/ui/Form";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

import { TriangleIconFilled } from "@/resources/icons";
import { Logo } from "@/resources/images";
import { AppRoutes, UserRoles } from "@/shared/types/enums";
import { IAlertData } from "@/shared/types";
import { ErrorResponse } from "@/shared/types/api";
import { setCookie } from "@/shared/utils/cookie";
import { useLogin } from "../shared/services/login/mutation";
import { ACCESS_SECRET_KEY } from "@/config/axiosInstance";

interface Field {
  error: string;
  value: string;
}

interface FormData {
  email: Field;
}

const defaultFormData: FormData = {
  email: { error: "", value: "" },
};

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function LoginPageView() {
  const tLogin = useTranslations("login");
  const tButtons = useTranslations("buttons");
  const tInputs = useTranslations("inputs");
  const tModals = useTranslations("modals");

  const router = useRouter();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { mutate: mutateLogin, isLoading: isLoginLoading } = useLogin();

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], value, error: "" },
    }));
  };

  const validateFormFields = () => {
    if (!formData.email.value.trim()) {
      setFormData((prevData) => ({ ...prevData, email: { ...prevData.email, error: tInputs("email.error") } }));
    }
    return formData.email.value;
  };

  const handleLogin = () => {
    if (!validateFormFields()) {
      return;
    }

    mutateLogin(
      {
        email: formData?.email?.value,
      },
      {
        onSuccess: async (res: any) => {
          setCookie(ACCESS_SECRET_KEY, res?.data?.token);

          if (res?.data?.role === UserRoles.ADMIN) {
            router.push(AppRoutes.ADMIN_DASHBOARD);
          } else if (res?.data?.role === UserRoles.MANAGER) {
            router.push(AppRoutes.MANAGER_DASHBOARD);
          } else if (res?.data?.role === UserRoles.MODERATOR) {
            router.push(AppRoutes.MODERATOR_DASHBOARD);
          } else {
            router.push(AppRoutes.USER_DASHBOARD);
          }
        },
        onError: (e: ErrorResponse) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className={styles.page__content}>
      <Form>
        <FormHeader
          icon={
            <Image
              src={Logo}
              alt="KPI Platform"
              height={40}
              width={188}
              priority={true}
            />
          }
          title={tLogin("form.title")}
          desc={tLogin("form.desc")}
        />
        <FormBody>
          <Input
            name="email"
            label={tInputs("email.label")}
            placeholder={tInputs("email.placeholder")}
            required={true}
            error={formData?.email?.error}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange("email", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormBody>
        <FormFooter>
          <Button
            onClick={handleLogin}
            disabled={isLoginLoading}
          >
            {tButtons("login")}
          </Button>
        </FormFooter>
      </Form>

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
    </div>
  );
}
