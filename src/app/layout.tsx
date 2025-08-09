import './globals.css';
import type { ReactNode } from 'react';
import TopBar from '@/components/topbar/TopBar';
import Footer from '@/components/footer/page';
import Header from '@/components/header/page';
import { Josefin_Sans } from 'next/font/google';
import ScrollController from '@/components/ScrollController';

export const metadata = {
  title: 'Мастерская Цунами',
  description: 'Мастерская Цунами',
  icons: {
    icon: '/favicon.ico',
  },
};

const montserrat = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={montserrat.className}
    >
      <body>
        <div className="layout">
          <ScrollController />
          <TopBar />
          <main className="main">{children}</main>
          <Header />
          <Footer />
        </div>
      </body>
    </html>
  );
}
