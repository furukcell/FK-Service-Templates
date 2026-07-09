import { useState } from "react";
import { loginWithEmail } from "@fk-templates/firebase";
import { SeoHead } from "../src/components/SeoHead";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Yönetim paneline giriş yapın.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLogin() {
    if (!email || !password) {
      setStatus("E-posta ve şifre zorunludur.");
      return;
    }
    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      setStatus("Giriş başarılı. Yönetim paneli açılıyor...");
      window.location.href = "/admin";
    } catch (error) {
      setStatus("Giriş yapılamadı. Lütfen e-posta ve şifreyi kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="adminShell">
      <SeoHead title="Admin Giriş" description="Yönetim paneli giriş sayfası." canonicalPath="/login" noIndex />
      <aside className="adminSidebar">
        <a className="adminLogo" href="/"><span>YP</span><strong>Yönetim Paneli</strong></a>
        <nav>
          <a className="active" href="/login">Giriş</a>
          <a href="/forgot-password">Şifremi Unuttum</a>
          <a href="/">Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Yönetim Paneli</span>
            <h1>Panele giriş</h1>
            <p>Site taleplerini ve içeriklerini yönetmek için giriş yapın.</p>
            <p className="adminMode">{status}</p>
          </div>
        </header>

        <section className="adminCard loginCard">
          <div className="formFields">
            <label className="field"><span>E-posta</span><input value={email} onChange={(event) => setEmail(event.currentTarget.value)} placeholder="admin@firma.com" /></label>
            <label className="field"><span>Şifre</span><input type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} placeholder="••••••••" /></label>
            <button className="pillButton" type="button" disabled={isSubmitting} onClick={submitLogin}>{isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}</button>
            <a className="ghostButton navButtonLink" href="/forgot-password">Şifremi Unuttum</a>
          </div>
        </section>
      </section>
    </main>
  );
}
