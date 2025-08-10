'use client';

import styles from './Gallery.module.scss';
import Image from 'next/image';

const images = [
  '/1.webp',
  '/2.webp',
  '/3.webp',
  '/4.webp',
  '/5.webp',
  '/27.webp',
  '/7.webp',
  '/11.webp',
  '/10.webp',
  '/11.JPEG',
  '/12.JPG',
  '/36.webp',
  '/14.webp',
  '/16.webp',
  '/23.webp',
  '/18.webp',
  '/19.webp',
  '/20.webp',
  '/28.webp',
  '/22.webp',
  '/21.webp',
  '/24.webp',
  '/25.webp',
  '/26.webp',
  '/17.webp',
  '/15.webp',
  '/29.webp',
  '/30.webp',
  '/31.webp',
  '/32.webp',
  '/33.webp',
  '/34.webp',
  '/35.webp',
  '/13.webp',
  '/37.webp',
  '/38.webp',
];

export default function Gallery() {
  return (
    <div className={styles.container}>
      {images.map((src, i) => (
        <Image
          width={300}
          height={300}
          key={src}
          src={src}
          alt={`img-${i}`}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          loading={i < 8 ? 'eager' : 'lazy'}
          decoding="async"
          sizes="300px"
        />
      ))}
    </div>
  );
}
