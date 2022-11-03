import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions/product.action'

const Products = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setproductPictures] = useState([])
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    //bootstrap modal
    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('categoryId', categoryId);
        for (let pic of productPictures) {
            form.append('productPictures', pic)
        }
        dispatch(addProduct(form));
        setShow(false);
    }

    const handleShow = () => setShow(true);

    //add categories
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)  //recall but with children property added
            }
        }
        return options;
    }

    //set product pictures array to be used in FromData constructor object
    const handleProductPictures = (e) => {
        setproductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Products</h3>
                                <button onClick={handleShow}>Add</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input value={name} placeholder={`Product Name`} onChange={(e) => setName(e.target.value)} />
                        <Input value={quantity} placeholder={`Quantity`} onChange={(e) => setQuantity(e.target.value)} />
                        <Input value={price} placeholder={`Price`} onChange={(e) => setPrice(e.target.value)} />
                        <Input value={description} placeholder={`Description`} onChange={(e) => setDescription(e.target.value)} />
                        <select name="" id="" className="form-control" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                            <option value="">select category</option>
                            {
                                //handle array options
                                createCategoryList(category.categories).map(option =>
                                    <option value={option.value} key={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                        {
                            productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                        }
                        <input type="file" name="productPicture" id="" onChange={handleProductPictures} />


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>

        </div>
    )
}

export default Products