"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
    return ( 
        <div className="w-full h-full relative flex justify-center items-center">
            <motion.div 
                initial={{opacity: 0}} 
                animate={{
                    opacity: 1,
                    transition:{delay: 2, duration: 0.4, ease:"easeInOut"},
                }}
                className="relative w-[60vw] h-[60vw] max-w-[298px] max-h-[298px] xl:max-w-[498px] xl:max-h-[498px]"
            >
                {/* Circle */}
                <motion.svg 
                    className="absolute inset-0 w-full h-full"
                    fill="transparent"
                    viewBox="0 0 506 506" 
                    xmlns="https://www.w3.org/2000/svg"
                >
                    <motion.circle 
                        cx="253" 
                        cy="253" 
                        r="250" 
                        stroke="#00ff1e" 
                        strokeWidth="4"
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        initial={{strokeDasharray: "24 10 0 0"}}
                        animate={{
                            strokeDasharray: ["15 120 25 25","16 25 92 72","4 250 22 22"],
                            rotate: [120, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </motion.svg>

                {/* Image */}
                <motion.div 
                    initial={{opacity: 0}} 
                    animate={{
                        opacity: 1,
                        transition:{delay: 2.4, duration: 0.4, ease:"easeInOut"},
                    }}              
                    className="absolute inset-0 w-full h-full mix-blend-lighten"
                >
                    <Image 
                        src="/Images/gk.png" 
                        priority 
                        quality={100} 
                        fill 
                        alt="Profile Picture" 
                        className="object-contain" 
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Photo;
