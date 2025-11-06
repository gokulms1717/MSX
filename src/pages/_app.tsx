import '@/styles/globals.css';

import { AppCacheProvider, createEmotionCache } from '@mui/material-nextjs/v15-pagesRouter';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { GlobalStyles } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const clientCache = createEmotionCache({ enableCssLayer: true, key: 'css' });

export default function App(props: AppProps & { emotionCache?: EmotionCache }) {
  const { Component, pageProps, emotionCache = clientCache } = props;
  const router = useRouter();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const startAtRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const builderCaptions = useMemo(
    () => [
      'Loading template for you…',
      'Preparing your resume builder…',
      'Applying your theme preferences…',
      'Setting up the editor…',
      'Almost ready…',
      'Just a moment…',
    ],
    []
  );

  useEffect(() => {
    const handleStart = (url: string) => {
      // Only show loading for navigation TO builder page
      if (url.startsWith('/builder')) {
        setCaptionIndex(0);
        setIsRouteLoading(true);
        startAtRef.current = Date.now();
      }
    };
    const handleDone = () => {
      if (!startAtRef.current) {
        setIsRouteLoading(false);
        setCaptionIndex(0);
        return;
      }
      // Keep overlay visible ~4–5 seconds for better perceived loading
      const targetMs = 4000 + Math.floor(Math.random() * 1001); // 4000–5000ms
      const elapsed = Date.now() - startAtRef.current;
      const remaining = Math.max(0, targetMs - elapsed);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setIsRouteLoading(false);
        setCaptionIndex(0);
        startAtRef.current = null;
      }, remaining);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router.events, builderCaptions]);

  useEffect(() => {
    if (!isRouteLoading) return;
    const interval = setInterval(() => {
      setCaptionIndex((i) => (i + 1) % builderCaptions.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isRouteLoading, builderCaptions]);

  return (
    <AppCacheProvider {...props} emotionCache={emotionCache}>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <SessionProvider session={(pageProps as any).session}>
        <ThemeProvider theme={GLOBAL_MUI_THEME}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isRouteLoading && (
              <div
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
                role="status"
                aria-live="polite"
              >
                <div className="flex flex-col items-center gap-4">
                  <img
                    src="/icons/resume-icon.png"
                    alt="loading resume"
                    className="h-16 w-16 animate-bounce"
                  />
                  <span className="text-resume-800 text-base font-medium">
                    {builderCaptions[captionIndex]}
                  </span>
                </div>
              </div>
            )}
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </SessionProvider>
    </AppCacheProvider>
  );
}
