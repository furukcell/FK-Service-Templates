import { useState } from "react";
import { loginWithEmail } from "@fk-templates/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Admin girişi için Firebase Email/Password aktif olmalı.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLogin() {
    if (!email || !password) {
      setStatus("E-posta ve şifre zorunludur.");
      return;
    }
    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      setStatus("Giriş başarılı. Admin panel açılıyor...");
      window.location.href = "/admin";
    } catch (error) {
      setStatus("Giriş yapılamadı. Firebase env veya kullanıcı bilgilerini kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/"><span>FK</span><strong>Admin Login</strong></a>
        <nav>
          <a className="active" href="/login">Giriş</a>
          <a href="/forgot-password">Şifremi Unuttum</a>
          <a href="/admin">Demo Panel</a>
          <a href="/">Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">FK Service Templates</span>
            <h1>Müşteri paneline giriş</h1>
            <p>Her müşteri için Firebase Authentication üzerinden ayrı admin kullanıcısı oluşturulacak.</p>
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
