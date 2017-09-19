import React, { Component } from 'react'
import { View,Text } from 'react-native'
import Header from '../components/header'
import Menu from '../components/menu'

export default class MySetting extends Component {

    render() {
        const menuArr = [{
            iconName:'key',
            text:'修改密码',
            nav:'ChangePassword'
        },{
            iconName:'sign-out',
            text:'退出账号',
            loginOut:true
        }]
        return (
            <View>
                <Header type='title' title='个人设置'/>
                <View style={{marginTop:6}}>
                    <Menu menuArr={menuArr}/>
                </View> 
            </View>
        )
    }
}