import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Robot from '../assets/robot.gif';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });

    const registerUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        // Destructure data
        const { name, email, password } = data;

        // Check for empty fields
        if (!name || !email || !password) {
            toast.error('Please fill in all fields: Name, Email, and Password');
            return;
        }

        try {
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
                    password: ''
                });
                toast.success('Registration Successful. Welcome');
                navigate('/Home');
            }
        } catch (error: unknown) {
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

    // Handle updates helper
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
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
