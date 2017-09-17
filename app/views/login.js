import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Header from '../components/header'
import Input from '../components/input'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

class Login extends Component {

	render() {
		const {dispatch}=this.props
		return (
			<View style={styles.rootView}>
				<Header type='title' title='登录'/>
				<Image resizeMode='contain' source={require('../asset/logo.png')} style={styles.logo}/>
				<Input iconLeft='mobile' placeholder='请输入手机号码'/>
				<Input iconLeft='lock' placeholder='请输入密码6-16位'/>
				<TouchableOpacity style={styles.btnSubmit}>
					<Text style={styles.btnText}>登录</Text>
				</TouchableOpacity>
				<View style={styles.managerView}>
					<Text style={styles.managerText}>没账号?去</Text>
					<TouchableOpacity onPress={() => dispatch(NavigationActions.navigate({routeName:'Register'}))}>
						<Text style={[styles.managerText,styles.managerTextSplice]}>注册</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => dispatch(NavigationActions.navigate({routeName:'ForgetPassword'}))}>
						<Text style={styles.managerText}>忘记密码</Text>
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
		marginTop:20
	},
	managerText: {
		color: '#0f1d4e'
	},
	managerTextSplice: {
		borderRightWidth: 1,
		borderRightColor: '#0f1d4e',
		paddingRight:5,
		marginRight:5
	}
})
const mapStateToProps=store=>{
	return {
		nav:store.nav
	}
}

export default connect(mapStateToProps)(Login)