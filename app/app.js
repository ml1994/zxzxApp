import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {StyleSheet, Text, View} from 'react-native'
import AppRootStackNav from './appRootStackNav'

const store = configureStore()

export default class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <AppRootStackNav/>
            </Provider>
        );
    }
}
