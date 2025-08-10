'use client';

import styles from './AboutMe.module.scss';
import Image from 'next/image';
import portrait from '../../assets/77.webp';

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>About Me</h2>
        <p>
          I’m an artist from Kazakhstan, based in the vibrant city of Almaty,
          with over 15 years of experience in both traditional and digital
          painting. My artistic journey began with classic mediums — oils,
          watercolors, and acrylics — where I learned to understand the nuances
          of texture, light, and color. Over time, I embraced digital tools,
          combining them with my traditional skills to create artworks that are
          both timeless and innovative. Art for me is more than just a
          profession — it’s a way to connect with people, share stories, and
          evoke emotions. My portfolio includes detailed portraits, atmospheric
          landscapes, and imaginative conceptual works, each infused with a
          balance of technical precision and artistic expression. I’m constantly
          exploring new techniques, blending the richness of traditional art
          with the limitless possibilities of the digital world.
        </p>
        <p>
          In addition to creating my own work, I’m passionate about teaching. I
          conduct workshops and masterclasses in digital painting, helping
          aspiring artists unlock their potential and develop their unique
          style. Over the years, I’ve had the privilege of collaborating with
          major international brands on creative projects and educational
          events, bringing my expertise to audiences around the world.
        </p>
        <p>
          Living in Almaty inspires me every day — from the city’s cultural
          diversity to the breathtaking landscapes that surround it. Whether
          working in my studio, teaching students, or collaborating with brands,
          I aim to create art that leaves a lasting impression and inspires
          others to follow their own creative path.
        </p>
      </div>
      <div className={styles.leftContainer}>
        <Image
          src={portrait}
          alt="about me image"
          placeholder="blur"
          width={400}
          height={500}
        />
      </div>
    </div>
  );
};
export default AboutMe;
