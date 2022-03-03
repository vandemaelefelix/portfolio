import '../styles/reset.css';
import '../styles/styles.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme="default" enableSystem={false} themes={['default', 'coral']}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
