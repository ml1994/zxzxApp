import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, Button, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import * as userinfoActions from '../actions/userinfo'

import Menu from '../components/menu'
import Icon from '../components/icon'

import myFetch from '../utils/myFetch'

class Me extends Component {


    constructor(props) {
        super(props)
        const {dispatch} = this.props //dispatch要从this.props里先拿到才能使用
        //判断登录
        myFetch.get(
            '/account/islogin',
            {},
            res=>{
                console.log(res)
                res.code=='0'?dispatch(this.asyGetUserinfo()):dispatch(NavigationActions.navigate({routeName:'Login'}))
            },
            err=>{
                console.log(err)
            }
        )
        
    }

    asyGetUserinfo(){
        //获取用户信息
        const {dispatch} = this.props
        return dispatch=>{
            dispatch({type:'GETING'})
            myFetch.get(
                '/account/getinfo',
                {},
                resj=>{
                    const {account,name} = resj.data
                    const info = Object.assign({},{account,name})
                    dispatch(userinfoActions.getInfo(info))
                    dispatch({type:'GETING_END'})
                },
                err=>{
                    console.log(err)
                    dispatch({type:'GET_ERROR'})
                }
            )
        }
    }

    render() {
        const menuArr = [{
            iconName:'file-text-o',
            text:'个人设置',
            nav:'MySetting'
        },{
            iconName:'pencil',
            text:'关于我们',
            nav:'AboutUs'
        }]
        return (
            <View>
                <View style={styles.header}>
                    <Icon name='user-circle-o' size={60} color='#fff'/>
                    <Text style={styles.phoneNum}>{this.props.userinfo.account}</Text>
                    <Text style={styles.intro}>{this.props.userinfo.name}</Text>
                </View>
                <Menu menuArr={menuArr}/>
            </View>
        )
    }
}

const styles =StyleSheet.create({
    header:{
        width:'100%',
        height:200,
        backgroundColor:'#ce2626',
        marginBottom:6,
        justifyContent:'center',
        alignItems:'center'
    },
    phoneNum:{
        marginTop:12,
        fontSize:20,
        color:'#fff'
    },
    intro:{
        marginTop:6,
        fontSize:12,
        color:'#fff'
    }
})

const mapStateToProps = store => ({
    userinfo: store.userinfo,
    nav: store.nav
})

export default connect(mapStateToProps)(Me)

