import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const TopMenu = (props) => {

    const {countTotal} = props;
    const navigate = useNavigate();
    const [cartCount, SetCartCount] = useState("");

    useEffect(()=>{

      handlerCountTotal();
  
    },[countTotal]);


    const handlerNavbar= function(e){
        switch (e.target.id) {
          case "home":
            navigate("/products");
            break;
          case "cart":
            navigate("/products/cart");
          break;
          case "user":
            navigate("/products/user/data");
          break;
          case "login":
            navigate("/products/login");
          break;
          case "register":
            navigate("/products/register");
          break;
        }
      }

      const handlerCountTotal = function(){

        if(!isNaN(countTotal)){
          if(countTotal == 0){
            SetCartCount("");
          }else{
            SetCartCount(`(${countTotal})`);
          } 
        }else{
          SetCartCount("");
        }
      }


  return (
    
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" style={{width:"100%"}} className='m-0 p-3'>
      <Container>
        <Navbar.Brand href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-seam-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"/>
            </svg>
            {' '}
            Market Clothes
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handlerNavbar} id='home'>Home</Nav.Link>
            <Nav.Link onClick={handlerNavbar} id='login'>Login</Nav.Link>
            <Nav.Link onClick={handlerNavbar} id='cart'>
              {`Carrito ${cartCount}`}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopMenu