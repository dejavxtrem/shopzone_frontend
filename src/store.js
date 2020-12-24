import { createStore, combineReducers,  applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { composeWithDevTools } from 'redux-devtools-extension'
//import reducers into the store
import { productListReducers , 
    productDetailsReducers
} from './reducers/productReducers'
//user login reducer
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'

//card reducer import
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer,
    orderListReducer
} from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListReducer
})

//carItem from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

//USER info local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null


//shipping address store in localstorage

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
  cart: {cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage
},
  userLogin: {userInfo: userInfoFromStorage} ,
   
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store