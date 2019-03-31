import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./Components/App.jsx";

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
