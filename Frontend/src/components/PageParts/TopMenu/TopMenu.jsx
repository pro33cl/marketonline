import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const TopMenu = () => {

    const navigate = useNavigate();

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


  return (
    
    <Navbar expand="lg" bg="secondary" data-bs-theme="dark" style={{width:"100%"}} className='m-0 p-3'>
      <Container>
        <Navbar.Brand href="#">
            <img
              alt=""
              src="../public/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Market Online
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handlerNavbar} id='home'>Home</Nav.Link>
            <Nav.Link onClick={handlerNavbar} id='cart'>Carro</Nav.Link>
            <Nav.Link onClick={handlerNavbar} id='login'>Login</Nav.Link>
            <Nav.Link onClick={handlerNavbar} id='register'>Registrar</Nav.Link>
            <Nav.Link onClick={handlerNavbar} id='user'>Usuario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopMenu