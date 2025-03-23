"use client";

import Link from "next/link";
import {BsArrowDownRight} from "react-icons/bs";

const certifications=[
    {
        num:'01',
        title:'AI|ML Development',
        description: 
            "Certified in AI and ML development, showcasing expertise in advanced algorithms, Python, and real-world machine learning applications.",
        href: "https://drive.google.com/drive/folders/1D3Vio05l6y3SoHgy8TQAWO7Mqkmoeh24?usp=sharing"
    },
    {
        num:'02',
        title:'Web development',
        description: 
            "Certified in web development, skilled in building responsive, dynamic websites using HTML, CSS, JavaScript, and modern frameworks.",
        href: "https://drive.google.com/drive/folders/1DUqrs8xIPxp0uURxdez_kkccxwDh0K2g?usp=sharing"
    },
    {
        num:'03',
        title:'Poster/Logo Design',
        description: 
            "Skilled in creating impactful posters and logos, combining creativity with design principles to deliver visually engaging and effective branding.",
        href: "https://drive.google.com/drive/folders/1DfvIR-w2roxLFZU5CfXaYAiS0KdP2TDs?usp=sharing"
    },
    {
        num:'04',
        title:'OTHERS',
        description: 
            "Certified in SQL, robotics, leadership, and internships, demonstrating skills in data management, automation, team leadership, and practical experience.",
        href: "https://drive.google.com/drive/folders/1EAQGRb4w_p3dH6LkFP4yXE0G7wdUKIwq?usp=sharing"
    },   
];

import { motion } from "framer-motion";

const certificates = () => {
    return ( 
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
          <div className="container mx-auto">
            <motion.div 
                initial={{opacity: 0}} 
                animate={{opacity: 1, 
                transition: {delay:2.4, duration: 0.4, ease: "easeIn"},
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
            >
                {certifications.map((certifications,index)=>{
                    return( 
                        <div key={index} className="flex-1 flex-col justify-center gap-6 group">
                            {/* top */}
                            <div className="w-full flex justify-between items-center">
                                <div className="text-5xl font-extrabold text-outline
                                text-transparent group-hover:text-outline-hover transition-all
                                duration-500">
                                    {certifications.num}
                                </div>
                                <Link 
                                    href={certifications.href} 
                                    className="w-[70px] h-[70px] rounded-full
                                    bg-white group-hover:bg-accent transition all duration-500
                                    flex justify-center items-center hover:-rotate-45"
                                >
                                    <BsArrowDownRight className="text-primary text-3xl" />
                                </Link>
                            </div>
                            {/* heading */}
                            <h2 className="text-[42px] font-bold leading-none text-white 
                            group-hover:text-accent transition-all duration-500">{certifications.title}</h2>
                            {/* description */}
                            <p className="text-white/60">{certifications.description}</p>
                            {/* border */}
                            <div className="border-b border-white/20 w-full"></div>
                        </div>
                    );
                })}
            </motion.div>
          </div>
        </section>
    );
};
export default certificates;