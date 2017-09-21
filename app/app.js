import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {StyleSheet, Text, View, StatusBar,Platform,BackHandler,ToastAndroid} from 'react-native'

import {addNavigationHelpers,NavigationActions} from 'react-navigation'
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

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackHandler)
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler)
        }
    }

    componentDidMount() {
        //setTimeout(function() {
            SplashScreen.hide()
        //}, 2000)
    }

    onBackHandler=()=>{//android物理返回键处理
        /*
        这里为了取得当前页路由信息来分别处理，在下面的provider加入ref从这里取得store，
        store里存有nav，即路由信息
        */
        
        const store = this.refs.provider.store.getState()
        const {dispatch} = this.refs.provider.store
        console.log(store)
        const routesLength = store.nav.routes.length
        const nowRoute = store.nav.routes[routesLength-1].routeName  //获取当前路由名
        console.log(nowRoute)
        if(nowRoute=='TabNav'){
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false
            }
            this.lastBackPressed = Date.now()
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
            return true
        }else{
            dispatch(NavigationActions.back())
            return true
        }
    }

    render() {
        return (
            <Provider store={store} ref='provider'>
                <AppWithNavigationState/>
            </Provider>
        )
    }
}
