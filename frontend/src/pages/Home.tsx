import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import spacebg from '../assets/spacebg.mp4';
import Type from '../components/tools/Type';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// Home component is the main component of the landing page. It renders a video in the background and a series of motion elements to display text and animations.
const Home: React.FC = () => {
    // Create a reference to the video element
    const videoRef = useRef<HTMLVideoElement>(null);

    // Use the useEffect hook to play the video when the component mounts
    useEffect(() => {
        if (videoRef.current) {
            // Set the playback rate to 1, make the video play inline, and mute the video
            videoRef.current.playbackRate = 1;
            videoRef.current.setAttribute('playsinline', '');
            videoRef.current.setAttribute('muted', '');
            // Start playing the video
            videoRef.current.play();
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Video Section */}
            <section className="relative flex-1">
                {/* Render a video element */}
                <video
                    autoPlay
                    muted
                    loop
                    ref={videoRef}
                    src={spacebg}
                    type="video/mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    Sorry, your browser does not support the video tag.
                </video>
                {/* Render a div element with motion animations */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-4"
                >
                    {/* Render a motion h1 element */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-2xl sm:text-5xl lg:text-5xl font-bold text-center mb-4 sm:mb-6"
                    >
                        Hi there!{' '}
                        {/* Render a motion span element */}
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            role="img"
                            aria-label="wave"
                            className="wave text-4xl sm:text-5xl"
                        >
                            👋🏻
                        </motion.span>
                    </motion.h1>
                    {/* Render a motion h2 element */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-xl md:text-4xl lg:text-4xl font-bold text-center mb-4 sm:mb-8"
                    >
                        I'm <strong className="text-purple-300">NAME_TO_BE_DETERMINED</strong>
                    </motion.h2>
                    {/* Render a motion p element */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-base md:text-2xl lg:text-2xl text-center mb-4 sm:mb-8 max-w-prose px-4"
                    >
                        Your Own Personal:
                    </motion.p>

                    {/* Render a div element to display the Type component with motion animations */}
                    <div className="w-full px-4 md:px-12 lg:px-16 xl:px-24 py-6 lg:py-8 flex justify-center items-center text-center">
                        <div className="max-w-screen-lg w-full">
                            <div className="flex justify-center sm:justify-center">
                                {/* Render the Type component */}
                                <Type className="text-4xl sm:text-5xl lg:text-7xl" /> {/* Adjusted type sizes */}
                            </div>
                        </div>
                    </div>

                    {/* Render a motion p element */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="text-sm md:text-lg lg:text-xl text-center mt-4 max-w-prose px-4"
                    >
                        If you have any questions or need information, it would be my pleasure to assist you. Whether it's a general tech query, a history question, a writing issue, or a coding predicament, feel free to ask!
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="text-sm md:text-lg lg:text-xl text-center mt-4 max-w-prose px-4"
                    >
                        <Link to="/about">
                            <Button variant="outline" className="text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white rounded-md">
                                Learn More
                            </Button>
                        </Link>
                    </motion.p>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
