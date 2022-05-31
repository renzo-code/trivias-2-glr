import React from 'react'

import styled from 'styled-components'

const Button = ({nameBtn, onClick, idReponse, answerPainted, disabled }) => {

  const res = answerPainted?.includes(idReponse) ? '#D82239': 'white'
  const resBor = answerPainted?.includes(idReponse) ? '3px solid #D82239;': '3px solid #BEBEBE;'
  const resCol = answerPainted?.includes(idReponse) ? 'white': 'black'

  return(
    <Btn
      // style={{ backgroundColor: res, color: "black", border: resBor }}
      backcolor={res}
      resBor={resBor}
      resCol={resCol}
      id={idReponse}
      onClick={onClick}
      disabled={disabled}
    >
      {nameBtn}
    </Btn>
  )
}

export default Button

const Btn = styled.button`
  min-height: 55px;
  height: auto;
  width: 100%;
  /* margin-top: 40px; */
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  /* color: black; */
  color: ${({resCol}) => resCol};
  outline: none;
  /* border: 3px solid #BEBEBE; */
  border: ${({resBor}) => resBor};
  max-width: 230px;
  background-color: ${({backcolor}) => backcolor};
  &&:hover{
    background-color: #D82239;
    color: white;
    cursor: pointer;
    transition: 0.4s;
    border: ${({resBor}) => resBor};
  }
  @media (max-width: 810px){
    max-width: 197px;
    font-size: 16px;
    min-height: 50px;
  }
  @media (max-width: 410px){
    font-size: 14px;
    min-height: 45px;
  }
`