import Image from "next/image";
import styles from "./login.module.css";

export function LoginHero() {
  return (
    <section className={styles.hero} aria-label="Welcome to ShipNow">
      <Image
        src="/images/login-hero.png"
        alt="ShipNow logistics and delivery"
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={styles.heroImage}
      />
    </section>
  );
}
