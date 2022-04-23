import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/ProjectImage.module.css';
import Parrallax from './Parrallax';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
    image2?: string;
    link?: string;
    video?: string;
    tools?: string[];
}

interface Props {
    project: Project;
}

export default function ProjectImage({ project }: Props) {
    const parrallaxRefs = useRef<any[]>([]);
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout>(setTimeout(() => {}));

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const play = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const pause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.5;
        }

        return () => {};
    }, [videoRef]);

    return (
        <div
            className={`${styles.imageContainer}`}
            onMouseEnter={() => {
                // console.log('test');
                // clearTimeout(hoverTimeout);
                // setHoverTimeout(
                //     setTimeout(() => {
                //         play();
                //         setIsHover(true);
                //         console.log('hover');
                //     }, 500)
                // );
            }}
            onMouseLeave={() => {
                // clearTimeout(hoverTimeout);
                // setIsHover(false);
                // pause();
            }}
            onClick={() => {
                if (isPlaying) {
                    pause();
                    setIsHover(false);
                    setIsPlaying(false);
                } else {
                    play();
                    setIsHover(true);
                    setIsPlaying(true);
                }
            }}
        >
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
            {/* {project.video ? (
                <div className={`${styles.videoWrapper} ${isHover ? styles.hover : ''}`}>
                    <video
                    loading={'lazy'}
                        className={`${styles.video}`}
                        playsInline
                        autoPlay
                        muted
                        loop
                        // src={`/videos/${project.video}`}
                        src={project.video}
                        ref={videoRef}
                    ></video>
                </div>
            ) : (
                <></>
            )} */}
            {project.image2 ? (
                <div className={`${styles.videoWrapper} ${isHover ? styles.hover : ''}`}>
                    <Image
                        className={styles.image}
                        alt={project.name}
                        src={`/images/${project.image2}`}
                        layout={'fill'}
                        objectFit={'cover'}
                        loading={'lazy'}
                    ></Image>
                </div>
            ) : (
                <></>
            )}
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
            <Parrallax container={null} parrallaxRefs={parrallaxRefs}></Parrallax>
        </div>
    );
}
