import React, {Component} from 'react'
import { Image, StyleSheet } from 'react-native'
import {TabNavigator,TabBarBottom} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome'

import Home from './views/home'
import Test from './views/test'
import Ask from './views/ask'
import Me from './views/me'

const AppTabNav = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            tabBarLabel:'首页',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_logo_active.png'):require('./asset/tab_logo.png')}/>
        }
    },
    Test: {
        screen: Test,
        navigationOptions:{
            tabBarLabel:'物业培训',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_pipe_active.png'):require('./asset/tab_pipe.png')}/>
        }
    },
    Ask: {
        screen: Ask,
        navigationOptions:{
            tabBarLabel:'技术咨询',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_fire_hy_active.png'):require('./asset/tab_fire_hy.png')}/>
        }
    },
    Me: {
        screen: Me,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor})=><FAIcon name="user-circle-o" size={20} color={tintColor}/>,
            tabBarComponent:''
        }
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#e71f19',
        inactiveTintColor: '#8b7272',
        labelStyle:{
            marginBottom:6
        }
    }
})

const styles = StyleSheet.create({
    tabIcon:{
        width:24,
        height:24
    }
})

export default AppTabNav


