"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getCookie, removeCookie } from "@/shared/utils/cookie";
import { IAlertData, User } from "@/shared/types";
import { ArrowRightIcon, TriangleIconFilled } from "@/resources/icons";
import { useRouter } from "next/navigation";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from "@/config/axiosInstance";
import { AppRoutes } from "@/shared/types/enums";
import { useTranslations } from "next-intl";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { ErrorResponse } from "@/shared/types/api";
import Loading from "@/loading";
import { useLogout } from "@/(routes)/(auth)/shared/services/logout/mutation";
import { useMe } from "@/(routes)/(auth)/shared/services/me/queries";

type Auth = {
  user: User | null;
};

interface IAuthProvider {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  handleLogout: () => void;
  resetAuthContext: () => void;
  refetchUser: () => void;
}

const defaultAlertData: IAlertData = {
  type: "default",
  icon: <TriangleIconFilled />,
  title: "",
  description: "",
};

const AuthContext = createContext<IAuthProvider>({} as IAuthProvider);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const tModals = useTranslations("modals");
  const tButtons = useTranslations("buttons");
  const router = useRouter();

  const [auth, setAuth] = useState<Auth | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);

  const { mutate: mutateLogout, isLoading: isLogoutLoading } = useLogout();
  const { data: user, isLoading: isUserLoading, refetch: refetchMe } = useMe();

  const resetAuthContext = () => {
    setAuth(null);
  };

  const refetchUser = () => {
    refetchMe();
  };

  const handleLogout = () => {
    setLogoutModal((prev) => !prev);
  };

  const confirmLogout = () => {
    mutateLogout(null, {
      onSuccess: () => {
        removeCookie(ACCESS_SECRET_KEY);
        removeCookie(REFRESH_SECRET_KEY);
        resetAuthContext();
        router.push(AppRoutes.LOGIN);
      },
      onError: (e: ErrorResponse) => {
        setAlertData({
          type: "danger",
          icon: <TriangleIconFilled />,
          title: tModals("unexpectedError.title"),
          description: e?.message || "An unexpected error occurred.",
        });
        setShowAlertModal(true);
      },
    });
  };

  useEffect(() => {
    if (user && !isUserLoading) {
      setAuth((prev) => ({ ...prev, user }));
    }
  }, [user, isUserLoading]);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogout, resetAuthContext, refetchUser }}>
      {children}

      <Modal
        isOpen={logoutModal}
        onClose={() => setLogoutModal((prev) => !prev)}
        animation="translate"
        color="warning"
        size="sm"
        center={true}
      >
        <ModalHeader
          icon={<TriangleIconFilled />}
          title={tModals("logout.title")}
          desc={tModals("logout.description")}
          onClose={() => setLogoutModal((prev) => !prev)}
        />
        <ModalFooter
          buttons={
            <>
              <Button
                onClick={() => setLogoutModal((prev) => !prev)}
                designType="secondary"
              >
                {tButtons("no")}
              </Button>
              <Button
                onClick={confirmLogout}
                disabled={isLogoutLoading}
              >
                {tButtons("yes")}
              </Button>
            </>
          }
        />
      </Modal>

      <Modal
        isOpen={showAlertModal}
        animation="translate"
        color={alertData.type}
        size="sm"
        center={true}
      >
        <ModalHeader
          icon={alertData.icon}
          title={alertData.title}
          desc={alertData.description}
          onClose={() => setShowAlertModal(false)}
        />
        <ModalFooter buttons={<Button onClick={() => setShowAlertModal(false)}>{tButtons("close")}</Button>} />
      </Modal>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
