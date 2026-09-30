import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducers,
  productDeleteReducers,
  productDetailsReducers,
  productListReducers,
  productUpdateReducers,
} from "./reducers/productReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  UserLoginReducers,
  UserSignupReducers,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducers,
  orderListReducers,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productsLists: productListReducers,
  productDetails: productDetailsReducers,

  userSignup: UserSignupReducers,
  userLogin: UserLoginReducers,
  cart: cartReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliverReducer,

  //admin
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducers,
  productDelete: productDeleteReducers,
  orderList: orderListReducers,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderMyList: orderListMyReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
