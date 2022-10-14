import React from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input'
const Signup = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="First name"
                                        value=""
                                        onChange={() => { }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last name"
                                        value=""
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                type="text"
                                placeholder="Email"
                                value=""
                                onChange={() => { }}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="password"
                                value=""
                                onChange={() => { }}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout >
    )
}

export default Signup