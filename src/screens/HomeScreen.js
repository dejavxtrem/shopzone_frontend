import React, {useEffect} from 'react'
import  products from '../products'
import  {Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import  { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {

//redux hooks
 const dispatch = useDispatch()

//useSelector redux hooks
 const productList = useSelector(state => state.productList)
//get what part of the state you need in the component
 const { loading , error, products } = productList



useEffect(() => {
    dispatch(listProducts())
}, [dispatch])



    return (
        <>
        <h1>Latest Products</h1> 
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
         <Row>
         {products.map((product) => (
                     <Col 
                     key={product._id}
                     sm={12}
                     md={6}
                     lg={4}
                     xl={3}
                     >
                     <Product product={product}/>
                     </Col>
    ))}
        </Row>}  
          
    </>
    )
}

export default HomeScreen
