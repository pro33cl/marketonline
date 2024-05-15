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
    <div style={{width: "100%", padding: "2rem", display: 'flex', flexDirection: 'column', justifyContent:'start', alignItems:'center'}}>
      <FormLogin handlerUserLogin={handlerUserLogin} accessLogin={accessLogin} SetAccessLogin={SetAccessLogin}></FormLogin>
    </div>

    
  )
}

export default PageUserLogin