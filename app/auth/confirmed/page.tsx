import type { Metadata } from "next";
import { ConfirmedPage } from "./ConfirmedPage";

export const metadata: Metadata = {
  title: "Email Verified — Prompted",
  description:
    "Your email has been verified. Your AI learning journey with Prompted is ready to begin.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmedPage />;
}
