import { useTheme } from 'next-themes';
import { useEffect, useLayoutEffect, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/components/Colorpicker.module.css';

export default function ColorPicker() {
    const { theme, themes, setTheme } = useTheme();
    const isMobile = useIsMobile();
    const [themeState, setThemeState] = useState<string>(theme);
    const [previousTheme, setPreviousTheme] = useState('beige');
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const colors = {
        beige: {
            mainColor: 'hsl(60, 33%, 91%)',
            accentColor: 'hsl(222, 79%, 21%)',
        },
        green: {
            mainColor: 'hsl(130, 69%, 23%)',
            accentColor: 'hsl(61, 80%, 63%)',
        },
        lightblue: {
            mainColor: 'hsl(166, 61%, 67%)',
            accentColor: 'hsl(302, 68%, 50%)',
        },
        yellow: {
            mainColor: 'hsl(37, 82%, 57%)',
            accentColor: 'hsl(11, 76%, 42%)',
        },
        palegreen: {
            mainColor: 'hsl(178, 63%, 39%)',
            accentColor: 'hsl(22, 66%, 94%)',
        },
        black: {
            mainColor: 'hsl(0, 0%, 0%)',
            accentColor: 'hsl(123, 100%, 50%)',
        },
    };

    return (
        <div
            className={`${styles.colorpicker} ${isOpen ? styles.show : ''}`}
            data-mouse={'scroll'}
            onMouseOver={() => {
                if (!isMobile) {
                    if (!isClosing) {
                        setIsOpen(true);
                    }
                }
            }}
            onMouseLeave={() => {
                if (!isMobile) {
                    setIsOpen(false);
                    if (previousTheme !== theme) {
                        setTheme(previousTheme);
                        setPreviousTheme(previousTheme);
                    }
                }
            }}
            onTouchStart={() => {
                if (isMobile) {
                    if (!isClosing) {
                        setIsOpen(true);
                    }
                }
            }}
        >
            <div
                key={theme}
                style={{
                    backgroundColor: colors[theme ? theme : 'beige'].mainColor,
                    borderColor: colors[theme ? theme : 'beige'].accentColor,
                }}
                className={`${styles.colorCircle} ${styles.firstCircle}`}
            >
                <div
                    className={styles.innerCircle}
                    style={{ backgroundColor: colors[theme ? theme : 'beige'].accentColor }}
                ></div>
            </div>
            <div className={styles.colorsContainer}>
                {themes.map((currentTheme: string) => {
                    return (
                        <div
                            key={currentTheme}
                            onMouseEnter={() => {
                                setTheme(currentTheme);
                            }}
                            onClick={() => {
                                setTheme(currentTheme);
                                setPreviousTheme(currentTheme);
                                setIsClosing(true);
                                setIsOpen(false);
                                setTimeout(() => {
                                    setIsClosing(false);
                                }, 750);
                            }}
                            style={{
                                backgroundColor: colors[currentTheme].mainColor,
                                borderColor: colors[currentTheme].accentColor,
                            }}
                            className={styles.colorCircle}
                        >
                            <div
                                className={styles.innerCircle}
                                style={{ backgroundColor: colors[currentTheme].accentColor }}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
