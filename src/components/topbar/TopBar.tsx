'use client';

import React, { useEffect, useState, MouseEventHandler } from 'react';
import styles from './TopBar.module.scss';
import Link from 'next/link';
import ShinyText from '@/common/ShinyText/ShinyText';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const TopBar: React.FC = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname(); 

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = () =>
    setMenuOpen((prev) => !prev);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <Link href="/" className={styles.mainLogo}>
          <ShinyText
            text="TSUNAMI ART"
            disabled={false}
            speed={3}
            className={styles.shinyText}
          />
        </Link>
      </div>

      <button
        type="button"
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="topbar-menu"
      >
        <span className={clsx(styles.bar, menuOpen && styles.bar1)} />
        <span className={clsx(styles.bar, menuOpen && styles.bar2)} />
        <span className={clsx(styles.bar, menuOpen && styles.bar3)} />
      </button>

      <div
        id="topbar-menu"
        className={clsx(styles.right, menuOpen && styles.openMenu)}
      >
        <ul>
          <li>
            <Link href="/" className={clsx(pathname === '/' && styles.active)}>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className={clsx(pathname === '/gallery' && styles.active)}
            >
              <span>Gallery</span>
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className={clsx(pathname === '/courses' && styles.active)}
            >
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={clsx(pathname === '/about' && styles.active)}
            >
              <span>About Me</span>
            </Link>
          </li>
          <li>
            <Link
              href="/collaboration"
              className={clsx(pathname === '/collaboration' && styles.active)}
            >
              <span>Collab</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={clsx(pathname === '/contact' && styles.active)}
            >
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className={clsx(pathname === '/login' && styles.active)}
            >
              <span>Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
