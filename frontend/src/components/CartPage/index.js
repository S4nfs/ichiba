import React, { useEffect, useState } from 'react'
import Card from '../UI/Card'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import './style.css'
import { addToCart } from '../../actions/cart.action'

const CartPage = (props) => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [cartItems, setcartItems] = useState(cart.cartItems)
    useEffect(() => {
        setcartItems(cart.cartItems)
    }, [cart.cartItems])

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, +1));

    }
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, -1));
    }
    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                <Card headerLeft={'My Cart'} headerRight={<div>Deliver To</div>}>
                    {
                        Object.keys(cartItems).map((key, index) => <div className="flexRow">
                            <CartItem key={index} cartItem={cartItems[key]} onQtyInc={onQuantityIncrement} onQtyDec={onQuantityDecrement} />

                        </div>
                        )
                    }

                </Card>
                <Card headerLeft="Price" style={{ width: '500px' }}></Card>
            </div >
        </Layout >
    )
}

export default CartPage