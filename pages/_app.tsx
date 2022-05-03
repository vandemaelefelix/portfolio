import '../styles/reset.css';
import '../styles/styles.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';
gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }: AppProps) {
    const isMobile = useIsMobile();
    useEffect(() => {
        document.body.setAttribute('data-device', isMobile ? 'mobile' : 'desktop');

        return () => {};
    }, [isMobile]);
    return (
        <ThemeProvider
            defaultTheme="beige"
            enableSystem={false}
            themes={['beige', 'green', 'yellow', 'palegreen', 'bordeaux', 'purple']} //'lightblue',
        >
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
