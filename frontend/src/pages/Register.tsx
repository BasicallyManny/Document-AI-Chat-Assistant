// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Robot from '../assets/robot.gif'


const Register: React.FC = () => {
    return (
        <Container fluid className="p-3">
            <Card className='bg-gray-950 text-white m-5 mx-auto' style={{ borderRadius: '25px', maxWidth: '900px' }}>
                <Card.Body>
                    <Row className="g-4">
                        <Col xs={12} lg={6} className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-purple-500 text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">SIGN UP</p>
                            <Form className="w-100">
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-person me-3"></i>
                                    <Form.Control type="text" placeholder="Your Name" id="form1" />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-envelope me-3"></i>
                                    <Form.Control type="email" placeholder="Your Email" id="form2" />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-lock me-3"></i>
                                    <Form.Control type="password" placeholder="Password" id="form3" />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex flex-row align-items-center">
                                    <i className="bi bi-key me-3"></i>
                                    <Form.Control type="password" placeholder="Repeat your password" id="form4" />
                                </Form.Group>
                                <Row className="justify-content-center">
                                    <Button type="submit" variant="outline" className=" w-2/5 text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">
                                        Register
                                    </Button>
                                </Row>
                            </Form>
                        </Col>
                        <Col xs={12} lg={6} className='order-1 order-lg-2 d-flex align-items-center'>
                            <Image src={Robot} fluid className="border-4 border-purple-500 rounded-lg" />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register