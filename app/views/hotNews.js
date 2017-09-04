import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {StackNavigator, TabNavigator, TabBarTop} from 'react-navigation'

class HotNews extends Component {
    render() {
        return (
            <View>
                <Text>HotNews</Text>
            </View>
        )
    }
}

const hotNewsTabNav = TabNavigator({
    news1: {
        screen: HotNews,
        navigationOptions: {
            title: '热点资讯1'
        }
    },
    news2: {
        screen: HotNews,
        navigationOptions: {
            title: '热点资讯2'
        }
    },
    news3: {
        screen: HotNews,
        navigationOptions: {
            title: '热点资讯3'
        }
    }
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
            //color:'#929292',
            height: 30,
            lineHeight: 30
        },
        style: {
            //height:30,
            backgroundColor: '#f4f4f4'
        }
    }
})

export default hotNewsTabNav