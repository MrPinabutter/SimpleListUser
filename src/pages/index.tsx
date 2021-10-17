import type { NextPage } from 'next'
import { Header } from '../components/Header'
import Head from 'next/head'

import styled from 'styled-components';
import { Input } from '../components/Input';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../services/api';
import Router from 'next/router';

type UserProps = {
  name: string;
  registration: string;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<UserProps[]>();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true)
    try {
      const { data } = await api.get<{data: UserProps[]}>('users');
      
      if(data) {
        setUsers(data.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToUserDetails = (matricula: string) => {
    Router.push('/user/'+matricula)
  }

  useEffect(() => {
    loadData();
  }, []);

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
          <section>
            <h1>
              Lista de usuários
            </h1>

            <div className="userCardWrapper">
              {users?.map(user => (
                <UserCard onClick={() => handleNavigateToUserDetails(user.registration)}>
                  <div className="infoContainer">
                    <span>
                      {user.name}
                    </span>
                    <small>
                      matricula: {user.registration}
                    </small>
                  </div>
                </UserCard>
              )) || (
                <h2>Carregando...</h2>
              )}

              <UserCard style={{ background: 'transparent' }}>
                <div className="infoContainer">
                </div>
              </UserCard>
            </div>
          </section>
        </Content>
      </Container>
    </>
  )
}

const Container = styled.main`
  width: 100%;
  height: 100%;
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
  flex-wrap: wrap;

  section {
    width: 100%;
    max-width: 1140px;
    padding: 2rem 3rem;
    height: 100%;
  }

  h1 {
    color: #3d3703;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .userCardWrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
    column-gap: 1rem;
  }
`

const UserCard = styled.button`
  height: 91;
  display: flex;
  width: 450px;
  border: none;
  background: #696969;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  transition: all 0.2s;

  .infoContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  :hover {
    background: #535353;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  small {
    font-size: 12px;
    color: white;
  }
`;

export default Home
