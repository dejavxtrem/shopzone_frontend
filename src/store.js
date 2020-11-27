import { createStore, combineReducers,  applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { composeWithDevTools } from 'redux-devtools-extension'
//import reducers into the store
import { productListReducers , 
    productDetailsReducers
} from './reducers/productReducers'
//card reducer import
import { cartReducer } from './reducers/cartReducers'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    cart: cartReducer
})

//carItem from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: {cartItems: cartItemsFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store