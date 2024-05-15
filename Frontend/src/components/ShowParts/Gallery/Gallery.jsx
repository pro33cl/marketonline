//----------------------------------------------------
// IMPORTANDO
//----------------------------------------------------

import React from 'react';
import Card from '../Card/Card.jsx';
import '../Gallery/Gallery.css';


function Gallery(props) {

    const type_card = "gallery_card";
    const {products_matrix} = props;

  return (
    <div className='container-cards'>
          {
            products_matrix.map((product)=>{
              return (
                      <div key={product.id} className='container-card'>
                        <Card type_card={type_card} product={product} ></Card>
                      </div>
                      );
            })           
          }
    </div>
  );
}

export default Gallery;