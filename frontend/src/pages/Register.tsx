import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import Robot from '../assets/robot.gif';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    // States for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const registerUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const { name, email, password, repeatPassword } = data;

        if (!name || !email || !password || !repeatPassword) {
            toast.error('Please fill in all fields: Name, Email, Password, and Repeat Password');
            return;
        }

        if (password !== repeatPassword) {
            toast.error('Passwords do not match. Please try again.');
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
                    password: '',
                    repeatPassword: ''
                });
                toast.success('Registration Successful. Welcome');
                navigate('/Home');
            }
        } catch (error: unknown) {
            console.error('Registration failed:', error);
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const toggleShowPassword = (): void => {
        setShowPassword(prevShow => !prevShow);
    };

    const toggleShowRepeatPassword = (): void => {
        setShowRepeatPassword(prevShow => !prevShow);
    };

    return (
        <Container fluid className="p-3">
            <Card className="bg-gray-950 text-white m-5 mx-auto" style={{ borderRadius: '25px', maxWidth: '900px' }}>
                <Card.Body>
                    <Row className="g-4">
                        <Col xs={12} lg={6} className="order-2 order-lg-1 d-flex flex-column align-items-center">
                            <p className="text-purple-500 text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">SIGN UP</p>
                            <Form className="w-100" onSubmit={registerUser}>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center position-relative">
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
                                <Form.Group className="mb-4 d-flex flex-row align-items-center position-relative">
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
                                <Form.Group className="mb-4 d-flex flex-row align-items-center position-relative">
                                    <i className="bi bi-lock me-3"></i>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        id="form3"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        variant="link"
                                        className="position-absolute end-0 translate-middle-y"
                                        onClick={toggleShowPassword}
                                        style={{ color: 'purple', top: '50%', transform: 'translateY(-50%)' }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center position-relative">
                                    <i className="bi bi-key me-3"></i>
                                    <Form.Control
                                        type={showRepeatPassword ? 'text' : 'password'}
                                        placeholder="Repeat your password"
                                        id="form4"
                                        name="repeatPassword"
                                        value={data.repeatPassword}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        variant="link"
                                        className="position-absolute end-0 translate-middle-y"
                                        onClick={toggleShowRepeatPassword}
                                        style={{ color: 'purple', top: '50%', transform: 'translateY(-50%)' }}
                                    >
                                        {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
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
