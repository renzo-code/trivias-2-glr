import React from 'react'

import styled from 'styled-components'

const BtnConfirmed = (onClick) => {
  return (
    <Wrapper>
      <ButtonConf onClick={onClick}>
        <TitleBtn>Confirmar Respuesta</TitleBtn>
      </ButtonConf>
    </Wrapper>
  )
}

export default BtnConfirmed

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const ButtonConf = styled.button`
  height: 50px;
  width: 270px;
  border: 3px solid #BEBEBE;
  border-radius: 3px;
  cursor: pointer;
  font-style: oblique;
  &:hover {
    background-color: #D82239;
    color: white;
    transition: 0.4s;
  }
  `
const TitleBtn = styled.h2`
  font-size: 18px;
`