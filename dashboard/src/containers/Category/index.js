import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions/category.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload,
    IoMdFolder,
    IoIosFolderOpen,
    IoIosRemove
} from 'react-icons/io'
import '../style.css'

const Category = (props) => {
    const category = useSelector(state => state.category);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!category.loading) {
            setShow(false)
        }
    }, [category.loading])


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
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                // </li>
            )
        }
        return myCategories
    }

    //add categories
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

    //category image
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    //Get EXPANDED | CHECKED category array
    const triggerUpdateCategoriesModal = () => {
        updatedCheckedAndExpandedCategories();
        setUpdateCategoryModal(true)
    }
    const updatedCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((catId, index) => {   //comparing checked category id === createCategoryList(options)
            const cat = categories.find((_category, _index) => catId == _category.value);
            category && checkedArray.push(cat)
        })
        expanded.length > 0 && expanded.forEach((catId, index) => { //comparing expanded category id === createCategoryList(options)
            const cat = categories.find((_category, _index) => catId == _category.value);
            category && expandedArray.push(cat)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log('d ', checked, expanded, categories, checkedArray, expandedArray)
    }
    //Update EXPANDED | CHECKED category array
    const handleUpdatedCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedAray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedAray)
        } else if (type == "expanded") {
            const updatedExpandedAray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedAray)
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type', item.type)
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type', item.type)
        })
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false)
    }

    const renderUpdateCategoriesModal = () => {
        return (
            <Modal size="lg" show={updateCategoryModal} onHide={() => setUpdateCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 && expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input value={item.name} placeholder={`Category Name`} onChange={(e) => handleUpdatedCategoryInput("name", e.target.value, index, 'expanded')} />
                                </Col>
                                <Col>
                                    <select name="" id="" className="form-control" onChange={(e) => handleUpdatedCategoryInput("parentId", e.target.value, index, 'expanded')} value={item.parentId}>
                                        <option value="">select category</option>
                                        {
                                            //handle array options
                                            createCategoryList(category.categories).map(option =>
                                                <option value={option.value} key={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select name="" id="" className='form-control' value={item.type} onChange={(e) => handleUpdatedCategoryInput("type", e.target.value, index, 'expanded')}>
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                    <h6>Checked</h6>
                    {
                        checkedArray.length > 0 && checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input value={item.name} placeholder={`Category Name`} onChange={(e) => handleUpdatedCategoryInput("name", e.target.value, index, 'checked')} />
                                </Col>
                                <Col>
                                    <select name="" id="" className="form-control" onChange={(e) => handleUpdatedCategoryInput("parentId", e.target.value, index, 'checked')} value={item.parentId}>
                                        <option value="">select category</option>
                                        {
                                            //handle array options
                                            createCategoryList(category.categories).map(option =>
                                                <option value={option.value} key={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select name="" id="" className='form-control' value={item.type} onChange={(e) => handleUpdatedCategoryInput("type", e.target.value, index, 'checked')}>
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                    <input type="file" name="categoryImage" id="" onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={}>
                        Close
                    </Button> */}
                    <Button variant="primary" onClick={updateCategoriesForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const renderAddCategoryModal = () => {
        return (
            // EDIT, DELETE Categories Modal +++++++++++++++ 
            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Input className="form-control-sm" value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} />
                        </Col>
                        <Col>
                            <select name="" id="" className="form-control form-control-sm" onChange={(e) => setParentCategoryId(e.target.value)} value={parentCategoryId}>
                                <option value="">select category</option>
                                {
                                    //handle array options
                                    createCategoryList(category.categories).map(option =>
                                        <option value={option.value} key={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Row>
                    <Col>
                        <input type="file" name="categoryImage" id="" onChange={handleCategoryImage} />
                    </Col>
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

    //Delete category
    const deleteCategory = () => {
        updatedCheckedAndExpandedCategories()
        setDeleteCategoryModal(true)
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray)).then(result => {
                if (result) {
                    dispatch(getAllCategory());
                    setDeleteCategoryModal(false)
                }
            });
        }
        setDeleteCategoryModal(false)
    }

    const renderDeletecategoryModal = () => {
        console.log("DELETE", checkedArray)
        return (
            <Modal modalTitle="Confirm" show={deleteCategoryModal} onHide={() => setDeleteCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you Sure you want to delete the category ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Expanded</h5>
                    {expandedArray.map((item, index) => <span key={index}> {item.name}</span>)}
                    <h5>Checked</h5>
                    {checkedArray.map((item, index) => <span key={index}> {item.name}</span>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setDeleteCategoryModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={deleteCategories}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    //==========================================================================================================================
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd style={{ paddingBottom: '5px' }} /> <span>Add</span> </button>
                                <button onClick={triggerUpdateCategoriesModal}><IoIosCloudUpload style={{ paddingBottom: '5px' }} /> <span>Edit</span> </button>
                                <button onClick={deleteCategory}><IoIosTrash style={{ paddingBottom: '5px' }} /> <span>Delete</span> </button>
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* Replaced with react-checkbox-tree NPM package 
                        <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                                parentOpen: < IoIosFolderOpen />,
                                parentClose: <IoMdFolder />,
                                leaf: <IoIosRemove />
                            }}
                            iconsClass="fa4"
                        />
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
            {renderDeletecategoryModal()}
        </Layout>
    )
}

export default Category