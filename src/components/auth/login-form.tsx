"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import styles from "./login.module.css";

type LoginErrors = Partial<Record<"email" | "password", string>>;

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      {hidden && <path d="M4 4l16 16" />}
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: LoginErrors = {};
    if (!email.trim()) nextErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address";
    if (!password) nextErrors.password = "Password is required";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      sessionStorage.setItem("shipnow-session", JSON.stringify({ email, remember }));
      router.push("/dashboard");
    }
  }

  return (
    <section className={styles.formPanel}>
      <div className={styles.formContent}>
        <Logo />
        <h1>Welcome Back</h1>
        <p className={styles.intro}>Log in to continue managing your logistics with ShipNow</p>

        <form onSubmit={submit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter a valid email address"
              value={email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
              }}
            />
            {errors.email && <small id="email-error" className={styles.error}>{errors.email}</small>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordField}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Create a strong password"
                value={password}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
                }}
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                <EyeIcon hidden={!showPassword} />
              </button>
            </div>
            {errors.password && <small id="password-error" className={styles.error}>{errors.password}</small>}
          </div>

          <div className={styles.options}>
            <label><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> <span>Remember Me</span></label>
            <a href="#">Forgot Password?</a>
          </div>

          <button className={styles.loginButton} type="submit">Login</button>
        </form>

        <p className={styles.register}>Don&apos;t have an account? <a href="#">Register</a></p>
      </div>
    </section>
  );
}
