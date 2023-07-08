import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import { addProduct } from '../../actions'
import { generatePublicUrl } from '../../urlConfig'

const Products = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setproductPictures] = useState([])
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    //bootstrap modal
    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);
        for (let pic of productPictures) {
            form.append('productPicture', pic)
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

    const renderAddProductModal = () => {
        return (
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
        )
    }

    //product details modal
    const showProductDetailModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true)
    }
    const handleClodeProductDetailModal = () => {
        setProductDetailModal(false)
    }
    const renderProductDetailModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal show={productDetailModal} onHide={handleClodeProductDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <label className="key" htmlFor="">Name</label>
                            <p className="style">{productDetails.name}</p>
                        </Col>
                        <Col md="6">
                            <label className="key" htmlFor="">Price</label>
                            <p className="style">{productDetails.price}</p>
                        </Col>
                        <Col md="6">
                            <label className="key" htmlFor="">Quantity</label>
                            <p className="style">{productDetails.quantity}</p>
                        </Col>
                        <Col md="6">
                            <label className="key" htmlFor="">Category</label>
                            <p className="style">{productDetails.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <label className="key" htmlFor="">Description</label>
                            <p className="style">{productDetails.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="" className='key'>Product Pictures</label>
                            <div style={{ display: "flex" }}>
                                {productDetails.productPictures.map((picture) =>
                                    <div className='productImageContainer'>
                                        <img src={generatePublicUrl(picture.img)} alt="" srcset="" />
                                    </div>
                                )}
                            </div>

                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClodeProductDetailModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClodeProductDetailModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    //=======================================================================================================================
    const renderProducts = () => {
        return (
            <Table responsive="lg" style={{ fontSize: 'small' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ? product.products.map((product) =>
                            <tr key={product._id} onClick={() => showProductDetailModal(product)}>
                                <td>1</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                            </tr>
                        ) : null}
                </tbody>
            </Table>
        )
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
                    <Row>
                        <Col>
                            {renderProducts()}
                        </Col>
                    </Row>
                </Container>
                {renderAddProductModal()}
                {renderProductDetailModal()}
            </Layout>

        </div>
    )
}

export default Products