import React, {useState, useEffect } from 'react'
import { Form, Button, Row, Col , Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'


const ProfileScreen = ({location, history}) => {

const [name, setName ] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState(null)


//use dispatch redux hook
const dispatch = useDispatch()

//use selector redux hook
const userDetails = useSelector( state => state.userDetails)
const { loading, error, user} = userDetails

//use selector redux hook
const userLogin = useSelector( state => state.userLogin)
const { userInfo} = userLogin

//get success value from userupdateprofile
const userUpdateProfile = useSelector( state => state.userUpdateProfile)
const { success} = userUpdateProfile

//get user order list state
const orderMyList = useSelector( state => state.orderMyList)
const { loading:loadingOrders , error:errorOrders , orders} = orderMyList





//useeffect to check if the user is login already
useEffect(() => {
    if (!userInfo) {
        history.push('/login')
    } else {
        if (!user || !user.name || success) {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
}, [dispatch, history, userInfo, user, success])


 const submitHandler = (e) => {
     e.preventDefault()
     //dispatch userRegister action
     if (password !== confirmPassword) {
         setMessage('Password does not match')
     } else {
        //DISPATCH UPDATE PROFILE
        dispatch(updateUserProfile({id: user._id, name, email, password}))
     }
     
     
 }

    return (
        <Row>
            <Col md={3}>
            { message && <Message variant='danger'>{message}</Message>}
        { error && <Message variant='danger'>{error}</Message>}
        { success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader/>}
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder=' Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>

            </Form.Group>



            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>

            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >


                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >


                    </Form.Control>
            </Form.Group>





            <Button
            type="submit"
            variant='primary'
            >
                Update
            </Button>
        </Form>
   
            </Col>

            <Col md={9}>
              <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          orders.map(order => {
                             return  <tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.createdAt.substring(0, 10)}</td>
                                  <td>{order.totalPrice}</td>
                                  <td>{order.isPaid ? (order.paidAt.substring(0, 10) ): (
                                      <i className='fas fa-times' style={{color: 'red'}}></i>
                                  )}</td>

                                   <td>{order.isDelivered ? order.isDeliveredAt.substring(0, 10) : (
                                      <i className='fas fa-times' style={{color:'red'}}></i>
                                  )}</td>

                                  <td>
                                      <LinkContainer to={`/order/${order._id}`}>
                                          <Button variant='light' className='btn-sm'>Details</Button>
                                      </LinkContainer>
                                  </td>
                                  
                              </tr>
                          })
                        }
                    </tbody>
                </Table>
            )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
