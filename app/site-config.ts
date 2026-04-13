const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.includes("localhost")) {
    return `http://${trimmed}`;
  }

  return `https://${trimmed}`;
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL,
);
