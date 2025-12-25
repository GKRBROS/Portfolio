"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide  } from "swiper/react";
import "swiper/css";

import { BsArrowRight, BsGithub } from "react-icons/bs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

 import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const Work = () => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch projects from API
        const fetchProjects = async () => {
            try {
                const response = await fetch('/data/projects.json');
                const data = await response.json();
                setProjects(data.projects || []);
                if (data.projects && data.projects.length > 0) {
                    setProject(data.projects[0]);
                }
            } catch (error) {
                console.error('Error loading projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleSlideChange = (swiper) =>{
        //get current slide index
        const currentIndex = swiper.activeIndex;
        //update project state based on current slide index
        if (projects[currentIndex]) {
            setProject(projects[currentIndex]);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-accent">Loading projects...</div>
            </div>
        );
    }

    if (!project || projects.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-white/60">No projects found</div>
            </div>
        );
    }

    return ( 
        <motion.section 
            initial={{opacity : 0}} 
            animate={{opacity: 1, transition: {delay: 2.4, duration: 0.4, ease: "easeIn"}}} 
            className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
        >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div className="w-full xl:w-[50%] xl:-h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            {/* outline num */}
                            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                                {project.num}
                            </div>
                            {/* project categories */}
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                                {project.category} project
                            </h2>
                            {/* proiject description */}
                            <p className="text-white/60">{project.description}</p>
                            {/* stack */}
                            <ul className="flex gap-4">
                                {project.stack.map((item, index)=>{
                                    return (
                                         <li key={index} className="text-xl text-accent">
                                          {item.name}
                                          {/* removes the last comma */}
                                          {index !== project.stack.length -1 && ","}
                                        </li>
                                    );
                                })}
                            </ul>
                            {/* border */}
                            <div className="border border-white/20"></div>
                            {/* buttons */}
                            <div className="flex items-center gap-4">
                                {/* live project button */}
                                <Link href={project.live}>
                                   <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                                                <BsArrowRight className="text-white text-3xl group-hover:text-accent"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Live project</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> 
                                </Link>
                                {/* github project button */}
                                <Link href={project.github}>
                                   <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                                                <BsGithub className="text-white text-3xl group-hover:text-accent"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Github repository</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> 
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%] ">
                        <Swiper 
                            spaceBetween={30} 
                            slidesPerView={1} 
                            className="xl:h=[520px] mb-12"
                            onSlideChange={handleSlideChange}
                        >
                            {projects.map((project, index)=>{
                                return (
                                    <SwiperSlide key={index} className="w-full">
                                        <div className="h-[460px] relative group flex justify-cente items-center bg-pink-50/20">
                                            {/* overlay */}
                                            <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                                            {/* image */}
                                            <div className="relative w-full h-full ">
                                                <Image src={project.image} fill className="object-cover" alt="" />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            {/* slider buttons */}
                            <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none" 
                                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" 
                            />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
export default Work;