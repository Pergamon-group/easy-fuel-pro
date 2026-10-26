'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Ensures that navigating between routes in Next.js resets scroll position to the top
 * without getting stuck at the previous page's scroll offset.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // If navigating to a new route without an anchor hash, immediately reset to top
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}
