import { prisma } from "@/lib/db";
import { dayRange, formatDateLong, formatTime } from "@/lib/format";
import { Card, ClientBadge, EmptyState, PageHeader } from "./_components";

export const dynamic = "force-dynamic";

type ClientLite = { id: string; name: string; color: string };

function clientOf(clients: ClientLite[], id: string | null) {
  return id ? clients.find((c) => c.id === id) : undefined;
}

export default async function DashboardPage() {
  const { start, end } = dayRange();
  const todayDateOnly = new Date(
    Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
  );

  const [clients, todo, meetings, emails] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.dailyTodo.findUnique({
      where: { date: todayDateOnly },
      include: { items: { orderBy: { order: "asc" } } },
    }),
    prisma.meeting.findMany({
      where: { startsAt: { gte: start, lt: end }, status: "CONFIRMED" },
      orderBy: { startsAt: "asc" },
    }),
    prisma.email.findMany({ orderBy: { receivedAt: "desc" }, take: 8 }),
  ]);

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        subtitle={`Aujourd'hui — ${formatDateLong(new Date())}`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Todo du jour */}
        <div className="lg:col-span-2">
          <Card title="Todo du jour">
            {!todo ? (
              <EmptyState>
                Aucune todo pour aujourd'hui. La génération automatique par Claude
                arrivera en Phase&nbsp;3.
              </EmptyState>
            ) : (
              <div className="space-y-4">
                {todo.summary ? (
                  <p className="text-sm text-slate-600">{todo.summary}</p>
                ) : null}
                <ul className="space-y-2">
                  {todo.items.map((item) => {
                    const c = clientOf(clients, item.clientId);
                    return (
                      <li
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg border border-slate-100 px-3 py-2"
                      >
                        <span
                          className={`mt-0.5 h-4 w-4 shrink-0 rounded border ${
                            item.done
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300"
                          }`}
                          aria-hidden
                        />
                        <span className="flex-1 text-sm">
                          <span
                            className={
                              item.done
                                ? "text-slate-400 line-through"
                                : "text-slate-800"
                            }
                          >
                            {item.text}
                          </span>
                        </span>
                        {item.priority === 1 ? (
                          <span className="rounded bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-600">
                            prioritaire
                          </span>
                        ) : null}
                        {c ? <ClientBadge name={c.name} color={c.color} /> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </Card>
        </div>

        {/* Réunions du jour */}
        <div>
          <Card title="Réunions du jour">
            {meetings.length === 0 ? (
              <EmptyState>Aucune réunion aujourd'hui.</EmptyState>
            ) : (
              <ul className="space-y-3">
                {meetings.map((m) => {
                  const c = clientOf(clients, m.clientId);
                  return (
                    <li key={m.id} className="flex items-start gap-3">
                      <span className="w-12 shrink-0 text-sm font-semibold text-slate-900">
                        {formatTime(m.startsAt)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-slate-800">
                          {m.title}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2">
                          {c ? (
                            <ClientBadge name={c.name} color={c.color} />
                          ) : null}
                          {m.location ? (
                            <span className="truncate text-xs text-slate-400">
                              {m.location}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {/* Derniers mails */}
      <div className="mt-6">
        <Card title="Derniers mails">
          {emails.length === 0 ? (
            <EmptyState>
              Aucun mail. L'ingestion depuis la boîte générique arrivera en
              Phase&nbsp;2.
            </EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {emails.map((mail) => {
                const c = clientOf(clients, mail.clientId);
                return (
                  <li key={mail.id} className="flex items-center gap-4 py-3">
                    <span className="w-12 shrink-0 text-xs text-slate-400">
                      {formatTime(mail.receivedAt)}
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
                    {c ? <ClientBadge name={c.name} color={c.color} /> : null}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
