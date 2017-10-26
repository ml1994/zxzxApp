import React, { Component } from 'react'
import { View,Image,StyleSheet } from 'react-native'

import Header from '../components/header'
import Menu from '../components/menu'

export default class AboutUs extends Component {

    render() {
        const menuArr = [{
            key:1,
            iconName:'bars',
            text:'简介',
            nav:'AboutDetail',
            type:'Info'
        },{
            key:2,
            iconName:'volume-control-phone',
            text:'客服热线',
            nav:'AboutDetail',
            type:'Phone'
        },{
            key:3,
            iconName:'registered',
            text:'版权所有',
            nav:'AboutDetail',
            type:'Registered'
        }]
        return (
            <View>
                <Header type='title' title='关于我们'/>
                <View style={styles.logoView}>
                    <Image resizeMode='contain' source={require('../asset/logo.png')} style={styles.logo}/>
                </View>
                <Menu menuArr={menuArr}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoView:{
        width:'100%',
        height:160,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    logo:{
        marginTop:20,
        width:130
    }
})