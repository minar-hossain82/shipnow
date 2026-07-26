import { LoginForm } from "@/components/auth/login-form";
import { LoginHero } from "@/components/auth/login-hero";

export function AuthLayout() {
  return (
    <main className="grid min-h-dvh w-full overflow-x-hidden bg-white lg:grid-cols-[43.0556%_56.9444%]">
      <LoginHero />
      <LoginForm />
    </main>
  );
}
