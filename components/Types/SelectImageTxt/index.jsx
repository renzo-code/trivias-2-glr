import React, {useState, useMemo} from 'react'

import styled from 'styled-components'
import Options from './Options'
import { isEmpty } from 'ramda'

const SelectImageTxt = ({ 
  title, 
  typeImageText, 
  dataImg, 
  onClick, 
  index, 
  idQuestion, 
  answerPainted, 
  isCorrectResponse, 
  numIndex, 
  titleTrue 
}) => {
  // console.log('titleTrue', titleTrue)
  // console.log('numIndex', numIndex)
  // console.log('isCorrectRespomse', isCorrectResponse)

  const [ responseCorrect, setResponseCorrect ] = useState(null)
  const [ isExist, setIsExist ] = useState(false)

  useMemo(() => {
    if(numIndex === index){
      if(isCorrectResponse === true){
        setIsExist(true)
        setResponseCorrect(
          <ResponseTrue>
            Respuesta correcta.
          </ResponseTrue>
        )
      } 
      else {
        setIsExist(true)
        setResponseCorrect(
          <ResponseFalse>
            Respuesta incorrecta, la respuesta correcta es: {titleTrue}.
          </ResponseFalse>
        )
      }
    }
  }, [numIndex, index, isCorrectResponse, titleTrue])
  
  return (
    <Content id={`${index + 1}`}>
      <WrapperContent>
        <Title>{title}</Title>
        <WrapperImage>
          <Image src={dataImg?.path} alt='imagen' />
        </WrapperImage>
        <WrapperBtn>
          {
            !isEmpty(typeImageText) &&
            typeImageText?.map((item, i) => {
              return (
                <>
                  <Options
                    answerPainted={answerPainted}
                    idReponse={item?.idReponse}
                    key={i}
                    onClick={() => onClick(index, item, title, idQuestion, typeImageText)}
                    nameBtn={item?.text}
                    disabled={isExist}
                  />
                </>
              )
            })
          }
        </WrapperBtn>
      </WrapperContent>
      {responseCorrect}
    </Content>
  )
}

export default SelectImageTxt

const Content = styled.div`
  width: 90%;
  min-height: 400px;
  height: 100%;
  margin: 50px auto;
`
const WrapperContent = styled.div`
  height: 100%;
  margin: 30px auto;
`
const Title = styled.h1`
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin: 0 auto;
  letter-spacing: -0.2px;
  font-family: 'Roboto', sans-serif;
  &::after {
    display: block;
    content: "";
    height: 4px;
    width: 110px;
    background-color: #DB2237;
    margin: 5px auto 10px;
  }
`
const WrapperImage = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  width: auto;
  margin-bottom: 10px;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 5px;
`
const WrapperBtn = styled.div`
  display: flex;
  justify-content: space-around;
`
const ResponseFalse = styled.h1`
  color: white;
  width: 100%;
  font-size: 18px;
  font-style: oblique;
  text-align: center;
  border: solid 3px #D82239;
  padding: 10px;
  border-radius: 5px;
  background-color: #D82239;
`
const ResponseTrue = styled.h1`
  width: 100%;
  color: white;
  font-size: 18px;
  font-style: oblique;
  text-align: center;
  border: solid 3px green;
  padding: 10px;
  border-radius: 5px;
  background-color: green;
`