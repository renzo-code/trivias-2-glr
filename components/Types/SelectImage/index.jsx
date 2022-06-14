import React, {useState, useMemo} from 'react'

import styled from 'styled-components'
import Option from './Option'
import { isEmpty } from 'ramda'

const SelectImage = ({ 
  title, 
  typetxtImageBox, 
  onClick, 
  index, 
  idQuestion, 
  answerPainted, 
  isCorrectResponse, 
  numIndex, 
  titleTrue 
}) => {

  const [ responseCorrect, setResponseCorrect ] = useState(null)
  const [ isExist, setIsExist ] = useState(false)

  useMemo (() => {
    if (numIndex === index) {
      if (isCorrectResponse === true) {
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
  }, [index, numIndex,titleTrue, isCorrectResponse])

  return (
    <Content id={`${index + 1}`}>
      <Title>{title}</Title>
      <WrapperOptions>
        {
          !isEmpty(typetxtImageBox) &&
          typetxtImageBox.map((item, i) => {
            return (
              <Option
                answerPainted={answerPainted}
                idReponse={item.idReponse}
                onClick={() => onClick(index, item, title, idQuestion, typetxtImageBox)}
                key={i}
                image={item?.multimedia?.path}
                alt={item?.multimedia?.data?.alt}
                nameBtn={item?.multimedia?.data?.title}
                selected={i}
                disabled={isExist}
              />
            )
          })
        }
      </WrapperOptions>
      {responseCorrect}
    </Content>
  )
}

export default SelectImage

const Content = styled.div`
  width: 90%;
  min-height: 400px;
  height: 100%;
  /* background-color: blue; */
  margin: 40px auto;
  @media (max-width: 580px){
    width: 98%;
  }
`
const Title = styled.h1`
  padding: 10px 0;
  font-size: 25px;
  text-align: center;
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
const WrapperOptions = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
  min-height: 350px;
  padding-top: 10px;
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