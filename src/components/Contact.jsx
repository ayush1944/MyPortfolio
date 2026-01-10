import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send
} from "lucide-react";
import { validateForm, sanitizeInput } from "../utils/validation";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  useScrollAnimation,
} from "../utils/animations";
import { useToast } from "./ui/Toast";
import Button from "./ui/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const scrollAnimation = useScrollAnimation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real application, you would send the form data to your backend
      console.log("Form submitted:", formData);

      toast.success("Message sent successfully! I'll get back to you soon.", {
        title: "Success!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        title: "Error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "palayush930592@gmail.com",
      href: "mailto:palayush930592@gmail.com",
    },
    // {
    //   icon: <Phone className="w-6 h-6" />,
    //   label: 'Phone',
    //   value: '+91 ',
    //   href: 'tel:+'
    // },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Remote / India",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: (
        <img
          src="/icons/github.png"
          className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      label: "GitHub",
      href: "https://github.com/ayush1944",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: (
        <img
          src="/icons/linkedIn.png"
          className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ayush-pal-25b628255/",
      color: "hover:text-blue-600",
    },
    {
      icon: (
        <img
          src="/icons/twitter.png"
          className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      label: "Twitter",
      href: "https://x.com/19yashu_",
      color: "hover:text-blue-400",
    },
    {
      icon: (
        <img
          src="/icons/message.png"
          className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      label: "Email",
      href: "mailto:palayush930592@gmail.com",
      color: "hover:text-red-500",
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding bg-gray-50 dark:bg-gray-800"
    >
      <div className="container-custom">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can work
            together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            {...scrollAnimation}
            variants={slideInLeft}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities,
                especially remote positions where I can contribute to innovative
                projects and grow with a dynamic team. Feel free to reach out!
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-900 dark:text-white font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium">
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-400 ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div {...scrollAnimation} variants={slideInRight}>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${
                        errors.name ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${
                        errors.email ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`input-field resize-none ${
                      errors.message ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full"
                  variant="primary"
                >
                  <Send size={20} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
