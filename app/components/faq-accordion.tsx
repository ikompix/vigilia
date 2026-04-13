"use client";

import { useState } from "react";

import { FaqItem } from "../site-content";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article className="faq-item" key={item.question}>
            <button
              className="faq-question"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className={`faq-icon${isOpen ? " is-open" : ""}`} aria-hidden="true">
                +
              </span>
            </button>
            <div
              className={`faq-answer${isOpen ? " is-open" : ""}`}
              id={`faq-answer-${index}`}
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
