import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "../data/contact";
import { useContact } from "../context/ContactContext";
import { useLang } from "../i18n/LangContext";

export function ContactModal() {
  const { isOpen, close } = useContact();
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body = `Nom : ${name}\nE-mail : ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    close();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("contact_modal_title")}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-float border border-gray-100 p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t("contact_close")}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-brand-dark hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-brand-dark mb-2">{t("contact_modal_title")}</h2>
            <p className="text-sm text-gray-500 mb-6">{t("contact_modal_desc")}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">
                  {t("contact_name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-dark focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">
                  {t("contact_email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-dark focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">
                  {t("contact_subject")}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-dark focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">
                  {t("contact_message")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-dark focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 px-6 py-3.5 bg-brand-dark text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-float"
              >
                {t("contact_submit")}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}