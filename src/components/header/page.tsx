'use client';

import styles from './Header.module.scss';
import Image from 'next/image';
import backgroundImages from '../../../images';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const backgroundHeaderImage = backgroundImages[pathname];
  if (!backgroundHeaderImage) return null;

  return (
    <header className={styles.header}>
      <Image
        src={backgroundHeaderImage}
        alt="main-image"
        fill
        priority
        style={{ objectFit: 'cover' }}
        className={styles.image}
      />
    </header>
  );
};

export default Header;
