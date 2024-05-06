import React from 'react'
import Gallery from '../../components/ShowParts/Gallery/Gallery.jsx';
import { Context_Products } from '../../contexts/Context_Products.jsx';
import { useContext} from 'react';
import '../PageHome/PageHome.css';


function PageHome() {

 
  const {matrixProducts, matrixImagesProducts, pagination, SetPagination, totalPages, SetTotalPages} = useContext(Context_Products);

  console.log(matrixProducts);
  
  return (
    <div className='pagehome-body'>
      <div className='image-home'></div>
      <Gallery products_matrix={matrixProducts} images_matrix={matrixImagesProducts}></Gallery>
    </div>
  )
}

export default PageHome