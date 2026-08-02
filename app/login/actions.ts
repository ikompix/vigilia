"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.APP_PASSWORD;

  if (!expected) {
    return { error: "APP_PASSWORD n'est pas configuré côté serveur." };
  }
  if (password !== expected) {
    return { error: "Mot de passe incorrect." };
  }

  await createSession();
  redirect("/");
}
