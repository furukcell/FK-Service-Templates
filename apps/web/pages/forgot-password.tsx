import { useState } from "react";
import { sendAdminPasswordReset } from "@fk-templates/firebase";
import { SeoHead } from "../src/components/SeoHead";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Yönetim paneli e-postanızı yazın, şifre sıfırlama bağlantısı gönderilsin.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitReset() {
    if (!email) {
      setStatus("E-posta zorunludur.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendAdminPasswordReset(email);
      setStatus("Şifre sıfırlama bağlantısı gönderildi. Gelen kutusu/spam klasörünü kontrol edin.");
    } catch (error) {
      setStatus("Şifre sıfırlama gönderilemedi. Lütfen e-posta adresini kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="adminShell">
      <SeoHead title="Şifremi Unuttum" description="Yönetim paneli şifre sıfırlama sayfası." canonicalPath="/forgot-password" noIndex />
      <aside className="adminSidebar">
        <a className="adminLogo" href="/"><span>YP</span><strong>Şifre Sıfırlama</strong></a>
        <nav>
          <a href="/login">Giriş</a>
          <a className="active" href="/forgot-password">Şifremi Unuttum</a>
          <a href="/">Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Yönetim Paneli</span>
            <h1>Şifremi unuttum</h1>
            <p>Hesap e-postanıza şifre sıfırlama bağlantısı gönderilir.</p>
            <p className="adminMode">{status}</p>
          </div>
        </header>
        <section className="adminCard loginCard">
          <div className="formFields">
            <label className="field"><span>E-posta</span><input value={email} onChange={(event) => setEmail(event.currentTarget.value)} placeholder="admin@firma.com" /></label>
            <button className="pillButton" type="button" disabled={isSubmitting} onClick={submitReset}>{isSubmitting ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}</button>
            <a className="ghostButton navButtonLink" href="/login">Girişe Dön</a>
          </div>
        </section>
      </section>
    </main>
  );
}
