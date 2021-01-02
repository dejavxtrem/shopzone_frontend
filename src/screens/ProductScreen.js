import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row , Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import  { useDispatch, useSelector } from 'react-redux'
import { listProductDetail, createProductReview} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'


 

const ProductScreen = ({ history, match}) => {

 const [qty, setQty] = useState(1)
 const [rating, setRating] = useState(0)
 const [comment, setComment] = useState('')


  
//redux hooks
const dispatch = useDispatch()

//useSelector redux hooks
 const productDetails = useSelector(state => state.productDetail)
//get part of the state you need 
const { loading, error, productDetail} = productDetails


//useSelector redux hooks
const productReviewCreate = useSelector(state => state.productReviewCreate)
//get part of the state you need 
const {  error:errorProductReview, success:successProductReview} = productReviewCreate


//useSelector redux hooks
const userLogin = useSelector(state => state.userLogin)
//get part of the state you need 
const { userInfo } = userLogin



useEffect(() => {
   if (successProductReview) {
     alert('Review Submitted!')
     setRating(0)
     setComment('')
     dispatch({type: PRODUCT_REVIEW_RESET})
   }
  dispatch(listProductDetail(match.params.id))
    
}, [dispatch, match, successProductReview])


const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
}

const submitHandler = (e) => {
  e.preventDefault()
  dispatch(createProductReview(match.params.id, {rating,comment}))
}
  
    //displaying the right product
  

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <>
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
                   {productDetail.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(productDetail.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                        {/*  button */}
                       <Button 
                       className='btn-block' 
                       type='button'
                        disabled={productDetail.countInStock === 0}
                        onClick={addToCartHandler}
                        >
                           Add To Cart
                       </Button>
                   </ListGroup>
               </Card>
           </Col>
       </Row>

         <Row >
           <Col md={6}>
                <h2>Reviews</h2>
                 {productDetail.reviews.length === 0 &&  <Message>No Reviews</Message>}
                 <ListGroup variant='flush'>
                   {productDetail.reviews.map(review => (
                      <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating}/>
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                       </ListGroup.Item>
                   ))}
   
                  <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                      {userInfo  ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                               <Form.Label>Rating</Form.Label>
                               <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                             </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                        </Form>
                      ) : 
                      <Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>}
                  </ListGroup.Item>
                  </ListGroup>               
           </Col>           
         </Row>
           </>

            )}
         
        </>

    )
}

export default ProductScreen
