import { useEffect, useRef, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/components/Spotlight.module.css';

export default function Spotlight() {
    const [hideSpotlight, setHideSpotlight] = useState(false);
    const [activateSpotlightMobile, setActivateSpotlightMobile] = useState(false);
    const [expandValue, setExpandValue] = useState<number>(0);
    const [isExpanding, setIsExpanding] = useState(false);

    const isMobile = useIsMobile();

    const spotlight = useRef(null);
    let touchTimeout: any;

    const toggleSpotlight = () => {
        console.log(hideSpotlight);
        if (!hideSpotlight) {
            // animateOut();
            toggleExpandSpotlight();
        } else {
            setHideSpotlight(false);
            // animateIn();
            toggleExpandSpotlight();
        }
    };

    let expandeCount = expandValue;
    const toggleExpandSpotlight = () => {
        if (hideSpotlight) {
            // Shrink spotlight
            console.log('Shrinking Spotlight');
            if (expandValue === 0) {
                setExpandValue(parseInt(document.documentElement.style.getPropertyValue('--spotlight-size')));
            }
            document.documentElement.style.setProperty('--spotlight-size', `${expandeCount--}%`);
            if (expandeCount >= 5) {
                requestAnimationFrame(toggleExpandSpotlight);
            } else {
                setIsExpanding(false);
                setHideSpotlight(false);
                setExpandValue(expandeCount);
            }
        } else {
            // Expand spotlight
            if (expandeCount <= 80) {
                document.documentElement.style.setProperty('--spotlight-size', `${expandeCount++}%`);
                requestAnimationFrame(toggleExpandSpotlight);
            } else {
                console.log('Done Expanding');
                setIsExpanding(false);
                setHideSpotlight(true);
                setExpandValue(expandeCount);
            }
        }
    };

    let count: number | null = null;
    const animateOut = () => {
        if (count === null) {
            count = 0;
        }

        document.documentElement.style.setProperty('--spotlight-size', `${count++}%`);
        if (count <= 80) {
            requestAnimationFrame(animateOut);
        } else {
            setHideSpotlight(true);
        }
    };
    let count2 = 80;
    const animateIn = () => {
        if (count === null) {
            count = parseInt(document.documentElement.style.getPropertyValue('--spotlight-size'));
        }
        console.log(count2);
        document.documentElement.style.setProperty('--spotlight-size', `${count2--}%`);
        if (count2 >= 5) {
            requestAnimationFrame(animateIn);
        } else {
            setHideSpotlight(false);
        }
    };

    const handleMouseMove = (e: any) => {
        // console.log(e);
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (spotlight.current === null) return;
        (spotlight.current as HTMLElement).style.left = `${x}px`;
        (spotlight.current as HTMLElement).style.top = `${y}px`;
    };

    const handleTouchMove = (e: any) => {
        if (!activateSpotlightMobile) return;
        console.log(e);
        const rect = e.target.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        if (spotlight.current === null) return;
        console.log(`left: ${x} pixels | top: ${y} pixels`);
        (spotlight.current as HTMLElement).style.left = `${x}px`;
        (spotlight.current as HTMLElement).style.top = `${y}px`;
    };

    const disableScroll = () => {
        // To get the scroll position of current webpage
        const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
        const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
        // if scroll happens, set it to the previous value
        window.onscroll = function () {
            window.scrollTo(LeftScroll, TopScroll);
        };
    };

    const enableScroll = () => {
        window.onscroll = function () {};
    };

    return (
        <section className={styles.section2}>
            <div
                data-mouse="hide"
                onMouseMove={handleMouseMove}
                onTouchStart={() => {
                    clearTimeout(touchTimeout);
                    touchTimeout = setTimeout(() => {
                        setActivateSpotlightMobile(true);
                        disableScroll();
                    }, 500);
                }}
                onTouchEnd={() => {
                    clearTimeout(touchTimeout);
                    enableScroll();
                    setActivateSpotlightMobile(false);
                }}
                onTouchMoveCapture={handleTouchMove}
                className={styles.spotlightWrapper}
            >
                {/* {technologies.map((tech: any, index: number) => {
                            return (
                                <div className={styles.techImage} key={tech.name}>
                                    <Image
                                        src={`/images/technologies/${tech.path}`}
                                        alt={tech.name}
                                        width={'50px'}
                                        height={'50px'}
                                        layout={'fixed'}
                                    ></Image>
                                </div>
                            );
                        })} */}
            </div>
            <div ref={spotlight} className={`${styles.section2Overlay} ${hideSpotlight ? styles.hide : ''}`}></div>
            <div className={styles.toggleSpotlight}>
                <button
                    onClick={() => {
                        if (!isExpanding) {
                            setIsExpanding(true);
                            toggleSpotlight();
                        }
                    }}
                >
                    {hideSpotlight ? 'Turn off light' : 'Turn on light'}
                </button>
            </div>
        </section>
    );
}
