"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "./ui/button";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>
      <Field label="Subject" name="subject" />
      <label className="grid gap-2 text-sm font-medium text-zinc-300">
        Message
        <textarea
          name="message"
          required
          minLength={20}
          rows={7}
          className="rounded-md border border-white/12 bg-zinc-950 px-3 py-3 text-base text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-orange-400/60 focus:ring-2 focus:ring-orange-500/20"
          placeholder="Tell Jacob about the problem, team, or opportunity."
        />
      </label>
      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state.message ? (
        <p
          role="status"
          className={
            state.status === "success"
              ? "rounded-md border border-teal-400/20 bg-teal-400/8 p-3 text-sm text-teal-200"
              : "rounded-md border border-orange-400/20 bg-orange-400/8 p-3 text-sm text-orange-200"
          }
        >
          {state.message}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending} className="sm:w-fit">
        {pending ? "Sending…" : "Send message"}
        <Send className="size-4" />
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      {label}
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="h-11 rounded-md border border-white/12 bg-zinc-950 px-3 text-base text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-orange-400/60 focus:ring-2 focus:ring-orange-500/20"
      />
    </label>
  );
}
