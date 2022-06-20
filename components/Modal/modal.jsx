import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Modal = ({ children, stateModal , setStateModal, title = 'Alerta', showHeader, idx }) => {
  console.log('stateModal: ', stateModal)
  console.log('i : ', idx );
  return (
    <>
      {
        stateModal && 
          <Overlay>
            <ContenedorModal>
            {showHeader &&
              <EncabezadoModal>
                <h3>{title}</h3>
              </EncabezadoModal>
            }
              <BotonCerrar onClick={() => setStateModal(prev => prev.map((x, i) => {
                console.log('Modalllllllll', 'modal'+i);
                  return { ['modal'+i]: false }
                })
                )}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </BotonCerrar>
              {children}
            </ContenedorModal>
          </Overlay>
      }
    </>
  )
}

export default Modal

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  padding: 40px 56px 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px){
    padding: 0 22px 0 3px;
  }
`
const ContenedorModal = styled.div`
  width: 900px;
  height: auto;
  background-color: white;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100,100,111,0.5) 0px 7px 29px 0px;
  padding: 20px;
`
const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  padding-right: 30px;
  border-bottom: 1px solid #D82239;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #D82239;
    line-height: 18px;
  }
`
const BotonCerrar = styled.button`
  position: absolute;
  right: 20px;
  top: 15px;
  
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: .3s ease all;
  border-radius: 5px;
  color: #1766DC;

  &:hover{
    background: #F2F2F2;
  }

  svg {
    width: 100%;
    height: 100%;
    color: #D82239;
  }
`