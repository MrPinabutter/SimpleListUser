import type { NextPage } from 'next'
import { Header } from '../../components/Header'
import Head from 'next/head'

import styled from 'styled-components';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { api } from '../../services/api';

const ChangePassword: NextPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    const { id } = Router.query;

    if (!id) {
      toast.error('Usuário não econtrado!', {
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

    if(!oldPassword || !newPassword) {
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
      registration: id,
      oldPassword, 
      newPassword,
    }

    try {
      const res = await api.patch('/change-password', body);

      if(res.status == 200){
        toast.success('Senha alterada com sucesso!', {
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
      else throw new Error();
    } catch (e) {
      toast.error('Senha anterior incorreta!', {
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


  return (
    <>
      <Head>
        <title>
          Mudar senha | Vitinho listas
        </title>
      </Head>

      <Container>
        <Header />
        <Content>
          <FormContent>
            <h1>Alterar senha</h1>

            <Input
              label="Senha antiga"
              setValue={(val:string) => setOldPassword(val)}
              value={oldPassword}
              password
            />

            <Input
              label="Nova senha"
              setValue={(val:string) => setNewPassword(val)}
              value={newPassword}
              password
            />

            <div className="buttonContainer">
              <Button type="button" onClick={handleSubmit}>
                Muda a senha!
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

export default ChangePassword
