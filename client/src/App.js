import { Routes, Route, Switch, Redirect } from "react-router-dom";
import {
  Home,
  Favorite,
  Login,
  Profile,
  Test,
  LienHe,
  PayPost,
  Details,
  LoginAdmin,
} from "./containers/public";
import { path } from "./ultils/constant";
import {
  CreatePost,
  ManagePost,
  EditAccount,
  System,
  DepositHistory,
  VnPay,
} from "./containers/system";
import React, { useCallback, useState, useEffect } from "react";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
//npm i react-router-dom --save

import Layout from "./components/shared/Layout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import PenProduct from "./pages/PenProduct"
import EditPost from "./pages/EditPost";
import History from "./pages/History";
import UserManagement from "./pages/UserManagement";
import EditUser from "./pages/EditUser";
import Thank from './containers/system/Thank'
import { NavLink } from "react-router-dom";
import MomoPayment from '../src/containers/system/PaymentStrategies';
import BankPayment from '../src/containers/system/PaymentStrategies'; 
import VNayPayment from '../src/containers/system/PaymentStrategies'; 


function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);

  const handlePaymentClick = (paymentStrategy) => {
    paymentStrategy.pay(); // Gọi phương thức pay() tương ứng với Strategy đã chọn
  };


  // const {categories} = useSelector(state => state.app)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(actions.getCategories())

  // }, [actions.getCategories])

  // useEffect(() => {
  //     console.log("Categories :", categories)
  // }, [categories])

  return (
    
    <div class="h-screen w-creen">
      {/* <Sidebar /> */} 
      
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PROFILE} element={<Profile />} />

        </Route>
        <Route path={path.FAVORITE} element={<Favorite />} />
        <Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />

        <Route path={path.ADMIN} element={<Layout />}>
          
          <Route index element={<Dashboard />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.PRODUCT} element={<Products />} />
          <Route path={path.PENPOST} element={<PenProduct />} />
          <Route path={path.USERMANAGEMENT} element={<UserManagement />} />
          <Route path="products/editpost" element={<EditPost />}/>
          <Route path="usermanagement/edituser" element={<EditUser />}/>

          <Route path="register" element={<Register />} />
        </Route>

        <Route path={path.DETAILS_POST_TITLE_POSTID} element={<Details />} />
        <Route path={path.DETAILS_ALL} element={<Details />} />
        <Route path={path.ADMIN} element={<test />} />

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />}/>
          {/* <Route path={path.VNPAY} element={<VnPay />}/>      */}
            {/* <Route path={path.PAY_POST} element={<PayPost />} /> */}
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
          <Route path={path.DEPOSITHISTORY} element={<DepositHistory />} />
          <Route path={path.THANK} element={<Thank />} />
        </Route>
      </Routes>     
      <div className="App flex flex-col items-center justify-center">
  <h1 className="text-3xl font-bold mb-4">Thông tin thanh toán</h1>
  <div className="flex flex-wrap justify-center">
    <NavLink to={'http://localhost:8000/order/create_payment_url'} className="mb-2 mr-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
        onClick={handlePaymentClick}
      >
        <img
          src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png"
          alt="VNPay"
          className="h-5 w-5 inline-block mr-2"
        />
        Thanh toán VNPay
      </button>
    </NavLink>   
    <button
      className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 ml-2"
      onClick={() => handlePaymentClick(new MomoPayment())}
    >          
      Thanh toán Momo
    </button>

    <button
      className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 ml-2"
      onClick={() => handlePaymentClick(new BankPayment())}
    >
      Thanh toán qua ngân hàng
    </button>
  </div>
</div>
 
  </div>
    
  );
}

export default App;
