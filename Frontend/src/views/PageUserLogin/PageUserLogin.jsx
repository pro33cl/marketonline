import React from 'react';
import { useContext } from 'react';
import { Context_User } from '../../contexts/Context_User.jsx';
import FormLogin from '../../components/UserParts/FormLogin/FormLogin.jsx';

function PageUserLogin() {

  const receiving = useContext(Context_User);
  
  const {
    user,
    SetUser, 
    userSales,
    SetUserSales, 
    handlerUserGet, 
    handlerUserPut,
    handlerUserPost,
    handlerUserSalesGet,
    handlerUserSalePost,
    handlerUserSalePut,
    handlerUserSaleDelete,
    FindIndexById,
    handlerUserLogin,
    handlerRefreshAccess,
    accessLogin,
    SetAccessLogin
    
  } = receiving;

  
  return (
    <FormLogin handlerUserLogin={handlerUserLogin} accessLogin={accessLogin} SetAccessLogin={SetAccessLogin}></FormLogin>
  )
}

export default PageUserLogin