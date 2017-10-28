import React, {Component} from 'react'
import { Image, StyleSheet } from 'react-native'
import {TabNavigator,TabBarBottom} from 'react-navigation'

import Home from './views/home'
import Star from './views/star'
import AskTabs from './views/asks'
import Me from './views/me'

const AppTabNav = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            tabBarLabel:'首页',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_logo_active.png'):require('./asset/tab_logo.png')}/>
        }
    },
    Star: {
        screen: Star,
        navigationOptions:{
            tabBarLabel:'精选',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_star_active.png'):require('./asset/tab_star.png')}/>
        }
    },
    AskTabs: {
        screen: AskTabs,
        navigationOptions:{
            tabBarLabel:'我的咨询',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_ask_active.png'):require('./asset/tab_ask.png')}/>
        }
    },
    Me: {
        screen: Me,
        navigationOptions:{
            tabBarLabel:'个人中心',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_me_active.png'):require('./asset/tab_me.png')}/>,
            tabBarComponent:''
        }
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
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


