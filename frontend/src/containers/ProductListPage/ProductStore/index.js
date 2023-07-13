import React, { useEffect, useState } from 'react'
import { getProductsBySlug } from '../../../actions'
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { generatePublicUrl } from '../../../urlConfig';

const ProductStore = (props) => {
    console.log(props.params)
    const product = useSelector(state => state.product)
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000,
    })
    const dispatch = useDispatch();
    // let params = useParams(); // calling the hook


    useEffect(() => {
        dispatch(getProductsBySlug(props.params.slug))
    }, [])
    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.params.slug} mobile under {priceRange[key]}</div>
                                <button>view all</button>
                            </div>
                            <div style={{ display: "flex" }}>
                                {
                                    product.productsByPrice[key].map((product) =>
                                        <div className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" srcset="" />
                                            </div>
                                            <div className='productInfo'>
                                                <div style={{ margin: '5px 0' }}> {product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>3553</span>
                                                </div>
                                                <div className='productPrice'>{product.price}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductStore