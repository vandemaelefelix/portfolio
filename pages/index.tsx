import type { NextPage } from 'next';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import useIsMobile from '../hooks/useIsMobile';

import styles from '../styles/pages/Home.module.css';
import Image from 'next/image';
// import homeImage from '../public/images/image.jpg';
import homeImage from '../public/images/home-image-min.png';
import Spotlight from '../components/Spotlight';
import ColorPicker from '../components/ColorPicker';
import { gsap } from 'gsap';
import Menu from '../components/Menu';
import About from '../components/About';
import Parrallax from '../components/Parrallax';
// import TechnologiesMobile from '../components/TechnologiesMobile';

import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

import dynamic from 'next/dynamic';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const DynamicTechnologiesMobile = dynamic(() => import('../components/TechnologiesMobile'));

interface MenuHandle {
    openMenu: () => void;
}

const Home: NextPage = () => {
    const [isCursorVisible, setIsCursorVisible] = useState(true);

    const parentRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const menuRef = useRef<MenuHandle>(null);

    const parrallaxRefs = useRef<any[]>([]);

    const toggleMenu = () => {
        if (menuRef.current) {
            menuRef.current.openMenu();
        }
    };

    const scrollDown = () => {
        console.log('Scrolling down');
        gsap.to(window, { duration: 0.75, scrollTo: { y: '#aboutSection' } });
    };

    return (
        <>
            {isMobile ? (
                <></>
            ) : (
                <CustomCursor isVisible={isCursorVisible} fade={true} dotSpeed={1} circleSpeed={15}></CustomCursor>
            )}
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="generator" content="Next Js" />
                <meta name="referrer" content="no-referrer"></meta>

                <title>Felix</title>
                <meta name="author" content="Felix Vandemaele"></meta>
                <meta
                    name="description"
                    content="Hello I'm Felix, I am a junior full-stack developer and I am looking for a job. This is my personal portfolio."
                />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#f0f0e1"></meta>
            </Head>

            <Navbar toggleMenu={toggleMenu} parent={parentRef}></Navbar>

            <Menu parent={parentRef} ref={menuRef}></Menu>

            <Parrallax container={null} parrallaxRefs={parrallaxRefs}></Parrallax>
            <main id={'mainSection'} ref={parentRef} className={styles.content}>
                <section id="firstSection" className={styles.section1}>
                    <div
                        ref={(element) => {
                            if (parrallaxRefs.current) {
                                parrallaxRefs.current[3] = {
                                    element: element,
                                    options: { speed: 0.012, direction: 'invert' },
                                };
                            }
                        }}
                        className={styles.titleHello}
                    >
                        <p>
                            hello,
                            <br />
                            I&apos;m
                        </p>
                    </div>

                    <div className={styles.titleWrapper}>
                        <h1 className={styles.titleName}>FELIX</h1>
                        <h2 className={styles.titleSub}>
                            full - stack{' '}
                            <span>
                                <svg viewBox="0 0 37.833 37.833">
                                    <g transform="translate(18.917) rotate(45)">
                                        <path
                                            d="M 23.5485897064209 23.54201698303223 C 20.00277709960938 21.24861335754395 15.77107334136963 19.87440490722656 11.91342449188232 19.87440490722656 C 9.477958679199219 19.87440490722656 7.248828411102295 20.41231918334961 5.322402954101562 21.45034980773926 C 8.340620994567871 16.02938652038574 7.015796661376953 8.970254898071289 3.406765460968018 3.423787117004395 C 6.903822898864746 5.735080718994141 10.8783655166626 7.044854640960693 14.63987445831299 7.044854640960693 C 17.14252853393555 7.044854640960693 19.4507884979248 6.457704067230225 21.45958709716797 5.325591087341309 C 19.9969425201416 8.067934989929199 19.54608535766602 11.42863845825195 20.19097518920898 15.09473514556885 C 20.70497894287109 18.01675415039062 21.8972282409668 20.9738883972168 23.5485897064209 23.54201698303223 Z"
                                            stroke="none"
                                        />
                                        <path
                                            d="M 4.86210823059082 4.883350372314453 C 6.062654495239258 7.107564926147461 6.894138336181641 9.485599517822266 7.269325256347656 11.85051441192627 C 7.761688232421875 14.95403385162354 7.446018218994141 17.86974143981934 6.379562377929688 20.40185546875 C 8.059076309204102 19.72334861755371 9.920160293579102 19.3743953704834 11.91342449188232 19.3743953704834 C 15.26960182189941 19.3743953704834 18.90076446533203 20.38881683349609 22.14180374145508 22.13235473632812 C 20.96625137329102 19.93626403808594 20.1147632598877 17.54755592346191 19.69853591918945 15.18135452270508 C 19.13278579711914 11.96518135070801 19.38763809204102 8.972507476806641 20.40927505493164 6.402530670166016 C 18.65064430236816 7.15662956237793 16.70896911621094 7.544855117797852 14.63986492156982 7.544855117797852 C 11.39168643951416 7.544855117797852 7.99183464050293 6.595064163208008 4.86210823059082 4.883350372314453 M -5.7220458984375e-06 -5.7220458984375e-06 C 6.582685470581055 6.582685470581055 17.40214538574219 9.350004196166992 23.9293155670166 2.822824478149414 C 17.42539596557617 9.326755523681641 20.83655548095703 20.83655548095703 26.75214385986328 26.75214385986328 C 20.83744430541992 20.83744430541992 9.393278121948242 17.3588752746582 2.822824478149414 23.9293155670166 C 9.259794235229492 17.49235534667969 6.550405502319336 6.550405502319336 -5.7220458984375e-06 -5.7220458984375e-06 Z"
                                            stroke="none"
                                        />
                                    </g>
                                </svg>
                            </span>{' '}
                            developer
                        </h2>
                    </div>

                    <div className={styles.imageContainer}>
                        <svg
                            ref={(element) => {
                                if (parrallaxRefs.current) {
                                    parrallaxRefs.current[1] = {
                                        element: element,
                                        options: { speed: 0.012, direction: 'normal' },
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
                        <div className={styles.imageWrapper}>
                            <Image
                                alt={'Picture of myself'}
                                src={homeImage}
                                layout={'fill'}
                                className={`
                                    ${styles.image}
                                    ${styles.top}
                                `}
                                placeholder={'blur'}
                                loading={'lazy'}
                            ></Image>
                        </div>

                        <div className={styles.imageOverlay}></div>
                        <svg
                            ref={(element) => {
                                if (parrallaxRefs.current) {
                                    parrallaxRefs.current[2] = {
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

                    <div data-mouse="scroll" className={styles.scrollDown}>
                        <div onClick={scrollDown}>
                            <p>scroll down</p>
                            <svg className={styles.scrollDownIcon} viewBox="0 0 20.55 12.458">
                                <path
                                    d="M7868.459,3382.714a1.819,1.819,0,0,1-1.268-.512l-8.091-7.808a1.825,1.825,0,0,1,2.535-2.627l6.8,6.563,6.54-6.54a1.825,1.825,0,1,1,2.581,2.581l-7.807,7.808A1.821,1.821,0,0,1,7868.459,3382.714Z"
                                    transform="translate(-7858.042 -3370.756)"
                                    strokeLinecap="round"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    </div>
                </section>

                <About></About>

                <Projects isMobile={isMobile}></Projects>

                {isMobile ? <DynamicTechnologiesMobile></DynamicTechnologiesMobile> : <Spotlight></Spotlight>}
                {/* {isMobile ? <TechnologiesMobile></TechnologiesMobile> : <Spotlight></Spotlight>} */}

                <Contact></Contact>
            </main>

            <ColorPicker></ColorPicker>
        </>
    );
};

export default Home;
