import styles from '../styles/components/TechnologiesMobile.module.css';
import Matter from 'matter-js';
import { useEffect, useRef, useState } from 'react';
// import technologies from '../public/images/technologies/technologies';
import tools from '../utils/tools';
import Image from 'next/image';
import { clear } from 'console';

const STATIC_DENSITY = 80;

interface Icon {
    name: string;
    path: string;
}

export default function TechnologiesMobile() {
    const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);
    // const [showOverlay, setShowOverlay] = useState(true);
    // const [overlayTimeout, setOverlayTimeout] = useState<any | null>(null);

    const sceneContainerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLCanvasElement>(null);

    const [constraints, setContraints] = useState<any>();
    const [scene, setScene] = useState<any>();
    const [sceneRenderer, setSceneRenderer] = useState<{ engine: any; render: any; runner: any; element: any } | null>(
        null
    );

    const [resetScene, setResetScene] = useState(false);

    const handleResize = () => {
        if (sceneContainerRef.current) {
            setContraints(sceneContainerRef.current.getBoundingClientRect());
        }
    };

    // const setupScene = () => {
    //     if (sceneContainerRef.current && sceneRef.current) {
    //         let Engine = Matter.Engine;
    //         let Render = Matter.Render;
    //         let Runner = Matter.Runner;
    //         let Bodies = Matter.Bodies;
    //         let Mouse = Matter.Mouse;
    //         let MouseConstraint = Matter.MouseConstraint;
    //         let Composite = Matter.Composite;

    //         if (sceneRenderer) {
    //             console.log('Clearing scene');
    //             Composite.clear(sceneRenderer.engine.world, false, true);
    //             Engine.clear(sceneRenderer.engine);
    //             Render.stop(sceneRenderer.render);
    //             Runner.stop(sceneRenderer.runner);
    //             sceneRenderer.render.canvas.remove();
    //             sceneRenderer.render.canvas = null;
    //             sceneRenderer.render.context = null;
    //             sceneRenderer.render.textures = {};

    //             sceneRenderer.element.replaceWith(sceneRenderer.element.cloneNode(true));

    //             // mouseConstraint.mouse.element.addEventListener('touchstart', handleTouchStart, {
    //             //     passive: true,
    //             // });
    //             // mouseConstraint.mouse.element.addEventListener('touchend', handleTouchEnd, {
    //             //     passive: true,
    //             // });
    //             // mouseConstraint.mouse.element.addEventListener('touchmove', handleTouchMove, {
    //             //     passive: true,
    //             // });
    //         }

    //         let engine = Engine.create();
    //         let runner = Runner.create();

    //         let render = Render.create({
    //             element: sceneContainerRef.current,
    //             engine: engine,
    //             canvas: sceneRef.current,
    //             options: {
    //                 background: 'rgba(0, 0, 0, 0)',
    //                 wireframes: false,
    //             },
    //         });

    //         const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
    //             isStatic: true,
    //         });

    //         const leftWall = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
    //             isStatic: true,
    //         });
    //         const rightWall = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
    //             isStatic: true,
    //         });
    //         const roof = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
    //             isStatic: true,
    //         });

    //         const icons: any = [];

    //         tools.forEach((tech: Icon) => {
    //             const ball = Bodies.circle(Math.random() * 150, 0, 40, {
    //                 label: JSON.stringify(tech),
    //                 restitution: 0.1,
    //                 render: {
    //                     sprite: {
    //                         texture: `/images/tools/${tech.path}`,
    //                         // texture: `/images/technologies/${tech.path}`,
    //                         xScale: 0.4,
    //                         yScale: 0.4,
    //                     },
    //                     fillStyle: 'yellow',
    //                 },
    //             });
    //             icons.push(ball);
    //         });

    //         var mouse = Mouse.create(render.canvas),
    //             mouseConstraint = MouseConstraint.create(engine, {
    //                 mouse: mouse,
    //                 constraint: {
    //                     stiffness: 0.3,
    //                     render: {
    //                         visible: false,
    //                     },
    //                 } as Matter.Constraint,
    //             });

    //         Matter.Events.on(mouseConstraint, 'mousedown', function (event: any) {
    //             if (mouseConstraint.body) {
    //                 // console.log(mouseConstraint.body.label);
    //                 let label: Icon | null;
    //                 try {
    //                     label = JSON.parse(mouseConstraint.body.label);
    //                 } catch (error) {
    //                     label = null;
    //                 }
    //                 console.log(mouseConstraint.body);
    //                 setSelectedIcon(label);
    //             }
    //         });

    //         // console.log(mouseConstraint.mouse.element);

    //         // @ts-ignore
    //         mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel, {
    //             passive: true,
    //         });
    //         // @ts-ignore
    //         mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel, {
    //             passive: true,
    //         });

    //         Composite.add(engine.world, mouseConstraint);

    //         Composite.add(engine.world, [floor, leftWall, rightWall, roof]);
    //         Composite.add(engine.world, icons);

    //         // Engine.run(engine);
    //         Matter.Runner.run(engine);
    //         Render.run(render);

    //         setContraints(sceneContainerRef.current.getBoundingClientRect());
    //         setScene(render);

    //         window.addEventListener('resize', handleResize);

    //         const handleTouchStart = (event: any) => {
    //             if (!mouseConstraint.body) {
    //                 touchStart = event;
    //             }
    //         };
    //         const handleTouchEnd = (event: any) => {
    //             touchStart = null;
    //         };
    //         const handleTouchMove = (event: any) => {
    //             // console.log(event);
    //             // console.log(mouseConstraint.body);
    //             if (!mouseConstraint.body && touchStart) {
    //                 // event.preventDefault();
    //                 let start = touchStart.touches[0].clientY;
    //                 let end = event.touches[0].clientY;
    //                 let delta = start - end;

    //                 window.scrollTo(0, window.scrollY + delta);
    //                 touchStart = event;
    //             }
    //         };

    //         let touchStart: any = null;
    //         mouseConstraint.mouse.element.addEventListener('touchstart', handleTouchStart, { passive: true });

    //         mouseConstraint.mouse.element.addEventListener('touchend', handleTouchEnd, { passive: true });

    //         mouseConstraint.mouse.element.addEventListener('touchmove', handleTouchMove, { passive: true });

    //         // let touchStart: any = null;
    //         // mouseConstraint.mouse.element.addEventListener(
    //         //     'touchstart',
    //         //     (event) => {
    //         //         if (!mouseConstraint.body) {
    //         //             touchStart = event;
    //         //         }
    //         //     },
    //         //     { passive: true }
    //         // );

    //         // mouseConstraint.mouse.element.addEventListener(
    //         //     'touchend',
    //         //     (event) => {
    //         //         // event.preventDefault();
    //         //         touchStart = null;
    //         //     },
    //         //     { passive: true }
    //         // );

    //         // mouseConstraint.mouse.element.addEventListener(
    //         //     'touchmove',
    //         //     (event) => {
    //         //         // console.log(event);
    //         //         // console.log(mouseConstraint.body);
    //         //         if (!mouseConstraint.body && touchStart) {
    //         //             // event.preventDefault();
    //         //             let start = touchStart.touches[0].clientY;
    //         //             let end = event.touches[0].clientY;
    //         //             let delta = start - end;

    //         //             window.scrollTo(0, window.scrollY + delta);
    //         //             touchStart = event;
    //         //         }
    //         //     },
    //         //     { passive: true }
    //         // );

    //         setSceneRenderer({
    //             engine: engine,
    //             render: render,
    //             runner: runner,
    //             element: mouseConstraint.mouse.element,
    //         });
    //     }
    // };
    useEffect(() => {
        let handleTouchStart: any;
        let handleTouchEnd: any;
        let handleTouchMove: any;
        if (sceneContainerRef.current && sceneRef.current) {
            let Engine = Matter.Engine;
            let Render = Matter.Render;
            let Runner = Matter.Runner;
            let Bodies = Matter.Bodies;
            let Mouse = Matter.Mouse;
            let MouseConstraint = Matter.MouseConstraint;
            let Composite = Matter.Composite;

            if (sceneRenderer) {
                console.log('Clearing scene');
                Composite.clear(sceneRenderer.engine.world, false, true);
                Engine.clear(sceneRenderer.engine);
                Render.stop(sceneRenderer.render);
                Runner.stop(sceneRenderer.runner);
                sceneRenderer.render.canvas.remove();
                sceneRenderer.render.canvas = null;
                sceneRenderer.render.context = null;
                sceneRenderer.render.textures = {};

                sceneRenderer.element.replaceWith(sceneRenderer.element.cloneNode(true));
            }

            let engine = Engine.create();
            let runner = Runner.create();

            let render = Render.create({
                element: sceneContainerRef.current,
                engine: engine,
                canvas: sceneRef.current,
                options: {
                    background: 'rgba(0, 0, 0, 0)',
                    wireframes: false,
                },
            });

            const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                render: {
                    fillStyle: 'rgba(0, 0, 0, 0)',
                },
            });

            const leftWall = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                render: {
                    fillStyle: 'rgba(0, 0, 0, 0)',
                },
            });
            const rightWall = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                render: {
                    fillStyle: 'rgba(0, 0, 0, 0)',
                },
            });
            const roof = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                render: {
                    fillStyle: 'rgba(0, 0, 0, 0)',
                },
            });

            const icons: any = [];

            tools.forEach((tech: Icon) => {
                const ball = Bodies.circle(Math.random() * 150, 0, 40, {
                    label: JSON.stringify(tech),
                    restitution: 0.1,
                    render: {
                        sprite: {
                            texture: `/images/tools/${tech.path}`,
                            // texture: `/images/technologies/${tech.path}`,
                            xScale: 0.4,
                            yScale: 0.4,
                        },
                        fillStyle: 'yellow',
                    },
                });
                icons.push(ball);
            });

            var mouse = Mouse.create(render.canvas),
                mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.3,
                        render: {
                            visible: false,
                        },
                    } as Matter.Constraint,
                });

            Matter.Events.on(mouseConstraint, 'mousedown', function (event: any) {
                if (mouseConstraint.body) {
                    let label: Icon | null;
                    try {
                        label = JSON.parse(mouseConstraint.body.label);
                    } catch (error) {
                        label = null;
                    }
                    console.log(mouseConstraint.body);
                    setSelectedIcon(label);
                }
            });

            // @ts-ignore
            mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel, {
                passive: true,
            });
            // @ts-ignore
            mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel, {
                passive: true,
            });

            Composite.add(engine.world, mouseConstraint);

            Composite.add(engine.world, [floor, leftWall, rightWall, roof]);
            Composite.add(engine.world, icons);

            Matter.Runner.run(engine);
            Render.run(render);

            setContraints(sceneContainerRef.current.getBoundingClientRect());
            setScene(render);

            window.addEventListener('resize', handleResize);

            handleTouchStart = (event: any) => {
                if (!mouseConstraint.body) {
                    touchStart = event;
                }
            };
            handleTouchEnd = (event: any) => {
                touchStart = null;
            };
            handleTouchMove = (event: any) => {
                if (!mouseConstraint.body && touchStart) {
                    let start = touchStart.touches[0].clientY;
                    let end = event.touches[0].clientY;
                    let delta = start - end;

                    window.scrollTo(0, window.scrollY + delta);
                    touchStart = event;
                }
            };

            let touchStart: any = null;
            mouseConstraint.mouse.element.addEventListener('touchstart', handleTouchStart, { passive: true });

            mouseConstraint.mouse.element.addEventListener('touchend', handleTouchEnd, { passive: true });

            mouseConstraint.mouse.element.addEventListener('touchmove', handleTouchMove, { passive: true });

            setSceneRenderer({
                engine: engine,
                render: render,
                runner: runner,
                element: mouseConstraint.mouse.element,
            });
        }
        return () => {
            mouseConstraint.mouse.element.removeEventListener('touchstart', handleTouchStart);
            mouseConstraint.mouse.element.removeEventListener('touchend', handleTouchEnd);
            mouseConstraint.mouse.element.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [resetScene]);

    useEffect(() => {
        if (constraints) {
            let { width, height } = constraints;

            // Dynamically update canvas and bounds
            scene.bounds.max.x = width;
            scene.bounds.max.y = height;
            scene.options.width = width;
            scene.options.height = height;
            scene.canvas.width = width;
            scene.canvas.height = height;

            // Dynamically update floor
            const floor = scene.engine.world.bodies[0];

            Matter.Body.setPosition(floor, {
                x: width / 2,
                y: height + STATIC_DENSITY / 2,
            });
            Matter.Body.setVertices(floor, [
                { x: 0, y: height },
                { x: width, y: height },
                { x: width, y: height + STATIC_DENSITY },
                { x: 0, y: height + STATIC_DENSITY },
            ]);

            // Dynamically update left wall
            const leftWall = scene.engine.world.bodies[1];

            Matter.Body.setPosition(leftWall, {
                x: 0 - STATIC_DENSITY,
                y: height / 2,
            });
            Matter.Body.setVertices(leftWall, [
                { x: 0 - STATIC_DENSITY, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: height },
                { x: 0 - STATIC_DENSITY, y: height },
            ]);

            // Dynamically update right wall
            const rightWall = scene.engine.world.bodies[2];

            Matter.Body.setPosition(rightWall, {
                x: width + STATIC_DENSITY,
                y: height / 2,
            });
            Matter.Body.setVertices(rightWall, [
                { x: width, y: 0 },
                { x: width + STATIC_DENSITY, y: 0 },
                { x: width + STATIC_DENSITY, y: height },
                { x: width, y: height },
            ]);

            // Dynamically update roof
            const roof = scene.engine.world.bodies[3];

            Matter.Body.setPosition(roof, {
                x: width / 2,
                y: 0 - STATIC_DENSITY / 2,
            });
            Matter.Body.setVertices(roof, [
                { x: 0, y: -STATIC_DENSITY },
                { x: width, y: -STATIC_DENSITY },
                { x: width, y: 0 },
                { x: 0, y: 0 },
            ]);
        }
    }, [scene, constraints]);

    return (
        <section id={'spotlightSection'} className={`${styles.container}`}>
            <h1 className={`${styles.title}`}>Tools I use</h1>
            <div
                onClick={() => {
                    setSelectedIcon(null);
                    setResetScene(!resetScene);
                }}
                className={`${styles.menuIcon}`}
                data-mouse="hide"
            >
                <p className={styles.menuIconText}>reset</p>
                <span className={styles.menuIconDot}></span>
            </div>

            <div className={`${styles.sceneContainer}`} ref={sceneContainerRef}>
                <canvas className={`${styles.scene}`} ref={sceneRef}></canvas>
            </div>
            {selectedIcon ? (
                <div className={`${styles.details}`}>
                    <h1 className={`${styles.name}`}>{selectedIcon.name}</h1>
                    <div className={styles.imageWrapper}>
                        <Image
                            className={styles.image}
                            alt={selectedIcon.name}
                            src={`/images/tools/${selectedIcon.path}`}
                            width={100}
                            height={100}
                        ></Image>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </section>
    );
}
