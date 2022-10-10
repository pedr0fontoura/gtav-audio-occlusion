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

  body, input, button {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
  }

  body {
    
    font-size: 16px;
    color: #FFF;
  }

  button {
    &:hover {
      cursor: pointer;
    }
  }

  h1 {
    font-weight: 400;
  }
`;
