import type { NextPage } from 'next'
import { Header } from '../../components/Header'
import Head from 'next/head'

import styled from 'styled-components';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { api } from '../../services/api';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

type UserProp = {
  name: string,
  registration: string,
  adress: string,
  rg: string
}

const EditProfile: NextPage = () => {
  const [name, setName] = useState('');
  const [rg, setRg] = useState('');
  const [adress, setAdress] = useState('');

  const loadInfo = async () => {
    const {id} = Router.query

    try {
      const { data } = await api.get<{ data:UserProp }>(`/users/${id}`);

      setName(data.data.name)
      setRg(data.data.rg)
      setAdress(data.data.adress)
    } catch (e) {
      Router.back()
    }
  }

  const handleEditUser = async () => {
    const {id} = Router.query

    if(!id) {
      toast.error('Usuário não encontrado!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      Router.back();
    }

    const body = {
      name,
      rg,
      adress,
      registration: id
    }

    try {
      const res = await api.put('/users', body);

      if(res.status == 200){
        toast.success('Informações alteradas com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        Router.push(`/user/${id}`)
      }
    } catch(e) {
      toast.error('Houve um erro ao alterar informações do usuário!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    loadInfo();
  }, []) 

  return (
    <>
      <Head>
        <title>
          Editar | Vitinho listas
        </title>
      </Head>

      <Container>
        <Header />
        <Content>
          <FormContent>
            <h1>Editar</h1>

            <Input
              label="Nome"
              setValue={(val:string) => setName(val)}
              value={name}
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

            <div className="buttonContainer">
              <Button type="button" onClick={handleEditUser}>
                Altera aí!
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
  background: #4CC9F0;
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
    background: #45B4D6;
  }
`

export default EditProfile
