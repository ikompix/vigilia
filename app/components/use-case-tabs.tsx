"use client";

import { useState } from "react";

import { UseCase } from "../site-content";

type UseCaseTabsProps = {
  items: UseCase[];
};

export function UseCaseTabs({ items }: UseCaseTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <div className="use-cases-shell">
      <div className="use-case-tabs" role="tablist" aria-label="Profils utilisateurs">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.role}
              className={`use-case-tab${isActive ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`use-case-panel-${index}`}
              id={`use-case-tab-${index}`}
              onClick={() => setActiveIndex(index)}
            >
              {item.role}
            </button>
          );
        })}
      </div>

      <article
        className="use-case-panel"
        id={`use-case-panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`use-case-tab-${activeIndex}`}
      >
        <p className="eyebrow">Cas d&apos;usage prioritaire</p>
        <h3>{activeItem.signal}</h3>
        <div className="use-case-grid">
          <section>
            <span className="use-case-state use-case-state-muted">Sans Vigilia</span>
            <p>{activeItem.pain}</p>
          </section>
          <section>
            <span className="use-case-state use-case-state-positive">Avec Vigilia</span>
            <p>{activeItem.solution}</p>
          </section>
        </div>
      </article>
    </div>
  );
}
