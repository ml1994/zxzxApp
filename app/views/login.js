import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import JPushModule from 'jpush-react-native'
import Header from '../components/header'
import Input from '../components/input'
import myFetch from '../utils/myFetch'

import * as userinfoActions from '../actions/userinfo'
import * as askActions from '../actions/ask'
import * as testActions from '../actions/test'


class Login extends Component {

	constructor(props) {
		super(props)
		const {dispatch} = this.props
		dispatch(userinfoActions.initLogin())
		this.state = {
			account: '',
			psw: ''
		}
	}

	asyLogin(payload) {
		const {dispatch} = this.props
		const {account, psw} = this.state

		return dispatch => {
			dispatch({type: 'LOGING'})
			myFetch.post(
				'/account/login',
				`phone=${account}&password=${psw}`,
				resj => {
					const {code, message} = resj
					if (code == 0) {
						this.postJPushRegistrationId()//发送registrationId
						dispatch(userinfoActions.login(payload))
						dispatch(this.asyGetUserinfo())//获取用户信息
						dispatch(this.initMaxScore())//获取最高分
						dispatch(this.getList())//获取问题列表
						dispatch(NavigationActions.back())
					} else {
						Alert.alert('提示', message)
					}
				},
				err => {
					console.log(err)
					dispatch({type: 'LOGIN_ERROR'})
				}
			)
		}
	}

	initMaxScore() {//获取最高分
		const {dispatch} = this.props
		let maxScore = new Array()
		return dispatch => {
			dispatch({type: 'GETTING_MAX_SCORE'})
			myFetch.get(
				'/examqueBank/list',
				{},
				res => {
					res.rows.map((item) => {
						maxScore.push(item.maxscore);
					})
					console.log(res, maxScore)
					dispatch(testActions.getMaxScore({maxScore}))
				},
				err => {
					console.log(err)
				}
			)
		}
	}

	getList() {//获取问题列表
		const {dispatch} = this.props
		return dispatch => {
			//dispatch(appStateActions.fetch({fetching:true}))
			myFetch.get(
				'/consult/list/question',
				{page: 1, pagesize: 1000},
				res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.question.rows.length != 0) {
							let vip = ''
							let partner = ''
							if (res.data.partner) {
								partner = res.data.partner.tails.partner_name
								vip = true
							} else {
								vip = false
							}
							const askList = res.data.question.rows
							dispatch(userinfoActions.getInfo({
								account: askList[0].tails.account,
								vip,
								partner
							}))
							dispatch(askActions.loadAskList({askList}))
							dispatch({type: 'LOADED_ASKLIST'})
						} else {
							dispatch({type: 'NO_ASKLIST'})
						}
					}
				},
				err => {
					console.log(err)
					Alert.alert('提示', '获取列表失败')
				}
			)
		}
	}
	getCompAskList() {
		const {dispatch} = this.props
		const params = {
			page: 1,
			pageSize: 1000,
			type:1
		}
		return dispatch => {
			myFetch.get(
				'/consult/list/questionCompany',
				params,
				res => {
					console.log(123)
					if (res.code == 0) {
						if (res.data.question.rows.length != 0) {
							let vip = ''
							let partner = ''
							let account = res.data.partner.phone
							if (res.data.partner) {
								partner = res.data.partner.tails.partner_name
								vip = true
							} else {
								vip = false
							}
							const compAskList = res.data.question.rows
							dispatch(userinfoActions.getInfo({
								account: account,
								vip,
								partner
							}))
							dispatch(askActions.loadCompAskList({compAskList}))
							dispatch({type: 'LOADED_COMPASKLIST'})
						} else {
							dispatch(askActions.initCompAskList())
							dispatch({type: 'NO_COMPASKLIST'})
						}
					}
				},
				err => {
					console.log(err)
					Alert.alert('提示', '获取列表失败')
				}
			)
		}
	}
	asyGetUserinfo() {
		//获取用户信息
		const {dispatch} = this.props
		return dispatch => {
			dispatch({type: 'GETING'})
			myFetch.get(
				'/account/getinfo',
				{},
				resj => {
					const {account} = resj.data
					let vip = ''
					let partner = ''
					if (resj.data.tails.vip == true) {
						vip = resj.data.tails.vip
						partner = resj.data.tails.staff.tails.partner_name
						dispatch(this.getCompAskList())
					}
					const info = Object.assign({}, {account, vip, partner})
					dispatch(userinfoActions.getInfo(info))
					dispatch({type: 'GETING_END'})
				},
				err => {
					console.log(err)
					dispatch({type: 'GET_ERROR'})
				}
			)
		}
	}

	postJPushRegistrationId() {
		JPushModule.getRegistrationID((registrationId) => { //JPush传送registrationId给后台
			//console.log(registrationId)
			myFetch.post(
				'/push/reg',
				`id=${registrationId}`,
				res => {
					console.log(registrationId, res)
				},
				err => {
					console.log(err)
				}
			)
		})
	}

	loginFun() {
		const userinfo = this.state
		const {dispatch} = this.props
		dispatch(this.asyLogin(userinfo))
	}

	render() {
		const {dispatch, userinfo} = this.props

		return (
			<KeyboardAvoidingView style={styles.rootView} behavior="padding">
				<Header type='title' title='登录' isLoginPage={true}/>
				<Image resizeMode='contain' source={require('../asset/logo.png')} style={styles.logo}/>
				<View style={styles.inputsView}>
					<Input iconLeft='mobile' placeholder='请输入手机号码' onChangeText={account => this.setState({account})}/>
					<Input iconLeft='lock' type='password' placeholder='请输入密码6-16位'
						   onChangeText={psw => this.setState({psw})}/>
				</View>
				<TouchableOpacity style={styles.btnSubmit} onPress={() => this.loginFun()}>
					<Text style={styles.btnText}>登录</Text>
				</TouchableOpacity>
				<View style={styles.managerView}>
					<TouchableOpacity onPress={() => dispatch(NavigationActions.navigate({routeName: 'Register'}))}>
						<View style={[styles.managerTextSplice]}>
							<Text style={styles.managerText}>没账号?去注册</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => dispatch(NavigationActions.navigate({routeName: 'ForgetPassword'}))}>
						<Text style={styles.managerText}>忘记密码</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		height: '100%',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: 130
	},
	inputsView: {
		width: '80%'
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
		color: '#0f1d4e',
	},
	managerTextSplice: {
		borderRightWidth: 1,
		borderRightColor: '#0f1d4e',
		paddingRight: 5,
		marginRight: 5,
	}

})
const mapStateToProps = store => {
	return {
		nav: store.nav,
		userinfo: store.userinfo
	}
}

export default connect(mapStateToProps)(Login)