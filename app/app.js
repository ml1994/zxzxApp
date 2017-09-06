import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {StyleSheet, Text, View, StatusBar} from 'react-native'
import {addNavigationHelpers} from 'react-navigation'

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

    render() {

        StatusBar.setBarStyle('dark-content', true) //设置StatusBar，使安卓顶部状态栏和ios表现相同。
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
                {/* <AppRootStackNav/> */}
            </Provider>
        )
    }
}
