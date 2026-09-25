import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '../../utils/metaPixel';

/**
 * Sends a Meta PageView each time the SPA moves to a new page. The first page
 * is skipped: the base Pixel in index.html already counted it. Keyed on the
 * path only, so query-string changes (an Offers tab, a filter) aren't new
 * pages. The ref survives StrictMode's effect re-run, so that can't double it.
 */
export default function MetaPageViewTracker() {
  const { pathname } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === null) { lastPath.current = pathname; return; }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    track('PageView');
  }, [pathname]);

  return null;
}
