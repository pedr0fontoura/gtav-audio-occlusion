import React from 'react';
import { render } from 'react-dom';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

document.body.appendChild(mainElement);

const App = () => {
  return <h1>V Audio Occlusion Tool</h1>;
};

render(<App />, mainElement);
