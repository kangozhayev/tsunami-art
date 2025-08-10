'use client';

import Image from 'next/image';
import styles from './Collaboration.module.scss';

import { Button } from '@/common/button/Button';

type Brand = {
  name: string;
  logo: string;
  url?: string;
  note?: string;
};

const BRANDS: Brand[] = [
  { name: 'Coca-Cola', logo: '/brands/coca cola.png' },
  { name: 'Apple', logo: '/brands/apple.png' },
  { name: 'Orbit', logo: '/brands/orbit.png' },
  { name: 'Samsung', logo: '/brands/samsung.png' },
  { name: 'Levis', logo: '/brands/levis.png' },
  { name: 'Pepsi', logo: '/brands/pepsi.png' },
  { name: 'Oppo', logo: '/brands/oppo.png' },
  { name: 'LG', logo: '/brands/lg.png' },
  { name: 'Hyundai', logo: '/brands/hyundai.png' },
  { name: 'Yandex', logo: '/brands/yandex.png' },
  { name: 'Dyson', logo: '/brands/dyson.png' },
  { name: 'Xiaomi', logo: '/brands/xiaomi.png' },
];

const UNIQUE_BRANDS = Array.from(
  new Map(BRANDS.map((b) => [b.name, b])).values()
);

export default function Brands() {
  return (
    <section
      className={styles.root}
      aria-label="Brands we work with"
    >
      <header className={styles.header}>
        <p className={styles.kicker}>Partners</p>
        <h2 className={styles.title}>Brands I Work With</h2>
        <p className={styles.subtitle}>
          I collaborate with brands on illustration projects as well as
          influencer campaigns on social media.
        </p>
      </header>

      <div className={styles.grid}>
        {UNIQUE_BRANDS.map((b) => {
          const content = (
            <div
              className={styles.logoCard}
              key={b.name}
            >
              <Image
                src={b.logo}
                alt={b.name}
                width={120}
                height={60}
                className={styles.logo}
                loading="lazy"
                sizes="(max-width: 640px) 20vw, 120px"
              />
              {b.note && <div className={styles.note}>{b.note}</div>}
            </div>
          );
          return b.url ? (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandLink}
            >
              {content}
            </a>
          ) : (
            content
          );
        })}
      </div>

      <div
        className={styles.marquee}
        aria-hidden="true"
      >
        <div className={styles.track}>
          {[...UNIQUE_BRANDS, ...UNIQUE_BRANDS].map((b, i) => (
            <div
              className={styles.marqueeItem}
              key={`${b.name}-${i}`}
            >
              <Image
                src={b.logo}
                alt=""
                width={100}
                height={50}
                className={styles.logo}
                loading="lazy"
                sizes="(max-width: 640px) 18vw, 100px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cta}>
        <p>Want to discuss a project or collaboration?</p>
        <Button
          onClick={() =>
            window.open(
              'https://wa.me/77055270019',
              '_blank',
              'noopener,noreferrer'
            )
          }
          className={styles.ctaBtn}
          buttonText="CONTACT US"
        />
      </div>
    </section>
  );
}
