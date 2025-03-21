import { NextIntlClientProvider } from "next-intl";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "az";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
