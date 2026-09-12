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
import "../src/styles/flow-mobile-final.css";
import "../src/styles/salon-premium-approved.css";
import "../src/styles/salon-premium-carousel.css";
import "../src/styles/kindergarten-premium.css";
import "../src/styles/flow-desktop-premium.css";
import "../src/styles/ada-site.css";
import "../src/styles/ada-tabs.css";
import "../src/styles/ada-desktop-fit.css";
import "../src/styles/ada-mobile-fit.css";
import "../src/styles/ada-playful-home.css";
import "../src/styles/ada-playful-images.css";
import "../src/styles/ada-reference-final.css";
import "../src/styles/ada-yeni-reference.css";
import "../src/styles/ada-yeni-wave-fix.css";
import "../src/styles/nursery-corporate.css";
import "../src/styles/kindergarten-reference.css";
import "../src/styles/kindergarten-blue-enhancements.css";
import "../src/styles/kindergarten-design-chooser.css";
import "../src/styles/kindergarten-reference-fidelity.css";
import "../src/styles/kindergarten-wave-sections.css";
import "../src/styles/kindergarten-reference-overlap.css";
import "../src/styles/kindergarten-hero-motion.css";
import "../src/styles/kindergarten-hero-clean.css";
import "../src/styles/kindergarten-hero-final.css";
import "../src/styles/kindergarten-story-final.css";
import "../src/styles/kindergarten-science-doodles.css";
import "../src/styles/kindergarten-why-bridge-fix.css";
import "../src/styles/kindergarten-road-transitions.css";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <style jsx global>{`
      main.kr-site .kr-join{background:#b3d34a!important;clip-path:none!important;border-radius:0!important;height:190px!important;min-height:190px!important;margin:0!important;overflow:hidden!important}
      main.kr-site .kr-join::before,main.kr-site .kr-join::after{display:none!important;content:none!important}
      main.kr-site .kr-join > div:first-child span{font-size:0!important}
      main.kr-site .kr-join > div:first-child span::after{content:'Gelin Görüşelim';font:800 38px/1.08 'Baloo 2',sans-serif!important;color:#fff!important}
      main.kr-site .kr-join > div:first-child small{font-size:15px!important}
      main.kr-site .kr-footer{margin:0!important;border-radius:0!important;background:#19345f!important}
      main.kr-site .kr-footerTop{padding-top:54px!important}
      main.kr-site .kr-footer .footerBrand .kr-logoMark{width:62px!important;height:62px!important;margin-bottom:10px!important}
      main.kr-site .kr-footer .footerBrand b{font-size:0!important}
      main.kr-site .kr-footer .footerBrand b::after{content:'Bilim Çocuk Anaokulu';font:800 24px/1.1 'Baloo 2',sans-serif!important;color:#fff!important}
      main.kr-site .kr-footer .footerBrand small{font-size:13px!important}
      main.kr-site .kr-footerTop > div:nth-child(3) > span{display:none!important}
      main.kr-site .kr-footerTop > div:nth-child(3)::after{content:'☎ 0507 952 12 82\A☎ 0532 699 45 85\A\A📍 İsmetpaşa Mahallesi, Ahmet Taner Kışlalı Cad. No: 19\A48200 Milas / Muğla';white-space:pre-line;color:rgba(255,255,255,.78)!important;font:500 14px/1.55 'Baloo 2',sans-serif!important}
      @media(max-width:760px){main.kr-site .kr-join{height:auto!important;min-height:220px!important;padding:42px 24px!important}main.kr-site .kr-join > div:first-child span::after{font-size:29px!important}main.kr-site .kr-footerTop > div:nth-child(3)::after{font-size:13px!important}}
    `}</style>
    <SalonAdminNavigation />
    <CookieBanner />
  </>;
}
