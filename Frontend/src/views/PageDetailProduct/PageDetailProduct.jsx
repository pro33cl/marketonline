import React from 'react';
import { useContext} from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/ShowParts/Card/Card.jsx';
import { Context_Products } from '../../contexts/Context_Products.jsx';

function PageDetailProduct() {

  const {matrixProducts, matrixImagesProducts, pagination, SetPagination, totalPages, SetTotalPages} = useContext(Context_Products);
  console.log(matrixProducts);

  const {id} = useParams();
  console.log(id);
  const type_card = "detail_card";
  let product;

  const productFind = function(id){
    matrixProducts.forEach((element,i)=>{
      if(element.id == id){
        product = element;
      }
    });
  }
 
  productFind(id);
  
  return (
    <div>
      <Card type_card={type_card} product={product}></Card>
    </div>
  )
}

export default PageDetailProduct