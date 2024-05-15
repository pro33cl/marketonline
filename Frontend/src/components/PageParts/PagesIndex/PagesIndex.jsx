import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';



function PagesIndex(props) {

    const {totalPages, page, SetPage} = props;
    let items = [];

    const pageRange = 5; // Tiene que ser numero impar
    const pageRangeHalf = (pageRange-1)/2;
    
    const handlerClick = function(e){

        SetPage(e.target.id);
    }

    const handlerIndex = function(){

        const total = totalPages;
        const pageActive = page;
        let pageActiveLessRange = pageActive - pageRangeHalf;
        let pageActivePlusRange;
        let pageInit;
        let pageFinal;

        if(pageRange <= total){

            if(pageActiveLessRange <= 0){
    
                pageInit = 1;
                pageActivePlusRange = pageActive + pageRangeHalf*2;
            }
            else if( pageActiveLessRange >= 1){
        
                pageInit = pageActiveLessRange;
                pageActivePlusRange = pageActive + pageRangeHalf;
            }
        
            if(pageActivePlusRange > total){
        
                pageFinal = total;
            }
            else if(pageActivePlusRange <= total){
        
                pageFinal = pageActivePlusRange;
            }
        
            if(pageFinal - pageInit >= pageRange - 1){
        
                if(pageInit + (pageRange - 1) <= total){
        
                    pageFinal = pageInit + (pageRange - 1);
                }
            }
            else if(pageFinal - pageInit < pageRange - 1){
        
                if(pageFinal - (pageRange - 1) >= 1){
        
                    pageInit = pageFinal - (pageRange - 1);
                }
            }
        }
        else if(pageRange > total){
    
            pageInit = 1;
            pageFinal = total;
    
        }

        for (let number = pageInit; number <= pageFinal; number++) {
            
            items.push(
                number == pageActive?
                <Pagination.Item key={number} id={number} onClick={handlerClick} active>
                    {number}
                </Pagination.Item>
                :
                <Pagination.Item key={number} id={number} onClick={handlerClick}>
                    {number}
                </Pagination.Item>
            );
        }
    }

    handlerIndex();

    return (

    <Pagination size="sm" >
        {items}
    </Pagination>
  );
}

export default PagesIndex