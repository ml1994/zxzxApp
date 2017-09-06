import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import AppTabNav from './appTabNav'
import Search from './views/search'
import KnowAll from './views/knowAll'

const appRootStackNav = StackNavigator({
    TabNav: {
        screen: AppTabNav
    },
    Search: {//搜索页
        screen: Search
    },
    KnowAll:{//消防百事通
        screen: KnowAll
    }
}, {headerMode: 'none'})

export default appRootStackNav
