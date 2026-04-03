"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-black dark:via-slate-950 dark:to-purple-950 py-12">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Kontaktieren Sie uns
            </h1>
            <p className="text-xl text-muted-foreground">
              Wir sind hier, um Ihnen zu helfen. Senden Sie uns Ihre Nachricht.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-md border border-white/20 dark:border-slate-800/50 p-6">
              <h3 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-3">
                Email
              </h3>
              <p className="text-sm text-muted-foreground">
                support@zynqly.com
              </p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-md border border-white/20 dark:border-slate-800/50 p-6">
              <h3 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-3">
                Öffnungszeiten
              </h3>
              <p className="text-sm text-muted-foreground">
                Mo-Fr 09:00 - 17:00 Uhr (CET)
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-800/50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ihr Name"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Ihre Email"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Betreff
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Betreff Ihrer Nachricht"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Nachricht
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Ihre Nachricht"
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Nachricht senden
              </button>

              {/* Success Message */}
              {submitted && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm">
                  ✓ Vielen Dank! Ihre Nachricht wurde versendet. Wir werden uns bald bei Ihnen melden.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
