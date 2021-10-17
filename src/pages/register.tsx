import type { NextPage } from 'next'
import { Header } from '../components/Header'
import Head from 'next/head'

import styled from 'styled-components';
import { Input } from '../components/Input';
import { useCallback, useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { api } from '../services/api';

const Register: NextPage = () => {
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [rg, setRg] = useState('');
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState('');

  const handleSubmit = async () => {
    if(!name || !matricula || !rg || !password || !adress) {
      toast.error('Preencha os campos vazios!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 
    }

    const body = {
      name,
      registration:matricula,
      rg,
      password,
      adress,
    }

    try {
      await api.post('http://localhost:3030/users', body);

      toast.success('🦄 Cadastrado!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      Router.push('/')
    } catch (e) {
      console.error()
    }
  }

  return (
    <>
      <Head>
        <title>
          Registro | Vitinho listas
        </title>
      </Head>

      <Container>
        <Header />
        <Content>
          <FormContent>
            <h1>Registro</h1>

            <Input
              label="Nome"
              setValue={(val:string) => setName(val)}
              value={name}
            />

            <Input
              label="Matricula"
              setValue={(val:string) => setMatricula(val)}
              value={matricula}
            />

            <Input
              label="RG"
              setValue={(val:string) => setRg(val)}
              value={rg}
            />

            <Input
              label="Endereço"
              setValue={(val:string) => setAdress(val)}
              value={adress}
            />

            <Input
              label="Senha"
              setValue={(val:string) => setPassword(val)}
              value={password}
              password
            />

            <div className="buttonContainer">
              <Button type="button" onClick={() => handleSubmit()}>
                Me cria!
              </Button>
            </div>
          </FormContent>
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

const FormContent = styled.form`
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #ECECEC;
  border-radius: 25px;
  padding: 1.875rem 2.125rem;

  h1 {
    color: #3d3703;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .buttonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`

const Button = styled.button`
  height: 47px;
  width: 50%;

  margin-top: 1rem;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  background: #FFAD51;
  border: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  transition: 0.2s background;

  :hover {
    background: #F6972C;
  }
`

export default Register
