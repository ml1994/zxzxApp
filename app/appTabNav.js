import React, {Component} from 'react'
import { Image, StyleSheet } from 'react-native'
import {TabNavigator,TabBarBottom} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome'

import Home from './views/home'
import PeopleShow from './views/peopleShow'
import Me from './views/me'

const AppTabNav = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            tabBarLabel:'首页',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_logo_active.png'):require('./asset/tab_logo.png')}/>
        }
    },
    PeopleShow: {
        screen: PeopleShow,
        navigationOptions:{
            tabBarLabel:'真人秀',
            tabBarIcon:({focused,tintColor})=><Image style={styles.tabIcon} source={focused?require('./asset/tab_pshow_active.png'):require('./asset/tab_pshow.png')}/>
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


