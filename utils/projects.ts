const projects = [
    {
        id: 1,
        name: 'self driving car',
        description: `
        This is a project I made for my bachelor thesis. 
        The goal was to make a <span>self-driving rc car</span> that runs on a <span>Raspberry Pi</span>.
        It uses a single camera to observe the road and sends the captured images trough a <span>neural network</span> to determine the optimal steering angle.
        `,
        image: 'projects/selfdriving-car.png',
        links: [
            {
                name: 'see more',
                url: 'https://drive.google.com/file/d/1Se7thaTL9O-rFyRB0GHqsoj-M2OMcF_e/view?usp=sharing',
            },
        ],
        video: '/videos/self-driving-car_1.mp4',
        // video: 'https://firebasestorage.googleapis.com/v0/b/portfolio-232b3.appspot.com/o/self-driving-car.mp4?alt=media&token=d5718933-dcf4-425b-9a35-34dbc69b3df0',
        tools: ['python', 'tensorflow', 'raspberry pi', 'opencv'],
    },
    {
        id: 2,
        name: 'plant recognition',
        description: `
        The company <a target="_blank" href="https://www.mother.life/nl/home">Mother</a> asked us to develop a section inside of their already existing app to scan plants.
        The app had to be able to identify the type of plant and the state of health of the plant, only by taking a picture of it.
        The frontend of the app was made with <span>Vue Native</span>, a fairly new framework at the time (it is now deprecated) and the backend was made with <span>Google Firebase</span>. 
        We created a Neural Network with <span>Tensorflow</span> to predict the type of plant in the picture.
        `,

        image: 'projects/mother.png',
        image2: 'projects/mother-scan-app.png',
        image2_mobile: 'projects/mother-scan-app-mobile.png',
        links: [],
        tools: ['vue js', 'javascript', 'firebase', 'tensorflow', 'python'],
    },
    {
        id: 3,
        name: 'Interactive playground',
        description: `           
            The interactive playground was a project for the sports department of Howest. They wanted us to create a similar product like the interactive playground from <a target="_blank" href="https://play-lu.com/">Lü</a>.
            We used a <span>Microsoft Kinect</span> and <span>OpenCv</span> to track the position of the ball. If the ball was close enough to the wall, the computer would register a click. The games were made in plain <span>HTML, CSS and JavaScript</span>.
            We also created an api with <span>.NET</span> and <span>Azure Functions</span>.

        `,
        image: 'projects/interactive-playground2.png',
        links: [
            // { name: 'calculator game', url: 'https://keen-pavlova-376c8c.netlify.app' },
            // { name: 'bird shooter', url: 'https://unrivaled-treacle-eca9ac.netlify.app' },
            { name: 'games dashboard', url: 'https://main--dashing-tiramisu-245a06.netlify.app/' },
        ],
        // video: 'https://firebasestorage.googleapis.com/v0/b/portfolio-232b3.appspot.com/o/interactive-playground.mp4?alt=media&token=8a4593f3-918f-4852-b920-54a9d69f4ee2',
        video: '/videos/interactive-playground_1.mp4',
        tools: ['c#', 'opencv', 'python', 'javascript'],
    },
];

export default projects;
