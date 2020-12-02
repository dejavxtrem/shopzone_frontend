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
} from './reducers/userReducers'

//card reducer import
import { cartReducer } from './reducers/cartReducers'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer
})

//carItem from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

//USER info local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
  cart: {cartItems: cartItemsFromStorage},
  userLogin: {userInfo: userInfoFromStorage}  
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store