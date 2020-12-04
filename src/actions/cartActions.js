import axios from 'axios'
import { CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'


let baseURL = process.env.REACT_APP_BASEURL

export const addToCart = (id, qty ) => async (dispatch, getState) => {
    const { data } = await axios.get(`${baseURL}/api/products/${id}`)

    //console.log(data)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image,
            countInStock: data.product.countInStock,
            qty,
        }
    })
    localStorage.setItem('cardItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (shippingData) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: shippingData
    })

    localStorage.setItem('shippingAddress', JSON.stringify(shippingData))
}


export const savePaymentMethod = (paymentType) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentType
    })

    localStorage.setItem('paymentMethod', JSON.stringify(paymentType))
}
