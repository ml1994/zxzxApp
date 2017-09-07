import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import AppTabNav from './appTabNav'
import Search from './views/search'
import KnowAll from './views/knowAll'
import KnowAllDetail from './views/knowAllDetail'
import PeopleShow from './views/peopleShow'

const appRootStackNav = StackNavigator({
    TabNav: {
        screen: AppTabNav
    },
    Search: {//搜索页
        screen: Search
    },
    KnowAll:{//消防百事通
        screen: KnowAll
    },
    KnowAllDetail:{//消防百事通详情页
        screen: KnowAllDetail
    },
    PeopleShow:{//真人秀
        screen: PeopleShow
    }
}, {
    headerMode: 'none'
})

export default appRootStackNav
