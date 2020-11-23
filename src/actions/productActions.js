import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} 
    from '../constants/productConstants'

let baseURL = process.env.REACT_APP_BASEURL
console.log(baseURL)

//@fetch all product
//Get products Actions
export const listProducts = () =>  async (dispatch) => {
        try {
            dispatch({type: PRODUCT_LIST_REQUEST})
            const { data } = await axios.get(`${baseURL}/api/products`)

            dispatch({type: PRODUCT_LIST_SUCCESS, payload: data.products})
        } catch (error) {
                dispatch({type: PRODUCT_LIST_FAIL, 
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
        }

}

//@fetch one product detail
//@fetch GET /:id
export const listProductDetail = (id) =>  async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(baseURL +`/api/products/${id}`)

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data.product})
    } catch (error) {
            dispatch({type: PRODUCT_DETAILS_FAIL, 
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
    }

}