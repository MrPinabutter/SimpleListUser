import { AxiosResponse } from "axios";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

type UserProp = {
  name: string,
  registration: string,
  adress: string,
  rg: string
}

export default function User() {
  const [user, setUser] = useState<UserProp>();
  
  const getUserData = async () => {
    const { id } = Router.query;
    try {
      const res = await api.get<{data: UserProp}>(`/users/${id}`)

      setUser(res.data.data)
    } catch (e) {
      console.error(e)
      Router.back()
    }
  }

  const handleRemoveUser = async () => {
    const body = {
      registration: user?.registration || ''
    }

    try {
      const res = await api.delete('/users', {
        data: body
      })

      if(res.status == 200) {
        toast.success('Usuário removido com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        Router.back()
      }
    } catch (e) {
      toast.error('Houve um erro ao remover usuário!', {
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
    getUserData();
  }, [])

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
          {user ? (
            <FormContent>
              <div className="title">
                <h1>Descrição do usuário</h1>
              </div>

              <h1>{user.name}</h1>

              <span>Matrícula: {user.registration}</span>

              <span>RG: {user.rg}</span>

              <span>Endereço: {user.adress}</span>

              <div className="buttonContainer">
                <button 
                  className="changePassword" 
                  type="button"
                  onClick={() => Router.push(`/change-password/${user.registration}`)}
                >
                  Alterar senha
                </button>
              </div>

              <div className="buttonContainer">
                <button 
                  className="btn edit" 
                  type="button"
                  onClick={() => Router.push(`/edit-profile/${user.registration}`)}
                >
                  Editar informações
                </button>

                <button 
                  className="btn remove" 
                  type="button"
                  onClick={handleRemoveUser}
                >
                  Excluir usuário
                </button>
              </div>
            </FormContent>
          ) : (
            <h1>Carregando...</h1>
          )}
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

  section {
    width: 100%;
    max-width: 1140px;
    padding: 2rem 1rem;
    height: 100%;
  }

  h1 {
    color: #3d3703;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

`


const FormContent = styled.form`
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #ECECEC;
  border-radius: 25px;
  overflow: hidden;
  padding-bottom: 2rem;

  h1 {
    margin-bottom: 0;
  }

  .title {
    width: 100%;
    height: 120px;
    background: #696969;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: white;
      font-size: 28px;
    }
  }

  .buttonContainer {
    display: flex;
    width: 100%;
    gap: 1rem;
    padding: 0 2.125rem;
    margin-top: 1rem;

    .btn, .changePassword {
      border: none;
      border-radius: 50px;
      flex: 1;
      height: 36px;
      transition: all 0.2s;
      color: white;
      font-weight: bold;
      font-size: 16px;
    }

    .changePassword {
      background: #EF8C1D;
      
      :hover {
        background: #D47C18;
      }
    }

    .edit {
      background: #0E9594;
      
      :hover {
        background: #0E8483;
      }
    }

    .remove {
      background: #C7363E;
      
      :hover {
        background: #AF2D34;
      }
    }
  }

  h1 {
    color: #696969;
    font-size: 18px;
    font-weight: bold;
    padding: 0 2.125rem;
    padding-top: 1rem;
  }

  span {
    color: #696969;
    padding: 0 2.125rem;
  }

  .buttonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`
