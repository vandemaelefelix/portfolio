import { MouseEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/components/Spotlight.module.css';

// import technologies from '../public/images/technologies/technologies';
import tools from '../utils/tools';

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
    const [hoveredItem, setHoveredItem] = useState<string>('');

    const [shuffledTools, setShuffledTools] = useState(tools);

    const titleContainerRef = useRef(null);

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

    const handleMouseMove = (e: MouseEvent) => {
        if (titleContainerRef.current) {
            const bounds: DOMRect = (titleContainerRef.current as HTMLElement).getBoundingClientRect();
            if (
                e.clientX >= bounds.left &&
                e.clientX < bounds.left + bounds.width &&
                e.clientY >= bounds.top &&
                e.clientY < bounds.top + bounds.height
            ) {
                setShowTitle(false);
            } else {
                if (!hideSpotlight && !isExpanding) {
                    setShowTitle(true);
                }
            }
        }

        let rect;
        if (document.elementFromPoint(e.clientX, e.clientY)?.id.split('-')[0] == 'tool') {
            rect = (e.target as any).parentElement.getBoundingClientRect();
            e.target;
        } else {
            rect = (e.target as any).getBoundingClientRect();
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (spotlight.current === null) return;
        (spotlight.current as HTMLElement).style.left = `${x}px`;
        (spotlight.current as HTMLElement).style.top = `${y}px`;

        if (spotlightText.current === null) return;
        (spotlightText.current as HTMLElement).style.left = `${x}px`;

        let distance;
        if (hideSpotlight || isExpanding) {
            distance = '5rem';
        } else {
            distance = 'var(--spotlight-text-position)';
        }
        if (e.clientY > (e.target as any).parentElement.offsetHeight / 2) {
            (spotlightText.current as HTMLElement).style.top = `calc(${y}px - ${distance})`;
        } else {
            (spotlightText.current as HTMLElement).style.top = `calc(${y}px + ${distance})`;
        }
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

    useEffect(() => {
        console.log('shuffled tools');
        setShuffledTools(shuffle(tools));
    }, []);

    function shuffle(array: any) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const loadContent = () => {
        let content: JSX.Element[] = [];

        shuffledTools.forEach(({ name, path, importance }: any) => {
            content.push(
                <div
                    id={`tool-${path}`}
                    onMouseEnter={() => {
                        setHoveredItem(name);
                    }}
                    className={`${styles.toolsItem}`}
                    key={name}
                    data-importance={importance}
                    data-mouse={'hide'}
                    style={{
                        width: `calc(3rem * ${1 + importance / 2})`,
                        height: `calc(3rem * ${1 + importance / 2})`,
                    }}
                >
                    <div className={`${styles.imageWrapper}`}>
                        <Image
                            className={styles.toolImage}
                            alt={name}
                            src={`/images/tools/${path}`}
                            layout={'fill'}
                            objectFit={'contain'}
                            loading={'lazy'}
                        ></Image>
                    </div>
                </div>
            );
        });

        return content;
    };

    return (
        <section id={'spotlightSection'} className={`${styles.section2} ${isDark ? 'styles.dark' : ''}`}>
            <div
                data-mouse="hide"
                onMouseMove={handleMouseMove}
                className={styles.spotlightWrapper}
                onClick={() => {
                    if (!isExpanding) {
                        setIsExpanding(true);
                        toggleSpotlight();
                    }
                }}
            >
                {/* {hoveredItem && hideSpotlight ? <div className={styles.hoveredItem}>{hoveredItem}</div> : <></>} */}
                <div className={`${styles.content}`} data-mouse={'hide'}>
                    {loadContent()}
                </div>
                <div ref={spotlight} className={`${styles.section2Overlay} ${hideSpotlight ? styles.hide : ''}`}></div>
                <div ref={spotlightText} className={`${styles.spotlightText} ${!showSpotlightText ? styles.hide : ''}`}>
                    {hoveredItem === '' ? <p>click to reveal</p> : <p>{hoveredItem}</p>}
                </div>

                <div
                    className={`${styles.titleContainer} ${!showTitle ? styles.hide : ''}`}
                    id={'title'}
                    data-mouse={'hide'}
                    ref={titleContainerRef}
                >
                    <h1 className={styles.title}>Tools I have used</h1>
                    <h2 className={styles.subTitle}>(click to reveal all)</h2>
                </div>
            </div>
        </section>
    );
}
