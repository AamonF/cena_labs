import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-narrow py-28 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-lo">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-hi">
        Page not found.
      </h1>
      <p className="mt-4 text-mid">
        The page you are looking for does not exist, or may have moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-surface-base shadow-button transition-all hover:bg-white/90"
        >
          Go home
        </Link>
        <Link
          href="/apps"
          className="rounded-lg bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-hi ring-1 ring-inset ring-white/[0.10] transition-all hover:bg-white/[0.11]"
        >
          Browse apps
        </Link>
      </div>
    </div>
  );
}
