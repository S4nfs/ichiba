import React from 'react'
import Card from '../UI/Card'
import Layout from '../Layout'

const CartPage = (props) => {
    return (
        <Layout>
            <div className="cartContainer">
                <Card headerLeft={'My Cart'} headerRight={<div>
                    Deliver To
                </div>}>

                    <div className="flexRow">
                        <div className="cartProductContainer">
                            <img src="" alt="" srcset="" />
                        </div>
                        <div className="cartItemDetails">

                            <div>
                                Product Name
                            </div>
                            <div>
                                Deliver in 4 days
                            </div>
                        </div>
                    </div>
                </Card >
                <Card style={{ width: '500px' }}>Price</Card>
            </div >
        </Layout >
    )
}

export default CartPage