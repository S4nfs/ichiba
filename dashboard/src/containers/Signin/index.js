import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth); //get store value
    const dispatch = useDispatch();

    //to keep DRY we move the useEffect to App.js
    // useEffect(() => {
    //     if (!auth.authenticate) {
    //         dispatch(isUserLoggedIn());
    //     }
    // }, [])

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user))
    }
    if (auth.authenticate) {
        return <Navigate to='/' />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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