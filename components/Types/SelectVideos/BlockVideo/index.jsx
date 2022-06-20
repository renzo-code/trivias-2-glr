import React from 'react'

import ReactPlayer from 'react-player'
import styled from 'styled-components'

const BlockVideo = ({
  url,
  poster,
  nameButton,
  onClick,
  idReponse,
  answerPainted,
  disabled,
  playVideo,
  viewBtn,
  }) => {

  const res = answerPainted?.includes(idReponse) ? '#D82239': 'white'
  const resBor = answerPainted?.includes(idReponse) ? '3px solid #D82239;': '3px solid #BEBEBE;'
  const resCol = answerPainted?.includes(idReponse) ? 'white': 'black'

  return (
    <>
      <WrapperVideo>
        <ReactPlayer
        // config={{file: {attributes: { playVideo: false }}}}
          style={{pointerEvents: playVideo ? true : 'none'}}
          url={url}
          playing={playVideo}
          width="100%"
          height={"70%"}
          light={poster}
          controls
          
        />
        {
          viewBtn &&
          <BlockBtn>
            <ButtonVideo
              disabled={disabled}
              backcolor={res}
              resBor={resBor}
              resCol={resCol}
              onClick={onClick}
            >
            {nameButton}
            </ButtonVideo>
          </BlockBtn>
        }
      </WrapperVideo>
      {/* <style jsx="true">{`
      .react-player__shadow{
        display: none;
      }
      `}</style> */}
    </>
  )
}

export default BlockVideo

const WrapperVideo = styled.div`
  width: 350px;
  height: 280px;
  @media (max-width: 800px){
    width: 280px;
    height: 220px;
  }
  @media (max-width: 645px){
    width: 250px;
    height: 190px;
    margin-bottom: 10px;
  }
  @media (max-width: 580px){
    width: 250px;
    height: 150px;
    margin-bottom: 15px;
  }
  @media (max-width: 460px){
    width: 165px;
    height: 140px;
    margin-bottom: 20px;
  }
`
const BlockBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
  height: auto;
  @media (max-width: 800px){
    margin-top: 0;

  }
`
const ButtonVideo = styled.button`
  height: 55px;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  outline: none;
  transition: 0.4s;
  /* border: 3px solid #BEBEBE; */
  border: ${({resBor}) => resBor};
  color: ${({resCol}) => resCol};
  background-color: ${({backcolor}) => backcolor};
  &&:hover{
    background-color: #D82239;
    color: white;
    cursor: pointer;
    /* border: none; */
    border: ${({resBor}) => resBor};
  }
  @media (max-width: 580px){
    margin-top: 0;
    font-size: 16px;
    height: 50px;
  }
  @media (max-width: 460px){
    margin-top: 0;
    font-size: 14px;
    height: 40px;
  }
`