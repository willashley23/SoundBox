import React from 'react';
import {render} from 'react-dom';   
import ReactDom from 'react-dom';
import Player from './components/player';
import './assets/stylesheets/style.less';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    ReactDom.render(<Player />, root);
});