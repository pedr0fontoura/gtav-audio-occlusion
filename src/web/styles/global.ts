import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &:focus {
      outline: unset;
    }
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #FFF;
  }

  button {
    font-family: 'Inter', Arial, Helvetica, sans-serif;

    &:hover {
      cursor: pointer;
    }
  }

  h1 {
    font-weight: 400;
  }
`;
