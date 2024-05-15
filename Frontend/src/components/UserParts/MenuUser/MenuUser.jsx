import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import { useEffect} from "react";

function MenuUser(props) {

  const {pageUser, handlerPage} = props;
  const navigate = useNavigate();

  const handlerSelect = function(k){

    const routeNavigate = handlerPage(k);
    navigate(routeNavigate);
  }
    
  return (
    <div>
        {/*
        <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={()=>navigate("/products/user/data")}>Usuario</Button>
            <Button variant="secondary" onClick={()=>navigate("/products/user/sales")}>Ventas</Button>
        </ButtonGroup>
        */}

        <Tabs id="controlled-tab-example" activeKey={pageUser} onSelect={handlerSelect} className="mb-3">
          <Tab eventKey="user" title="Usuario"></Tab>
          <Tab eventKey="usersales" title="Ventas"></Tab>
        </Tabs>

    </div>    
  )
}

export default MenuUser