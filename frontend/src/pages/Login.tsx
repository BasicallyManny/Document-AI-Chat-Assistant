import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Row, Container, Col } from 'react-bootstrap';

import axios from 'axios';


interface LoginProps {
    onHide: () => void;
}

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC<LoginProps> = (props) => {
    const [data, setData] = useState<FormData>({
        email: '',
        password: ''
    });

    const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //login logic
        axios.get('/')
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            className="!border-0"
            centered
        >
            <Modal.Header className="bg-gray-950 d-flex justify-content-center">
                <Container fluid className="bg-gray-950 d-flex justify-content-center">
                    <Row className="justify-content-center">
                        <Col xs="auto" className="!text-xlg">
                            <h1 className="text-purple-500 font-bold text-2xl">LOGIN</h1>
                        </Col>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body className="bg-gray-950">
                <Form onSubmit={loginUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row className="justify-content-center mb-4 mt-4">
                        <Col xs="auto">
                            <Button type="submit" variant="outline" className="text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <h1 className="text-white !text-xs -">
                        Don't have an account?
                        <a href="/register" className="text-purple-500 underline pl-1">Register</a>
                    </h1>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
