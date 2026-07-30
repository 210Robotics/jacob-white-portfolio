"use server";

import { getDb, isDatabaseConfigured } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactSchema } from "@/lib/validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please complete every field with valid information.",
    };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message:
        "Message storage is not connected yet. Please email Jacob directly at jmwhite407@gmail.com.",
    };
  }

  try {
    await getDb().insert(contactMessages).values({
      id: crypto.randomUUID(),
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    return {
      status: "success",
      message: "Message received. Jacob will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission failed.", error);
    return {
      status: "error",
      message:
        "The form could not send right now. Please email jmwhite407@gmail.com.",
    };
  }
}
