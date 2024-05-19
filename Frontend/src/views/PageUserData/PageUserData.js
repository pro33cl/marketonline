import styled from "styled-components";

const DivPage = styled.div`
  
    display: grid;
    width : 100vw;
    grid-template-areas: 
    "header"
    "body-data"
    "body-password";
    gap: 0;
    grid-template-columns: 1fr;

     @media(min-width: 576px){
      
      grid-template-areas: 
      "header"
      "body-data" 
      "body-password";
       gap: 0;
       grid-template-columns: 1fr;
     }

     @media(min-width: 992px){

      grid-template-areas: 
      "header header"
      "body-data body-password";
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

  const DivBodyData = styled.div`
    grid-area: body-data;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: auto;
  `;

  const DivBodyPassword = styled.div`
    grid-area: body-password;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: auto;
  `;

  export {DivPage, DivHeader, DivBodyData, DivBodyPassword};