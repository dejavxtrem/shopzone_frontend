import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetail, updateProduct} from '../actions/productActions'
import {  PRODUCT_UPDATE_RESET } from '../constants/productConstants'

let baseURL = process.env.REACT_APP_BASEURL

const ProductEditScreen = ({match, history}) => {

const productId = match.params.id

const [name, setName ] = useState('')
const [price, setPrice] = useState(0)
const [image, setImage] = useState('')
const [brand, setBrand] = useState('')
const [category, setCategory] = useState('')
const [countInStock, setCountInStock] = useState('')
const [description, setDescription] = useState('')
const [uploading, setUpLoading] = useState(false)


//use dispatch redux hook
const dispatch = useDispatch()

//use selector redux hook
const product = useSelector( state => state.productDetail)
const { loading, error, productDetail } = product

//product update
const productUpdate = useSelector( state => state.productUpdate)
const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = productUpdate



useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if (!productDetail.name || productDetail._id !== productId) {
                dispatch(listProductDetail(productId))
            } else {
                setName(productDetail.name)
                setPrice(productDetail.price)
                setImage(productDetail.image)
                setBrand(productDetail.brand)
                setCategory(productDetail.category)
                setCountInStock(productDetail.countInStock)
                setDescription(productDetail.description)
            }
        }
        
    
}, [dispatch, productDetail, productId, successUpdate, history])


//upload image file handler
const uploadFileHandler =  async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUpLoading(true)

        try {
            const config =  {
                header: {
                 'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(`${baseURL}/api/upload`, formData, config)
             setImage(data)
             setUpLoading(false)
        } catch (error) {
                console.log(error)
                setUpLoading(false)
        }
}


 const submitHandler = (e) => {
     e.preventDefault()
     dispatch(updateProduct({
         _id: productId,
         name,
         price,
         image,
         brand,
         category,
         description,
         countInStock
     }))
 }




    return (
           <> 
             <Link to='/admin/productlist' className='btn btn-light my-3'>
                 Go Back
             </Link>


             <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
           </>
           
   
    )
}

export default ProductEditScreen