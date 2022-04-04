import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/components/Spotlight.module.css';

import technologies from '../public/images/technologies/technologies';

export default function Spotlight() {
    const [isDark, setIsDark] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    const [showSpotlightText, setShowSpotlightText] = useState(true);

    const [hideSpotlight, setHideSpotlight] = useState(false);
    const [activateSpotlightMobile, setActivateSpotlightMobile] = useState(false);
    const [expandValue, setExpandValue] = useState<number>(0);
    const [isExpanding, setIsExpanding] = useState(false);

    const [isShrinking, setIsShrinking] = useState<boolean>(false);
    const [isShrunk, setIsShrunk] = useState<boolean>(true);

    const isMobile = useIsMobile();

    const spotlight = useRef(null);
    const spotlightText = useRef(null);
    let touchTimeout: any;

    const toggleSpotlight = () => {
        console.log(hideSpotlight);
        if (!hideSpotlight) {
            // animateOut();
            toggleExpandSpotlight();
            setShowTitle(false);
            setShowSpotlightText(false);
        } else {
            setHideSpotlight(false);
            // animateIn();
            setTimeout(() => {
                setShowTitle(true);
                setShowSpotlightText(true);
            }, 1500);
            toggleExpandSpotlight();
        }
    };

    let expandCount = expandValue;
    const toggleExpandSpotlight = () => {
        if (hideSpotlight) {
            // Shrink spotlight
            console.log('Shrinking Spotlight');
            if (expandValue === 0) {
                setExpandValue(parseInt(document.documentElement.style.getPropertyValue('--spotlight-size')));
            }
            document.documentElement.style.setProperty('--spotlight-size', `${expandCount--}%`);
            if (expandCount >= 5) {
                requestAnimationFrame(toggleExpandSpotlight);
            } else {
                setIsExpanding(false);
                setHideSpotlight(false);
                setExpandValue(expandCount);
            }
        } else {
            // Expand spotlight
            if (expandCount <= 80) {
                document.documentElement.style.setProperty('--spotlight-size', `${expandCount++}%`);
                requestAnimationFrame(toggleExpandSpotlight);
            } else {
                console.log('Done Expanding');
                setIsExpanding(false);
                setHideSpotlight(true);
                setExpandValue(expandCount);
            }
        }
    };

    let shrinkCount = expandCount;
    const toggleShrinkSpotlight = () => {
        if (isShrunk) {
            // Shrink spotlight
            console.log('Shrinking Spotlight');
            if (expandValue === 0) {
                setExpandValue(parseInt(document.documentElement.style.getPropertyValue('--spotlight-size')));
            }
            document.documentElement.style.setProperty('--spotlight-size', `${shrinkCount--}%`);
            if (shrinkCount >= 0) {
                requestAnimationFrame(toggleShrinkSpotlight);
            } else {
                setIsExpanding(false);
                setIsShrunk(false);
                setExpandValue(shrinkCount);
            }
        } else {
            // Expand spotlight
            if (shrinkCount <= 5) {
                document.documentElement.style.setProperty('--spotlight-size', `${shrinkCount++}%`);
                requestAnimationFrame(toggleShrinkSpotlight);
            } else {
                console.log('Done Expanding');
                setIsExpanding(false);
                setIsShrunk(true);
                setExpandValue(shrinkCount);
            }
        }
    };

    const handleMouseMove = (e: any) => {
        let rect;
        if (document.elementFromPoint(e.clientX, e.clientY)?.id == 'title') {
            setShowTitle(false);
            rect = e.target.parentElement.getBoundingClientRect();
        } else if (document.elementFromPoint(e.clientX, e.clientY)?.id == 'toggleSpotlightButton') {
            rect = e.target.parentElement.parentElement.getBoundingClientRect();
        } else {
            if (!isExpanding && !hideSpotlight) {
                setShowTitle(true);
            }
            rect = e.target.getBoundingClientRect();
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (spotlight.current === null) return;
        (spotlight.current as HTMLElement).style.left = `${x}px`;
        (spotlight.current as HTMLElement).style.top = `${y}px`;

        if (spotlightText.current === null) return;
        // console.log(`left: ${x} pixels | top: ${y} pixels`);
        (spotlightText.current as HTMLElement).style.left = `${x}px`;
        (spotlightText.current as HTMLElement).style.top = `calc(${y}px + var(--spotlight-text-position))`;
    };

    const handleTouchMove = (e: any) => {
        if (isShrunk) {
            toggleShrinkSpotlight();
        }
        if (!activateSpotlightMobile) return;
        console.log(e);
        const rect = e.target.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        if (spotlight.current === null) return;
        // console.log(`left: ${x} pixels | top: ${y} pixels`);
        (spotlight.current as HTMLElement).style.left = `${x}px`;
        (spotlight.current as HTMLElement).style.top = `${y}px`;

        if (spotlightText.current === null) return;
        // console.log(`left: ${x} pixels | top: ${y} pixels`);
        (spotlightText.current as HTMLElement).style.left = `${x}px`;
        (spotlightText.current as HTMLElement).style.top = `${y}px`;
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
        <section id={'spotlightSection'} className={`${styles.section2} ${isDark ? 'styles.dark' : ''}`}>
            <div
                data-mouse="hide"
                onMouseMove={handleMouseMove}
                // onTouchStart={() => {
                //     clearTimeout(touchTimeout);
                //     touchTimeout = setTimeout(() => {
                //         setActivateSpotlightMobile(true);
                //         disableScroll();
                //     }, 500);
                // }}
                // onTouchEnd={() => {
                //     clearTimeout(touchTimeout);
                //     enableScroll();
                //     setActivateSpotlightMobile(false);
                // }}
                // onTouchMoveCapture={handleTouchMove}
                className={styles.spotlightWrapper}
                onClick={() => {
                    if (!isExpanding) {
                        setIsExpanding(true);
                        toggleSpotlight();
                    }
                }}
            >
                <div ref={spotlight} className={`${styles.section2Overlay} ${hideSpotlight ? styles.hide : ''}`}></div>
                <div ref={spotlightText} className={`${styles.spotlightText} ${!showSpotlightText ? styles.hide : ''}`}>
                    <p>click to reveal</p>
                </div>

                <div
                    className={`${styles.titleContainer} ${!showTitle ? styles.hide : ''}`}
                    id={'title'}
                    data-mouse={'hide'}
                >
                    <h1 className={styles.title}>Technologies I have used</h1>
                </div>
                {/* 
                <div className={styles.toggleSpotlight}>
                    <button
                        onClick={() => {
                            if (!isExpanding) {
                                setIsExpanding(true);
                                toggleSpotlight();
                            }
                        }}
                        id={'toggleSpotlightButton'}
                        data-mouse={'hide'}
                    >
                        {hideSpotlight ? 'Turn off light' : 'Turn on light'}
                    </button>
                </div> */}
            </div>
        </section>
    );
}
