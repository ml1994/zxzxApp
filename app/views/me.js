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
                    console.log(resj)
                    const {name} = resj.data
                    let vip = ''
                    let partner = ''
                    if(resj.data.tails.vip==true){
                        vip = resj.data.tails.vip
                        partner = resj.data.tails.staff.tails.partner_name
                    }
                    const info = Object.assign({},{name,vip,partner})
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
            key:1,
            iconName:'envelope-o',
            text:'消息中心',
            nav:'Message'
        },{
            key:2,
            iconName:'file-text-o',
            text:'个人设置',
            nav:'MySetting'
        },{
            key:3,
            iconName:'pencil',
            text:'关于我们',
            nav:'AboutUs'
        }]
        return (
            <View>
                <View style={styles.header}>
                    <Icon name='user-circle-o' size={60} color='#fff'/>
                    <View style={styles.phoneView}>
                        {/* this.props.userinfo.vip==true?
                            <View style={styles.vipView}>
                                <Text style={styles.vip}>VIP</Text>
                            </View>:null
                        */} 
                        <Text style={styles.phoneNum}>{this.props.userinfo.name}</Text>
                    </View>
                    {/*this.props.userinfo.vip==true?
                        <Text style={styles.intro}>该手机用户为{this.props.userinfo.partner}合作单位的VIP账户</Text>:
                        <Text style={styles.notVipText}>您掌上的消防专家</Text>*/
                    }
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
    phoneView:{
        flexDirection:'row',
        marginTop:12,
        alignItems:'center'
    },
    vipView:{
        marginHorizontal:10,
        backgroundColor:'#F5CB2E',
        borderRadius:2,
        width:30,
        alignItems:'center',
        justifyContent:'center'
    },
    vip:{
        color:'#ce2626',
        fontWeight:'bold', 
    },
    phoneNum:{
        fontSize:20,
        color:'#fff'
    },
    intro:{
        marginTop:6,
        fontSize:16,
        color:'#F5CB2E'
    },
    notVipText:{
        color:'#fff',
        fontSize:10
    }
})

const mapStateToProps = store => ({
    userinfo: store.userinfo,
    nav: store.nav
})

export default connect(mapStateToProps)(Me)

