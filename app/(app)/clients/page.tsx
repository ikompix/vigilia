import { prisma } from "@/lib/db";
import { Card, ClientBadge, EmptyState, PageHeader } from "../_components";
import { NewClientForm } from "./_form";
import { deleteClient } from "./actions";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { emails: true, meetings: true } },
    },
  });

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Les clients de ton activité et leur adresse mail dédiée."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title={`Liste (${clients.length})`}>
            {clients.length === 0 ? (
              <EmptyState>Aucun client pour l'instant.</EmptyState>
            ) : (
              <ul className="divide-y divide-slate-100">
                {clients.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <ClientBadge name={c.name} color={c.color} />
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {c.address} · {c._count.emails} mail(s) ·{" "}
                        {c._count.meetings} réunion(s)
                      </p>
                    </div>
                    <form action={deleteClient}>
                      <input type="hidden" name="id" value={c.id} />
                      <button
                        type="submit"
                        className="rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        Supprimer
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div>
          <Card title="Ajouter un client">
            <NewClientForm />
          </Card>
        </div>
      </div>
    </>
  );
}
