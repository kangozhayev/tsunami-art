'use client';

import styles from './Gallery.module.scss';
import Image from 'next/image';

const images = [
  '/1.PNG',
  '/2.JPG',
  '/3.PNG',
  '/4.PNG',
  '/5.PNG',
  '/6.JPEG',
  '/7.JPEG',
  '/8.jpg',
  '/10.jpg',
  '/11.jpg',
  '/12.JPG',
  '/36.JPG',
  '/14.PNG',
  '/16.PNG',
  '/27.PNG',
  '/18.PNG',
  '/19.PNG',
  '/20.PNG',
  '/23.PNG',
  '/22.PNG',
  '/21.PNG',
  '/24.PNG',
  '/25.PNG',
  '/26.PNG',
  '/17.PNG',
  '/28.PNG',
  '/29.PNG',
  '/30.PNG',
  '/31.JPG',
  '/32.jpg',
  '/33.JPG',
  '/34.PNG',
  '/35.PNG',
  '/13.JPG',
  '/37.JPG',
  '/38.JPG',
];

const Gallery = () => {
  return (
    <div className={styles.container}>
      {images.map((src, i) => (
        <Image
          width={300}
          height={300}
          key={i}
          src={src}
          alt={`img-${i}`}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      ))}
    </div>
  );
};

export default Gallery;
