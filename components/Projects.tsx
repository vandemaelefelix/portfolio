import styles from '../styles/components/Projects.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import projects from '../utils/projects';
import useIsMobile from '../hooks/useIsMobile';
import Parrallax from './Parrallax';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ isMobile }: any) {
    // const isMobile = useIsMobile();
    const sectionRef = useRef();
    const parrallaxRefs = useRef<any[]>([]);

    useEffect(() => {
        let horizontalScroll: any;

        const setupHorizontalScroll = (): void => {
            // killHorizontalScroll();

            ScrollTrigger.defaults({
                markers: false,
            });

            horizontalScroll = gsap.to('#horizontalSection', {
                xPercent: () => -100 * (projects.length - 1),
                ease: 'linear',
                scrollTrigger: {
                    id: 'horizontalScroll',
                    scroller: '#mainSection',
                    trigger: '#projectsSection',
                    start: 'top+200 top+200',
                    end: () => window.innerHeight * ((projects.length - 1) * 3),
                    pin: true,
                    scrub: 0,
                    anticipatePin: 1,
                    // snap: {
                    //     snapTo: 1 / (projects.length - 1),
                    //     duration: { min: 0.05, max: 0.1 },
                    //     delay: 0,
                    //     ease: 'ease',
                    // },
                },
            });
        };

        const killHorizontalScroll = () => {
            if (horizontalScroll) {
                horizontalScroll.kill(true);
                ScrollTrigger.getById('horizontalScroll').kill(true);
            }
        };

        if (!isMobile) {
            let mediaQuery = window.matchMedia('(min-width: 1000px)');

            if (mediaQuery.matches) {
                /* the viewport is less than or exactly 500 pixels wide */
                console.log(window.innerWidth);
                setupHorizontalScroll();
            } else {
                console.log(window.innerWidth);
                /* the viewport is more than 500 pixels wide */
            }

            mediaQuery.addEventListener('change', () => {
                if (mediaQuery.matches) {
                    setupHorizontalScroll();
                } else {
                    killHorizontalScroll();
                }
            });
        } else {
            killHorizontalScroll();
        }

        return () => {
            killHorizontalScroll();
        };
    }, [isMobile]);

    const loadProjects = (): JSX.Element[] => {
        const projectsContent: JSX.Element[] = [];

        projects.forEach((project) => {
            projectsContent.push(
                <div key={project.id}>
                    <div key={project.id} id={`section${project.id}`} className={`${styles.projectContainer}`}>
                        <div className={`${styles.project}`}>
                            <h1 className={`${styles.title}`}>{project.name}</h1>
                            <p className={`${styles.description}`}>{project.description}</p>
                            <div className={`${styles.imageContainer}`}>
                                <svg
                                    ref={(element) => {
                                        if (parrallaxRefs.current) {
                                            parrallaxRefs.current[parrallaxRefs.current.length + 1] = {
                                                element: element,
                                                options: { speed: 0.012, direction: 'invert' },
                                            };
                                        }
                                    }}
                                    className={`
                                    ${styles.imageIcon}
                                    ${styles.top}
                                `}
                                    viewBox="0 0 134.46 134.46"
                                >
                                    <path
                                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                                        transform="translate(67.707) rotate(45)"
                                    />
                                </svg>
                                <div className={`${styles.imageWrapper}`}>
                                    <Image
                                        className={styles.image}
                                        alt={project.name}
                                        src={`/images/${project.image}`}
                                        layout={'fill'}
                                        objectFit={'cover'}
                                        loading={'lazy'}
                                    ></Image>
                                </div>
                                <div className={styles.imageOverlay}></div>
                                <svg
                                    ref={(element) => {
                                        if (parrallaxRefs.current) {
                                            parrallaxRefs.current[parrallaxRefs.current.length + 1] = {
                                                element: element,
                                                options: { speed: 0.012, direction: 'invert' },
                                            };
                                        }
                                    }}
                                    className={`
                                    ${styles.imageIcon}
                                    ${styles.bottom}
                                `}
                                    viewBox="0 0 249.734 249.734"
                                >
                                    <path
                                        d="M0,0C43.6,43.6,130.1,45.237,175.336,0c-45.251,45.251-51.313,126.528,0,177.841C123.259,125.763,47.245,130.6,0,177.841,46.912,130.929,43.567,43.567,0,0Z"
                                        transform="translate(125.753) rotate(45)"
                                    />
                                </svg>
                            </div>
                            {project.link != '' ? (
                                <div className={`${styles.link}`}>
                                    <a
                                        data-mouse={'hide'}
                                        // className={`${styles.link}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        href={project.link}
                                    >
                                        see more
                                        <span data-mouse={'hide'} className={`${styles.arrow}`}>
                                            <svg viewBox="0 0 330.001 180">
                                                <path
                                                    d="M100.606,100.606,150,51.212V315a15,15,0,0,0,30,0V51.212l49.394,49.394a15,15,0,0,0,21.212-21.213l-75-75a15,15,0,0,0-21.213,0l-75,75a15,15,0,0,0,21.213,21.213Z"
                                                    transform="translate(330 -74.999) rotate(90)"
                                                />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            );
        });

        return projectsContent;
    };

    return (
        <>
            <Parrallax container={null} parrallaxRefs={parrallaxRefs}></Parrallax>
            <section id={'projectsSection'} className={`${styles.projectsSection}`}>
                <div id={'horizontalSection'} className={`${styles.projectsContainer}`}>
                    {loadProjects()}
                </div>
            </section>
        </>
    );
}
