import Image from "next/image";

export function LoginHero() {
  return (
    <section className="relative hidden min-w-0 overflow-hidden bg-[#8068ee] lg:block">
      <Image
        src="/images/login-hero.png"
        alt="ShipNow delivery illustration"
        fill
        priority
        sizes="43vw"
        className="origin-top translate-y-4 scale-90 object-cover object-center"
      />
    </section>
  );
}
