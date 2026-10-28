import { useRef, useState } from "react";
import { FiArrowUpRight, FiCheck, FiSend } from "react-icons/fi";
import profile from "../portfolio.json";

export default function ContactForm({ closeModal, updateSuccessMessage }) {
  const formRef = useRef(null);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const configured = Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  async function send(event) {
    event.preventDefault();
    if (!configured || state === "sending") return;
    const values = new FormData(formRef.current);
    if (!String(values.get("user_name")).trim() || String(values.get("message")).trim().length < 20) {
      setError("Indique ton nom et un message d’au moins 20 caractères.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      formRef.current.reset();
      setState("sent");
      updateSuccessMessage?.("Message envoyé. Merci pour ton message !");
      closeModal?.();
    } catch {
      setState("idle");
      setError("L’envoi a échoué. Réessaie ou contacte-moi sur LinkedIn.");
    }
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={send} aria-label="Envoyer un message" aria-busy={state === "sending"}>
      <h3>Écris-moi quelques lignes.</h3>
      <div className="form-row"><div className="form-field"><label htmlFor="contact-name">Ton nom</label><input id="contact-name" name="user_name" autoComplete="name" placeholder="Alex Martin" maxLength={120} required disabled={state === "sending"} /></div><div className="form-field"><label htmlFor="contact-email">Ton adresse e-mail</label><input id="contact-email" name="user_email" type="email" autoComplete="email" placeholder="alex@exemple.fr" maxLength={254} required disabled={state === "sending"} /></div></div>
      <div className="form-field"><label htmlFor="contact-message">Ton message</label><textarea id="contact-message" name="message" placeholder="De quoi aimerais-tu parler ?" rows={5} minLength={20} maxLength={5000} aria-describedby="message-help" required disabled={state === "sending"} /><p id="message-help" className="field-help">20 caractères minimum.</p></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      {state === "sent" && <p className="form-success" role="status"><FiCheck aria-hidden="true" /> Message envoyé. Merci pour ton message !</p>}
      {configured ? <button className="button button-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Envoi en cours…" : "Envoyer mon message"}<FiSend aria-hidden="true" /></button> : <div className="contact-fallback"><p>Le formulaire est momentanément indisponible. Retrouve-moi sur LinkedIn pour échanger.</p><a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">Me contacter sur LinkedIn <FiArrowUpRight aria-hidden="true" /></a></div>}
    </form>
  );
}
