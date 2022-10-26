import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import Layout from '../../components/Layout'
import './style.css'

const Home = (props) => {
    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                        <ul>
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/products'}>Products</NavLink></li>
                            <li><NavLink to={'/orders'}>Orders</NavLink></li>


                        </ul>
                    </Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home