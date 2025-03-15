"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import { Logo } from "@/resources/images";
import { NavList } from "@/shared/ui/NavList";
import { ArrowRightIcon, BugIcon, ChartIcon, ChevronDownIcon, CodeIcon, CourseUpIcon, HomeIcon, LogoutIcon, SettingsIcon, StarIcon, TeamIcon, TriangleIconFilled } from "@/resources/icons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IconBox } from "@/shared/ui/IconBox";
import { AppRoutes } from "@/shared/types/enums";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

type navListItem = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  disabled: boolean;
  href?: string;
  onClick?: () => void;
  actionIcon?: React.ReactNode | null;
};

const Sidebar = () => {
  const tMenu = useTranslations("menu");
  const tButtons = useTranslations("buttons");

  const { auth, handleLogout } = useAuth();

  const navListTop = [
    {
      id: "1",
      title: tMenu("dashboard.title"),
      // desc: tMenu("dashboard.desc"),
      icon: (
        <IconBox
          type="primary"
          color="darkBlue"
          icon={<HomeIcon />}
          size={44}
        />
      ),
      href: AppRoutes.USER_DASHBOARD,
    },
    {
      id: "2",
      title: tMenu("taskResults.title"),
      // desc: tMenu("taskResults.desc"),
      icon: (
        <IconBox
          type="primary"
          color="blue"
          icon={<BugIcon />}
          size={44}
        />
      ),
      href: AppRoutes.USER_TASK_RESULT,
    },
    {
      id: "3",
      title: tMenu("managerAssessment.title"),
      // desc: tMenu("managerAssessment.desc"),
      icon: (
        <IconBox
          type="primary"
          color="orange"
          icon={<StarIcon />}
          size={44}
        />
      ),
      href: AppRoutes.USER_MANAGER_ASSESSMENT,
    },
    {
      id: "4",
      title: tMenu("codeQuality.title"),
      // desc: tMenu("codeQuality.desc"),
      icon: (
        <IconBox
          type="primary"
          color="green"
          icon={<CodeIcon />}
          size={44}
        />
      ),
      href: AppRoutes.USER_CODE_QUALITY,
    },
    {
      id: "5",
      title: tMenu("selfDevelopment.title"),
      // desc: tMenu("selfDevelopment.desc"),
      icon: (
        <IconBox
          type="primary"
          color="pink"
          icon={<CourseUpIcon />}
          size={44}
        />
      ),
      href: AppRoutes.USER_SELF_DEVELOPMENT,
    },
  ] as navListItem[];

  const navListBottom = [
    {
      id: "6",
      title: tMenu("team.title"),
      desc: tMenu("team.desc"),
      icon: (
        <IconBox
          type="primary"
          color="sky"
          icon={<TeamIcon />}
          size={44}
        />
      ),
      onClick: () => alert("Meyvəyə dəymə 🍎"),
      actionIcon: null,
    },
    {
      id: "7",
      title: tButtons("logout"),
      desc: tButtons("clickToLogout"),
      icon: (
        <IconBox
          type="primary"
          color="red"
          icon={<LogoutIcon />}
          size={44}
        />
      ),
      onClick: handleLogout,
    },
  ] as navListItem[];

  const navListTop2 = [
    {
      id: "1",
      title: tMenu("dashboard.title"),
      icon: (
        <IconBox
          type="primary"
          color="darkBlue"
          icon={<HomeIcon />}
          size={44}
        />
      ),
      // href: AppRoutes.ADMIN_USERS,
    },
    {
      id: "2",
      title: tMenu("taskResults.title"),
      // desc: tMenu("taskResults.desc"),
      icon: (
        <IconBox
          type="primary"
          color="blue"
          icon={<BugIcon />}
          size={44}
        />
      ),
      href: AppRoutes.USER_TASK_RESULT,
    },
  ] as navListItem[];

  const navListBottom2 = [
    {
      id: "6",
      title: tMenu("team.title"),
      desc: tMenu("team.desc"),
      icon: (
        <IconBox
          type="primary"
          color="sky"
          icon={<TeamIcon />}
          size={44}
        />
      ),
      onClick: () => alert("Meyvəyə dəymə 🍎"),
      actionIcon: null,
    },
    {
      id: "7",
      title: tButtons("logout"),
      desc: tButtons("clickToLogout"),
      icon: (
        <IconBox
          type="primary"
          color="red"
          icon={<LogoutIcon />}
          size={44}
        />
      ),
      onClick: handleLogout,
    },
  ] as navListItem[];

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <Image
            src={Logo}
            alt="KPI Platform"
            height={40}
            width={188}
            priority={true}
          />
        </div>
        <div className={styles.sidebar__body}>
          <NavList list={navListTop} />
        </div>
        <div className={styles.sidebar__footer}>
          <NavList list={navListBottom} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
