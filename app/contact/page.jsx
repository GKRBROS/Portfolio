"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const info = [
    {
        icon: <FaPhoneAlt />,
        title: "Phone",
        description: "(+91) 7736526607",
    },
    {
        icon: <FaEnvelope />,
        title: "Email",
        description: "gokul.kiran03@gmail.com",
    },
    {
        icon: <FaMapMarkedAlt />,
        title: "Address",
        description: "Chirackal Palluruthy, Kochi, Kerala India- 682006",
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    access_key: "8aa29b7a-ac46-48e6-a82e-4ad561c3f9b2", // Replace with your Web3Forms Access Key
                    ...formData,
                }),
            });

            if (response.ok) {
                toast.success("Message sent successfully!"); // Success notification
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                });
            } else {
                toast.error("Failed to send message. Please try again."); // Error notification
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again."); // Error notification
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
            }}
            className="py-6"
        >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    {/* form */}
                    <div className="xl:w-[54%] order-2 xl:order-none">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
                            <h3 className="tetx-4xl text-accent">Let's connect</h3>
                            <p className="text-white/60 ">
                                Interested in working together? Schedule a meeting to discuss your project and see how I can contribute.
                            </p>
                            {/* Input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    name="firstname"
                                    type="text"
                                    placeholder="Firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="lastname"
                                    type="text"
                                    placeholder="Lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="phone"
                                    type="text"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* select */}
                            <Select
                                onValueChange={(value) => setFormData({ ...formData, service: value })}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select a service</SelectLabel>
                                        <SelectItem value="AI|ML Development">AI|ML Development</SelectItem>
                                        <SelectItem value="Web Development">Web Development</SelectItem>
                                        <SelectItem value="Poster/Logo Design">Poster/Logo Design</SelectItem>
                                        <SelectItem value="SEO">SEO</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* text */}
                            <Textarea
                                name="message"
                                className="h-[200px]"
                                placeholder="Type your message here."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            {/* button */}
                            <Button type="submit" size="md" className="max-w-40">
                                Send message
                            </Button>
                        </form>
                    </div>
                    {/* Info */}
                    <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        <ul className="flex flex-col gap-10">
                            {info.map((item, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-6">
                                        <div className="w-[52px] h-[52px] xl:w-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                                            <div>{item.icon}</div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white/60">{item.title}</p>
                                            <p className="text-xl">{item.description}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer */}
        </motion.section>
    );
};

export default Contact;