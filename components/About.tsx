import styles from '../styles/components/About.module.css';
import aboutImage from '../public/images/image.jpg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Parrallax from './Parrallax';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const parrallaxRefs = useRef<any[]>([]);
    const arrowPath = useRef<SVGPathElement | null>(null);
    useEffect(() => {
        console.log(arrowPath.current);
        if (arrowPath.current) {
            const path = arrowPath.current;
            document.documentElement.style.setProperty('--arrow-length', path.getTotalLength().toString());
            // path.style.strokeDasharray = path.getTotalLength().toString();
            // path.style.strokeDashoffset = path.getTotalLength().toString();

            // path.setAttribute(
            //     'style',
            //     'stroke-dasharray:' + path.getTotalLength() + ';stroke-dashoffset:' + path.getTotalLength()
            // );
        }
        return () => {};
    }, []);

    return (
        <>
            <Parrallax container={null} parrallaxRefs={parrallaxRefs}></Parrallax>
            <section ref={sectionRef} className={styles.about}>
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
                                // stroke="black"
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
                        <h2 className={styles.title}>
                            about me
                            {/* <span>
                                <svg viewBox="0 0 141.961 59.066">
                                    {' '}
                                    <g transform="translate(0 0)">
                                        <g>
                                            <path d="M50.892,12.991c4.234.428-50.584-9.14-49.885,20.075.7,29.26,90.9,24.75,90.9,24.75s49.585-.308,49.05-24.144C139.907-13.134,24.513,4.1,24.513,4.1" />
                                        </g>
                                    </g>
                                </svg>
                            </span> */}
                        </h2>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, laboriosam. Omnis, nam
                            quisquam! Error vero illo atque magni qui est nisi animi nam quibusdam quo odit quaerat,
                            doloribus non similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            laboriosam. Omnis, nam quisquam! Error vero illo atque magni qui est nisi animi nam
                            quibusdam quo odit quaerat, doloribus non similique. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Eligendi, laboriosam. Omnis, nam quisquam! Error vero illo atque magni qui
                            est nisi animi nam quibusdam quo odit quaerat, doloribus non similique. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Eligendi, laboriosam. Omnis, nam quisquam! Error vero
                            illo atque magni qui est nisi animi nam quibusdam quo odit quaerat, doloribus non similique.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}