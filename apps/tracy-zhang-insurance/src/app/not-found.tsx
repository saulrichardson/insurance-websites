import Link from "next/link";

import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-white">
      <Container className="py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/70 bg-white/80 p-10 text-center shadow-[0_1px_0_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="text-sm font-medium text-slate-500">404</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            The page you’re looking for doesn’t exist. If you need help right
            now, contact us and we’ll point you in the right direction.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className={buttonClasses({ variant: "primary", size: "md" })}
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className={buttonClasses({ variant: "outline", size: "md" })}
              href="/"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
