import React, {useState, useMemo} from 'react'

import styled from 'styled-components'
import Option from './Option'
import { isEmpty } from 'ramda'

const SelectText = ({
  title, 
  typeTxt, 
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

  return(
    <Content id={`${index + 1}`}>
      <Title>{title}</Title>
      <WrapperOptions>
      {
        !isEmpty(typeTxt) &&
        typeTxt?.map((item, i) => {
          return(
            <>
              <Option
                answerPainted={answerPainted}
                idReponse={item?.idReponse}
                key={i}
                onClick={() => onClick(index, item, title, idQuestion, typeTxt)}
                nameBtn={item?.text}
                disabled={isExist}
              />
            </>
          )
        })
      }
      </WrapperOptions>
      {responseCorrect}
    </Content>
  )
}

export default SelectText

const Content = styled.div`
  width: 90%;
  min-height: 200px;
  height: auto;
  /* background-color: blue; */
  margin: 20px auto;
`
const WrapperOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-bottom: 40px;
`
const Title = styled.h1`
  width: 70%;
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