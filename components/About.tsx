import styles from '../styles/components/About.module.css';
// import aboutImage from '../public/images/image.jpg';
import aboutImage from '../public/images/about-image.jpg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Parrallax from './Parrallax';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const parrallaxRefs = useRef<any[]>([]);
    const arrowPath = useRef<SVGPathElement | null>(null);
    useEffect(() => {
        if (arrowPath.current) {
            const path = arrowPath.current;
            document.documentElement.style.setProperty('--arrow-length', path.getTotalLength().toString());
        }
        return () => {};
    }, []);

    return (
        <>
            <Parrallax container={null} parrallaxRefs={parrallaxRefs}></Parrallax>
            <section id={'aboutSection'} ref={sectionRef} className={styles.about}>
                <div className={styles.content}>
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
                            className={styles.imageArrow}
                            viewBox="0 0 337.661 284.695"
                        >
                            <path
                                ref={arrowPath}
                                className={styles.arrowPath}
                                d="M.626.022C64.805,21.033,144.7,75.553,133.309,152.508c-5.882,36.183-37.348,71.407-75.867,70.1-19.131-.987-34.127-15.678-43.212-31.461-18.238-34.535,6.83-73.264,33.5-95.4,21.358-17.469,50.11-25.335,77.457-21.867,47.286,5.533,79.835,43.157,109.334,76.785,35.215,40.6,67.5,83.526,98.805,127.166,2.832,4-2.344,9.059-6.261,5.834-11.773-9.081-28.872-20.8-44.1-14.155l-3-6.153c5.115-2.149,10.2-4.409,15.1-7.056a146.271,146.271,0,0,0,27.556-18.773,106.511,106.511,0,0,0,11.838-11.806,1.807,1.807,0,0,1,2.98,2c-5.831,11.487-8.838,25.419-4.849,38a.48.48,0,0,1-.9.341c-5.233-12.894-2.86-27.515,2.541-40l3.062,1.9a97.744,97.744,0,0,1-11.6,12.957,158.982,158.982,0,0,1-43.02,28.745,3.425,3.425,0,0,1-3-6.153c17.954-9.28,38.5,2.841,52.949,13.564l-6.261,5.836q-32.134-42.682-65.535-84.472-16.64-20.9-33.844-41.279c-17.234-20.034-34.3-40.506-55.59-56.119-35.313-26.062-85.392-29.23-120.989-1.907C24.076,119.183-.987,156.7,17.075,189.6c8.569,14.218,23.137,27.765,40.609,27.806,17.121.283,33.169-9.114,44.728-21.286,39.56-43.282,25.378-99.362-13.723-137.5C70.086,39.958,47.833,24.6,24.477,12.234Q12.647,6.1.3.922a.48.48,0,0,1,.331-.9"
                                transform="translate(0 0)"
                                fill="none"
                                strokeWidth="6"
                            />
                        </svg>

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
                                className={styles.image}
                                alt={'Picture of myself'}
                                src={aboutImage}
                                layout={'fill'}
                                objectFit={'cover'}
                                placeholder={'blur'}
                                loading={'lazy'}
                            ></Image>
                        </div>
                        <div className={styles.imageOverlay}></div>
                        <svg
                            ref={(element) => {
                                if (parrallaxRefs.current) {
                                    parrallaxRefs.current[3] = {
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
                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>about me</h2>
                        <p className={styles.text}>
                            {/* Hello I’m <span>Felix</span>, I’m a junior <span>full-stack developer</span>.<br></br> Two
                            years ago, I graduated in <span>Multimedia & Creative Technologies</span>, more specifically{' '}
                            <span>Smart Tech & AI Creator</span>, at Howest Kortrijk. Whitin MCT I also studied{' '}
                            <span>Web & App Developer</span>, because I was not confident enough about my AI skills. I
                            have a passion for programming and problem solving but I have a soft spot for
                            frontend-development. I just love learning new technologies and frameworks. I definitely
                            wouldn’t call myself a designer, but when I create a website or an app, I try to make it
                            look as good as I can.  */}
                            Hello, I’m <span>Felix</span>. I’m a junior <span>full-stack developer</span>. <br></br>
                            Since I was little, I’ve always been captivated about computers. My interest in web
                            development really started off when I decided to create some simple HTML & CSS webpages in
                            Notepad. It wasn’t much, but it really inspired me to learn more about it. <br></br>And so I
                            did, I studied <span>Multimedia & Creative Technologies (MCT)</span>, more specifically{' '}
                            <span>Smart Tech & AI Creator</span>, at Howest Kortrijk. Since I was also fascinated by
                            another major within MCT where I could further develop my web development skills, I decided
                            to go on studying <span>Web & App Developer</span>. <br></br>I have a passion for everything
                            that is programming and problem solving with a soft spot for front end development. I
                            definitely wouldn’t call myself a designer, but when I create a website or an app, I try to
                            make it look as attractive as I can.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
