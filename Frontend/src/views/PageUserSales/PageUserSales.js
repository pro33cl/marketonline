import styled from "styled-components";

const DivPage = styled.div`
  
    display: grid;
    width : 100vw;
    grid-template-areas: 
    "header"
    "body-form"
    "body-table";
    gap: 0;
    grid-template-columns: 1fr;

     @media(min-width: 576px){
      
      grid-template-areas: 
      "header"
      "body-form" 
      "body-table";
       gap: 0;
       grid-template-columns: 1fr;
     }

     @media(min-width: 992px){

      grid-template-areas: 
      "header header"
      "body-form body-table";
      grid-template-columns: 1fr 1fr;

     }

  `;

  const DivHeader = styled.div`
    grid-area: header;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 4rem;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: gray;
  `;

  const DivBodyForm = styled.div`
    grid-area: body-form;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
  `;

  const DivBodyTable = styled.div`
    grid-area: body-table;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding: 1rem;
  `;

  export {DivPage, DivHeader, DivBodyForm, DivBodyTable};