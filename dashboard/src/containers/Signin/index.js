import React from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch } from 'react-redux';

const Signin = (props) => {

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email: 'sagar@gmail.com',
            password: 'tt'
        }
        dispatch(login(user))
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
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
        </Layout>
    )
}

export default Signin