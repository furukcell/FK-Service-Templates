import type { CSSProperties } from "react";
import { SeoHead } from "./SeoHead";

const setupStyle = {
  "--primary": "#12312a",
  "--secondary": "#f2c14e",
  "--accent": "#2f6f5e",
  "--soft": "#f4f7f5",
  "--dark": "#17211d"
} as CSSProperties;

export function SiteSetupGuard() {
  return (
    <main className="contentShell" style={setupStyle}>
      <SeoHead title="Site Hazırlanıyor" description="Bu web sitesi kısa süre içinde yayına alınacaktır." canonicalPath="/" noIndex />
      <section className="contentHero">
        <span className="eyebrow">Yayın hazırlığı</span>
        <h1>Site hazırlanıyor</h1>
        <p>Bu web sitesi için işletme bilgileri henüz tamamlanmadı. Lütfen daha sonra tekrar kontrol edin.</p>
      </section>
    </main>
  );
}
