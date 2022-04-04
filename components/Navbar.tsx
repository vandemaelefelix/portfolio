import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/Navbar.module.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ parent, toggleMenu }: any) {
    const moveToTop = () => {
        gsap.to(parent.current, { duration: 0.75, scrollTo: { y: 0 } });
    };
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const iconRef = useRef(null);

    useEffect(() => {
        while (iconRef === null) {
            setTimeout(() => {}, 200);
        }

        var rotate = gsap
            .timeline({
                scrollTrigger: {
                    scroller: '#mainSection',
                    trigger: '#mainSection',
                    scrub: 0.2,
                    start: 'top top',
                    end: '+=10000',
                },
            })
            .to(iconRef.current, {
                rotation: 360 * 10,
                ease: 'none',
            });

        return () => {};
    }, []);

    return (
        <nav className={styles.nav}>
            <div className={styles.nameContainer}>
                <h1 onClick={moveToTop} className={styles.name}>
                    Felix
                </h1>
            </div>
            <div data-mouse="hide" className={styles.logoContainer}>
                <svg
                    data-mouse="hide"
                    onClick={moveToTop}
                    className={styles.logo}
                    ref={iconRef}
                    viewBox="0 0 48 48.001"
                >
                    <path
                        data-mouse="hide"
                        d="M-9004.7-2328.274c0-8.266,3.556-10.5,3.69-17.713l-.016.015c-4.976,5.175-4.142,9.359-9.9,15.119-5.875,5.875-11.182.731-5.225-5.224,5.846-5.846,9.94-4.91,15.137-9.918-7.2.133-9.562,3.69-17.716,3.69-8.31,0-8.425-7.389,0-7.389,8.267,0,10.5,3.558,17.716,3.69a.154.154,0,0,0-.019-.02c-5.187-4.985-9.278-4.06-15.117-9.9-5.957-5.957-.651-11.1,5.226-5.225,5.762,5.763,4.922,9.95,9.914,15.132-.135-7.213-3.69-9.446-3.69-17.713,0-8.423,7.389-8.309,7.389,0,0,8.156-3.558,10.522-3.69,17.719l.021-.021c4.985-5.187,4.059-9.281,9.9-15.117,5.959-5.958,11.1-.652,5.226,5.225-5.765,5.763-9.954,4.922-15.134,9.917,7.213-.134,9.447-3.69,17.713-3.69,8.423,0,8.309,7.389,0,7.389-8.153,0-10.519-3.556-17.713-3.69.007.007.012.014.019.021,5.172,4.972,9.358,4.139,15.115,9.9,5.876,5.876.733,11.182-5.226,5.225-5.847-5.845-4.909-9.942-9.918-15.138.133,7.2,3.69,9.563,3.69,17.719,0,4.169-1.859,6.275-3.714,6.275S-9004.7-2324.077-9004.7-2328.274Z"
                        transform="translate(9025 2370)"
                    />
                </svg>
            </div>

            <div
                onClick={() => {
                    toggleMenu();
                    setMenuIsOpen(!menuIsOpen);
                }}
                className={`${styles.menuIcon} ${menuIsOpen ? styles.active : ''}`}
                data-mouse="hide"
            >
                <p data-mouse="hide" className={styles.menuIconText}>
                    menu
                </p>
                <span data-mouse="hide" className={styles.menuIconDot}></span>
            </div>
        </nav>
    );
}
