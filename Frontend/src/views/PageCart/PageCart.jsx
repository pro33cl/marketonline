import React from 'react'
import '../PageCart/PageCart.css';
import { Context_Cart } from '../../contexts/Context_Cart';
import { useContext} from 'react';
import CartTable from '../../components/CartParts/TableCart/TableCart';

function PageCart() {

  const receiving = useContext(Context_Cart);


  const {

    cartTable, 
    valorTotal,
    countTotal, 
    handlerCartTablePostProduct, 
    handlerCartTablePutCount, 
    handlerCartTableDeleteProduct, 
    handlerCartTableIfExistProduct, 
    handlerCartTableGetProduct, 
    formatMoney

  } = receiving;


  return (
    <div className='cart' style={{width:"100%", padding: "1rem"}}>
      <CartTable cartTable={cartTable} valorTotal={valorTotal} handlerCartTablePostProduct={handlerCartTablePostProduct} handlerCartTableDeleteProduct={handlerCartTableDeleteProduct} handlerCartTablePutCount={handlerCartTablePutCount}  handlerCartTableIfExistProduct={handlerCartTableIfExistProduct} handlerCartTableGetProduct={handlerCartTableIfExistProduct}  formatMoney={formatMoney}></CartTable>
    </div>
  )
}

export default PageCart