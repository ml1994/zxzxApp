import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import Header from '../components/header'
import Input from '../components/input'
import myFetch from '../utils/myFetch'

import * as userinfoActions from '../actions/userinfo'
import * as askActions from '../actions/ask'
import * as testActions from '../actions/test'


class Login extends Component {

	constructor(props){
		super(props)
		const {dispatch} = this.props
		dispatch(userinfoActions.initLogin())
		this.state = {
			phoneNum:'',
			psw:''
		}
	}

	asyLogin(payload){
		const {dispatch} = this.props
		const {phoneNum,psw} = this.state
		
		return dispatch=>{
			dispatch({type:'LOGING'})
			myFetch.post(
				'/account/login',
				`phone=${phoneNum}&password=${psw}`,
				resj=>{
					const {code,message} = resj
					if(code==0){
						dispatch(userinfoActions.login(payload))
						dispatch(this.asyGetUserinfo())//获取用户信息
						dispatch(this.initMaxScore())//获取最高分
						dispatch(this.getList())//获取问题列表
						dispatch(NavigationActions.back())
					}else{
						alert(message)
					}
				},
				err=>{
					console.log(err)
					dispatch({type:'LOGIN_ERROR'})
				}
			)
		}
	}

	initMaxScore(){//获取最高分
		const {dispatch} = this.props
		let maxScore = new Array()
		return dispatch=>{
			dispatch({type:'GETTING_MAX_SCORE'})
			myFetch.get(
				'/examqueBank/list',
				{},
				res => {
					res.rows.map((item)=>{
						maxScore.push(item.maxscore);
					})
					console.log(res,maxScore)
					dispatch(testActions.getMaxScore({maxScore}))
				},
				err => {
					console.log(err)
				}
			)
		}
	}

	getList(){//获取问题列表
        const {dispatch} = this.props
        return dispatch=>{
            //dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                '/consult/list/question',
                {page:1,pagesize:1000},
                res=>{
                    console.log(res)
                    if(res.code==0){
                        if(res.data.rows.length!=0){
                            const askList = res.data.rows
                            dispatch(askActions.loadAskList({askList}))
                            dispatch({type:'LOADED_ASKLIST'})
                        }else{
                            dispatch({type:'NO_ASKLIST'})
                        }

                    }
                },
                err=>{
                    console.log(err)
                    alert('获取列表失败')
                }
            )
        }
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

	loginFun(){
		const userinfo = this.state
		const {dispatch} = this.props
		dispatch(this.asyLogin(userinfo))
	}

	render() {
		const {dispatch,userinfo}=this.props
		
		return (
			<View style={styles.rootView}>
				<Header type='title' title='登录' isLoginPage={true}/>
				<Image resizeMode='contain' source={require('../asset/logo.png')} style={styles.logo}/>
				<View style={styles.inputsView}>
					<Input iconLeft='mobile' placeholder='请输入手机号码' onChangeText={phoneNum=>this.setState({phoneNum})}/>
					<Input iconLeft='lock' type='password' placeholder='请输入密码6-16位' onChangeText={psw=>this.setState({psw})}/>
				</View>
				<TouchableOpacity style={styles.btnSubmit} onPress={()=>this.loginFun()}>
					<Text style={styles.btnText}>登录</Text>
				</TouchableOpacity>
				<View style={styles.managerView}>
					<TouchableOpacity onPress={() => dispatch(NavigationActions.navigate({routeName:'Register'}))}>
						<View style={[styles.managerTextView,styles.managerTextSplice]}>
							<Text style={styles.managerText}>没账号?去注册</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => dispatch(NavigationActions.navigate({routeName:'ForgetPassword'}))}>
						<View style={styles.managerTextView}>
							<Text style={styles.managerText}>忘记密码</Text>
						</View>
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
		alignItems: 'center',
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
		flexDirection: 'row',
		marginTop:20
	},
	managerText: {
		color: '#0f1d4e',
		
	},
	managerTextView:{
		justifyContent:'center',
		height:14
	},
	managerTextSplice: {
		borderRightWidth: 1,
		borderRightColor: '#0f1d4e',
		paddingRight:5,
		marginRight:5,
	}

})
const mapStateToProps=store=>{
	return {
		nav:store.nav,
		userinfo:store.userinfo
	}
}

export default connect(mapStateToProps)(Login)