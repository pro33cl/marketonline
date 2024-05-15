import React from 'react';
import MenuUser from '../../components/UserParts/MenuUser/MenuUser';
import '../../views/PageUserData/PageUserData.css';
import FormUserData from '../../components/UserParts/FormUserData/FormUserData';
import { useContext } from 'react';
import { Context_User } from '../../contexts/Context_User.jsx';
import { useEffect } from "react";
import FormUserPassword from '../../components/UserParts/FormUserPassword/FormUserPassword.jsx';


function PageUserData() {


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
    SetAccessLogin,
    totalPagesUserSales,
    SetTotalPagesUserSales,
    pageUserSales,
    SetPageUserSales,
    pageUser,
    handlerPage

  } = receiving;


  useEffect(() => {

    console.log(user);

  }, [user]);

  return (
    <div className='page'>
      <div className='header'>
        <MenuUser pageUser={pageUser} handlerPage={handlerPage}></MenuUser>
      </div>
      <div className='body-data'>
        <FormUserData user={user} SetUser={SetUser} handlerUserPut={handlerUserPut}></FormUserData>
      </div>
      <div className='body-password'>
        <FormUserPassword user={user} SetUser={SetUser} handlerUserPut={handlerUserPut}></FormUserPassword>
      </div>
    </div>
  )
}

export default PageUserData