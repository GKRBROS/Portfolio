"use client";

import { Description } from "@radix-ui/react-dialog";
import {FaHtml5, FaCss3, FaJs, FaPython, FaFigma, FaFlask, FaMicrosoft,FaDatabase} from "react-icons/fa"

//about data
const about={
    title:"About Me",
    description: 
        "I'm Gokul Kiran, currently in my final year of B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence at Adi Shankara Engineering College, Kalady. I am passionate about AI/ML development and have been actively involved in various tech communities, including leading the TinkerHub community on my campus, where we focus on empowering students with the latest technology skills.",
    info:[
        {
            fieldName: "Name :",
            fieldValue: "Gokul Kiran R"
        },
        {
            fieldName: "Phone :",
            fieldValue: "(+91) 77365 26607",
        },
        {
            fieldName: "Disocrd :",
            fieldValue: "gkr_.",
        },
        {
            fieldName: "Email :",
            fieldValue: "gokul.kiran03@gmail.com"
        },
        {
            fieldName: "Nationality :",
            fieldValue: "Indian",
        },
        {
            fieldName: "Internship :",
            fieldValue: "2 months",
        },
        {
            fieldName: "GitHub :",
            fieldValue: "GKRBROS",
        },
        {
            fieldName: "Languages:",
            fieldValue: "English, Malayalam, Hindi",
        },
    ]
};
 
//experience
const experience = {
    icon: '/assets/resume/badge.svg',
    title: 'My experience',
    description:
        "While I lack traditional work experience, I have successfully completed two internships, honing my abilities and gaining exposure to real-world projects.",
    items:[
        {
            company: "Tata Elxsi",
            position: "Matlab - Intern",
            duration: "June 24 -July 24",
        },
        {
            company: "TiltEdu",
            position: "Game Devlopment - Intern",
            duration: "May 23 -June 23",
        },
    ]
};

//education
const education = {
    icon: '/assets/resume/cap.svg',
    title: 'My education',
    description:
        "I am currently in my seventh semester pursuing B.tech in Computer Science with a specialization in Artificial Intelligence.",
    items:[
        {
            institution: "Adi Shankara Engg & Tech",
            degree: "B.Tech in CSE(AI)",
            duration: "2021-25",
        },
        {
            institution: "Chinmaya Vidyalaya Vaduthala",
            degree: "Higher Secondary",
            duration: "2020-2021",
        },
        {
            institution: "Chinmaya Vidyalaya Vaduthala",
            degree: "Senior Secondary",
            duration: "2018-2019",
        },
    ]
};

//Skills
const skills = {
    title: 'My skills',
    description:
        "Possess a strong foundation in programming languages and technologies, including Python, HTML, CSS, JavaScript, Flask, Microsoft tools, and SQL.",
    skillList:[
        {
            icon: <FaHtml5/>,
            name: "html",
        },
        {
            icon: <FaCss3/>,
            name: "Css",
        },
        {
            icon: <FaJs/>,
            name: "javascript",
        },
        {
            icon: <FaPython/>,
            name: "python",
        },
        {
            icon: <FaFigma/>,
            name: "figma",
        },
        {
            icon: <FaFlask/>,
            name: "flask",
        },
        {
            icon: <FaMicrosoft/>,
            name: "microsoft tools",
        },
        {
            icon: <FaDatabase/>,
            name: "sql",
        },
        
    ]
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
    return ( 
        <motion.div 
            initial={{opacity: 0}} 
            animate={{
                opacity: 1, 
                transition:{delay: 2.4,duration: 0.4,ease: "easeIn"},
            }}
            className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
        >
            <div className="container mx-auto">
                <Tabs 
                    defaultValue="About me" 
                    className="flex flex-col xl:flex-row gap-[60px]"
                >
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0
                    gap-6">
                        <TabsTrigger value="about">About me</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                    </TabsList>

                    {/* content */}
                    <div className="min-h-[70vh] w-full">
                        {/* experience */}
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{experience.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid frid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {experience.items.map((item,index)=>{
                                            return( 
                                                <li 
                                                    key={index} 
                                                    className="bg-[#232339] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                                                >
                                                    <span className="text-accent">{item.duration}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                                                        {item.position}
                                                    </h3>
                                                    <div className="flex items-center  gap-3">
                                                        {/* dot */}
                                                        <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                        <p className="text-white/60">{item.company}</p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        {/* education */}
                        <TabsContent value="education" className="w-full">
                        <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{education.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid frid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {education.items.map((item,index)=>{
                                            return( 
                                                <li 
                                                    key={index} 
                                                    className="bg-[#232339] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                                                >
                                                    <span className="text-accent">{item.duration}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                                                        {item.degree}
                                                    </h3>
                                                    <div className="flex items-center  gap-3">
                                                        {/* dot */}
                                                        <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                        <p className="text-white/60">{item.institution}</p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        {/* skills */}
                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                                        {skills.description}
                                    </p>
                                </div>
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                                    {skills.skillList.map((skill,index)=>{
                                        return <li key={index}>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                                        <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                                            {skill.icon}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="capitalize">{skill.name}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </li>;
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                        {/* about */}
                        <TabsContent value="about" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{about.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                                    {about.description}
                                </p>
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[1000px] max-auto xl:mx-0">
                                    {about.info.map((item, index) => {
                                        return ( 
                                            <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                                                <span className="text-white/60 text-justify">{item.fieldName}</span>
                                                <span className="text-xl ">{item.fieldValue}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>       

                </Tabs>
            </div>
        </motion.div>
    );
};
export default Resume;