'use client';

import Image from 'next/image';
import { Button } from '@/common/button/Button';
import styles from './Courses.module.scss';
import CoursePlans from '@/components/CoursePlans/CoursePlans';

const CoursesPage = () => {
  const scrollToContent = () => {
    const target = document.getElementById('courses-content');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const header = document.querySelector('header');
    const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;

    const y =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/1.webp"
          alt="Courses hero"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Online & Offline Courses</h1>
          <div className={styles.buttonContainer}>
            {' '}
            <Button
              buttonText="READ MORE"
              className={styles.button}
              onClick={scrollToContent}
            />
          </div>
        </div>
      </section>

      <section
        id="courses-content"
        className={styles.content}
      >
        <div className={styles.container}>
          <CoursePlans />
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
