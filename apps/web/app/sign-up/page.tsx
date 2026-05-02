"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCreateUserMutation } from "@/redux/api/apis/auth";

// ---------------------------------------------------------------------------
// Zod schema — defines the shape and validation rules for the sign-up form
// ---------------------------------------------------------------------------
const signUpSchema = z.object({
  // Full name: at least 2 characters
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein."),

  // Standard email validation
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),

  // Austrian phone: must start with +43 followed by 10–13 digits
  phone: z.string().regex(
    /^\+43\d{10,13}$/,
    "Bitte gib eine gültige österreichische Nummer ein (z. B. +4369912345678)."
  ),

  // Password: minimum 8 characters
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein."),

  // Role: one of the three allowed enum values (matches Java backend enum)
  role: z.enum(["UNTERNEHMER", "FAHRER", "BUCHHALTER"] as const, {
    required_error: "Bitte wähle eine Rolle aus.",
  }),
  // Terms must be accepted
  terms: z.boolean().refine((val) => val === true, {
    message: "Du musst die AGB akzeptieren.",
  }),
});

// Infer the TypeScript type from the schema so we get full type safety
export type SignUpFormValues = z.infer<typeof signUpSchema>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [createUser] = useCreateUserMutation();
  // Initialise react-hook-form with the Zod resolver and sensible defaults
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+43", // pre-fill country code so the user only types the rest
      password: "",
      role: "UNTERNEHMER",
      terms: false,
    },
  });

  // Called only when all Zod validations pass
  const onSubmit = async (values: SignUpFormValues) => {
    try {
      console.log(values)
       const user = await createUser(values).unwrap();

        console.log(user);
    } catch(err: any) {
      const errorMessage = "An error occured while creating the user!"
    }
  };

  return (
    <div
      className="min-h-screen flex relative"
      style={{ background: "var(--z-bg-page)" }}
    >
      {/* ── Left panel — form ─────────────────────────────── */}
      <main className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 sm:px-12 md:px-20 lg:px-16 xl:px-24">

        {/* Back link */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-1.5 text-sm font-medium hover:opacity-60 transition-opacity"
          style={{ color: "var(--z-text-secondary)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          Zurück
        </Link>

        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md mx-auto">

          {/* Mobile-only logo */}
          <Link href="/" className="flex items-center justify-center mb-10 lg:hidden">
            <Image src="/Logo.svg" alt="Zynqly" width={200} height={101} className="h-12 w-auto" priority />
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--z-text-main)" }}>
              Account erstellen
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--z-text-secondary)" }}>
              Starte kostenlos und digitalisiere deinen Taxibetrieb
            </p>
          </div>

          {/* Google SSO button — not part of the RHF form */}
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center gap-3 w-full h-auto px-4 py-3 rounded-xl text-sm font-medium active:scale-[0.98]"
            style={{ borderColor: "var(--z-border)", color: "var(--z-text-main)", background: "var(--z-bg-surface)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Mit Google fortfahren
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "var(--z-border)" }} />
            <span className="text-xs" style={{ color: "var(--z-text-muted)" }}>oder mit E-Mail</span>
            <div className="flex-1 h-px" style={{ background: "var(--z-border)" }} />
          </div>

          {/* ── Form ── */}
          <form
            id="sign-up-form"
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>

              {/* ── Full name ── */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name" style={{ color: "var(--z-text-main)" }}>
                      Vollständiger Name
                    </FieldLabel>
                    <div
                      className="flex items-center gap-2.5 px-3.5 rounded-xl border text-sm"
                      style={{ borderColor: "var(--z-border)", background: "var(--z-bg-surface)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-text-muted)" }}>
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                      </svg>
                      {/* Spread field to wire up onChange, onBlur, value, ref */}
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Mehmet Kaya"
                        autoComplete="name"
                        aria-invalid={fieldState.invalid}
                        className="flex-1 h-auto py-3 border-0 bg-transparent rounded-none text-sm placeholder:text-[var(--z-text-muted)] focus-visible:ring-0 focus-visible:border-0"
                        style={{ color: "var(--z-text-main)" }}
                      />
                    </div>
                    {/* Renders the Zod error message for this field */}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* ── Email ── */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email" style={{ color: "var(--z-text-main)" }}>
                      E-Mail
                    </FieldLabel>
                    <div
                      className="flex items-center gap-2.5 px-3.5 rounded-xl border text-sm"
                      style={{ borderColor: "var(--z-border)", background: "var(--z-bg-surface)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-text-muted)" }}>
                        <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                        <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                      </svg>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                        className="flex-1 h-auto py-3 border-0 bg-transparent rounded-none text-sm placeholder:text-[var(--z-text-muted)] focus-visible:ring-0 focus-visible:border-0"
                        style={{ color: "var(--z-text-main)" }}
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* ── Phone ── */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone" style={{ color: "var(--z-text-main)" }}>
                      Telefonnummer
                    </FieldLabel>
                    <div
                      className="flex items-center gap-2.5 px-3.5 rounded-xl border text-sm"
                      style={{ borderColor: "var(--z-border)", background: "var(--z-bg-surface)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-text-muted)" }}>
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                      </svg>
                      <Input
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="+4369912345678"
                        autoComplete="tel"
                        aria-invalid={fieldState.invalid}
                        className="flex-1 h-auto py-3 border-0 bg-transparent rounded-none text-sm placeholder:text-[var(--z-text-muted)] focus-visible:ring-0 focus-visible:border-0"
                        style={{ color: "var(--z-text-main)" }}
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* ── Password ── */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password" style={{ color: "var(--z-text-main)" }}>
                      Passwort
                    </FieldLabel>
                    <div
                      className="flex items-center gap-2.5 px-3.5 rounded-xl border text-sm"
                      style={{ borderColor: "var(--z-border)", background: "var(--z-bg-surface)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-4 h-4 flex-shrink-0" style={{ color: "var(--z-text-muted)" }}>
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                      </svg>
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mindestens 8 Zeichen"
                        autoComplete="new-password"
                        aria-invalid={fieldState.invalid}
                        className="flex-1 h-auto py-3 border-0 bg-transparent rounded-none text-sm placeholder:text-[var(--z-text-muted)] focus-visible:ring-0 focus-visible:border-0"
                        style={{ color: "var(--z-text-main)" }}
                      />
                      {/* Toggle visibility — local state, not part of form values */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((p) => !p)}
                        className="flex-shrink-0 opacity-50 hover:opacity-80 h-auto w-auto p-0 hover:bg-transparent"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: "var(--z-text-main)" }}>
                            <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                          </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: "var(--z-text-main)" }}>
                              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41Z" clipRule="evenodd" />
                            </svg>
                          )}
                      </Button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* ── Role ── */}
              {/*
                Select is a controlled component — Controller wires it to RHF.
                onValueChange updates the RHF state when the user picks an option.
              */}
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="role" style={{ color: "var(--z-text-main)" }}>
                      Rolle
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}  // update RHF state on pick
                      defaultValue={field.value}       // initialise from RHF default
                    >
                      <SelectTrigger
                        id="role"
                        aria-invalid={fieldState.invalid}
                        className="w-full h-auto px-3.5 py-3 rounded-xl text-sm cursor-pointer"
                        style={{
                          borderColor: "var(--z-border)",
                          background: "var(--z-bg-surface)",
                          color: "var(--z-text-main)",
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Values are UPPERCASE to match the Java Role enum */}
                        <SelectItem value="UNTERNEHMER">Unternehmer</SelectItem>
                        <SelectItem value="FAHRER">Fahrer</SelectItem>
                        <SelectItem value="BUCHHALTER">Buchhalter</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

            </FieldGroup>

            {/* ── Terms checkbox ── */}
            {/*
              Checkbox is controlled via checked + onCheckedChange wired to RHF field.
            */}
            <Controller
              name="terms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-start gap-2.5 text-sm" style={{ color: "var(--z-text-secondary)" }}>
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      className="mt-0.5 flex-shrink-0 rounded-sm data-[state=checked]:bg-[var(--z-color-main)] data-[state=checked]:border-[var(--z-color-main)]"
                    />
                    <Label htmlFor="terms" className="cursor-pointer font-normal leading-snug" style={{ color: "var(--z-text-secondary)" }}>
                      Ich akzeptiere die{" "}
                      <Link href="/agb" className="font-medium hover:opacity-70" style={{ color: "var(--z-color-main)" }}>
                        AGB
                      </Link>{" "}
                      und{" "}
                      <Link href="/datenschutz" className="font-medium hover:opacity-70" style={{ color: "var(--z-color-main)" }}>
                        Datenschutzrichtlinie
                      </Link>
                    </Label>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* ── Submit ── */}
            <Button
              type="submit"
              className="flex items-center justify-center gap-2 w-full h-auto py-3 rounded-xl text-white font-semibold text-sm shadow-md hover:opacity-90 active:scale-[0.98] mt-1"
              style={{ background: "var(--z-color-main)" }}
            >
              Registrieren
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Button>
          </form>

          {/* Switch to login */}
          <p className="mt-6 text-center text-sm" style={{ color: "var(--z-text-secondary)" }}>
            Bereits registriert?{" "}
            <Link href="/sign-in" className="font-semibold hover:opacity-70 transition-opacity" style={{ color: "var(--z-color-main)" }}>
              Anmelden
            </Link>
          </p>
        </div>
      </main>

      {/* ── Right panel — brand aside (desktop only) ──────── */}
      <style>{`
@keyframes blob1 {
0%   { transform: translate(0px, 0px); }
20%  { transform: translate(-60px, 80px); }
40%  { transform: translate(-130px, 20px); }
60%  { transform: translate(-70px, 150px); }
80%  { transform: translate(-10px, 80px); }
100% { transform: translate(0px, 0px); }
}
@keyframes blob2 {
0%   { transform: translate(0px, 0px); }
20%  { transform: translate(80px, -60px); }
40%  { transform: translate(20px, -130px); }
60%  { transform: translate(110px, -70px); }
80%  { transform: translate(40px, -10px); }
100% { transform: translate(0px, 0px); }
}
`}</style>
      <aside
        className="hidden lg:flex flex-col items-center justify-center w-1/2 px-16 text-white relative overflow-hidden"
        style={{ background: "var(--z-color-main)" }}
      >
        <div
          className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-20"
          style={{ background: "var(--z-violet-300)", animation: "blob1 14s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full opacity-15"
          style={{ background: "var(--z-violet-800)", animation: "blob2 17s ease-in-out infinite" }}
        />
        <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-sm">
          <Link href="/" className="flex items-center justify-center mb-2">
            <Image src="/Logo.svg" alt="Zynqly" width={200} height={101} className="h-20 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
              <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
              <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Werde Teil der Zynqly-Familie</h2>
          <p className="text-sm leading-relaxed opacity-85">
            Über 2.400 Fahrer vertrauen bereits auf Zynqly. Starte jetzt kostenlos und digitalisiere dein Business.
          </p>
        </div>
      </aside>
    </div>
  );
}
