import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-narrow py-28 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-lo">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-hi">
        We could not find that app.
      </h1>
      <p className="mt-4 text-mid">
        It may have moved, been renamed, or never existed.
      </p>
      <div className="mt-8">
        <Link
          href="/apps"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-surface-base shadow-button transition-all hover:bg-white/90"
        >
          See all apps
        </Link>
      </div>
    </div>
  );
}
