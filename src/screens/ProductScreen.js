import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row , Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from  '../products'
import  { useDispatch, useSelector } from 'react-redux'
import { listProductDetail } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'




const ProductScreen = ({match}) => {
    
//redux hooks
const dispatch = useDispatch()

//useSelector redux hooks
 const productDetails = useSelector(state => state.productDetail)

//get part of the state you need 
const { loading, error, productDetail} = productDetails

useEffect(() => {
    dispatch(listProductDetail(match.params.id))
}, [dispatch, match])


    //displaying the right product
  

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            
            <Row>
            {/*  Production Image */}
           <Col md={6}>
               <Image src={productDetail.image} alt={productDetail.name} fluid/>       
           </Col>

           <Col col={3}>
               <ListGroup variant='flush'>
                    {/*  Production Name */}
                   <ListGroup.Item>
                       <h3>{productDetail.name}</h3>
                   </ListGroup.Item>

                {/*  Production Rating */}
               <ListGroup.Item>
                   <Rating
                    value={productDetail.rating}
                    text={`${productDetail.numReviews} reviews`}
                   />
               </ListGroup.Item>

                 {/*  Production Description */}
               <ListGroup.Item>
                   Description: {productDetail.description}
               </ListGroup.Item>

               </ListGroup>
           </Col>



           <Col md={3}>
               <Card>
                   <ListGroup
                   variant='flush'
                   >
                       {/*  price */}
                    <ListGroup.Item>
                    <Row>
                       <Col>
                           Price:
                       </Col>
                       <Col>
                           <strong>${productDetail.price}</strong>
                       </Col>
                   </Row>
                    </ListGroup.Item>

                   {/*  status */}
                    <ListGroup.Item>
                    <Row>
                       <Col>
                           Status:
                       </Col>
                       <Col>
                           {productDetail.countInStock > 0 ?  'In stock' : 'Out of Stock'}
                       </Col>
                   </Row>
                    </ListGroup.Item>


                       {/*  button */}
                   <ListGroup.Item>

                       <Button 
                       className='btn-block' 
                       type='button'
                        disabled={productDetail.countInStock === 0}
                        >
                           Add To Cart
                       </Button>

                      
                   </ListGroup.Item>




                   </ListGroup>
               </Card>
           </Col>
       </Row>



            )}
         
        </>

    )
}

export default ProductScreen
