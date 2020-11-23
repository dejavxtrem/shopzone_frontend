import { createStore, combineReducers,  applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { composeWithDevTools } from 'redux-devtools-extension'
//import reducers into the store
import { productListReducers , 
    productDetailsReducers
} from './reducers/productReducers'


const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))



export default store