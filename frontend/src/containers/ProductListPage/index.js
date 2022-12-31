import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ProductStore from './ProductStore'
import './style.css'

const ProductListPage = () => {
    let params = useParams(); // calling the hook
    const renderProduct = () => {

        console.log(params);
        // const params = getParams(props.location.search)
    }

    return (
        <Layout>
            <ProductStore {...params} />
            {renderProduct}
        </Layout>
    )
}

export default ProductListPage