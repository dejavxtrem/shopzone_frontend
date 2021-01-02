import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    
} 
    from '../constants/productConstants'

let baseURL = process.env.REACT_APP_BASEURL
console.log(baseURL)

//@fetch all product
//Get products Actions
export const listProducts = (keyword = '') =>  async (dispatch) => {
        try {
            dispatch({type: PRODUCT_LIST_REQUEST})

            const { data } = await axios.get(`${baseURL}/api/products?keyword=${keyword}`)

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

//@DELETE one product detail
//@fetch DELETE /:id
export const deleteProductById = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })
        const { userLogin: { userInfo} } = getState()
        const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            }
        }
         await axios.delete(baseURL + `/api/products/${id}`, config)
        
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {

        dispatch({type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//@POST create product 
//@fetch POST /
export const createProduct = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })
        const { userLogin: { userInfo} } = getState()
        const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            }
        }
         const { data} = await axios.post(baseURL + `/api/products/`, {}, config)
        
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })
        const { userLogin: { userInfo} } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`
            }
        }
         const { data} = await axios.put(baseURL + `/api/products/${product._id}`, product, config)
        
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_REVIEW_REQUEST,
        })
        const { userLogin: { userInfo} } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`
            }
        }
         const { data} = await axios.post(baseURL + `/api/products/${productId}/reviews`, review, config)
        
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({type: PRODUCT_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}