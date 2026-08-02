import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateShort, formatTime } from "@/lib/format";
import { Card, ClientBadge, EmptyState, PageHeader } from "../_components";

export const dynamic = "force-dynamic";

export default async function EmailsPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const { client: clientId } = await searchParams;

  const [clients, emails] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.email.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { receivedAt: "desc" },
      take: 100,
      include: { client: true },
    }),
  ]);

  return (
    <>
      <PageHeader
        title="Mails"
        subtitle="Tous les mails transférés vers la boîte générique, rattachés à leur client."
      />

      {/* Filtres par client */}
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterChip href="/emails" active={!clientId} label="Tous" />
        {clients.map((c) => (
          <FilterChip
            key={c.id}
            href={`/emails?client=${c.id}`}
            active={clientId === c.id}
            label={c.name}
            color={c.color}
          />
        ))}
      </div>

      <Card title={`${emails.length} mail(s)`}>
        {emails.length === 0 ? (
          <EmptyState>
            Aucun mail. L'ingestion depuis la boîte générique arrivera en
            Phase&nbsp;2.
          </EmptyState>
        ) : (
          <ul className="divide-y divide-slate-100">
            {emails.map((mail) => (
              <li key={mail.id} className="flex items-center gap-4 py-3">
                <span className="w-20 shrink-0 text-xs text-slate-400">
                  {formatDateShort(mail.receivedAt)} {formatTime(mail.receivedAt)}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm ${
                      mail.isRead
                        ? "text-slate-500"
                        : "font-medium text-slate-900"
                    }`}
                  >
                    {mail.subject}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {mail.fromName ?? mail.fromAddress} — {mail.preview}
                  </p>
                </div>
                {mail.client ? (
                  <ClientBadge name={mail.client.name} color={mail.client.color} />
                ) : (
                  <span className="text-xs text-slate-300">non attribué</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function FilterChip({
  href,
  active,
  label,
  color,
}: {
  href: string;
  active: boolean;
  label: string;
  color?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
        active
          ? "bg-slate-900 text-white ring-slate-900"
          : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {color ? (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden
        />
      ) : null}
      {label}
    </Link>
  );
}
