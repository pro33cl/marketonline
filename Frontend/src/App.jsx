
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { Context_User } from './contexts/Context_User.jsx';
import PageDetailProduct from '../src/views/PageDetailProduct/PageDetailProduct.jsx';
import PageHome from '../src/views/PageHome/PageHome.jsx';
import PageUserLogin from '../src/views/PageUserLogin/PageUserLogin.jsx';
import PageCart from './views/PageCart/PageCart.jsx';
import TopMenu from './components/PageParts/TopMenu/TopMenu.jsx';
import PagePurchaseResult from './views/PagePurchaseResult/PagePurchaseResult.jsx';
import PageUserData from '../src/views/PageUserData/PageUserData.jsx';
import PageUserSales from './views/PageUserSales/PageUserSales.jsx';
import PageUserRegister from './views/PageUserRegister/PageUserRegister.jsx';

function App() {

  const {accessLogin} = useContext(Context_User);
  

  return (
    <>
      <TopMenu></TopMenu>
      <Routes>
        <Route path="/" element={<PageHome></PageHome>}></Route>
        <Route path="/products" element={<PageHome></PageHome>}></Route>
        <Route path="/products/:id" element={<PageDetailProduct></PageDetailProduct>}></Route>
        <Route path="/products/cart" element={<PageCart></PageCart>}></Route>
        <Route path="/products/cart/result" element={<PagePurchaseResult></PagePurchaseResult>}></Route>
        <Route path="/products/login" element={<PageUserLogin></PageUserLogin>}></Route>
        <Route path="/products/register" element={<PageUserRegister></PageUserRegister>}></Route>
        <Route path="/products/user/data" element={accessLogin.login == true ? <PageUserData></PageUserData>: <PageUserLogin></PageUserLogin>}></Route>
        <Route path="/products/user/sales" element={accessLogin.login == true ? <PageUserSales></PageUserSales>: <PageUserLogin></PageUserLogin>}></Route>
      </Routes>
    </>
  )
}

export default App
