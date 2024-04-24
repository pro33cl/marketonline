import React from 'react';
import MenuUser from '../../components/UserParts/MenuUser/MenuUser';
import '../../views/PageUserData/PageUserData.css';
import FormUserData from '../../components/UserParts/FormUserData/FormUserData';
import { useContext} from 'react';
import { Context_User } from '../../contexts/Context_User.jsx';
import { useEffect} from "react";
import FormUserPassword from '../../components/UserParts/FormUserPassword/FormUserPassword.jsx';


function PageUserData() {

  useEffect(()=>{

    handlerUserGet(1);

  },[]);

  const {user,SetUser, userProducts, handlerUserGet, handlerUserPut} = useContext(Context_User);


  return (
    <div className='page'>
      <div className='header'>
        <MenuUser></MenuUser>
      </div>
      <div className='body'>
        <FormUserData user={user} SetUser={SetUser} handlerUserPut={handlerUserPut}></FormUserData>
        <FormUserPassword user={user} SetUser={SetUser} handlerUserPut={handlerUserPut}></FormUserPassword>






      </div>
    </div>
  )
}

export default PageUserData