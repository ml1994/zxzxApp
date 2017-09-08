import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import AppTabNav from './appTabNav'
import Search from './views/search'
import KnowAll from './views/knowAll'
import KnowAllDetail from './views/knowAllDetail'
import PeopleShow from './views/peopleShow'
import Login from './views/login'
import Register from './views/register'
import AboutUs from './views/aboutUs'


const appRootStackNav = StackNavigator({
    TabNav: {
        screen: AppTabNav
    },
    Login:{
        screen: Login
    },
    Register:{
        screen: Register
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
    },
    AboutUs:{//关于我们
        screen:AboutUs
    }
}, {
    headerMode: 'none'
})

export default appRootStackNav
