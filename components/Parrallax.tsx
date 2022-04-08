import { useEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';

export default function Parrallax({ container, parrallaxRefs }: any) {
    const isMobile = useIsMobile();
    useEffect(() => {
        // window.addEventListener('deviceorientation', (e: any) => {
        //     console.log(e);
        // });

        const checkTransitions = (transitionString: string) => {
            const transitions = transitionString.split(',');
            let newTransitionString = '';
            transitions.forEach((transition: string) => {
                const type = transition.split(' ').filter((value) => value !== ' ' && value !== '')[0];

                if (type !== 'transform') {
                    if (newTransitionString === '') {
                        newTransitionString += `${transition}`;
                    } else {
                        newTransitionString += `,${transition}`;
                    }
                }
            });
            return newTransitionString;
        };

        const handleParrallax = (e: any) => {
            if (parrallaxRefs) {
                parrallaxRefs.current.forEach((item: any, index: number) => {
                    const element = item.element;
                    if (element == null || element == undefined) return;
                    let speed: number;
                    if (element.hasAttribute('data-speed')) {
                        speed = parseInt(element.getAttribute('data-speed') || '0');
                    } else {
                        speed = 1;
                    }

                    if (speed && speed > 0) {
                        element.style.transition = checkTransitions(getComputedStyle(element).transition);
                        const scale = item.options.speed;

                        let x = null,
                            y = null;

                        x = (window.innerWidth / 2 - e.pageX * speed) * scale;
                        y = (window.innerHeight / 2 - e.pageY * speed) * scale;

                        element.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
                        if (item.options.direction === 'normal') {
                            element.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
                        } else if (item.options.direction === 'invert') {
                            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
                        }
                    }
                });
            }
        };

        const handleParrallaxMobile = (e: any) => {
            // Beta => x-axis
            // Gamma => y-axis

            if (parrallaxRefs) {
                parrallaxRefs.current.forEach((item: any, index: number) => {
                    const element = item.element;
                    let speed: number;
                    if (element.hasAttribute('data-speed')) {
                        speed = parseInt(element.getAttribute('data-speed') || '0');
                    } else {
                        speed = 1;
                    }

                    if (speed && speed > 0) {
                        element.style.transition = checkTransitions(getComputedStyle(element).transition);
                        const scale = 0.1;
                        // const scale = item.options.speed;

                        let x = null,
                            y = null;

                        x = (window.innerWidth / 2 - e.gamma * speed) * scale;
                        y = (window.innerHeight / 2 - e.beta + 180 * speed) * scale;

                        element.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
                        if (item.options.direction === 'normal') {
                            element.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
                        } else if (item.options.direction === 'invert') {
                            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
                        }
                    }
                });
            }
        };

        let parentElement: HTMLElement | null;
        if (container === null) {
            if (!isMobile) {
                window.addEventListener('mousemove', handleParrallax);
            } else {
                // window.addEventListener('deviceorientation', handleParrallaxMobile);
            }
        } else {
            parentElement = container.current;
            if (parentElement && parrallaxRefs) {
                parentElement.addEventListener('mousemove', handleParrallax);
            }
        }

        return () => {
            if (container === null) {
                window.removeEventListener('mousemove', handleParrallax);
            } else {
                if (parentElement) {
                    parentElement.removeEventListener('mousemove', handleParrallax);
                }
            }
        };
    }, [container, parrallaxRefs, isMobile]);

    return <></>;
}
