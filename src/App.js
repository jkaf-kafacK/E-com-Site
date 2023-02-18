import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartPage from './page/CartPage.js';
import HomePage from './page/HomePage.js';
import ProductPage from './page/ProductPage.js';
import Signinpage from './page/Signinpage.js';
import { sign_out } from './actions/userAction.js';
import RegisterPage from './page/RegisterPage.js';
import ShippingPage from './page/ShippingPage.js';
import PaymentModeAddressPage from './page/PaymentModeAddressPage.js';
import PlaceOrderPage from './page/PlaceOrderPage';
import orderPage from './page/orderPage.js';
import OrderHistoryPage from './page/OrderHistoryPage.js';
import ProfilePage from './page/ProfilePage.js';
import PrivateRouter from './components/PrivateRouter.js';
import AdminRouters from './components/AdminRouters.js'; 
import ListProductPage from './page/ListProductPage.js';
import ProductEditPage from './page/ProductEditPage.js';
import OrderListPage from './page/OrderListPage.js';
import userListPage from './page/userListPage.js';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(sign_out());
  };
  return (
    <BrowserRouter>
    <div className="App-container">
    <header className="row">
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
      <div>
         <Link className="brand" to="/">
          eBuy
        </Link>
      </div>
      <div>
        <Link to="/cart"> Cart{cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>)}
        </Link>
            {userInfo ? (
              <div className="todo">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="todo-content">
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="todo">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="todo-content">

                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
      </div>
    </header>
    <main>
      <Route path="/cart/:id?" component={CartPage}></Route>
      <Route path="/product/:id" component={ProductPage}exact></Route>
      <Route path="/product/:id/edit" component={ProductEditPage} exact></Route>
      <Route path="/signin" component={Signinpage}></Route>
      <Route path="/register" component={RegisterPage}></Route>
      <Route path="/shipping" component={ShippingPage}></Route>
      <Route path="/payment" component={PaymentModeAddressPage}></Route>
      <Route path="/placeOrder" component={PlaceOrderPage}></Route>
      <Route path="/order/:id" component={orderPage}></Route>
      <Route path="/orderhistory" component={OrderHistoryPage}></Route>
      <PrivateRouter path="/profile" component={ProfilePage}></PrivateRouter>
      <AdminRouters path="/productlist"component={ListProductPage} exact></AdminRouters>
      <AdminRouters path="/userlist"component={userListPage} exact></AdminRouters>
      <AdminRouters path="/orderlist" component={OrderListPage}></AdminRouters>
      <Route path="/" component={HomePage}exact></Route>
    </main>
    <footer className="row center">All right reserved</footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
