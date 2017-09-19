import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Header from '../components/header'
import Input from '../components/input'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'
import * as userinfoActions from '../actions/userinfo'

class Register extends Component {

    constructor() {
        super()
        this.state = {
            phone:'',
            key:'',
            psw:''
        }
    }

    regFun(){
        const {phone,key,psw} = this.state
        const {dispatch} = this.props
        myFetch.post(
            '/account/register',
            `phone=${phone}&code=${key}&password=${psw}`,
            res=>{
                const user = {
                    phoneNum:phone,
                    psw:psw
                }
                if(res.code==0){
                    dispatch(userinfoActions.login(user))
                    dispatch(this.asyGetUserinfo())
                    dispatch(NavigationActions.navigate({routeName:'TabNav'}))
                }
                
            },
            err=>{
                console.log(err)
                alert('注册失败')
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
        const {dispatch} = this.props
        return (
            <View style={styles.rootView}>
                <Header type='title' title='注册'/>
                <Image
                    resizeMode='contain'
                    source={require('../asset/logo.png')}
                    style={styles.logo}/>
                <View style={styles.inputsView}>
                    <Input iconLeft='mobile' type='sendCode' placeholder='请输入手机号码' onChangeText={phone=>this.setState({phone})} phone={this.state.phone} smsType='reg'/>
                    <Input iconLeft='key' placeholder='请输入验证码' onChangeText={key=>this.setState({key})}/>
                    <Input iconLeft='lock' type='password' placeholder='请输入密码6-16位' onChangeText={psw=>this.setState({psw})}/>
                </View>
                <TouchableOpacity style={styles.btnSubmit} onPress={()=>this.regFun()}>
                    <Text style={styles.btnText}>注册</Text>
                </TouchableOpacity>
                <View style={styles.managerView}>
                    <TouchableOpacity
                        onPress={() => dispatch(NavigationActions.navigate({routeName: 'Login'}))}>
                        <Text style={styles.managerText}>有账号?去登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    logo: {
        width: 130
    },
    inputsView:{
		width:'80%'
	},
    btnSubmit: {
        width: '80%',
        borderRadius: 2,
        backgroundColor: '#e82325',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    btnText: {
        fontSize: 14,
        color: '#fff',
        lineHeight: 20
    },
    managerView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    managerText: {
        color: '#0f1d4e'
    },
    managerTextSplice: {
        borderRightWidth: 1,
        borderRightColor: '#0f1d4e',
        paddingRight: 5,
        marginRight: 5
    }
})
const mapStateToProps = store => {
    return {nav: store.nav}
}

export default connect(mapStateToProps)(Register)