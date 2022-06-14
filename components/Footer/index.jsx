import React from 'react'

import styled from 'styled-components'

const Footer = () => {
  return(
    <Content>
      <Wrapper>
        <Tip>Fecha de última modificación:</Tip><Text> 06 de Junio de 2022</Text>
      </Wrapper>
      <br></br><br></br>
      <Wrapper>
        <Tip>Texto:</Tip><Text>Cine y Series LR</Text>
      </Wrapper>
      <Wrapper>
        <Tip>Desarrollo Web:</Tip><Text>Renzo Neira</Text>
      </Wrapper>
      <br></br><br></br>
      <Text>© Grupo La República</Text>
      <Text>Todos los derechos reservados.</Text>
      <br></br><br></br>  
    </Content>
  )
}

export default Footer

const Content = styled.div`
  height: auto;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0 0;
  background-color: #F3F3F3;
`
const Tip = styled.h2`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
`
const Text = styled.h2`
  text-align: center;
  font-size: 15px;
  font-weight: 100;
  padding-left: 5px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`