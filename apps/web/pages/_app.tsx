import type { AppProps } from "next/app";
import { CookieBanner } from "../src/components/CookieBanner";
import { SalonAdminNavigation } from "../src/components/SalonAdminNavigation";
import "../src/styles/globals.css";
import "../src/styles/admin.css";
import "../src/styles/admin-extra.css";
import "../src/styles/admin-actions.css";
import "../src/styles/admin-forms.css";
import "../src/styles/admin-gallery-premium.css";
import "../src/styles/forms.css";
import "../src/styles/properties.css";
import "../src/styles/visual-sections.css";
import "../src/styles/layout-variants.css";
import "../src/styles/content-pages.css";
import "../src/styles/floating-whatsapp.css";
import "../src/styles/salon-booking.css";
import "../src/styles/salon-admin.css";
import "../src/styles/immersive-flow.css";
import "../src/styles/salon-flow-preview.css";
import "../src/styles/salon-site-enhancements.css";
import "../src/styles/salon-hero-slider.css";
import "../src/styles/salon-hero-integrated.css";
import "../src/styles/salon-premium-cards.css";
import "../src/styles/salon-service-mobile-premium.css";
import "../src/styles/salon-final-tweaks.css";
import "../src/styles/salon-gallery-premium.css";
import "../src/styles/flow-all-sectors.css";

export default function App({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} /><SalonAdminNavigation /><CookieBanner /></>;
}
