import React from 'react';
import Button from 'react-bootstrap/Button';
import '../TableCart/TableCart.css';
import { useNavigate } from 'react-router-dom';

const CartTable = (props) => {

    const {cartTable, valorTotal, handlerCartTablePostProduct, handlerCartTablePutCount, handlerCartTableDeleteProduct, handlerCartTableIfExistProduct, handlerCartTableGetProduct, formatMoney} = props;
    const navigate = useNavigate();

    
    const handlerButtonMore = function(id){
        console.log("apretaste el boton + del elemento:"+id)
        const delta = 1;
        const product_count = handlerCartTableGetProduct(id).count;
        handlerCartTablePutCount(delta, true, id);
    };


    const handlerButtonLess = function(id){
        console.log("apretaste el boton - del elemento:"+id)
        const delta = 1;
        const product_count = handlerCartTableGetProduct(id).count;
        if(product_count-1 < 0){
            handlerCartTableDeleteProduct(id);
        }
        else{
            handlerCartTablePutCount(delta, false, id);
        }  
    };


    const handlerButtonDelete = function(id){
        console.log("apretaste el boton borrar del elemento:"+id)
        handlerCartTableDeleteProduct(id);
    }



    
  return (
    <div>
        <div className='cart-table-header'>
            <h3 className='cart-table-header-h3'>Detalles del Pedido:</h3>
        </div>
        <div className='cart-table-body'>
            {cartTable.map((element)=>{
                return (
                    <div className='cart-table-row' key={element.id}>
                        <div className='cart-table-row-name'>
                            <p className='cart-table-row-p'>{element.name}</p>
                        </div>
                        <div className='cart-table-row-numbers'>
                            <p className='cart-table-row-p2'>${formatMoney(element.price*element.count,"CLP")}</p>
                            <Button className='cart-table-button' variant="secondary" onClick={()=>{handlerButtonLess(element.id)}}>-</Button>
                            <p className='cart-table-row-p3'>{element.count}</p>
                            <Button className='cart-table-button' variant="secondary" onClick={()=>{handlerButtonMore(element.id)}}>+</Button>
                            <Button className='cart-table-button' variant="dark" onClick={()=>{handlerButtonDelete(element.id)}}>Eliminar</Button>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className='card-table-footer'>
            <h2 className='card-table-footer-h2'>Total: ${formatMoney(valorTotal,"CLP")}</h2>
            <Button className='cart-table-footer-button' variant="dark" onClick={()=>{navigate("/products/cart/result")}}>Ir a Pagar</Button>
        </div>
    </div>
  )
}

export default CartTable;