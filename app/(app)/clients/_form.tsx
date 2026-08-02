"use client";

import { useActionState, useEffect, useRef } from "react";
import { createClient, type ClientFormState } from "./actions";

const initial: ClientFormState = {};

export function NewClientForm() {
  const [state, action, pending] = useActionState(createClient, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-600">Nom</label>
          <input
            name="name"
            required
            placeholder="Acme SA"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">
            Adresse mail (côté client)
          </label>
          <input
            name="address"
            type="email"
            required
            placeholder="contact@acme.example"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600">Couleur</label>
          <input
            name="color"
            type="color"
            defaultValue="#6366f1"
            className="h-8 w-10 cursor-pointer rounded border border-slate-300"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {pending ? "Ajout…" : "Ajouter le client"}
        </button>
        {state.error ? (
          <span className="text-sm text-red-600">{state.error}</span>
        ) : null}
      </div>
    </form>
  );
}
