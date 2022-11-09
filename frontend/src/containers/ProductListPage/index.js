import React, { useEffect } from 'react'
import { getProductsBySlug } from '../../actions'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // importing the hook

const ProductListPage = (props) => {
    const dispatch = useDispatch();
    let params = useParams(); // calling the hook
    useEffect(() => {
        dispatch(getProductsBySlug(params.slug))
    }, [])

    return (
        <Layout>
            ProductListPage
        </Layout>
    )
}

export default ProductListPage