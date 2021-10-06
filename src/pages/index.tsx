import type { NextPage } from 'next'
import { Header } from '../components/Header'
import Head from 'next/head'

import styled from 'styled-components';
import { Input } from '../components/Input';
import { useState } from 'react';

const Home: NextPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Head>
        <title>
          Home | Vitinho listas
        </title>
      </Head>

      <Container>
        <Header />
        <Content>

        </Content>
      </Container>
    </>
  )
}

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default Home
