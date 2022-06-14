import React from 'react'

import NextHead from 'next/head'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <NextHead>
        <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.larepublica.pe/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.larepublica.pe/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.larepublica.pe/favicon-16x16.png"/>
        <link rel="icon" type="image/x-icon" href="https://cdn.larepublica.pe/favicon.ico"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>   
        <link rel="canonical" href="https://especiales.larepublica.pe/trivias-premios-oscar-2022-ganadores" />
        <title>LR Especiales | Trivias | Premios Oscar Ganadores 2022</title>

        <meta name="MobileOptimized" content="width" />
        <meta name="HandheldFriendly" content="true" />
      </NextHead>
      <Wrapper>
        <Header/>
        <ContainerMain>
          {  children }
        </ContainerMain>
        <Footer/>
      </Wrapper>
    </>
  )
}

export default Layout

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  `
const ContainerMain = styled.main`
  max-width: 1440px;
  width: 100%;
  margin: auto;
  padding: 0;
  min-height: calc(100vh - 450px);
  font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden;
`
