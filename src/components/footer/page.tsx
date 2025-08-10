'use client';

import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Footer = () => {
  const pathname = usePathname();
  const isGallery =
    pathname === '/gallery' ||
    pathname === '/about' ||
    pathname === '/collaboration' ||
    pathname === '/courses';

  const currentYear = new Date().getFullYear();

  return (
    <footer className={clsx(styles.footer, isGallery && styles.static)}>
      <div className={styles.iconGroup}>
        <a
          href="https://www.instagram.com/tsunami_ka_art/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className={styles.icon}
          />
        </a>
        <a
          href="https://www.tiktok.com/@tsunami_ka_art"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tiktok"
        >
          <FontAwesomeIcon
            icon={faTiktok}
            className={styles.icon}
          />
        </a>
        <a
          href="https://wa.me/77055270019"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className={styles.icon}
          />
        </a>
      </div>
      <p>@ {currentYear} by Tsunamika Art</p>
    </footer>
  );
};

export default Footer;
