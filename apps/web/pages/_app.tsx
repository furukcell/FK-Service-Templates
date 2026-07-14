import type { AppProps } from "next/app";
import { CookieBanner } from "../src/components/CookieBanner";
import "../src/styles/globals.css";
import "../src/styles/admin.css";
import "../src/styles/admin-extra.css";
import "../src/styles/admin-actions.css";
import "../src/styles/admin-forms.css";
import "../src/styles/forms.css";
import "../src/styles/properties.css";
import "../src/styles/visual-sections.css";
import "../src/styles/layout-variants.css";
import "../src/styles/content-pages.css";
import "../src/styles/floating-whatsapp.css";
import "../src/styles/salon-booking.css";

export default function App({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} /><CookieBanner /></>;
}
