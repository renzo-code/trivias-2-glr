import React from 'react'

import styled from 'styled-components'
import Button from 'components/Button'

const Options = ({nameBtn, onClick, idReponse, answerPainted, disabled}) => {
  return(
    <>
        <Button
          disabled={disabled}
          answerPainted={answerPainted}
          idReponse={idReponse}
          onClick={onClick} 
          nameBtn={nameBtn}
        />
    </>
  )
}

export default Options


