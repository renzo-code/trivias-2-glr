import React from 'react'
import styled from 'styled-components'

const OptionResponse = ({nameBtn, onClick, nPregunta, question}) => {
  return(
    <>
      <Btn
        onClick={onClick}
      >
        <a style={{color: 'black', width: 'auto'}} href={`#${nPregunta}`}>
          <TitleButton>{question}</TitleButton>
          <br></br>
          <TitleResponse>
            {nameBtn}
          </TitleResponse>
        </a>
      </Btn>
    </>
  )
}

export default OptionResponse


const Btn = styled.div`
  height: auto;
  width: 100%;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  outline: none;
  border: 3px solid #BEBEBE;
  max-width: 230px;
  padding: 5px;
  text-align: center;
  margin-left: 10px;
  &&:hover{
    background-color: #D82239;
    color: white;
    cursor: pointer;
    border: 3px solid #D82239;
  }
`
const TitleButton = styled.h2`
  font-size: 18px;
  text-align: center;
  height: auto;
`
const TitleResponse = styled.h2`
  font-weight: 100;
  @media (max-width: 500px){
    
  }
`