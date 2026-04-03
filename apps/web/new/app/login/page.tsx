"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Ungültige E-Mail Adresse"),
  password: z.string().min(1, "Kennwort erforderlich"),
});

type LoginForm = z.infer<typeof loginSchema>;

/**
 * Login Component - Beautiful authentication page with password visibility toggle and email validation
 * @returns React Component displaying a responsive login form
 */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-black dark:via-slate-950 dark:to-purple-950 p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800/50 p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
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
              Willkommen zurück
            </h2>
            <p className="text-sm text-muted-foreground">
              Melde dich an, um auf dein Dashboard zuzugreifen
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-foreground">
                E-Mail Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-violet-400 dark:text-violet-500 group-focus-within:text-violet-600 transition-colors" />
                <input 
                  {...register("email")}
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200" 
                  placeholder="deine@email.de"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Kennwort
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-violet-400 dark:text-violet-500 group-focus-within:text-violet-600 transition-colors" />
                <input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors duration-200" 
                  placeholder="••••••••"
                />
                {/* Password Visibility Toggle */}
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-2 border-gray-300 dark:border-slate-600 text-violet-600 accent-violet-600"
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Angemeldet bleiben
                </span>
              </label>
              <Link 
                href="#" 
                className="text-violet-600 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                Passwort vergessen?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Anmelden
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-900 text-gray-500">oder</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground">
            Noch kein Konto?{" "}
            <Link 
              href="/register" 
              className="text-violet-600 hover:text-violet-700 dark:hover:text-violet-400 font-semibold hover:underline transition-colors"
            >
              Jetzt registrieren
            </Link>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Durch Anmelden stimmen Sie unseren{' '}
          <Link href="#" className="text-violet-600 hover:underline">Nutzungsbedingungen</Link>
          {' '}zu
        </p>
      </div>
    </div>
  );
}
