import { useState } from "react";
import { sendAdminPasswordReset } from "@fk-templates/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Admin hesabınızın e-postasını yazın, Firebase şifre sıfırlama bağlantısı göndersin.");
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
      setStatus("Şifre sıfırlama gönderilemedi. Firebase env, Authentication veya e-posta adresini kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/"><span>FK</span><strong>Şifre Reset</strong></a>
        <nav>
          <a href="/login">Giriş</a>
          <a className="active" href="/forgot-password">Şifremi Unuttum</a>
          <a href="/">Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Admin Güvenliği</span>
            <h1>Şifremi unuttum</h1>
            <p>Müşteri admin hesabı şifresini unutursa buradan reset maili alabilir.</p>
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
