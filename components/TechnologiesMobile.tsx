import styles from '../styles/components/TechnologiesMobile.module.css';
import Matter from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import technologies from '../public/images/technologies/technologies';
import Image from 'next/image';

const STATIC_DENSITY = 50;

interface Icon {
    name: string;
    path: string;
}

export default function TechnologiesMobile() {
    const [selectedIcon, setSelectedIcon] = useState<Icon>({
        name: 'test',
        path: '',
    });

    const sceneContainerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLCanvasElement>(null);

    const [constraints, setContraints] = useState<any>();
    const [scene, setScene] = useState<any>();

    const handleResize = () => {
        if (sceneContainerRef.current) {
            setContraints(sceneContainerRef.current.getBoundingClientRect());
        }
    };

    useEffect(() => {
        if (sceneContainerRef.current && sceneRef.current) {
            let Engine = Matter.Engine;
            let Render = Matter.Render;
            let World = Matter.World;
            let Bodies = Matter.Bodies;
            let Mouse = Matter.Mouse;
            let MouseConstraint = Matter.MouseConstraint;

            let engine = Engine.create();

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
                // render: {
                //     fillStyle: 'blue',
                // },
            });

            const leftWall = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                // render: {
                //     fillStyle: 'blue',
                // },
            });
            const rightWall = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                // render: {
                //     fillStyle: 'blue',
                // },
            });
            const roof = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
                isStatic: true,
                // render: {
                //     fillStyle: 'blue',
                // },
            });

            const icons: any = [];

            technologies.forEach((tech: Icon) => {
                const ball = Bodies.circle(150, 0, 50, {
                    label: JSON.stringify(tech),
                    restitution: 0.3,
                    render: {
                        sprite: {
                            texture: `/images/technologies/${tech.path}`,
                            xScale: 0.5,
                            yScale: 0.5,
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

                        // bodyA: icons[0],
                        // bodyB: icons[0],
                        // label: '',
                        // damping: 0,
                        // id: 1,
                        // pointA: { x: 0, y: 0 },
                        // pointB: { x: 0, y: 0 },
                        // length: 0,
                        // type: 'constraint',
                    } as Matter.Constraint,
                });

            Matter.Events.on(mouseConstraint, 'mousedown', function (event: any) {
                if (mouseConstraint.body) {
                    const label: Icon = JSON.parse(mouseConstraint.body.label);
                    console.log(mouseConstraint.body);
                    setSelectedIcon(label);
                }
            });

            World.add(engine.world, mouseConstraint);

            World.add(engine.world, [floor, leftWall, rightWall, roof]);
            World.add(engine.world, icons);

            Engine.run(engine);
            Render.run(render);

            setContraints(sceneContainerRef.current.getBoundingClientRect());
            setScene(render);

            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <section className={`${styles.container}`}>
            <div className={`${styles.sceneContainer}`} ref={sceneContainerRef}>
                <canvas className={`${styles.scene}`} ref={sceneRef}></canvas>
            </div>
            <div className={`${styles.details}`}>
                <h1 className={`${styles.name}`}>{selectedIcon.name}</h1>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.image}
                        alt={selectedIcon.name}
                        src={`/images/technologies/${selectedIcon.path}`}
                        width={100}
                        height={100}
                    ></Image>
                </div>
            </div>
        </section>
    );
}
