import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createPage } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import '../style.css'

const NewPage = (props) => {
    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category)
    const [categories, setCategories] = useState([])
    const [categoryId, setcategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const [type, setType] = useState('')

    const dispatch = useDispatch();

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
    }, [category])

    const onCategoryChange = (e) => {
        categories.find(category => category._id === e.target.value)
        setcategoryId(e.target.value)
        setType(category.type);
    }
    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = () => {
        // e.target.preventDefault();
        if (title === "") {
            alert(`Title is required`);
            setCreateModal(false)
            return
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner)
        })
        products.forEach((product, index) => {
            form.append('products', product)
        })
        dispatch(createPage(form));
    }


    const renderCreatePageModal = () => {
        return (
            <Modal modalTitle="Confirm" show={createModal} handleClose={submitPageForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <select className="form-control form-control-sm" value={categoryId} onChange={onCategoryChange}>
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
                                <Input className="form-control form-control-sm" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Page Title"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input className="form-control  form-control-sm" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={"Page Description"} />
                            </Col>
                        </Row>
                        <Row>
                            {
                                banners.length > 0 ?
                                    banners.map((banner, index) =>
                                        <Row key={index}>
                                            <Col>{banner.name}</Col>
                                        </Row>
                                    ) : null
                            }
                            <Col>
                                <Input type="file" className="form-control form-control-sm" name="banners" id="" onChange={handleBannerImages} />
                            </Col>
                        </Row>
                        <Row>
                            {
                                products.length > 0 ?
                                    products.map((product, index) =>
                                        <Row key={index}>
                                            <Col>{product.name}</Col>
                                        </Row>
                                    ) : null
                            }
                            <Col>
                                <Input type="file" className="form-control form-control-sm" name="banners" id="" onChange={handleProductImages} />
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setCreateModal(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={submitPageForm}>
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