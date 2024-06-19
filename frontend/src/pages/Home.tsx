import React, { useRef, useEffect } from 'react';
import spacebg from '../assets/spacebg.mp4';
import Type from '../components/tools/Type';

const Home: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1;
            videoRef.current.setAttribute('playsinline', '');
            videoRef.current.setAttribute('muted', '');
            videoRef.current.play();
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Video Section */}
            <section className="relative flex-1">
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
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-4">
                    <h1 className="text-2xl sm:text-5xl lg:text-5xl font-bold text-center mb-4 sm:mb-6">
                        Hi there!{" "}
                        <span role="img" aria-label="wave" className="wave text-4xl sm:text-5xl">
                            👋🏻
                        </span>
                    </h1>
                    <h2 className="text-xl md:text-4xl lg:text-4xl font-bold text-center mb-4 sm:mb-8">
                        I'm <strong className="text-purple-300">NAME_TO_BE_DETERMINED</strong>
                    </h2>
                    <p className="text-base md:text-2xl lg:text-2xl text-center mb-4 sm:mb-8 max-w-prose px-4">
                        Your Own Personal:
                    </p>

                    {/* Type Animation */}
                    <div className="w-full px-4 md:px-12 lg:px-16 xl:px-24 py-6 lg:py-8 flex justify-center items-center text-center">
                        <div className="max-w-screen-lg w-full">
                            <div className="flex justify-center sm:justify-center">
                                <Type className="text-4xl sm:text-5xl lg:text-7xl" /> {/* Adjusted type sizes */}
                            </div>
                        </div>
                    </div>
                    {/* Type Animation */}

                    <p className="text-sm md:text-lg lg:text-xl text-center mt-4 max-w-prose px-4">
                        If you have any questions or need information, it would be my pleasure to assist you. Whether it's a general tech query, a history question, a writing issue, or a coding predicament, feel free to ask!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
