// Shared projects cache for both admin and public endpoints
let projectsCache = {
    projects: [
        {
            num: "01",
            category: "AI|ML",
            title: "Voice Emotion Recognition",
            description: "This is a voice emotion recognition system. The system will analyze audio files to predict the emotions conveyed by the speaker's voice.",
            stack: [
                { name: "Python" },
                { name: "Flask" },
                { name: "Html" },
                { name: "Css" }
            ],
            image: "/Images/project1.png",
            live: "",
            github: "https://github.com/GKRBROS/Voice_Emotion_Recognition.git"
        },
        {
            num: "02",
            category: "AI|ML",
            title: "Streamlining Hospital Waste Management",
            description: "A deep learning-based system to classify hospital waste into organic and inorganic categories for efficient and eco-friendly disposal. The system uses image processing techniques to analyze waste images and classify them accordingly.",
            stack: [
                { name: "Python" },
                { name: "Flask" },
                { name: "Html" },
                { name: "Css" },
                { name: "JS" },
                { name: "Tensorflow" },
                { name: "Keras" }
            ],
            image: "/Images/project5.png",
            live: "",
            github: "https://github.com/GKRBROS/STREAMLINING-HOSPITAL-WASTE-MANAGEMENT.git"
        },
        {
            num: "03",
            category: "Bot",
            title: "Dewz Discord Bot",
            description: "A python discord bot that delivers the most recent and accurate news from a variety of sources. To make sure users get the most accurate and up-to-date information possible, the bot assesses and evaluates news sources.",
            stack: [{ name: "Python" }, { name: "Discord" }],
            image: "/Images/project2.png",
            live: "",
            github: "https://github.com/GKRBROS/TCL_PYTHON_PROJECT.git"
        },
        {
            num: "04",
            category: "Website",
            title: "Brahma25",
            description: "Developed a website for for college fest techno-cultural fest 'Brahma25'. The website includes all the details about the fest, including events, registration, and more.",
            stack: [
                { name: "Html" },
                { name: "Css" },
                { name: "JS" },
                { name: "API" }
            ],
            image: "/Images/project6.png",
            live: "https://brahma25.live/",
            github: "https://github.com/GKRBROS/Brahma25.git"
        },
        {
            num: "05",
            category: "Game",
            title: "FPS Shooting Game",
            description: "A first person shooting game.",
            stack: [
                { name: "C#" },
                { name: "Unity Hub" },
                { name: "Visual Studio" },
                { name: "Blender" }
            ],
            image: "/Images/project3.png",
            live: "",
            github: "https://github.com/GKRBROS/Game_Development.git"
        },
        {
            num: "06",
            category: "3D Model",
            title: "3D Model Design",
            description: "A 3d model buildd using blender.",
            stack: [{ name: "Blender" }],
            image: "/Images/project4.png",
            live: "",
            github: "https://github.com/GKRBROS/Game_Development.git"
        }
    ]
};

export function getProjects() {
    return projectsCache;
}

export function setProjects(data) {
    projectsCache = data;
}

export function getProjectsData() {
    return projectsCache;
}
