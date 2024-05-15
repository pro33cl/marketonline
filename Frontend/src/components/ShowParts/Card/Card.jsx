//----------------------------------------------------
// IMPORTANDO
//----------------------------------------------------

import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        if(newCount <= 0){

            if(handlerCartTableIfExistProduct(id) == false){
                return ;
            }
            else{
                handlerCartTableDeleteProduct(id);
                SetCount(0);
            }
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
        console.log("Count antes:"+count);
        let count_formated;
        if(count<=0){
            count_formated = 1;
        }
        else{
            count_formated = count;
        }
        console.log("Count despues:"+count);
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
        <div className='card border-dark' style={type_card == "detail_card"? {width:"100%", borderStyle: "none"} : {width: "18rem", borderStyle: "solid" }}>
            
            <div className='card-header bg-transparent' onClick={()=>{handlerButtonDetail(id)}} 
                style={type_card == "detail_card"? 
                {width: "100%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start"}:
                {width: "100%",  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                
                <div className='card-header-image' style={type_card == "detail_card"? { width: "19rem", height:"14.25rem", backgroundImage: `url(${image})`}:{ width:"17rem", height:"12.75rem", backgroundImage: `url(${image})`}}></div>
            
            </div>
            <div className='card-body' style={type_card == "detail_card"? {height: "auto"} : {height: "5rem"} } onClick={()=>{handlerButtonDetail(id)}}>
                <div className='card-body-header'>
                    <div className='card-body-title' style={type_card == "detail_card"?
                        {width: "100%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start"} : 
                        {width: "100%",  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        
                        <h4>{name}</h4>
                    </div>
                </div>
                <div className='card-body-description'>
                    {type_card == "detail_card"?<p className='fs-6 text-start'>{description}</p>:null}
                </div>
                <div className='card-body-price'>
                    <p className='fs-6 fw-bold text-secondary'>Precio : ${price}</p>
                </div>
            </div>
            <div className='card-footer bg-transparent'>
                <div className='card-footer-counts'>
                    <p className='fs-6 text-secondary'>Cantidad : {count}</p>
                    <ButtonGroup aria-label="Basic example">
                        {count > 0? <Button className="card-btn-plusless" variant="secondary" size='sm' onClick={handlerButtonMore}>+</Button> :null}
                        {count > 0? <Button className="card-btn-plusless" variant="secondary" size='sm' onClick={handlerButtonLess}>-</Button> :null}
                    </ButtonGroup>
                </div>
                <div className='card-footer-buttons'>
                    {count > 0?<Button className="card-btn" variant="dark" onClick={handlerButtonDelete}>Eliminar</Button>:null}
                    <Button className="card-btn" variant="dark" onClick={handlerButtonAdd}>Agregar</Button>
                </div>
            </div>
        </div>
    )
};

//----------------------------------------------------
// EXPORTANDO
//----------------------------------------------------

export default Card;