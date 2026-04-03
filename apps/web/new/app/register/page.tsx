"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const registerSchema = z.object({
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Ungültige E-Mail Adresse"),
  phone: z.string().min(1, "Telefonnummer ist erforderlich"),
  fn: z.string().min(1, "Firmenbuchnummer (FN) ist erforderlich"),
  atu: z.string().min(1, "Umsatzsteuer-ID (ATU) ist erforderlich"),
  password: z.string().min(6, "Mindestens 6 Zeichen"),
  confirmPassword: z.string().min(6, "Mindestens 6 Zeichen"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Kennwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

/**
 * Register Component - Beautiful registration form with multi-field layout
 * @returns React Component displaying a responsive registration form with 8 fields organized into 4 sections
 */
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-black dark:via-slate-950 dark:to-purple-950 p-4 pt-12">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Card */}
        <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800/50 p-6 md:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/Logo.png" 
              alt="Zynqly Logo" 
              width={100} 
              height={32} 
              className="h-20 w-auto"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Kostenlos registrieren
            </h2>
            <p className="text-sm text-muted-foreground">
              Starten Sie noch heute mit Zynqly und vereinfachen Sie Ihre Geschäfte
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Information Section */}
            <div className="relative">
              <div className="absolute left-0 top-0 h-0.5 w-12 bg-gradient-to-r from-violet-600 to-transparent"></div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-4 ml-14">
                Persönliche Daten
              </h3>
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* First Name */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Vorname</label>
                  <input 
                    {...register("firstName")}
                    type="text"
                    placeholder="Max"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.firstName.message}</p>}
                </div>
                {/* Last Name */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Nachname</label>
                  <input 
                    {...register("lastName")}
                    type="text"
                    placeholder="Mustermann"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.lastName.message}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="relative pt-4">
              <div className="absolute left-0 top-4 h-0.5 w-12 bg-gradient-to-r from-violet-600 to-transparent"></div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-4 ml-14">
                Kontaktinformationen
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">E-Mail Adresse</label>
                  <input 
                    {...register("email")}
                    type="email"
                    placeholder="kontakt@beispiel.de"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email.message}</p>}
                </div>
                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Telefonnummer</label>
                  <input 
                    {...register("phone")}
                    type="tel"
                    placeholder="+43 660 1234567"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-2 font-medium">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Business Information Section */}
            <div className="relative pt-4">
              <div className="absolute left-0 top-4 h-0.5 w-12 bg-gradient-to-r from-violet-600 to-transparent"></div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-4 ml-14">
                Geschäftsdaten
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* FN */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Firmenbuchnummer (FN)</label>
                  <input 
                    {...register("fn")}
                    type="text"
                    placeholder="FN 123456x"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  />
                  {errors.fn && <p className="text-red-500 text-xs mt-2 font-medium">{errors.fn.message}</p>}
                </div>
                {/* ATU */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Umsatzsteuer-ID (ATU)</label>
                  <input 
                    {...register("atu")}
                    type="text"
                    placeholder="ATU12345678"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  />
                  {errors.atu && <p className="text-red-500 text-xs mt-2 font-medium">{errors.atu.message}</p>}
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="relative pt-4">
              <div className="absolute left-0 top-4 h-0.5 w-12 bg-gradient-to-r from-violet-600 to-transparent"></div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-4 ml-14">
                Sicherheit
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Password */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Kennwort</label>
                  <div className="relative">
                    <input 
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Sicheres Kennwort (min. 6 Zeichen)"
                      className="w-full px-4 py-3 pr-12 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{errors.password.message}</p>}
                </div>
                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-foreground">Kennwort bestätigen</label>
                  <div className="relative">
                    <input 
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Wiederholen Sie das Kennwort"
                      className="w-full px-4 py-3 pr-12 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-2 font-medium">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  required
                  className="mt-1 w-5 h-5 rounded border-2 border-gray-300 dark:border-slate-600 text-violet-600 accent-violet-600"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Ich stimme den{' '}
                  <Link href="#" className="text-violet-600 hover:underline font-medium">
                    Nutzungsbedingungen
                  </Link>
                  {' '}und der{' '}
                  <Link href="#" className="text-violet-600 hover:underline font-medium">
                    Datenschutzrichtlinie
                  </Link>
                  {' '}zu
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group mt-8"
            >
              Jetzt registrieren
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Bereits ein Konto?{' '}
            <Link 
              href="/login" 
              className="text-violet-600 hover:text-violet-700 dark:hover:text-violet-400 font-semibold hover:underline transition-colors"
            >
              Hier anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
