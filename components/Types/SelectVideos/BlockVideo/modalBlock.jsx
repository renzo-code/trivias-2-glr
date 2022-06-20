import React from 'react'

import ReactPlayer from 'react-player'
import styled from 'styled-components'

const ModalBlockVideo = ({url}) => {
  return (
    <WrapperVideo>
      <ReactPlayer
        url={url}
        playing={true}
        width={"100%"}
        height={"100%"}
        controls
      />
    </WrapperVideo>
  )
}

export default ModalBlockVideo

const WrapperVideo = styled.div`
  width: 100%;
  height: 500px;
  @media (max-width: 600px){
    height: 222px;
  }
`
