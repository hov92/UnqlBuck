import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChangePassword from './components/dashboard/ChangePassword';
import Chat from './components/dashboard/Chat';
import Index from './components/dashboard/Index';
import OrderDetails from './components/dashboard/OrderDetails';
import Orders from './components/dashboard/Orders';
import Wishlist from './components/dashboard/Wishlist';
import Card from './pages/Card';
import CategoryShop from './pages/CategoryShop';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Register from './pages/Register';
import SearchProducts from './pages/SearchProducts';
import Shipping from './pages/Shipping';
import Shops from './pages/Shops';
import { get_category } from './store/reducers/homeReducer';
import ProtectUser from './utils/ProtectUser';
import ConfirmOrder from './pages/ConfirmOrder';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category()) 
},[])


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/shops' element={<Shops/>} />
      <Route path='/card' element={<Card/>} />
      <Route path='/shipping' element={<Shipping/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/products?' element={<CategoryShop/>} />
      <Route path='/products/search?' element={<SearchProducts/>} />
      <Route path='/product/details/:slug' element={<Details/>} />
      <Route path='/order/confirm?' element={<ConfirmOrder/>} />  

      <Route path='/dashboard' element={<ProtectUser/>} >
      <Route path='' element={<Dashboard/>} >        
      <Route path='' element={<Index/>} />
      <Route path='my-orders' element={<Orders/>} /> 
      <Route path='my-wishlist' element={<Wishlist/>} /> 
      <Route path='change-password' element={<ChangePassword/>} />
      <Route path='order/details/:orderId' element={<OrderDetails/>} /> 
      <Route path='chat' element={<Chat/>} /> 
      <Route path='chat/:sellerId' element={<Chat/>} /> 

       
       </Route> 
      </Route>
      
       




    </Routes>
    
    </BrowserRouter>
  );
}

export default App;