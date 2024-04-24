import React from 'react'
import '../PageCart/PageCart.css';
import { Context_Cart } from '../../contexts/Context_Cart';
import { useContext} from 'react';
import CartTable from '../../components/CartParts/TableCart/TableCart';

function PageCart() {

  const {cartTable, valorTotal, handlerCartTablePostProduct, handlerCartTablePutCount, handlerCartTableDeleteProduct, handlerCartTableIfExistProduct, handlerCartTableGetProduct, formatMoney} = useContext(Context_Cart);

  return (
    <div className='cart'>
      <CartTable cartTable={cartTable} valorTotal={valorTotal} handlerCartTablePostProduct={handlerCartTablePostProduct} handlerCartTableDeleteProduct={handlerCartTableDeleteProduct} handlerCartTablePutCount={handlerCartTablePutCount}  handlerCartTableIfExistProduct={handlerCartTableIfExistProduct} handlerCartTableGetProduct={handlerCartTableIfExistProduct}  formatMoney={formatMoney}></CartTable>
    </div>
  )
}

export default PageCart