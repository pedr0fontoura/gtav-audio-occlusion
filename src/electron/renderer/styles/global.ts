import { createGlobalStyle } from 'styled-components';

import InterRegular from '../assets/fonts/Inter-Regular.ttf';
import InterMedium from '../assets/fonts/Inter-Medium.ttf';
import InterSemiBold from '../assets/fonts/Inter-SemiBold.ttf';
import InterBold from '../assets/fonts/Inter-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${InterRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(${InterMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(${InterSemiBold}) format('truetype');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(${InterBold}) format('truetype');
  }

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
