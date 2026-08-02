import { PrismaClient, MeetingStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Renvoie une date à `heure`:`min` aujourd'hui (heure locale du serveur).
function todayAt(hour: number, minute = 0): Date {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}

// Minuit (UTC) du jour — pour la clé unique `date` de DailyTodo.
function todayDateOnly(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

async function main() {
  console.log("→ Nettoyage…");
  await prisma.todoItem.deleteMany();
  await prisma.dailyTodo.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.email.deleteMany();
  await prisma.client.deleteMany();

  console.log("→ Création des 3 clients…");
  const acme = await prisma.client.create({
    data: { name: "Acme SA", address: "contact@acme.example", color: "#6366f1" },
  });
  const globex = await prisma.client.create({
    data: { name: "Globex", address: "hello@globex.example", color: "#10b981" },
  });
  const initech = await prisma.client.create({
    data: { name: "Initech", address: "info@initech.example", color: "#f59e0b" },
  });

  console.log("→ Quelques mails d'exemple…");
  await prisma.email.createMany({
    data: [
      {
        messageId: "seed-1@example",
        clientId: acme.id,
        fromAddress: "marie@acme.example",
        fromName: "Marie Dupont",
        toAddress: acme.address,
        subject: "Validation du devis Q3",
        preview: "Bonjour, peux-tu confirmer le devis avant vendredi ?",
        bodyText: "Bonjour,\n\nPeux-tu confirmer le devis avant vendredi ? Merci.\n\nMarie",
        receivedAt: todayAt(8, 12),
      },
      {
        messageId: "seed-2@example",
        clientId: globex.id,
        fromAddress: "paul@globex.example",
        fromName: "Paul Martin",
        toAddress: globex.address,
        subject: "Retour sur la maquette",
        preview: "Quelques ajustements sur la page d'accueil…",
        bodyText: "Salut,\n\nQuelques ajustements sur la page d'accueil, je te fais un retour détaillé.\n\nPaul",
        receivedAt: todayAt(9, 3),
      },
      {
        messageId: "seed-3@example",
        clientId: initech.id,
        fromAddress: "sophie@initech.example",
        fromName: "Sophie Bernard",
        toAddress: initech.address,
        subject: "Facture de février",
        preview: "La facture est réglée, merci !",
        bodyText: "Bonjour,\n\nLa facture est réglée, merci pour ta réactivité.\n\nSophie",
        receivedAt: todayAt(7, 45),
        isRead: true,
      },
    ],
  });

  console.log("→ Deux réunions du jour…");
  await prisma.meeting.create({
    data: {
      uid: "seed-meeting-1@example",
      clientId: acme.id,
      title: "Point hebdo Acme",
      location: "Microsoft Teams",
      organizer: "marie@acme.example",
      startsAt: todayAt(10, 0),
      endsAt: todayAt(10, 30),
      status: MeetingStatus.CONFIRMED,
    },
  });
  await prisma.meeting.create({
    data: {
      uid: "seed-meeting-2@example",
      clientId: globex.id,
      title: "Revue de maquette Globex",
      location: "Microsoft Teams",
      organizer: "paul@globex.example",
      startsAt: todayAt(14, 30),
      endsAt: todayAt(15, 30),
      status: MeetingStatus.CONFIRMED,
    },
  });

  console.log("→ Todo du jour (exemple — sera générée par Claude en Phase 3)…");
  await prisma.dailyTodo.create({
    data: {
      date: todayDateOnly(),
      summary:
        "Journée orientée validation client : deux points de suivi et un devis à confirmer.",
      model: "exemple-seed",
      items: {
        create: [
          { text: "Confirmer le devis Q3 à Marie (Acme) avant vendredi", clientId: acme.id, priority: 1, order: 0 },
          { text: "Préparer le point hebdo Acme de 10h", clientId: acme.id, priority: 2, order: 1 },
          { text: "Relire la maquette avant la revue Globex de 14h30", clientId: globex.id, priority: 1, order: 2 },
          { text: "Classer la facture de février (Initech) — réglée", clientId: initech.id, priority: 3, done: true, order: 3 },
        ],
      },
    },
  });

  console.log("✓ Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
