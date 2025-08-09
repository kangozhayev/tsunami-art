'use client';

import { useState } from 'react';
import styles from './CoursePlans.module.scss';
import { FaCheck, FaTimes } from 'react-icons/fa';

type PlanId = 'Online' | 'Offline';

const PLANS = [
  {
    id: 'Online' as const,
    title: 'Online Course',
    subtitle: 'Online course with mentor',
    price: '120 000',
    currency: 'KZT',
    description:
      'Develop your digital painting skills through interactive lessons and creative challenges.',
    features: [
      {
        text: 'Beginner-friendly step-by-step lessons with clear guidance',
        yes: true,
      },
      { text: 'Mentor support and feedback', yes: true },
      { text: 'Flexible schedule - learn anytime, anywhere', yes: true },
      {
        text: 'Build a standout portfolio with artworks created during the course',
        yes: true,
      },
    ],
    cta: 'Purchase',
  },
  {
    id: 'Offline' as const,
    title: 'Offline Course',
    subtitle: 'In-person group class',
    price: '250 000',
    currency: 'KZT',
    description:
      'Work alongside fellow artists in a supportive studio space that fuels creativity.',
    features: [
      { text: 'Hands-on practice in a professional studio', yes: true },
      { text: 'Personalized feedback during live sessions', yes: true },
      { text: 'Small group classes for better attention', yes: true },
      { text: 'Access to exclusive offline workshops', yes: true },
    ],
    cta: 'Purchase',
  },
];

export default function CoursePlans({
  onSelect,
}: {
  onSelect?: (plan: PlanId) => void;
}) {
  const [selected, setSelected] = useState<PlanId>('Online');

  const handleSelect = (id: PlanId) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <section
      id="courses-content"
      className={styles.plansRoot}
      aria-label="Plans"
    >
      <div className={styles.plansHeader}>
        <p className={styles.kicker}>Choose your option</p>
        <h2 className={styles.plansTitle}>Course Formats</h2>
        <p className={styles.plansSubtitle}>
          Pick the format that fits your schedule and learning style
        </p>
      </div>
      <div
        className={styles.wrapper}
        role="radiogroup"
        aria-label="Choose a plan"
      >
        {PLANS.map((plan) => {
          const isActive = selected === plan.id;
          return (
            <label
              key={plan.id}
              className={`${styles.card} ${isActive ? styles.active : ''}`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={isActive}
                onChange={() => handleSelect(plan.id)}
                className={styles.input}
                aria-checked={isActive}
              />

              <header className={styles.header}>
                <h3 className={styles.title}>{plan.title}</h3>
                <p className={styles.subtitle}>{plan.subtitle}</p>
              </header>

              <hr className={styles.divider} />

              <div className={styles.priceWrap}>
                <div className={styles.price}>
                  {plan.price}
                  <span className={styles.currency}>{plan.currency}</span>
                </div>
                <p className={styles.description}>{plan.description}</p>
              </div>

              <button
                className={styles.cta}
                onClick={(e) => {
                  e.preventDefault();
                  const phone = '77055270019';
                  const message = `Hello, I would like to know more about ${plan.title}`;
                  window.open(
                    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                    '_blank'
                  );
                  handleSelect(plan.id);
                }}
              >
                {plan.cta}
              </button>

              <ul className={styles.features}>
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={styles.featureItem}
                  >
                    <span
                      className={`${styles.icon} ${f.yes ? styles.iconYes : styles.iconNo}`}
                      aria-hidden
                    >
                      {f.yes ? <FaCheck /> : <FaTimes />}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </label>
          );
        })}
      </div>
    </section>
  );
}
