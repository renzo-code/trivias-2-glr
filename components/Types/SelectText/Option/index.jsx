import React from 'react'

import Button from 'components/Button'

const Option = ({nameBtn, onClick, answerPainted, idReponse, disabled}) => {
  return(
    <>
        <Button
          answerPainted={answerPainted} 
          idReponse={idReponse} 
          onClick={onClick} 
          nameBtn={nameBtn}
          disabled={disabled}
        />
    </>
  )
}

export default Option
