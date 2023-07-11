import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ProductStore from './ProductStore'
import './style.css'
import ProductPage from './ProductPage'

const ProductListPage = (props) => {
    console.log(props)
    let params = useParams(); //accessing slug

    const location = useLocation();
    const renderProduct = (props) => {

        // Accessing the whole location object and get search
        const searchParams = getParams(location.search)
        let content = null
        switch (searchParams.type) {
            case 'store':
                content = <ProductStore {...params} />
                break;
            case 'page':
                content = <ProductPage {...params} />
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