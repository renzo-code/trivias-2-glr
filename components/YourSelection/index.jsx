import React from "react";

import styled from "styled-components";
import OptionResponse from "./Option";
import { isEmpty } from "ramda";

const YourSelection = ({ arrayResponse, onClick }) => {
  return (
    !isEmpty(arrayResponse) && (
      <ContainerSelection>
        <Title>TU SELECCIÓN</Title>
        <Wrapper>
          {!isEmpty(arrayResponse) &&
            arrayResponse.map((item, i) => {
              {/* console.log("item", item); */}
              return (
                <OptionResponse
                  onClick={() => onClick(item?.indexTrivia)}
                  key={i}
                  nameBtn={item?.title}
                  nPregunta={item?.indexTrivia + 1}
                  question={item?.question}
                />
              )
            })}
        </Wrapper>
      </ContainerSelection>
    )
  )
}

export default YourSelection

const ContainerSelection = styled.div`
  height: auto;
  width: 100%;
  margin: 20px auto;
  /* background-color: green; */
`
const Title = styled.h1`
  padding: 10px 0;
  font-size: 25px;
  text-align: center;
  letter-spacing: -0.2px;
  font-family: "Roboto", sans-serif;
  &::after {
    display: block;
    content: "";
    height: 4px;
    width: 110px;
    background-color: #db2237;
    margin: 5px auto 10px;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: auto;
`
