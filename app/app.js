import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {StyleSheet, Text, View, StatusBar} from 'react-native'
import AppRootStackNav from './appRootStackNav'

const store = configureStore()

export default class App extends Component {
    
    render() {
        StatusBar.setBarStyle('dark-content',true)//设置StatusBar，使安卓顶部状态栏和ios表现相同。
        return (
            <Provider store={store}>
                <AppRootStackNav/>
            </Provider>
        );
    }
}
