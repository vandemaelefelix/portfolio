import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from '../styles/components/CustomCursor.module.css';

interface Coordinates {
    x: number;
    y: number;
}

interface Props {
    fade: boolean;
    dotSpeed: number;
    circleSpeed: number;
}

export default function CustomCursor({ fade, dotSpeed, circleSpeed }: Props) {
    const circlePos: Coordinates = { x: 0, y: 0 };
    const dotPos: Coordinates = { x: 0, y: 0 };
    const mousePos: Coordinates = { x: 0, y: 0 };
    let isMoving: boolean = false;
    let timeout: any;

    const outerCircleRef: MutableRefObject<null> = useRef(null);
    const innerCircleRef: MutableRefObject<null> = useRef(null);
    let dot: HTMLDivElement | null = innerCircleRef.current;
    let circle: HTMLDivElement | null = outerCircleRef.current;

    const [isClickDown, setIsClickDown] = useState(false);
    const [isFaded, setIsFaded] = useState(false);

    const handleClickUp = (): void => {
        setIsClickDown(false);
    };

    const handleClickDown = (): void => {
        setIsClickDown(true);

        if (fade) {
            if (!isMoving) {
                isMoving = true;
                fadeInMouse();
            }
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fadeOutMouse();
                isMoving = false;
            }, 2000);
        }
    };

    const fadeOutMouse = () => {
        if (dot === null || circle === null) return;
        setIsFaded(true);
        // dot.style.opacity = '0';
        // dot.style.transform = 'scale(0) translate(-50%, -50%)';
        // circle.style.opacity = '0';
        // circle.style.transform = 'scale(0) translate(-50%, -50%)';
    };
    const fadeInMouse = () => {
        if (dot === null || circle === null) return;
        setIsFaded(false);
        // dot.style.opacity = '1';
        // dot.style.transform = 'scale(1) translate(-50%, -50%)';
        // circle.style.opacity = '1';
        // circle.style.transform = 'scale(1) translate(-50%, -50%)';
    };

    const followMouse = (): void => {
        if (circle !== null && dot !== null) {
            //1. find distance X , distance Y
            let distX: number = mousePos.x - circlePos.x;
            let distY: number = mousePos.y - circlePos.y;

            //Progressive reduction of distance
            circlePos.x += distX / circleSpeed;
            circlePos.y += distY / circleSpeed;

            dotPos.x += (mousePos.x - dotPos.x) / dotSpeed;
            dotPos.y += (mousePos.y - dotPos.y) / dotSpeed;

            circle.style.left = circlePos.x + 'px';
            circle.style.top = circlePos.y + 'px';

            dot.style.left = dotPos.x + 'px';
            dot.style.top = dotPos.y + 'px';
        } else {
            dot = innerCircleRef.current;
            circle = outerCircleRef.current;
        }

        requestAnimationFrame(() => followMouse());
    };

    const getMouse = (e: MouseEvent | TouchEvent) => {
        if (fade) {
            if (!isMoving) {
                isMoving = true;
                fadeInMouse();
            }
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log('Timeout started');
                fadeOutMouse();
                isMoving = false;
            }, 2000);
        }

        if (e.type === 'touchmove' || e.type === 'touchdown') {
            handleClickUp();
            // e.preventDefault();
            const touch = e.changedTouches[0];
            mousePos.x = touch.pageX;
            mousePos.y = touch.pageY;
        } else {
            mousePos.x = e.pageX;
            mousePos.y = e.pageY;
        }
    };

    const mouseMoveHandler = (e: TouchEvent | MouseEvent) => getMouse(e);
    const clickUpHandler = (e: TouchEvent | PointerEvent) => handleClickUp();
    const clickDownHandler = (e: TouchEvent | PointerEvent) => handleClickDown();

    useEffect(() => {
        document.removeEventListener('touchmove', mouseMoveHandler);
        document.addEventListener('mousemove', mouseMoveHandler);

        document.addEventListener('touchend', clickUpHandler);
        document.addEventListener('pointerdown', clickDownHandler);
        document.addEventListener('pointerup', clickUpHandler);

        followMouse();

        return () => {
            document.removeEventListener('touchend', clickUpHandler);
            document.removeEventListener('pointerdown', clickDownHandler);
            document.removeEventListener('pointerup', clickUpHandler);

            document.removeEventListener('touchmove', mouseMoveHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

    return (
        <>
            <span
                ref={outerCircleRef}
                className={`
                    ${styles.outerCircle} 
                    ${isClickDown ? styles.click : ''} 
                    ${isFaded ? styles.faded : ''}
                `}
            ></span>
            <span
                ref={innerCircleRef}
                className={`
                    ${styles.innerCircle} 
                    ${isClickDown ? styles.click : ''}
                    ${isFaded ? styles.faded : ''}
                `}
            ></span>
        </>
    );
}
