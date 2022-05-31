import React from 'react'

import styled from 'styled-components'

const Option = ({nameOption, imageLink, onClick, idReponse, answerPainted, disabled}) => {

  const res = answerPainted?.includes(idReponse) ? '#D82239': 'white'
  const resBor = answerPainted?.includes(idReponse) ? '3px solid #D82239;': '3px solid #BEBEBE;'
  const resCol = answerPainted?.includes(idReponse) ? 'white': 'black'

  return(
    <WrapperBtn
      disabled={disabled}
      onClick={onClick}
      backcolor={res}
      resBor={resBor}
      resCol={resCol}
    >
      <WrapperImage>
        <Img src={imageLink}/>
      </WrapperImage>
      <Title>{nameOption}</Title>
    </WrapperBtn>
  )
}

export default Option

const WrapperBtn = styled.button`
  height: auto;
  width: 250px;
  border-radius: 5px;
  /* border: solid 1px #BFBFBF; */
  border: ${({resBor}) => resBor};
  margin-bottom: 30px;
  transition: 0.4s;
  color: ${({resCol}) => resCol};
  background-color: ${({backcolor}) => backcolor};
  &:hover{
    background-color: #D82239;
    cursor: pointer;
    color: white;
    border: ${({resBor}) => resBor};
  }
  @media (max-width: 590px){
    width: 190px;
  }
  @media (max-width: 460px){
    width: 160px;
  }
`
const WrapperImage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 180px;
  @media (max-width: 590px){
    height: 120px;
  }
`
const Title = styled.h1`
  font-size: 17px;
  text-align: center;
  margin: 10px 0 13px;
`
const Img = styled.img`
  height: auto;
  width: auto;
`