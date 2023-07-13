import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ProductStore from './ProductStore'
import './style.css'
import ProductPage from './ProductPage'

const ProductListPage = () => {

    let params = useParams(); //accessing slug

    const location = useLocation();
    const renderProduct = () => {

        // Accessing the whole location object and get search
        const searchParams = getParams(location.search)
        let content = null
        switch (searchParams.type) {
            case 'store':
                content = <ProductStore params={params} location={location} />
                break;
            case 'page':
                content = <ProductPage params={params} location={location} />
                break;
            default:
                content = null
        }
        return content

    }

    return (
        <Layout>
            {renderProduct()}
        </Layout>
    )
}

export default ProductListPage