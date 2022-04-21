import styles from '../styles/components/Projects.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import projects from '../utils/projects';
import useIsMobile from '../hooks/useIsMobile';
import Parrallax from './Parrallax';
import ProjectImage from './ProjectImage';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    isMobile?: boolean;
}

export default function Projects({ isMobile }: Props) {
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
                    scroller: 'body',
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
                <div
                    data-test={'nothing'}
                    key={project.id}
                    id={`section${project.id}`}
                    className={`${styles.projectContainer}`}
                >
                    <div data-test={'nothing'} className={`${styles.project}`}>
                        <h1 data-test={'nothing'} className={`${styles.title}`}>
                            {project.name}
                        </h1>
                        <p data-test={'nothing'} className={`${styles.description}`}>
                            {project.description}
                        </p>
                        <ProjectImage project={project}></ProjectImage>
                        {project.link != '' ? (
                            <div data-test={'nothing'} className={`${styles.link}`}>
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
            );
        });

        return projectsContent;
    };

    return (
        <>
            <Parrallax container={null} parrallaxRefs={parrallaxRefs}></Parrallax>
            <section id={'projectsSection'} className={`${styles.projectsSection}`}>
                <h1 className={styles.sectionTitle}>Projects</h1>
                <div id={'horizontalSection'} className={`${styles.projectsContainer}`}>
                    {loadProjects()}
                </div>
            </section>
        </>
    );
}
