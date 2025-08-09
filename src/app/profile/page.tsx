'use client';

import styles from './Profile.module.scss';
import backgroundImages from '../../../images';
import { usePathname } from 'next/navigation';

const ProfilePage = () => {
  const pathname = usePathname();
  const backgroundImage = backgroundImages[pathname] || '';

  return (
    <div className={styles.page}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden
      />

      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          Coming soon: courses, events, and much more exciting content..
        </h2>
      </div>
    </div>
  );
};

export default ProfilePage;
