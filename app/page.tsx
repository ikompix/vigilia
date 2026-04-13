import type { Metadata } from "next";

import { FaqAccordion } from "./components/faq-accordion";
import { UseCaseTabs } from "./components/use-case-tabs";
import { WaitlistForm } from "./components/waitlist-form";
import { siteUrl } from "./site-config";
import {
  faqItems,
  featureHighlights,
  features,
  pricingPlans,
  steps,
  useCases,
} from "./site-content";

const heroNotes = [
  "BODACC, justice et comptes annuels dans une seule veille",
  "Resume IA, niveau de risque et recommandation claire",
  "30 jours d'essai sans carte bancaire",
];

const trustSources = [
  "Pappers Entreprises",
  "Pappers Justice",
  "INSEE",
  "INPI",
  "BODACC",
  "DVF",
];

const pageTitle = "Surveillance entreprise et alertes BODACC pour PME";
const pageDescription =
  "Vigilia surveille la santé financière de vos fournisseurs, clients et concurrents avec des alertes BODACC, justice, comptes annuels et analyse IA.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vigilia | Surveillance entreprise avec alertes IA",
    description: pageDescription,
    url: siteUrl,
  },
  twitter: {
    title: "Vigilia | Veille entreprise pour PME",
    description: pageDescription,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Vigilia",
        url: siteUrl,
        description:
          "Vigilia est un logiciel de surveillance d'entreprises francaises qui detecte les signaux legaux, financiers et judiciaires sur les partenaires critiques.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Vigilia",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        offers: [
          {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            description: "Essai gratuit 30 jours",
          },
          {
            "@type": "Offer",
            price: "29",
            priceCurrency: "EUR",
            description: "Plan Pro mensuel",
          },
        ],
        description: pageDescription,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="page-shell">
        <header className="site-header">
          <div className="container nav">
            <a className="brand" href="#top" aria-label="Vigilia accueil">
              <span className="brand-mark">V</span>
              <span className="brand-wordmark">Vigilia</span>
            </a>
            <nav className="nav-links" aria-label="Navigation principale">
              <a href="#product">Produit</a>
              <a href="#use-cases">Cas d&apos;usage</a>
              <a href="#pricing">Tarifs</a>
              <a href="#faq">FAQ</a>
              <a className="button button-secondary nav-cta" href="#waitlist">
                Acces anticipe
              </a>
            </nav>
          </div>
        </header>

        <main id="top">
          <section className="hero-section">
            <div className="hero-backdrop" aria-hidden="true" />
            <div className="hero-orb hero-orb-left" aria-hidden="true" />
            <div className="hero-orb hero-orb-right" aria-hidden="true" />
            <div className="container hero-stack">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow eyebrow-pill">Veille entreprise pour PME et equipes B2B</p>
                  <h1>
                    Surveillez la sante financiere
                    <span>des entreprises qui comptent.</span>
                  </h1>
                  <p className="hero-lead">
                    Vigilia detecte les signaux publics qui changent reellement le niveau de risque
                    d&apos;une entreprise et les transforme en alerte claire, priorisee et directement
                    exploitable.
                  </p>
                  <div className="hero-actions">
                    <a className="button button-primary" href="#waitlist">
                      Demander un acces anticipe
                    </a>
                    <a className="button button-ghost" href="#product">
                      Explorer le produit
                    </a>
                  </div>
                  <div className="hero-meta" aria-label="Points cles">
                    {heroNotes.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <aside className="hero-panel" aria-label="Exemple d'alerte Vigilia">
                  <div className="hero-panel-header">
                    <div>
                      <p className="eyebrow">Alerte priorisee</p>
                      <h2>SAS Dupont &amp; Fils</h2>
                    </div>
                    <span className="status status-danger">Alerte critique</span>
                  </div>

                  <div className="hero-signal-grid">
                    <div>
                      <span className="signal-label">Risque</span>
                      <strong>9 / 10</strong>
                    </div>
                    <div>
                      <span className="signal-label">Portefeuille</span>
                      <strong>Fournisseurs critiques</strong>
                    </div>
                    <div>
                      <span className="signal-label">Dernier evenement</span>
                      <strong>Depot de comptes degrade</strong>
                    </div>
                  </div>

                  <div className="alert-card">
                    <p>
                      Chiffre d&apos;affaires en baisse de 34 %, capitaux propres negatifs et
                      contentieux fournisseur mentionne dans une decision du tribunal de commerce
                      de Lyon.
                    </p>
                    <div className="alert-recommendation">
                      <span className="eyebrow">Recommandation</span>
                      <p>
                        Securisez vos encours, verifiez les conditions de paiement et preparez une
                        alternative d&apos;approvisionnement.
                      </p>
                    </div>
                  </div>

                  <div className="hero-tags">
                    <span>Comptes annuels</span>
                    <span>Justice</span>
                    <span>Dirigeants</span>
                    <span>BODACC</span>
                  </div>
                </aside>
              </div>

              <div className="trust-strip" aria-label="Sources surveillees">
                <p className="trust-strip-label">Sources surveillees</p>
                <div className="trust-strip-list">
                  {trustSources.map((source) => (
                    <span key={source}>{source}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section section-editorial" id="product">
            <div className="container editorial-shell">
              <div className="editorial-intro">
                <p className="eyebrow">Positionnement produit</p>
                <h2>Une veille plus calme, plus lisible, plus credible.</h2>
                <p>
                  Vigilia ne cherche pas a accumuler les donnees. Il se concentre sur les signaux
                  qui comptent vraiment pour vos fournisseurs, vos clients et vos concurrents.
                </p>
              </div>

              <div className="highlight-list" aria-label="Principes produit">
                {featureHighlights.map((item) => (
                  <article className="highlight-row" key={item.title}>
                    <p className="eyebrow">{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="container feature-editorial-grid">
              {features.map((feature) => (
                <article className="feature-panel" key={feature.title}>
                  <p className="eyebrow">{feature.eyebrow}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section workflow-section">
            <div className="container section-stack">
              <div className="section-heading">
                <p className="eyebrow">Fonctionnement</p>
                <h2>Trois etapes pour mettre en place votre veille fournisseurs et clients.</h2>
              </div>
              <div className="step-track">
                {steps.map((step) => (
                  <article className="step-item" key={step.step}>
                    <div className="step-chip-row">
                      <span className="step-number">{step.step}</span>
                    </div>
                    <div className="step-body">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="use-cases">
            <div className="container section-stack">
              <div className="section-heading">
                <p className="eyebrow">Cas d&apos;usage</p>
                <h2>Une veille adaptee aux equipes qui doivent anticiper plutot que subir.</h2>
                <p>
                  Le produit est pense pour les structures qui n&apos;ont ni le temps ni le budget pour
                  des plateformes de credit enterprise trop lourdes.
                </p>
              </div>
              <UseCaseTabs items={useCases} />
            </div>
          </section>

          <section className="section section-soft" id="pricing">
            <div className="container section-stack">
              <div className="section-heading">
                <p className="eyebrow">Tarification</p>
                <h2>Un prix lisible, sans cycle commercial lourd.</h2>
                <p>
                  L&apos;objectif est de rendre la surveillance d&apos;entreprise abordable pour une PME, sans
                  compromis sur la qualite des signaux suivis.
                </p>
              </div>
              <div className="pricing-grid">
                {pricingPlans.map((plan) => (
                  <article
                    className={`pricing-card${plan.highlighted ? " is-highlighted" : ""}`}
                    key={plan.name}
                  >
                    <p className="eyebrow">{plan.highlighted ? "Plan principal" : "Plan"}</p>
                    <h3>{plan.name}</h3>
                    <div className="pricing-price">
                      <strong>{plan.price}</strong>
                      <span>{plan.period}</span>
                    </div>
                    <p className="pricing-description">{plan.description}</p>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <a
                      className={plan.highlighted ? "button button-primary" : "button button-secondary"}
                      href="#waitlist"
                    >
                      {plan.cta}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-cta">
            <div className="container cta-band">
              <div className="section-heading section-heading-left">
                <p className="eyebrow">Acces anticipe</p>
                <h2>Demandez un acces anticipe au lancement.</h2>
                <p>
                  La liste d&apos;attente nous aide a prioriser les premiers utilisateurs et a calibrer
                  les cas metiers les plus utiles avant l&apos;ouverture du MVP.
                </p>
              </div>
              <WaitlistForm />
            </div>
          </section>

          <section className="section" id="faq">
            <div className="container faq-shell">
              <div className="section-heading section-heading-left">
                <p className="eyebrow">Questions frequentes</p>
                <h2>Tout ce qu&apos;il faut pour evaluer la pertinence de Vigilia rapidement.</h2>
                <p>
                  Cette FAQ sert autant aux utilisateurs qu&apos;aux moteurs: elle clarifie le
                  positionnement, le perimetre fonctionnel et la valeur metier du produit.
                </p>
              </div>
              <FaqAccordion items={faqItems} />
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <a className="brand brand-footer" href="#top">
                <span className="brand-mark">V</span>
                <span className="brand-wordmark">Vigilia</span>
              </a>
              <p className="footer-copy">
                Surveillance d&apos;entreprise pour PME avec alertes BODACC, comptes annuels, justice,
                immobilier et analyse IA.
              </p>
            </div>
            <div>
              <h3>Sources</h3>
              <p>Pappers Entreprises, Pappers Justice, Pappers Immobilier, INSEE, INPI, BODACC, DVF.</p>
            </div>
            <div>
              <h3>Promesse</h3>
              <p>Le Creditsafe du petit: self-service, clair, exploitable et pense pour la rentabilite.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
