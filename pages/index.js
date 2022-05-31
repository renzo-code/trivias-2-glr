
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import WithHome from 'hoc/withHome'
import Layout from 'layout'

import styled from 'styled-components'
import { path, prop, isEmpty, clone } from 'ramda'
import { v4 as uuid } from 'uuid'
import { useMutation } from '@apollo/client'
import { SEND_RESPONSE_DATA } from 'graphql/mutation'

import SelectImage from 'components/Types/SelectImage'
import SelectText from 'components/Types/SelectText'
import SelectImageTxt from 'components/Types/SelectImageTxt'
import SelectOptions from 'components/Types/SelectOptions'
import SelectVideos from 'components/Types/SelectVideos'
import { IMAGE_TEXT, IMAGE_TEXT_BOX, TEXT, VIDEO, IMAGE } from 'const'
import YourSelection from 'components/YourSelection'

const Home = ({ dataGet, dataShow }) => {
  const titlePrincipal = prop("body", prop("data", path("0", prop("get", dataGet))))
  const imagePrincipal = prop("path", prop("multimedia", prop("data", path("0", prop("get", dataGet)))))
  const idTypeTrivia = prop("_id", path("0", prop("get", dataGet)))
  const countTrivias = prop("count", prop("questions", path("0", prop("get", dataGet))))
  
  const Array = prop("items", prop("questions", prop("show", dataShow)))

  const [ arrYourSelection, setArrYourSelection ] = useState([])
  const [ arrayTrivias, setArrayTrivias ] = useState([])
  const [ arrDataQuestions, setArrDataQuestions ] = useState([])

  const [ isCorrectResponse, setIsCorrectResponse ] = useState(null)
  const [ numIndex, setNumIndex ] = useState(null)
  const [ titleTrue, setTitleTrue ] = useState(null)
  // const [addTodo, { data, error }] = useMutation(SEND_RESPONSE_DATA)
  // console.log('datadatadata', data)
  
  useEffect(() => {
    setArrayTrivias(Array?.map((items) => ({
      ...items,
      options: {
        ...items.options,
        items: items.options.items.map((elements) => ({
          ...elements,
          idReponse: uuid(),
        }))
      }
    })))
  }, [dataShow, Array]) 

  const containerStyleFondo = {
    backgroundImage: `url(${imagePrincipal})`,
    // padding: "400px 100px",
    textAlign: "center",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative"
  }


  const captureData = (index, arr, nameQuestion, idQuestion, typetxtImageBox) => {
  captureOptionBox(index, arr, typetxtImageBox)

    let objYourSelection = {
      'indexTrivia': index,
      'idReponse': arr.idReponse,
      'title': arr?.text,
      selected: true,
      'question': nameQuestion
    }
    if (isEmpty(arrYourSelection)){
      setArrYourSelection([...arrYourSelection, objYourSelection])
      return
    }

    let existObject = false
    const copyArrYourSelection = clone(arrYourSelection)
        
    arrYourSelection.forEach((item, i) => {
      if(item?.indexTrivia === index){
        existObject = true
        copyArrYourSelection.splice(i, 1)
        setArrYourSelection([...copyArrYourSelection, objYourSelection])
      }
    })
    if (existObject) return
    setArrYourSelection([...arrYourSelection, objYourSelection])
  }


  const captureOptionBox = (index, arr, typetxtImageBox) => {
    console.log('2',arr)
    // console.log('3', index)
    
    const result = typetxtImageBox?.filter(typetxtImageBox => typetxtImageBox?.answer === true) 
    result?.forEach((item, i) => {
      setTitleTrue(item?.text)
    })
    if(arr?.answer === true){
      setIsCorrectResponse(true)
      setNumIndex(index)
      console.log('Respuesta Correcta!!!!', isCorrectResponse)
    } else {
      setIsCorrectResponse(false)
      setNumIndex(index)
      console.log('Respuesta incorrecta!!!!', isCorrectResponse)
    }
  }


  const answerPainted = useMemo(() => {
    return arrYourSelection.map(({ idReponse }) => {
      return idReponse
    })
  }, [arrYourSelection])
  

  const typeComponent = {
    [VIDEO]: (item, i) => <SelectVideos
              key={i}
              idQuestion={item?._id}
              onClick={captureData}
              index={i}
              title={item?.title}
              typeVideo={item?.options?.items}
              answerPainted={answerPainted}
              isCorrectResponse={isCorrectResponse}
              numIndex={numIndex}
              titleTrue={titleTrue}
            />,
    [IMAGE_TEXT]: (item, i) => <SelectImageTxt
                    key={i}
                    idQuestion={item?._id}
                    onClick={captureData}
                    index={i}
                    title={item.title}
                    typeImageText={item?.options?.items}
                    dataImg={item?.data?.multimedia}
                    answerPainted={answerPainted}
                    isCorrectResponse={isCorrectResponse}
                    numIndex={numIndex}
                    titleTrue={titleTrue}
                  />,
    [TEXT]: (item, i) => <SelectText
              key={i}
              idQuestion={item?._id}
              onClick={captureData}
              index={i}
              title={item?.title}
              typeTxt={item?.options?.items}
              answerPainted={answerPainted}
              isCorrectResponse={isCorrectResponse}
              numIndex={numIndex}
              titleTrue={titleTrue}
            />,
    [IMAGE_TEXT_BOX]: (item, i) => <SelectImage
                        key={i}
                        idQuestion={item?._id}
                        onClick={captureData}
                        index={i}
                        title={item?.title}
                        typetxtImageBox={item?.options?.items}
                        answerPainted={answerPainted}
                        isCorrectResponse={isCorrectResponse}
                        numIndex={numIndex}
                        titleTrue={titleTrue}
                      />,
    [IMAGE]: (item, i) => <SelectOptions
                        key={i}
                        idQuestion={item?._id}
                        onClick={captureData}
                        index={i}
                        title={item?.title}
                        typeImage={item?.options?.items}
                        answerPainted={answerPainted}
                        isCorrectResponse={isCorrectResponse}
                        numIndex={numIndex}
                        titleTrue={titleTrue}
                      />
  }

  // const DeleteResponse = (iTrivia) => {
  //   const clonArrYourSelection = clone(arrYourSelection)
  //   arrYourSelection?.forEach((item, i) => {
  //     if (iTrivia === item?.indexTrivia){
  //       clonArrYourSelection.splice(i, 1)
  //       setArrYourSelection([...clonArrYourSelection])
  //     }
  //   })
  // }

  // const SendResponse = () => {
  //   let formatJson =
  //   {
  //     "input": {
  //       "site": {
  //         "_id": "larepublica"
  //       },
  //       "_id": idTypeTrivia.toString(),
  //       "questions": arrDataQuestions
  //     }
  //   }

  //   // let finalyJson = JSON.stringify(formatJson)
  //   if (error) return `Error de envio ${error.message}`
  //   console.log('formatJson', formatJson)
  //   addTodo({ variables: { formatJson } })
  //   console.log('formatJson: ', formatJson);
  // }
  // console.log('arrDataQuestions: ', arrDataQuestions);
  return(
    <Layout>
      {/* <ViewHome
        dataShow={dataShow} dataGet={dataGet}
      /> */}
      <div id='fondo' className='fondo' style={containerStyleFondo}>
        <h2 className='title-principal'>{titlePrincipal}</h2>
      </div>

      {
        !isEmpty(arrayTrivias) &&
        arrayTrivias?.map((item, i) => {
          {/* console.log('itemmm', item?._id) */}
          return (
            <>{typeComponent[item?.options?.type](item, i)}</>
          )
        })
      }

      {/* <YourSelection
        onClick={DeleteResponse}
        arrayResponse={arrYourSelection ? arrYourSelection : {}}
      />
      
      {
        !isEmpty(arrYourSelection) &&
          <ButtonSend
            onClick={SendResponse}
          >
            Confirmar respuestas
          </ButtonSend>
      } */}

      <style jsx>{`
        .fondo{
          padding: 400px 100px;
        }
        .fondo:before{
          content:'';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0,0,0,.48);
        }
        .title-principal{
          position: absolute;
          width: 93%;
          bottom: 20%;
          left: 3%;
          color: #fff;
          font-family: Lato, sans-serif;
          font-size: 40px;
          font-weight: 800;
          text-transform: uppercase;
          text-align: start;
          text-shadow: rgb(0, 0, 0) 0px 0px 0.2em, rgb(0, 0, 0) 0px 0px 0.2em, rgb(0, 0, 0) 0px 0px 0.2em;
        }
        .img-principal{
          height: 100%;
          width: 100%;
        }
        @media (max-width: 950px){
          .fondo{
            padding: 300px 100px;
          }
          .title-principal{
            font-size: 30px;
          }
        }
        @media (max-width: 620px){
          .fondo{
            padding: 200px 100px;
          }
          .title-principal{
            font-size: 25px;
          }
        }
      `}</style>
    </Layout>
  )
}

export default WithHome(Home)

const ButtonSend = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 55px;
  height: auto;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  outline: none;
  border: 3px solid #BEBEBE;
  max-width: 230px;
  margin: 40px auto 0;
  &&:hover{
    background-color: #D82239;
    color: white;
    cursor: pointer;
    border: 3px solid #D82239;
  }
`