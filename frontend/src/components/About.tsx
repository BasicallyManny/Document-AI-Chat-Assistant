import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PiStudentBold } from "react-icons/pi";

export default function About() {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const buttonControls = useAnimation();

    useEffect(() => {
        if (isButtonHovered) {
            buttonControls.start({ scale: 1.05 });
        } else {
            buttonControls.start({ scale: 1 });
        }
    }, [isButtonHovered, buttonControls]);

    return (
        <Container fluid className="min-h-screen p-0 flex flex-col lg:flex-row">
            {/* Background image for the About section. */}
            <Col id="aboutImg" className="h-60 lg:h-screen bg-gradient-to-b from-purple-900 via-violet-600 to-purple-950 flex items-center justify-center text-center">
                <p className="text-white text-5xl font-bold">About Us</p>
            </Col>
            {/* Content section for the About section. */}
            <Col id="aboutContent" className="flex-1 h-auto lg:h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <Container className="py-12 lg:py-24 px-6 lg:px-12">
                    <Row className="flex items-center !justify-center mb-6">
                        {/* Title for the About section. */}
                        <Container className="flex justify-center">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="flex text-4xl font-bold mb-4"
                            >
                                Built for Students
                            </motion.h1>
                            <PiStudentBold size={40} className="mx-2 text-purple-500"></PiStudentBold>
                        </Container>
                    </Row>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-lg lg:text-xl mb-6 leading-relaxed text-center"
                    >
                        Discover the power of AI with ___ - your ultimate companion for crafting insightful essays. Powered by OpenAI's ChatGPT and Anthropic's Claude,
                        our AI assistant is designed to help you research, analyze, and compose top-tier academic papers on any subject.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-lg lg:text-xl mb-6 leading-relaxed text-center"
                    >
                        Leveraging LangChain, a cutting-edge Python framework, ___ integrates multiple language models seamlessly, offering unparalleled text processing capabilities.
                        Whether you're facing a challenging essay prompt or seeking expert guidance, ___ is your go-to solution.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-lg lg:text-xl mb-12 leading-relaxed text-center"
                    >
                        Join us in shaping the future of academic writing. Share your feedback, suggest features, or even contribute to our development journey.
                        Together, let's redefine how students approach research and writing.
                    </motion.p>
                    <Row className="flex justify-center">
                        <Button
                            className="w-40 lg:w-auto text-lg py-2 text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white rounded-full"
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            animate={buttonControls}
                            variant="outline"
                        >
                            <span>Contact</span>
                        </Button>
                    </Row>
                </Container>
            </Col>
        </Container>
    );
}
