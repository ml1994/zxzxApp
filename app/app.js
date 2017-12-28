import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {StyleSheet, Text, View, StatusBar, Platform, BackHandler, ToastAndroid, Alert, NetInfo, Linking, NativeModules} from 'react-native'
import {addNavigationHelpers,NavigationActions} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation'
import JPushModule from 'jpush-react-native'

import configureStore from './store/configureStore'
import AppRootStackNav from './appRootStackNav'
import rootReducer from './reducers'

import myFetch from './utils/myFetch'
import myUpdate from './utils/myUpdate'
import * as appStateActions from './actions/appState'

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
    
    openSettings(){
        if(Platform.OS=='android'){
            //android系统自定义打开系统设置的方法
            NativeModules.OpenSettings.openNetworkSettings(data => {
              console.log('call back data', data);
            })
        }else{//ios
            Linking.openURL('app-settings:')  
            .catch((err)=>{  
                console.log('error', err)
            })
        }
    }

    componentWillMount() {
        if(Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackHandler)
            myUpdate.firstTime()//暂时只有安卓使用热更新
        }

        //新版本第一次运行
        //myUpdate.firstTime()
    }
    componentWillUnmount(){
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler)
        }

        //移除网络状态监听
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        )
    }

    componentDidMount() {
        const {dispatch} = this.refs.provider.store
        let isConnected = null
        setTimeout(()=>{
            SplashScreen.hide()
        },2000)
        //SplashScreen.hide()

        Orientation.lockToPortrait()//锁竖屏

        //设置网络监听
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        )
        //初始化判断网络状态
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                isConnected = isConnected
                dispatch(appStateActions.netConnect({isConnected}))
            }
        )

        // 推送
        // 在收到点击事件之前调用此接口
        if(Platform.OS === 'android'){
            // JPushModule.notifyJSDidLoad((resultCode) => {
            //    if (resultCode === 0) {}
            //  })
            //官网给的上面这种会报cb方法undefined错误
            JPushModule.notifyJSDidLoad(resultCode=>console.log(resultCode))//这样用不会报错  
        }

        JPushModule.addReceiveNotificationListener((map) => {//用户收到通知时触发的事件
            console.log("alertContent: " + map.alertContent)
            console.log("extras: " + map.extras)
            // var extra = JSON.parse(map.extras)
            // console.log(extra.key + ": " + extra.value)
        })

        JPushModule.addReceiveOpenNotificationListener(message=>{//用户点击通知事件
            //android和ios接收到的参数结构不同，需要分别处理获取
            if(Platform.OS==='android'){
                const {type,id} = JSON.parse(message.extras)
                if(type=='answer'){
                    dispatch(NavigationActions.navigate({routeName:'AskDetail',params:{id}}))
                }else if(type=='video'){
        
                }else{
        
                }
            }else{//iOS
                const {type,id} = message
                if(type=='answer'){
                    dispatch(NavigationActions.navigate({routeName:'AskDetail',params:{id}}))
                }else if(type=='video'){
        
                }else{
        
                }
            }
    
            if(Platform.OS === 'ios'){
                JPushModule.setBadge(0, (success) => {
                    console.log(success)
                })
            }

            console.log(message)

        })
        //检查应用更新
        if(Platform.OS=='android'){//暂时只有安卓使用热更新
            if(isConnected){
                myUpdate.checkUpdate()
            }
        }
    }

    //网络状态变化，注意函数书写方法，这样this指向app组件
    _handleConnectivityChange=(isConnected)=>{
        const store = this.refs.provider.store.getState()
        const {dispatch} = this.refs.provider.store
        dispatch(appStateActions.netConnect({isConnected}))
        if(!isConnected){
            Alert.alert('提示','您的网络状态不正常，请检查您的网络',[
                {text:'设置',onPress:()=>{this.openSettings()}},
                {text:'好',onPress:()=>{}}
            ])
        }
    }

    //点击通知导航到相应页面
    navWithPressNotification(type,id){
        
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
