const projects = [
    {
        id: 1,
        name: 'self driving car',
        description: `
        This is a project I made for my bachelor thesis. 
        The goal was to make a self-driving rc car that runs on a Raspberry Pi.
        It uses a single camera to observe the road and sends the captured images trough a neural network to determine the steering angle.
        `,
        image: 'projects/selfdriving-car.png',
        link: 'https://drive.google.com/file/d/1Se7thaTL9O-rFyRB0GHqsoj-M2OMcF_e/view?usp=sharing',
        video: 'https://firebasestorage.googleapis.com/v0/b/portfolio-232b3.appspot.com/o/self-driving-car.mp4?alt=media&token=d5718933-dcf4-425b-9a35-34dbc69b3df0',
        tools: ['python', 'tensorflow', 'raspberry-pi', 'opencv'],
    },
    {
        id: 2,
        name: 'plant recognition',
        description: `
        The company Mother asked us to develop a section inside their already existing app to scan plants.
        The app had to be able to identify the type of plant and the state of health, only by taking a picture of it.
        The frontend of the app was made with Vue Native and the backend was made with Google Firebase. 
        We created a Neural Network with Tensorflow to predict the type of plant in the picture.
        `,
        image: 'projects/mother.png',
        image2: 'projects/mother-scan-app.png',
        image2_mobile: 'projects/mother-scan-app-mobile.png',
        link: '',
        tools: ['vue', 'javascript', 'firebase', 'tensorflow', 'python'],
    },
    {
        id: 3,
        name: 'smart backpack',
        description: `
        BackPi was the first project I ever made. It's a backpak that uses an NFC-scanner to know what's inside. It was built with a Raspberry Pi and had a website made with Flask.
        You could setup an agenda and assign items to certain events so it would notify you whenever you forget something.
        `,
        image: 'projects/back-pi.png',
        link: '',
    },

    {
        id: 4,
        name: 'Interactive playground',
        description: `
            This was a group project. We had to create an interactive playground based on a Microsoft Kinect and a projector            
            The interactive playground was a project for the sports department of Howest. They wanted us to create a similar product as the interactive playground of Lü.

        `,
        image: 'projects/interactive-playground2.png',
        link: 'https://keen-pavlova-376c8c.netlify.app',
        link2: 'https://unrivaled-treacle-eca9ac.netlify.app',
        video: 'https://firebasestorage.googleapis.com/v0/b/portfolio-232b3.appspot.com/o/interactive-playground.mp4?alt=media&token=8a4593f3-918f-4852-b920-54a9d69f4ee2',
        tools: ['c#', 'opencv', 'python', 'javascript'],
    },
];

export default projects;
