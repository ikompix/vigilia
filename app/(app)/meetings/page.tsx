import { prisma } from "@/lib/db";
import { dayRange, formatDateLong, formatTime } from "@/lib/format";
import { Card, ClientBadge, EmptyState, PageHeader } from "../_components";

export const dynamic = "force-dynamic";

export default async function MeetingsPage() {
  const { start } = dayRange();

  const meetings = await prisma.meeting.findMany({
    where: { startsAt: { gte: start }, status: "CONFIRMED" },
    orderBy: { startsAt: "asc" },
    take: 100,
    include: { client: true },
  });

  // Regroupe les réunions par jour.
  const byDay = new Map<string, typeof meetings>();
  for (const m of meetings) {
    const key = formatDateLong(m.startsAt);
    const list = byDay.get(key) ?? [];
    list.push(m);
    byDay.set(key, list);
  }

  return (
    <>
      <PageHeader
        title="Réunions"
        subtitle="Réunions à venir, reconstruites depuis les invitations .ics transférées."
      />

      {meetings.length === 0 ? (
        <Card title="À venir">
          <EmptyState>
            Aucune réunion à venir. Le parsing des invitations .ics arrivera en
            Phase&nbsp;2.
          </EmptyState>
        </Card>
      ) : (
        <div className="space-y-6">
          {[...byDay.entries()].map(([day, list]) => (
            <Card key={day} title={day}>
              <ul className="space-y-3">
                {list.map((m) => (
                  <li key={m.id} className="flex items-start gap-4">
                    <span className="w-24 shrink-0 text-sm font-semibold text-slate-900">
                      {formatTime(m.startsAt)}
                      {m.endsAt ? (
                        <span className="font-normal text-slate-400">
                          {" "}
                          – {formatTime(m.endsAt)}
                        </span>
                      ) : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800">
                        {m.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {m.client ? (
                          <ClientBadge
                            name={m.client.name}
                            color={m.client.color}
                          />
                        ) : null}
                        {m.location ? (
                          <span className="text-xs text-slate-400">
                            {m.location}
                          </span>
                        ) : null}
                        {m.organizer ? (
                          <span className="text-xs text-slate-300">
                            org. {m.organizer}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
