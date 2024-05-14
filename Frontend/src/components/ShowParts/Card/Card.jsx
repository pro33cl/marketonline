//----------------------------------------------------
// IMPORTANDO
//----------------------------------------------------

import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import '../Card/Card.css';
import { Context_Cart } from '../../../contexts/Context_Cart';


function Card(props) {

    //----------------------------------------------------
    // DECLARACIÓN DE VARIABLES Y HOOKS
    //----------------------------------------------------

    /*
    type_card = {"gallery_card", "detail_card"}
    product = {id, image, name, price, evaluation, description, seller}
    */


    const {type_card, product} = props;
    const {id, image, name, price, evaluation, description, seller} = product;
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



    const count_initial = function(){
        if(handlerCartTableIfExistProduct(id)){
            return handlerCartTableGetProduct(id).count;
        }
        else{
            return 0;
        }
    };
  
    const [count, SetCount] = useState(count_initial());
    const navigate = useNavigate();

    //----------------------------------------------------
    // FUNCIONES Y HANDLERS
    //----------------------------------------------------

    const handlerButtonMore = function(){
        const delta = 1;
        const newCount = count + delta;
        SetCount(newCount);
        handlerCartTablePutCount(delta, true, id);
    };


    const handlerButtonLess = function(){
        const delta = 1;
        const newCount = count - delta;
        if(newCount < 0){
            SetCount(0);
        }
        else{
            SetCount(newCount);
            handlerCartTablePutCount(delta, false, id);
        }
    };


    const handlerButtonDetail = function(id){
        navigate(`/products/${id}`);
    };


    const handlerButtonAdd = function(){
        console.log("boton agregar apretado");
        let count_formated;
        if(count<=0){
            count_formated = 1;
        }
        else{
            count_formated = count;
        }
        if(handlerCartTableIfExistProduct(id) == false){
            console.log("opcion 1: no existe producto en carrito y se agrega");
            handlerCartTablePostProduct({id: id, name: name, price: price, count: count_formated});
            SetCount(count_formated);
        }
        else{
            console.log("opcion 2: existe producto en carrito y no se agrega");
            return ;
        }
        console.log(cartTable);
    };


    const handlerButtonDelete = function(){
        if(handlerCartTableIfExistProduct(id) == false){
            return ;
        }
        else{
            handlerCartTableDeleteProduct(id);
            SetCount(0);
        }
    };

    //----------------------------------------------------
    // RETURN
    //----------------------------------------------------

    return (
        <div className='card'>
            <div className='card-header'>
                <div className='card-header-image' style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            <div className='card-body'>
                <div className='card-body-header'>
                    <div className='card-body-title'>
                        <h3 className='txt-title'>{name}</h3>
                    </div>
                    <div className='card-body-calification'>
                            <p className='txt-normal'>evaluación: {evaluation}</p>
                            {type_card == "detail_card"?<p className='txt-normal'>Vendedor: {seller}</p>:null}
                    </div>
                </div>
                <div className='card-body-description'>
                    {type_card == "detail_card"?<p className='txt-normal'>{description}</p>:null}
                </div>
                <div className='card-body-price'>
                    <p className='txt-normal-bold'>{price}</p>
                </div>
            </div>
            <div className='card-footer'>
                <div className='card-footer-counts'>
                    <p className='txt-normal'>{count}</p>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={handlerButtonMore}>+</Button>
                        <Button variant="secondary" onClick={handlerButtonLess}>-</Button>
                    </ButtonGroup>
                </div>
                <div className='card-footer-buttons'>
                    {type_card == "gallery_card"?<Button variant="primary" onClick={()=>{handlerButtonDetail(id)}}>Más...</Button>:null}
                    {count > 0?<Button variant="primary" onClick={handlerButtonDelete}>Eliminar</Button>:null}
                    <Button variant="primary" onClick={handlerButtonAdd}>Agregar</Button>
                </div>
            </div>
        </div>
    )
};

//----------------------------------------------------
// EXPORTANDO
//----------------------------------------------------

export default Card;