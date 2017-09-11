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
import AddAsk from './views/addAsk'
import AddOnAsk from './views/addOnAsk'
import AskDetail from './views/askDetail'


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
    },
    AddAsk:{//添加问题
        screen:AddAsk
    },
    AddOnAsk:{//追加问题
        screen:AddOnAsk
    },
    AskDetail:{//咨询详情页
        screen:AskDetail
    }
}, {
    headerMode: 'none'
})

export default appRootStackNav
