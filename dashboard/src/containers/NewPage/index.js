import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import '../style.css'

const NewPage = (props) => {
    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category)
    const [categories, setCategories] = useState([])
    const [categoryId, setcategoryId] = useState('')
    const [disc, setDesc] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)  //recall but with children property added
            }
        }
        return options;
    }


    useEffect(() => {
        setCategories(createCategoryList(category.categories));
        console.log("FE", categories)
    }, [category])

    const handleBannerImages = (e) => {

    }
    const handleProductImages = (e) => {

    }


    const renderCreatePageModal = () => {
        return (
            <Modal modalTitle="Confirm" show={createModal} onHide={() => setCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <select className="form-control form-control-sm" value={categoryId} onChange={(e) => setcategoryId(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {
                                        categories.map(cat =>
                                            <option value={cat._id} key={cat._id}>{cat.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input className="form-control  form-control-sm" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Page Title"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input className="form-control  form-control-sm" value={disc} onChange={(e) => setDesc(e.target.value)} placeholder={"Page Description"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input type="file" className="form-control  form-control-sm" name="banners" id="" onChange={handleBannerImages} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input type="file" className="form-control  form-control-sm" name="banners" id="" onChange={handleProductImages} />
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setCreateModal(false)}>
                        No
                    </Button>
                    <Button variant="primary">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>

    )
}

export default NewPage