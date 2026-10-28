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
      setError("Please enter your name and a message of at least 20 characters.");
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
      updateSuccessMessage?.("Message sent. Thanks for getting in touch!");
      closeModal?.();
    } catch {
      setState("idle");
      setError("Sending failed. Please try again or contact me on LinkedIn.");
    }
  }

  if (!configured) {
    return (
      <div className="contact-form contact-fallback">
        <h3>Let’s connect on LinkedIn.</h3>
        <p>Tell me about your project, your questions or what you have been experimenting with.</p>
        <a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">Message me on LinkedIn <FiArrowUpRight aria-hidden="true" /></a>
      </div>
    );
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={send} aria-label="Send a message" aria-busy={state === "sending"}>
      <h3>Drop me a few lines.</h3>
      <div className="form-row"><div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="user_name" autoComplete="name" placeholder="Alex Martin" maxLength={120} required readOnly={state === "sending"} /></div><div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="user_email" type="email" autoComplete="email" placeholder="alex@example.com" maxLength={254} required readOnly={state === "sending"} /></div></div>
      <div className="form-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="What would you like to discuss?" rows={5} minLength={20} maxLength={5000} aria-describedby="message-help" required readOnly={state === "sending"} /><p id="message-help" className="field-help">At least 20 characters.</p></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      {state === "sent" && <p className="form-success" role="status"><FiCheck aria-hidden="true" /> Message sent. Thanks for getting in touch!</p>}
      <button className="button button-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}<FiSend aria-hidden="true" /></button>
    </form>
  );
}
