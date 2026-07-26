import { Logo } from "@/components/auth/logo";

export function LoginForm() {
  return (
    <section className="flex min-w-0 items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
      <div className="w-full max-w-[400px] translate-y-9">
        <Logo />

        <h1 className="text-center text-[28px] leading-tight font-bold tracking-tight text-gray-900">
          Welcome Back
        </h1>
        <p className="mt-2.5 text-center text-sm leading-5 text-gray-500">
          Log in to continue managing your logistics with ShipNow
        </p>

        <form className="mt-8">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 h-12 w-full rounded-lg border border-gray-100 bg-gray-50 px-4 text-xs text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="password" className="block text-xs font-medium text-gray-800">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-12 w-full rounded-lg border border-gray-100 bg-gray-50 pr-11 pl-4 text-xs text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400"
              >
                <path
                  d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex min-h-5 items-center justify-between gap-4 text-xs leading-5">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                className="m-0 h-4 w-4 shrink-0 rounded border-gray-300 accent-purple-600"
              />
              Remember Me
            </label>
            <a
              href="#"
              className="font-medium text-purple-600 transition-colors hover:text-purple-700"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="font-semibold text-purple-600 transition-colors hover:text-purple-700"
          >
            Register
          </a>
        </p>
      </div>
    </section>
  );
}
