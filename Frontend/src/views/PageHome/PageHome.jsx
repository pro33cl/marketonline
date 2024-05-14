import React from 'react'
import Gallery from '../../components/ShowParts/Gallery/Gallery.jsx';
import { Context_Products } from '../../contexts/Context_Products.jsx';
import { useContext} from 'react';
import '../PageHome/PageHome.css';
import PagesIndex from '../../components/PageParts/PagesIndex/PagesIndex.jsx';
import Filter from '../../components/ShowParts/Filter/Filter.jsx';




function PageHome() {

  const receiving = useContext(Context_Products);

  const {
    
    matrixProducts,
    pagination,
    SetPagination, 
    totalPages,
    SetTotalPages,
    page,
    SetPage,
    handlerMatrixProductsGet
  
  } = receiving;

  
  console.log(matrixProducts);
  console.log("totalPages :"+totalPages);
  console.log("page :"+page);


  
  return (
    <div className='pagehome-body'>
      <div className='image-home'></div>
      <Filter pagination={pagination} SetPagination={SetPagination}></Filter>
      <Gallery products_matrix={matrixProducts}></Gallery>
      <PagesIndex totalPages={totalPages} page={page} SetPage={SetPage}></PagesIndex>
    </div>
  )
}

export default PageHome