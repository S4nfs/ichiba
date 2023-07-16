import React from 'react'
import Card from '../UI/Card'
import Layout from '../Layout'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const CartPage = (props) => {
    const cart = useSelector(state => state.cart)
    const cartItems = cart.cartItems
    return (
        <Layout>
            <div className="cartContainer">
                <Card headerLeft={'My Cart'} headerRight={<div>Deliver To</div>}>
                    {
                        Object.keys(cartItems).map((key, index) => <div className="flexRow">
                            <CartItem key={index} cartItem={cartItems[key].qty} />

                        </div>
                        )
                    }

                </Card >
                <Card style={{ width: '500px' }}>Price</Card>
            </div >
        </Layout >
    )
}

export default CartPage