import React from 'react';
import MenuUser from '../../components/UserParts/MenuUser/MenuUser';
import FormUserData from '../../components/UserParts/FormUserData/FormUserData';
import { useContext } from 'react';
import { Context_User } from '../../contexts/Context_User.jsx';
import { useEffect } from "react";
import FormUserPassword from '../../components/UserParts/FormUserPassword/FormUserPassword.jsx';
import {DivPage, DivHeader, DivBodyData, DivBodyPassword} from '../PageUserData/PageUserData.js';


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
    
    <DivPage>
      <DivHeader>
        <MenuUser pageUser={pageUser} handlerPage={handlerPage}></MenuUser>
      </DivHeader>
      <DivBodyData>
        <FormUserData user={user} SetUser={SetUser} handlerUserPut={handlerUserPut}></FormUserData>
      </DivBodyData>
      <DivBodyPassword>
        <FormUserPassword user={user} SetUser={SetUser} handlerUserPut={handlerUserPut}></FormUserPassword>
      </DivBodyPassword>
    </DivPage>
  )
}

export default PageUserData