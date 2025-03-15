enum AppRoutes {
  ROOT = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",

  USER_DASHBOARD = "/user/dashboard",
  USER_CODE_QUALITY = "/user/kpi/code-quality",
  USER_MANAGER_ASSESSMENT = "/user/kpi/manager-assessment",
  USER_TASK_RESULT = "/user/kpi/task-result",
  USER_SELF_DEVELOPMENT = "/user/kpi/self-development",
  USER_SETTINGS = "/user/settings",

  ADMIN_DASHBOARD = "/admin/dashboard",
  // ADMIN_CODE_QUALITY = "/admin/kpi/code-quality",
  // ADMIN_MANAGER_ASSESSMENT = "/admin/kpi/manager-assessment",
  // ADMIN_TASK_RESULT = "/admin/kpi/task-result",
  // ADMIN_SELF_DEVELOPMENT = "/admin/kpi/self-development",
  // ADMIN_SETTINGS = "/admin/settings",

  MANAGER_DASHBOARD = "/manager/dashboard",
  // MANAGER_CODE_QUALITY = "/manager/kpi/code-quality",
  // MANAGER_MANAGER_ASSESSMENT = "/manager/kpi/manager-assessment",
  // MANAGER_TASK_RESULT = "/manager/kpi/task-result",
  // MANAGER_SELF_DEVELOPMENT = "/manager/kpi/self-development",
  // MANAGER_SETTINGS = "/manager/settings",

  MODERATOR_DASHBOARD = "/manager/dashboard",
  // MODERATOR_CODE_QUALITY = "/manager/kpi/code-quality",
  // MODERATOR_MODERATOR_ASSESSMENT = "/manager/kpi/manager-assessment",
  // MODERATOR_TASK_RESULT = "/manager/kpi/task-result",
  // MODERATOR_SELF_DEVELOPMENT = "/manager/kpi/self-development",
  // MODERATOR_SETTINGS = "/manager/settings",
}

enum UserRoles {
  ADMIN = "admin",
  MODERATOR = "moderator",
  MANAGER = "manager",
  USER = "user",
}

export { AppRoutes, UserRoles };
