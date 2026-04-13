"use client";

import { FormEvent, useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const USE_BEARER_AUTH =
  SUPABASE_KEY && !SUPABASE_KEY.startsWith("sb_publishable_") && !SUPABASE_KEY.startsWith("sb_secret_");

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      setError("Entrez une adresse email valide.");
      return;
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setError("Configuration manquante. Ajoutez les variables Supabase.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          ...(USE_BEARER_AUTH ? { Authorization: `Bearer ${SUPABASE_KEY}` } : {}),
          "Content-Type": "application/json",
          Prefer: "return=minimal,resolution=ignore-duplicates",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (response.ok || response.status === 201 || response.status === 409) {
        setSubmitted(true);
        setEmail("");
        return;
      }

      let details = "";

      try {
        const payload = await response.json();
        details =
          payload.message || payload.error_description || payload.error || payload.hint || "";
      } catch {
        details = await response.text();
      }

      if (response.status === 401 || response.status === 403) {
        setError("Acces refuse par Supabase. Verifiez la policy d'insertion de la table waitlist.");
        return;
      }

      if (details) {
        setError(`Erreur inscription (${response.status}) : ${details}`);
        return;
      }

      setError(`Erreur lors de l'inscription (${response.status}). Reessayez dans un instant.`);
    } catch {
      setError("Erreur reseau. Verifiez votre connexion puis recommencez.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="waitlist-success" role="status" aria-live="polite">
        Merci. Vous recevrez l&apos;acces de lancement et les prochaines nouvelles produit par email.
      </div>
    );
  }

  return (
    <form className="waitlist-form" id="waitlist" onSubmit={handleSubmit}>
      <label className="waitlist-label" htmlFor="email">
        Email professionnel
      </label>
      <div className="waitlist-row">
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="waitlist-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="prenom@entreprise.fr"
          disabled={loading}
          aria-describedby="waitlist-hint"
        />
        <button className="button button-primary waitlist-button" type="submit" disabled={loading}>
          {loading ? "Inscription..." : "Demander un acces"}
        </button>
      </div>
      <p className="waitlist-hint" id="waitlist-hint">
        30 jours offerts, 5 entreprises incluses, sans carte bancaire.
      </p>
      {error ? (
        <p className="waitlist-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
