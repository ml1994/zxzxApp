import React, {Component} from 'react'
import {TabNavigator,TabBarBottom} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome'

import HotNewsTabNav from './views/hotNews'
import PeopleShow from './views/peopleShow'
import Test from './views/test'
import Ask from './views/ask'
import Me from './views/me'

const AppTabNav = TabNavigator({
    Test: {
        screen: Test,
        navigationOptions:{
            tabBarLabel:'学习',
            tabBarIcon:({tintColor})=><FAIcon name="mortar-board" size={20} color={tintColor}/>
        }
    },
    HotNews: {
        screen: HotNewsTabNav,
        navigationOptions:{
            tabBarLabel:'资讯',
            tabBarIcon:({tintColor})=><FAIcon name="rocket" size={20} color={tintColor}/>
        }
    },
    PeopleShow: {
        screen: PeopleShow,
        navigationOptions:{
            tabBarLabel:'真人秀',
            tabBarIcon:({tintColor})=><FAIcon name="youtube-play" size={20} color={tintColor}/>
        }
    },
    Ask: {
        screen: Ask,
        navigationOptions:{
            tabBarLabel:'消防咨询',
            tabBarIcon:({tintColor})=><FAIcon name="question" size={20} color={tintColor}/>
        }
    },
    Me: {
        screen: Me,
        navigationOptions:{
            tabBarLabel:'我',
            tabBarIcon:({tintColor})=><FAIcon name="user" size={20} color={tintColor}/>,
            tabBarComponent:''
        }
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#e91e63'
    }
})

export default AppTabNav

//redux-map-config
// function mapStateToProps(state) {
//     return {
//         userinfo: state.userinfo
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         userinfoActions: bindActionCreators(userinfoActions, dispatch)
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(AppTabNav)

