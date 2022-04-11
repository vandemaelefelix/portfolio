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
    },
    {
        id: 2,
        name: 'plant recognition',
        description: `
        This was a group project I made for the company Mother. They wanted an app that can take a picture of a plant and recognize it.
        We used Vue Native as frontend framework and firebase to create a backend. The app isn't currently available as it runned on the companies' servers.
        `,
        image: 'projects/mother-project.png',
        link: '',
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
];

export default projects;
