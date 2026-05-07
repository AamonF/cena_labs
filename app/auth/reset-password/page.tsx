import type { Metadata } from "next";
import { ResetPasswordPage } from "./ResetPasswordPage";

export const metadata: Metadata = {
  title: "Reset Password — Promptly",
  description:
    "Set a new password for your Promptly account. Enter your new password below to regain access.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ResetPasswordPage />;
}
