import React from 'react'

import styled from 'styled-components'
import Button from '../../../Button'

const Option = ({ image, alt, nameBtn, onClick, idReponse, answerPainted, disabled }) => {
  return (
    <OptionTrivia>
      <WrapperImage>
        <Image src={image} alt={alt} />
      </WrapperImage>
      <Button
        disabled={disabled}
        answerPainted={answerPainted}
        idReponse={idReponse}
        onClick={onClick}
        nameBtn={nameBtn}
      />
    </OptionTrivia>
  )
}

export default Option

const OptionTrivia = styled.div`
  width: 230px;
  max-height: 300px;
  height: auto;
  /* background-color: green; */
  margin-bottom: 10px;
  @media (max-width: 810px){
    width: 188px;
  }
  @media (max-width: 410px){
    width: 160px;
  }
`
const WrapperImage = styled.div`
  width: 100%;
  height: 240px;
  /* background-color: peru; */
  border-radius: 5px;
  @media (max-width: 410px){
    height: auto;
  }
`
const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 295px;
  object-fit: cover;
  border-radius: 5px;
  object-position: top;

  @media (max-width: 810px){
    /* width: 85%; */
    max-height: 290px;
  }
  
  @media (max-width: 410px){
    /* width: 85%; */
    max-height: 190px;
  }
`