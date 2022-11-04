import React, { useState } from 'react'
import { Button, Col, Container, Row, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

const Category = (props) => {
    const category = useSelector(state => state.category);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    //bootstrap modal
    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form))
        setCategoryName('');
        setParentCategoryId('')
        setShow(false);
    }

    const handleShow = () => setShow(true);

    //get categories
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories
    }

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

    //category image
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    //=================================================================================================================================
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} />
                    <select name="" id="" className="form-control" onChange={(e) => setParentCategoryId(e.target.value)} value={parentCategoryId}>
                        <option value="">select category</option>
                        {
                            //handle array options
                            createCategoryList(category.categories).map(option =>
                                <option value={option.value} key={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    <input type="file" name="categoryImage" id="" onChange={handleCategoryImage} />
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
    )
}

export default Category