import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  .labelContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 6px;

    label {
      font-size: 1.125rem;
      color: #482B03;
    }
  }

  .inputContainter {
    height: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    padding-left: 1rem;
    background: white;
    overflow: hidden;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    cursor: text;

    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 11px;
      font-size: 1rem;
      background: inherit;
    }

    input:focus{
      outline: none;
    }

    svg {
      margin-right: 1rem;

      &:last-child:hover {
        cursor: pointer;
      }
    }
  }
`