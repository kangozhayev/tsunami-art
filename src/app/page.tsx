'use client';
import TextType from '@/common/TextType/TextType';
import styles from './page.module.css';

const Home = () => {
  return (
    <main style={{ textAlign: 'center', color: 'white', marginTop: '25vh' }}>
      <TextType
        text={[
          'Welcome to Tsunamika Art!',
          'Feel. Create. Inspire.',
          "Let's make art.",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        className={styles.main}
      />
    </main>
  );
};

export default Home;
