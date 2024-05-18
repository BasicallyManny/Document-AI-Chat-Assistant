
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Row, Container, Col } from 'react-bootstrap';

import { IoEnterOutline } from "react-icons/io5";



interface LoginProps {
    onHide: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
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
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
                <Row>
                    <h1 className="text-white !text-xs	-">Don't have an account? 
                        <a className="text-purple-500 underline pl-1" href="/register">Register</a>
                    </h1>
                </Row>
            </Modal.Body>
            <Modal.Footer className="bg-gray-950">
                <Button type="submit" variant="outline" className="text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">
                    <IoEnterOutline size={20}></IoEnterOutline>
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default Login;
