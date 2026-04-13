export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
};

export type UseCase = {
  role: string;
  pain: string;
  solution: string;
  signal: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const stats = [
  "Sources officielles françaises, consolidées en une seule veille",
  "Alertes hebdomadaires pour rester rentable dès le premier plan",
  "Essai gratuit 30 jours sans carte bancaire",
];

export const featureHighlights: Feature[] = [
  {
    eyebrow: "Sources unifiées",
    title: "Une surveillance d'entreprise construite sur les signaux qui comptent vraiment.",
    description:
      "Vigilia croise les publications BODACC, les comptes annuels, les changements de dirigeants, les décisions de justice et les transactions immobilières pour produire une lecture exploitable, pas une simple accumulation de données.",
  },
  {
    eyebrow: "Alertes utiles",
    title: "Chaque événement est transformé en décision opérationnelle.",
    description:
      "Dès qu'un signal apparaît, l'alerte synthétise le contexte, priorise le niveau de risque et suggère l'action la plus logique: sécuriser un encours, revoir un paiement, surveiller une contrepartie ou relancer un prospect.",
  },
  {
    eyebrow: "Pensé pour les PME",
    title: "Une alternative légère aux plateformes crédit trop lourdes.",
    description:
      "Pas de déploiement complexe, pas de commercial, pas de formation. Vous ajoutez des SIREN, vous organisez vos portefeuilles, et vous commencez à surveiller fournisseurs, clients et concurrents en quelques minutes.",
  },
];

export const features: Feature[] = [
  {
    eyebrow: "Procédures collectives",
    title: "Détectez plus tôt les signaux de tension.",
    description:
      "Liquidation, redressement judiciaire, contentieux, dépôt de comptes dégradé ou changement de direction: les signaux faibles et forts remontent dans un flux unique.",
  },
  {
    eyebrow: "Croisement multi-base",
    title: "Reliez entreprise, justice et immobilier sans changer d'outil.",
    description:
      "Le vrai différenciateur de Vigilia est le croisement de plusieurs bases Pappers au sein d'une seule alerte, avec une vue cohérente sur l'entreprise surveillée.",
  },
  {
    eyebrow: "Analyse IA",
    title: "Recevez un résumé clair au lieu d'une page de jargon juridique.",
    description:
      "Le score de risque, le résumé en langage clair et la recommandation d'action sont générés automatiquement dès qu'un changement significatif est détecté.",
  },
  {
    eyebrow: "Portefeuilles",
    title: "Surveillez vos fournisseurs, clients et concurrents au même endroit.",
    description:
      "Chaque société peut être classée dans un portefeuille métier pour adapter le niveau d'attention et clarifier vos priorités de suivi.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Ajoutez vos entreprises",
    description:
      "Saisissez les SIREN que vous voulez suivre et regroupez-les par portefeuille: fournisseurs, clients, prospects ou concurrents.",
  },
  {
    step: "02",
    title: "Vigilia vérifie les bases officielles",
    description:
      "Les sources légales françaises sont interrogées régulièrement pour repérer les nouveautés réellement importantes, sans bruit inutile.",
  },
  {
    step: "03",
    title: "Vous recevez une alerte exploitable",
    description:
      "Le changement est résumé, priorisé et contextualisé, avec un niveau de risque et une prochaine action suggérée.",
  },
];

export const useCases: UseCase[] = [
  {
    role: "DAF et comptables",
    pain: "La dégradation d'un fournisseur est souvent visible trop tard, quand la facture reste impayée ou que la continuité d'approvisionnement est déjà menacée.",
    solution:
      "Vigilia vous alerte dès les premiers signaux publics pour réévaluer vos conditions de paiement, sécuriser vos encours et préparer un plan de repli.",
    signal: "Trésorerie et continuité fournisseur",
  },
  {
    role: "Bailleurs commerciaux",
    pain: "Le risque locataire se matérialise souvent sans préavis visible alors que les retards de loyer s'accumulent déjà.",
    solution:
      "Vous surveillez les comptes, les procédures et les changements de structure de vos locataires pour anticiper une fragilisation avant qu'elle ne devienne critique.",
    signal: "Risque locatif professionnel",
  },
  {
    role: "Commerciaux et courtiers B2B",
    pain: "Prospecter sans visibilité sur la santé d'une entreprise fait perdre du temps et expose à des opportunités mal qualifiées.",
    solution:
      "Les signaux financiers, juridiques et de développement vous aident à identifier les comptes à prioriser, à éviter ou à travailler différemment.",
    signal: "Qualification commerciale",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Decouverte",
    price: "0 EUR",
    period: "pendant 30 jours",
    description: "Pour tester la veille sur un petit portefeuille sans engager de budget.",
    features: [
      "5 entreprises surveillées",
      "Alertes hebdomadaires",
      "Résumé IA inclus",
      "1 utilisateur",
      "Sans carte bancaire",
    ],
    cta: "Essayer gratuitement",
  },
  {
    name: "Pro",
    price: "29 EUR",
    period: "HT / mois",
    description: "Le plan principal pour une PME qui veut surveiller ses partenaires critiques.",
    features: [
      "50 entreprises surveillées",
      "Analyse IA complète",
      "Score de risque",
      "Croisement justice et immobilier",
      "Export PDF",
    ],
    cta: "Rejoindre la liste d'attente",
    highlighted: true,
  },
  {
    name: "Business",
    price: "99 EUR",
    period: "HT / mois",
    description: "Pour les équipes qui veulent plus de volume, plus de fréquence et plus d'intégration.",
    features: [
      "500 entreprises surveillées",
      "Alertes quotidiennes",
      "API et webhooks",
      "Multi-utilisateurs",
      "Onboarding dédié",
    ],
    cta: "Parler du plan Business",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Que surveille exactement Vigilia ?",
    answer:
      "Vigilia surveille les événements publics qui changent réellement le niveau de risque d'une entreprise française: procédures collectives, dépôts de comptes, changements de dirigeants, décisions de justice, publications BODACC et transactions immobilières associées.",
  },
  {
    question: "En quoi Vigilia est-il différent de Creditsafe, Altares ou Coface ?",
    answer:
      "Vigilia vise un usage self-service pour PME, avec un point d'entrée simple, un prix léger et un angle produit centré sur la veille opérationnelle. L'objectif n'est pas de remplacer un dispositif d'assurance-crédit, mais de rendre la surveillance continue accessible sans friction commerciale.",
  },
  {
    question: "D'ou viennent les donnees ?",
    answer:
      "Les données proviennent de Pappers et de ses agrégations de sources officielles françaises, notamment INSEE, INPI, BODACC, DVF et les juridictions concernées.",
  },
  {
    question: "Comment fonctionne le score de risque ?",
    answer:
      "Le score combine les signaux détectés sur l'entreprise surveillée, leur nature, leur gravité potentielle et leur évolution récente. Il sert à prioriser votre attention, pas à se substituer à votre jugement métier.",
  },
  {
    question: "Puis-je surveiller fournisseurs, clients et concurrents dans le meme compte ?",
    answer:
      "Oui. Les entreprises surveillées sont organisées en portefeuilles, ce qui permet de suivre plusieurs usages dans une même interface tout en gardant des priorités de lecture distinctes.",
  },
  {
    question: "L'essai gratuit est-il vraiment sans engagement ?",
    answer:
      "Oui. L'essai dure 30 jours, sans carte bancaire, avec un volume limité pour garder un coût d'acquisition sain pendant la phase de validation du produit.",
  },
];
