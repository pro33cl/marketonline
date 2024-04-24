import React, { createContext, useState } from 'react';



export const Context_Cart = createContext();


const Context_Cart_Provider = ({children}) =>{

    const [cartTable, SetCartTable] = useState([]);
    const [valorTotal, SetValorTotal] = useState(0);

    const handlerCartTableRefresh = function(cartTable_actual){
        SetCartTable(cartTable_actual);
        let total = 0;
        cartTable_actual.forEach((element)=>{
            total += element.price_total;
        });
        SetValorTotal(total);
        console.log("cartTable actualizado");
        console.log(cartTable);
        console.log("valorTotal actualizado");
        console.log(valorTotal);
    }

    const handlerCartTablePostProduct = function(product){
        let cartTable_copy = [];
        const {id, name, price, count} = product;
        const price_total = count*price;
        const product_formated = {id: id, name: name, price: price, count: count, price_total: price_total};
        cartTable_copy = JSON.parse(JSON.stringify(cartTable));
        cartTable_copy.push(product_formated);
        console.log("despues de agregar producto a la copia: ");
        console.log(cartTable_copy);
        console.log("cartTable: ");
        console.log(cartTable);
        handlerCartTableRefresh(cartTable_copy);
    };

    const handlerCartTablePutCount = function(delta,addition,id){
        let cartTable_copy = [];
        cartTable_copy = JSON.parse(JSON.stringify(cartTable));
        const index = FindIndexById(cartTable_copy,id);
        if(addition == true){
            cartTable_copy[index].count += delta;
        }
        else{
            cartTable_copy[index].count -= delta;
        }
        cartTable_copy[index].price_total = cartTable_copy[index].count*cartTable_copy[index].price;

        handlerCartTableRefresh(cartTable_copy);
    };
    

    const handlerCartTableDeleteProduct = function(id){
        let cartTable_copy = [];
        cartTable_copy = JSON.parse(JSON.stringify(cartTable));
        const index = FindIndexById(cartTable_copy,id);
        cartTable_copy.splice(index,1);
        handlerCartTableRefresh(cartTable_copy);
    };

    const handlerCartTableIfExistProduct = function(id){
        const index = FindIndexById(cartTable,id);
        if(cartTable[index]){
            return true;
        }
        else{
            return false;
        }
    };

    const handlerCartTableGetProduct = function(id){
        const index = FindIndexById(cartTable,id);
        return cartTable[index];
    };

    const FindIndexById = function(matrix, id){
        let index;
        matrix.forEach((element,i)=>{
            if(element.id == id){
                index = i;
            }
        });
        return index;
    }

    const formatMoney=function(value_money,string_currency){
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${string_currency}` }).format(value_money,);
    }


    return (
        <Context_Cart.Provider value={{cartTable, valorTotal, handlerCartTablePostProduct, handlerCartTablePutCount, handlerCartTableDeleteProduct, handlerCartTableIfExistProduct, handlerCartTableGetProduct, formatMoney}}>
            {children}
        </Context_Cart.Provider>
      );

};


export default Context_Cart_Provider;