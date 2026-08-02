"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export type ClientFormState = { error?: string; ok?: boolean };

export async function createClient(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const address = String(formData.get("address") ?? "")
    .trim()
    .toLowerCase();
  const color = String(formData.get("color") ?? "#6366f1");

  if (!name || !address) {
    return { error: "Nom et adresse sont requis." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) {
    return { error: "Adresse e-mail invalide." };
  }

  try {
    await prisma.client.create({ data: { name, address, color } });
  } catch {
    return { error: "Un client utilise déjà cette adresse." };
  }

  revalidatePath("/clients");
  return { ok: true };
}

export async function deleteClient(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.client.delete({ where: { id } });
  revalidatePath("/clients");
}
