import { useTheme } from 'next-themes';
import { useEffect, useLayoutEffect, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/components/Colorpicker.module.css';

interface Theme {
    name: string;
    mainColor: string;
    accentColor: string;
}

export default function ColorPicker() {
    const { theme, themes, setTheme } = useTheme();
    const isMobile = useIsMobile();
    const [themeState, setThemeState] = useState<string>(theme);
    const [previousTheme, setPreviousTheme] = useState('beige');
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const [colors, setColors] = useState<Theme[]>([
        {
            name: 'beige',
            mainColor: 'hsl(60, 33%, 91%)',
            accentColor: 'hsl(222, 79%, 21%)',
        },
        {
            name: 'green',
            mainColor: 'hsl(130, 69%, 23%)',
            accentColor: 'hsl(61, 80%, 63%)',
        },
        {
            name: 'yellow',
            mainColor: 'hsl(37, 82%, 57%)',
            accentColor: 'hsl(11, 76%, 42%)',
        },
        {
            name: 'palegreen',
            mainColor: 'hsl(178, 63%, 39%)',
            accentColor: 'hsl(22, 66%, 94%)',
        },
        {
            name: 'bordeaux',
            mainColor: 'hsl(0, 100%, 16%)',
            accentColor: 'hsl(0, 0%, 60%',
        },
        {
            name: 'purple',
            mainColor: 'hsl(45, 93%, 61%)',
            accentColor: 'hsl(278, 70%, 17%)',
        },
        // {
        //     name: 'lightblue',
        //     mainColor: 'hsl(166, 61%, 67%)',
        //     accentColor: 'hsl(302, 68%, 50%)',
        // },
        // {
        //     name: 'black',
        //     mainColor: 'hsl(273, 100%, 50%)',
        //     accentColor: 'hsl(22, 100%, 50%)',
        // },
    ]);

    const getTheme = (themeName: string): Theme => {
        const selectedTheme = colors.filter((filterTheme: any) => {
            return String(filterTheme.name) == String(themeName);
        });
        return selectedTheme[0];
    };

    return (
        <div
            className={`${styles.colorpicker} ${isOpen ? styles.show : ''}`}
            data-mouse={'scroll'}
            onMouseEnter={() => {
                if (!isMobile) {
                    if (!isClosing) {
                        // setIsOpen(true);

                        setIsClosing(true);
                        setIsOpen(true);
                        setTimeout(() => {
                            setIsClosing(false);
                        }, 750);
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
                    backgroundColor: getTheme(theme) ? getTheme(theme).mainColor : '',
                    borderColor: getTheme(theme) ? getTheme(theme).accentColor : '',
                }}
                className={`${styles.colorCircle} ${styles.firstCircle}`}
            >
                <div
                    className={styles.innerCircle}
                    style={{
                        backgroundColor: getTheme(theme) ? getTheme(theme).accentColor : '',
                        borderColor: getTheme(theme) ? getTheme(theme).accentColor : '',
                    }}
                ></div>
            </div>
            <div className={`${styles.colorsContainer} ${isClosing ? styles.closing : ''}`}>
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
                                backgroundColor: getTheme(currentTheme).mainColor,
                                borderColor: getTheme(currentTheme).accentColor,
                                pointerEvents: isClosing ? 'none' : 'all',
                            }}
                            className={styles.colorCircle}
                        >
                            <div
                                className={styles.innerCircle}
                                style={{ backgroundColor: getTheme(currentTheme).accentColor }}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
