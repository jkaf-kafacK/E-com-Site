import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer,productCreateReducer, 
  productUpdateReducer,productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { user_Register_Reducer, user_Signin_Reducer,
  userDetailsReducer,userUpdateProfileReducer, userListReducer, userDeleteReducer } from './reducers/userReducers';
import { orderCreateReducer,orderDetailsReducer, orderPayReducer,
  orderListReducer, orderDeleteReducer, orderRepositoryListReducer,
 } from './reducers/orderReducers';




const initialState = {

  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
      paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin:user_Signin_Reducer,
  userRegister: user_Register_Reducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderRepositoryList : orderRepositoryListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList : userListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete :productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  userDelete: userDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;