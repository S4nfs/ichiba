import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions'
import getParams from '../../../utils/getParams'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';


const ProductPage = ({ params, location }) => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const { page } = product

    useEffect(() => {
        const searchParams = getParams(location.search)
        const payload = { searchParams }
        dispatch(getProductPage(payload))
    }, [])

    return (
        <div style={{ margin: '20px 10px' }}>
            <h3>{page.title}</h3>
            <Carousel infiniteLoop={true} dynamicHeight={true} emulateTouch={true} autoPlay={true}>
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a key={index} style={{ display: 'block' }} href={banner.navigateTo}>
                            <img src={banner.img} style={{ height: '50%' }} />
                        </a>
                    )
                }
            </Carousel>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0' }}>
                {
                    page.products && page.products.map((product, index) =>
                        <Card key={index} style={{ width: '400px', height: '200px', margin: '5px' }}>
                            <img src={product.img} alt="" srcset="" style={{ width: '100%', height: '100%' }} />
                        </Card>
                    )
                }
            </div>
        </div >
    )
}

export default ProductPage