import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Layout from '../../components/Layout'
import './style.css'

const Home = (props) => {
    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">Side Bar</Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home