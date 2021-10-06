import styled from 'styled-components';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';

export const Header = () => {
  return(
    <Container>
      <h1>
        Vitinho Listas
      </h1>

      <nav>
        <ul>
          <li>
            <ActiveLink shouldMatchExactRef href="/">
              <a>
                Home
              </a>
            </ActiveLink>
          </li>
          
          <li>
            <ActiveLink shouldMatchExactRef href="/register">
              <a>
                Register
              </a>
            </ActiveLink>
          </li>
          
          <li>
            <ActiveLink shouldMatchExactRef href="/login">
              <a>
                Login
              </a>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}

const Container = styled.header`
  height: 90px;
  width: 100%;
  background: #F2CC0C;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  h1 {
    color: white;
    font-size: 36px;
    font-weight: bold;
  }

  ul {
    display: flex;
  }

  ul li {
    list-style-type: none;
    margin-left: 1.5rem;
    
    a {
      color: white;
      font-size: 24px;
      font-weight: 600;
  
      &.active {
        color: #5C0099;
      }
    }
  }
`