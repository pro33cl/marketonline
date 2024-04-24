import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function MenuUser() {

    const navigate = useNavigate();


  return (

        <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={()=>navigate("/products/user/data")}>Usuario</Button>
            <Button variant="secondary" onClick={()=>navigate("/products/user/sales")}>Ventas</Button>
        </ButtonGroup>
    
  )
}

export default MenuUser