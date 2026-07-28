import { LoginForm } from "./login-form";
import { LoginHero } from "./login-hero";
import styles from "./login.module.css";

export function AuthLayout() {
  return (
    <main className={styles.page}>
      <LoginHero />
      <LoginForm />
    </main>
  );
}
