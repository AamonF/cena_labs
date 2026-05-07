import type { Metadata } from "next";
import { ConfirmedPage } from "./ConfirmedPage";

export const metadata: Metadata = {
  title: "Email Verified — Promptly",
  description:
    "Your email has been verified. Your AI learning journey with Promptly is ready to begin.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmedPage />;
}
