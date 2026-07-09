import type { AppProps } from "next/app";
import "../src/styles/globals.css";
import "../src/styles/admin.css";
import "../src/styles/admin-extra.css";
import "../src/styles/admin-actions.css";
import "../src/styles/forms.css";
import "../src/styles/properties.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
