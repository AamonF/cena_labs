"use client";

import { useState } from "react";
import { site } from "@/data/site";

type FormState = "idle" | "submitting" | "success" | "error";

const SUBJECTS = [
  "Subscription & Billing",
  "Account Issue",
  "Privacy & Data Request",
  "Legal Request",
  "Bug Report",
  "Feature Feedback",
  "Press & Partnership",
  "Other",
] as const;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-mid">{label}</label>
      {children}
      {error ? (
        <p className="text-[12px] text-red-400">{error}</p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/[0.08] bg-surface-raised px-4 py-3 text-[15px] text-hi placeholder:text-lo " +
  "outline-none ring-offset-0 transition-colors " +
  "focus:border-white/20 focus:ring-1 focus:ring-white/10 " +
  "disabled:opacity-50";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim()) {
      e.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      e.message = "Please provide a bit more detail (at least 20 characters).";
    }
    return e;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setState("submitting");
    // Simulate async submission — replace with real endpoint when ready
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-surface-raised px-6 py-10 text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-[22px]">
          ✓
        </div>
        <h2 className="mb-2 text-[18px] font-semibold tracking-tight text-hi">
          Message received
        </h2>
        <p className="text-[15px] leading-relaxed text-mid">
          Thanks for reaching out. We typically respond within{" "}
          <span className="text-hi">24–72 hours</span>.
          <br />
          We&apos;ll reply to{" "}
          <span className="font-medium text-hi">{form.email}</span>.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-6 text-[13px] text-lo transition-colors hover:text-mid"
        >
          Send another message →
        </button>
      </div>
    );
  }

  const busy = state === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            disabled={busy}
            className={inputClass}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={busy}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject}>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          disabled={busy}
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            Select a subject…
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your question or issue in as much detail as helpful…"
          rows={6}
          disabled={busy}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {state === "error" ? (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-[14px] text-red-400">
          Something went wrong. Please email us directly at{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="underline underline-offset-4"
          >
            {site.supportEmail}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={
          "mt-1 w-full rounded-lg px-6 py-3.5 text-[15px] font-semibold tracking-tight transition-all " +
          "bg-white text-ink-900 shadow-button " +
          "hover:bg-white/90 active:scale-[0.98] " +
          "disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {busy ? "Sending…" : "Send message"}
      </button>

      <p className="text-center text-[12px] text-lo">
        Or email us directly at{" "}
        <a
          href={`mailto:${site.supportEmail}`}
          className="text-mid transition-colors hover:text-hi"
        >
          {site.supportEmail}
        </a>
      </p>
    </form>
  );
}
