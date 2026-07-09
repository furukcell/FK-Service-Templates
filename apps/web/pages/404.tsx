import type { CSSProperties } from "react";
import { SeoHead } from "../src/components/SeoHead";

const themeStyle = {
  "--primary": "#12312a",
  "--secondary": "#f2c14e",
  "--accent": "#2f6f5e",
  "--soft": "#f4f7f5",
  "--dark": "#17211d"
} as CSSProperties;

export default function NotFoundPage() {
  return (
    <main className="contentShell" style={themeStyle}>
      <SeoHead title="Sayfa Bulunamadı" description="Aradığınız sayfa bulunamadı." canonicalPath="/404" noIndex />
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href="/"><span className="logoMark">YP</span><span>Site</span></a>
        <div className="navActions"><a className="pillButton navButtonLink" href="/">Ana Sayfa</a></div>
      </nav>
      <section className="contentHero">
        <span className="eyebrow">404</span>
        <h1>Sayfa bulunamadı</h1>
        <p>Aradığınız sayfa kaldırılmış, taşınmış veya bağlantı hatalı olabilir.</p>
        <div className="heroActions"><a className="pillButton navButtonLink" href="/">Ana Sayfaya Dön</a><a className="ghostButton navButtonLink" href="/iletisim">İletişim</a></div>
      </section>
    </main>
  );
}
