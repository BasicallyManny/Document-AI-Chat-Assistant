import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Robot from '../assets/robot.gif';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define types for data
interface FormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate(); // For easy navigation to different routes

    const [data, setData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    // Handle form submission
    const registerUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); // Prevents the default form submission behavior.
        // Destructure data
        const { name, email, password, repeatPassword } = data; // Extracts name, email, password, and repeatPassword from the data state.

        // Check for empty fields
        if (!name || !email || !password || !repeatPassword) {
            toast.error('Please fill in all fields: Name, Email, Password, and Repeat Password');
            return;
        }

        // Check if passwords match
        if (password !== repeatPassword) {
            toast.error('Passwords do not match. Please try again.');
            return;
        }

        try {
            // Send a POST request to the /register endpoint with the form data using axios.
            const response = await axios.post('/register', {
                name, email, password
            });

            const { data: responseData } = response;

            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setData({
                    name: '',
                    email: '',
                    password: '',
                    repeatPassword: ''
                });
                toast.success('Registration Successful. Welcome');
                navigate('/Home'); // If successful, navigate to home page
            }
        } catch (error: unknown) { // Error handling
            console.error('Registration failed:', error);
            if (error.response && error.response.data && error.response.data.error) {
                // Custom error handling based on the error message
                const errorMessage = error.response.data.error;
                if (errorMessage.includes('Email is already taken')) {
                    toast.error('Email already exists. Please use a different email.');
                } else {
                    toast.error(errorMessage);
                }
            } else {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        // Update data state with the new value for the respective field
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <Container fluid className="p-3">
            <Card className="bg-gray-950 text-white m-5 mx-auto" style={{ borderRadius: '25px', maxWidth: '900px' }}>
                <Card.Body>
                    <Row className="g-4">
                        <Col xs={12} lg={6} className="order-2 order-lg-1 d-flex flex-column align-items-center">
                            <p className="text-purple-500 text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">SIGN UP</p>
                            <Form className="w-100" onSubmit={registerUser}>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-person me-3"></i>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        id="form1"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-envelope me-3"></i>
                                    <Form.Control
                                        type="email"
                                        placeholder="Your Email"
                                        id="form2"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-lock me-3"></i>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        id="form3"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-key me-3"></i>
                                    <Form.Control
                                        type="password"
                                        placeholder="Repeat your password"
                                        id="form4"
                                        name="repeatPassword"
                                        value={data.repeatPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Row className="justify-content-center">
                                    <Button type="submit" variant="outline" className="w-2/5 text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">
                                        Register
                                    </Button>
                                </Row>
                            </Form>
                        </Col>
                        <Col xs={12} lg={6} className="order-1 order-lg-2 d-flex align-items-center">
                            <Image src={Robot} fluid className="border-4 border-purple-500 rounded-lg" />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
