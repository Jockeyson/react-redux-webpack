import React = require('react');
import ReactDom = require('react-dom');
import App from './components/app'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import flowdesign from './reducers/flowdesign'
import thunk from 'redux-thunk'

const middleware = [thunk]

const store = createStore(
    flowdesign,
    applyMiddleware(...middleware)
)

//const store = createStore(flowdesign)

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("ACT-DIV-SHELL")
)
