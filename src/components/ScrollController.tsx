'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const scrollAllowedPaths = ['/gallery', '/about', '/courses', '/collaboration'];

const ScrollController = () => {
  const pathname = usePathname();

  useEffect(() => {
    const isScrollAllowed = scrollAllowedPaths.includes(pathname);
    document.body.style.overflow = isScrollAllowed ? 'auto' : 'hidden';
    document.documentElement.style.overflow = isScrollAllowed
      ? 'auto'
      : 'hidden';
  }, [pathname]);
  return null;
};

export default ScrollController;
