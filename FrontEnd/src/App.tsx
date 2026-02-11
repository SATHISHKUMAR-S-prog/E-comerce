import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from './Customer/Components/NavBar';
import customeTheme from './Theme/CustomeTheme';
import Home from './Customer/Pages/Home/Home';
import Product from './Customer/Pages/Product/Product';
import ProductDetails from './Customer/Pages/ProductDetails/ProductDetails';
import Reviews from './Customer/Pages/Reviews/Reviews';
import Cart from './Customer/Pages/Cart/Cart';
import CheckOut from './Customer/Pages/CheckOut/CheckOut';
import Account from './Customer/Pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './Customer/Pages/BecomeSeller/BecomeSeller';
import SellerDashboard from './Seller/Pages/SellerDashboard/SellerDashboard';
import AdminDashBoard from './Admin/Pages/DashBoard/AdminDashBoard';
import { fetchProducts } from './State/FetchApi';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile  ,} from './State/Seller/SellerSlice';
import Auth from './Customer/Pages/Auth/Auth';
import { fetchUserProfile } from './State/AuthSlice';
import PaymentSuccess from './Customer/Pages/CheckOut/PaymentSuccess';
import WishList from './Customer/Pages/WishList/WishList';
import { createHomeCategories } from './State/Customer/CustomerSlice';
import { HomeCategories } from './Data/Category/HomeCategories';
import VerifySellerEmail from './Customer/Pages/BecomeSeller/VerifySellerEmail';

function App() {
  const dispatch = useAppDispatch()
  const {seller , auth} = useAppSelector(store => store)
  const navigate = useNavigate()
  let index = 0
  useEffect(()=>{
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))
    if(index == 0){
      dispatch(createHomeCategories(HomeCategories))
      index +=1
    }
  },[dispatch])

  useEffect(()=>{
if(seller.profile){
  navigate("/seller/")
}
  },[seller.profile])

  useEffect(() =>{
    dispatch(fetchUserProfile({jwt:auth.jwt || localStorage.getItem("jwt")}))
  },[auth.jwt])

  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        {/* <NavBar /> */}
        {/* <Home /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Reviews /> */}
        {/* <Cart /> */}
        {/* <CheckOut /> */}
        {/* <Account /> */}
        
        <NavBar />
        <Routes>

          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Auth />}/>
          <Route path='/products/:category/:categoryName' element={<Product />}/>
          <Route path='/reviews/:productId' element={<Reviews />}/>
          <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />}/>
          <Route path='/wishlist' element={<WishList />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={<CheckOut />}/>
          <Route path='/payment-success/:orderId' element={<PaymentSuccess />} />
          <Route path='/account/*' element={<Account />} />
          <Route path='/become-seller' element={<BecomeSeller />}/>
          <Route path='/verify-seller' element={<VerifySellerEmail />}/>
          <Route path='/seller/*' element={<SellerDashboard />} />
          <Route path='/admin/*' element={<AdminDashBoard />} />
          
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
