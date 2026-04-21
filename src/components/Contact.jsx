import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SOCIAL_LINKS } from "../data/social";
import { validateForm, sanitizeInput } from "../utils/validation";
import { fadeInUp, slideInLeft, slideInRight, useScrollAnimation } from "../utils/animations";
import { useToast } from "./ui/Toast";
import { useAnalytics } from "../hooks/useAnalytics";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { track } = useAnalytics();
  const scrollAnimation = useScrollAnimation();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitized = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
    };
    const validation = validateForm(sanitized);
    if (!validation.isValid) { setErrors(validation.errors); return; }

    setIsSubmitting(true);
    setErrors({});
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitized),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success("Message sent! I'll get back to you soon.", { title: "Sent!" });
      track('contact_submit', { has_subject: !!sanitized.subject });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.", { title: "Error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom">

        {/* Label */}
        <motion.span
          {...scrollAnimation}
          variants={fadeInUp}
          className="section-label"
        >
          [ 05 — CONTACT ]
        </motion.span>

        {/* Giant heading */}
        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-extrabold text-[clamp(2.5rem,8vw,90px)] text-ink leading-none mt-4 mb-4"
        >
          Let's Build<br />Something.
        </motion.h2>

        <motion.p
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-sans text-muted text-lg mb-16 max-w-md"
        >
          Have a project in mind? Let's talk.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — email + socials */}
          <motion.div {...scrollAnimation} variants={slideInLeft} className="space-y-10">
            <div>
              <p className="font-mono text-xs tracking-widest text-muted uppercase mb-4">Reach out directly</p>
              <a
                href="mailto:palayush930592@gmail.com"
                className="font-display font-bold text-xl md:text-2xl text-ink hover:text-accent transition-colors duration-200 flex items-center gap-3 group"
              >
                palayush930592@gmail.com
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
              </a>
            </div>

            <div>
              <p className="font-mono text-xs tracking-widest text-muted uppercase mb-4">Elsewhere</p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-sans text-sm transition-colors duration-200"
                      style={{ color: "var(--color-muted)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                      onMouseOut={(e)  => (e.currentTarget.style.color = "var(--color-muted)")}
                    >
                      <Icon size={18} />
                      {s.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs tracking-wide text-muted">Available for remote work</span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...scrollAnimation} variants={slideInRight}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="font-mono text-xs tracking-widest text-muted uppercase block mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-field ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-2 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-xs tracking-widest text-muted uppercase block mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2 font-mono">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="font-mono text-xs tracking-widest text-muted uppercase block mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Project idea, opportunity..."
                />
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-xs tracking-widest text-muted uppercase block mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`input-field resize-none ${errors.message ? "border-red-500" : ""}`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-2 font-mono">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center text-sm"
              >
                <Send size={16} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
