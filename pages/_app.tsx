import '../styles/reset.css';
import '../styles/styles.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider
            defaultTheme="beige"
            enableSystem={false}
            themes={['beige', 'green', 'lightblue', 'yellow', 'palegreen', 'black']}
        >
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
