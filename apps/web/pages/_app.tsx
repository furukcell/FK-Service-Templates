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
import "../src/styles/flow-mobile-refine.css";
import "../src/styles/flow-mobile-deck.css";
// Keep the final mobile flow overrides last so they win the cascade.
import "../src/styles/flow-mobile-final.css";
// Approved premium headers and heroes intentionally load last.
import "../src/styles/salon-premium-approved.css";
import "../src/styles/salon-premium-carousel.css";
import "../src/styles/kindergarten-premium.css";
// Desktop-only Akışkan Premium refinements. Mobile/tablet rules remain untouched.
import "../src/styles/flow-desktop-premium.css";
import "../src/styles/ada-site.css";
import "../src/styles/ada-tabs.css";
import "../src/styles/ada-desktop-fit.css";
import "../src/styles/ada-mobile-fit.css";
import "../src/styles/ada-playful-home.css";
import "../src/styles/ada-playful-images.css";
import "../src/styles/ada-reference-final.css";
import "../src/styles/ada-yeni-reference.css";

export default function App({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} /><SalonAdminNavigation /><CookieBanner /></>;
}
