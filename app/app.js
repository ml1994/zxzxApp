import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {StyleSheet, Text, View, StatusBar,Platform,BackHandler,ToastAndroid,Alert} from 'react-native'
import {addNavigationHelpers,NavigationActions} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import JPushModule from 'jpush-react-native'

import configureStore from './store/configureStore'
import AppRootStackNav from './appRootStackNav'
import rootReducer from './reducers'

import myFetch from './utils/myFetch'


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

        SplashScreen.hide()

        Orientation.lockToPortrait()//锁竖屏

        // 推送
        // 在收到点击事件之前调用此接口
        if(Platform.OS === 'android'){
            // JPushModule.notifyJSDidLoad((resultCode) => {
            //    if (resultCode === 0) {}
            //  });
            //官网给的上面这种会报cb方法undefined错误
            JPushModule.notifyJSDidLoad(resultCode=>console.log(resultCode))//这样用不会报错  
        }
        JPushModule.addReceiveNotificationListener((map) => {//用户点击触发的事件
            console.log("alertContent: " + map.alertContent);
            console.log("extras: " + map.extras);
            // var extra = JSON.parse(map.extras);
            // console.log(extra.key + ": " + extra.value);
        })
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
        const homeKey = store.nav.routes[0].key //首页key值，用与back返回页
        const nowRoute = store.nav.routes[routesLength-1].routeName  //获取当前路由名
        console.log(nowRoute)
        if(nowRoute=='TabNav'){
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false  //返回false退出应用
            }
            this.lastBackPressed = Date.now()
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
            return true
        }else if(nowRoute=='Login'){ 
            const resetAction = NavigationActions.reset({//未登录状态返回，返回到home页
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'TabNav'})
                ]
              })
            dispatch(resetAction)
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
