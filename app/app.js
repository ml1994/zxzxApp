import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {StyleSheet, Text, View, StatusBar,Platform} from 'react-native'

import {addNavigationHelpers} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import configureStore from './store/configureStore'
import AppRootStackNav from './appRootStackNav'
import rootReducer from './reducers'


class AppRouter extends Component {
    render() {
        return (
            <AppRootStackNav navigation={addNavigationHelpers({dispatch: this.props.dispatch, state: this.props.nav})}/>
        )
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
})

const AppWithNavigationState = connect(
    mapStateToProps
)(AppRouter)

const store = configureStore()

export default class App extends Component {

    constructor(){
        super()
        //设置StatusBar，使安卓顶部状态栏和ios表现相同。
        StatusBar.setBarStyle('dark-content', true) 
        if(Platform.OS==='android'){
            StatusBar.setTranslucent(true)//仅android
            StatusBar.setBackgroundColor('transparent')//仅android
        }
    }

    componentDidMount() {
        setTimeout(function() {
            SplashScreen.hide()
        }, 2000)
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
                {/* <AppRootStackNav/> */}
            </Provider>
        )
    }
}
