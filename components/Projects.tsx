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
import tools from '../utils/tools';
import YouTube from 'react-youtube';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    isMobile?: boolean;
}

interface Tool {
    name: string;
    path: string;
    importance: number;
}

export default function Projects({ isMobile }: Props) {
    const sectionRef = useRef();
    const parrallaxRefs = useRef<any[]>([]);

    useEffect(() => {
        let horizontalScroll: gsap.core.Tween;
        const scrollSpeed: number = 2.5;

        const setupHorizontalScroll = (): void => {
            // killHorizontalScroll();

            ScrollTrigger.defaults({
                markers: false,
            });

            horizontalScroll = gsap.to('#horizontalSection', {
                xPercent: () => -100 * (projects.length - 1),
                ease: 'none',
                scrollTrigger: {
                    id: 'horizontalScroll',
                    scroller: 'body',
                    trigger: '#projectsSection',
                    start: 'top top',
                    end: () => window.innerHeight * ((projects.length - 1) * scrollSpeed),
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 0,
                    snap: {
                        snapTo: 1 / (projects.length - 1),
                        duration: { min: 0.005, max: 0.5 },
                        ease: 'power1.inOut',
                        inertia: true,
                        directional: false,
                    },
                },
            });
        };

        const killHorizontalScroll = () => {
            if (horizontalScroll) {
                horizontalScroll.kill();
                const trigger = ScrollTrigger.getById('horizontalScroll');
                if (trigger) {
                    trigger.kill(true);
                }
            }
        };

        if (!isMobile) {
            let mediaQuery = window.matchMedia('(min-width: 1000px)');

            if (mediaQuery.matches) {
                setupHorizontalScroll();
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

    const loadLinks = (links: { name: string; url: string }[]): JSX.Element[] => {
        const linksContent: JSX.Element[] = [];

        links.forEach(({ name, url }: { name: string; url: string }) => {
            linksContent.push(
                <div key={url} className={`${styles.link}`}>
                    <a data-mouse={'hide'} target="_blank" rel="noreferrer" href={url}>
                        {name}
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
            );
        });

        return linksContent;
    };

    const getTool = (name: string): { name: string; path: string; importance: number } => {
        return tools.filter((tool) => tool.name === name)[0];
    };

    const loadTools = (usedTools: string[]): JSX.Element[] => {
        if (usedTools.length <= 0) return [<></>];

        const toolsContent: JSX.Element[] = [];

        console.log(usedTools);

        usedTools.forEach((tool: string) => {
            const toolDetails: Tool = getTool(tool);
            console.log(toolDetails);
            toolsContent.push(
                <div key={toolDetails.name} className={`${styles.tool}`}>
                    <div className={`${styles.toolWrapper}`}>
                        <Image
                            className={styles.image}
                            alt={toolDetails.name}
                            src={`/images/tools/${toolDetails.path}`}
                            layout={'fill'}
                            objectFit={'contain'}
                            loading={'lazy'}
                        ></Image>
                    </div>
                </div>
            );
        });

        return toolsContent;
    };

    const loadProjects = (): JSX.Element[] => {
        console.log('Loading projects');
        const projectsContent: JSX.Element[] = [];

        projects.forEach((project, index) => {
            projectsContent.push(
                <div
                    data-mouse={index % 2 > 0 ? 'inverted' : ''}
                    key={project.id}
                    id={`project${project.id}`}
                    className={`${styles.projectContainer}`}
                >
                    <div className={`${styles.project}`}>
                        <div className={`${styles.projectImage}`}>
                            <h1 className={`${styles.titleMobile}`}>{project.name}</h1>
                            <ProjectImage project={project}></ProjectImage>
                        </div>

                        <div className={`${styles.projectContent}`}>
                            <h1 className={`${styles.title}`}>{project.name}</h1>
                            <p
                                dangerouslySetInnerHTML={{ __html: project.description }}
                                className={`${styles.description}`}
                            ></p>
                            <div className={`${styles.toolsContainer}`}>{loadTools(project.tools)}</div>
                            <div className={`${styles.linksContainer}`}>{loadLinks(project.links)}</div>
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
                <h1 className={styles.sectionTitle}>Projects</h1>
                <div id={'horizontalSection'} className={`${styles.projectsContainer}`}>
                    {loadProjects()}
                </div>
            </section>
        </>
    );
}
