import { render } from 'react-dom';
import { makeApp } from './app';

export function senderPage() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(makeApp(), container);
}
