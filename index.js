/** @format */
import { Provider } from 'react-redux'
import store from './store/index'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import React, { Component } from 'react'
// import { Text, View, BackHandler } from 'react-native'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Main);
