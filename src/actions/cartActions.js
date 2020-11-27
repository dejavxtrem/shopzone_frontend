import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'


let baseURL = process.env.REACT_APP_BASEURL

export const addToCart = (id, qty ) => async (dispatch, getState) => {
    const { data } = await axios.get(`${baseURL}/api/products/${id}`)

    console.log(data)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image,
            countInStock: data.product.countInStock,
            qty
        }
    })
    localStorage.setItem('cardItems', JSON.stringify(getState().cart.cartItems))
}

