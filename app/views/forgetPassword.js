import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Header from '../components/header'
import Input from '../components/input'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'
import * as userinfoActions from '../actions/userinfo'

class ForgetPassword extends Component {

	constructor() {
        super()
        this.state = {
            phone:'',
            key:'',
            psw:''
        }
	}
	
	forgetFun(){
        const {phone,key,psw} = this.state
        const {dispatch} = this.props
        myFetch.post(
            '/account/reset',
            `phone=${phone}&code=${key}&password=${psw}`,
            res=>{
                const user = {
                    phoneNum:phone,
                    psw:psw
                }
                if(res.code==0){
                    dispatch(NavigationActions.back())
                }
                
            },
            err=>{
                console.log(err)
                alert('注册失败')
            }
        )
    }

	render() {
		const {dispatch}=this.props
		return (
			<View style={styles.rootView}>
				<Header type='title' title='忘记密码'/>
				<Image resizeMode='contain' source={require('../asset/logo.png')} style={styles.logo}/>
				<View style={styles.inputsView}>
					<Input iconLeft='mobile' type='sendCode' placeholder='请输入手机号码' onChangeText={phone=>this.setState({phone})} phone={this.state.phone} smsType='forget'/>
					<Input iconLeft='key' placeholder='请输入验证码' onChangeText={key=>this.setState({key})}/>
					<Input iconLeft='lock' type='password' placeholder='请输入密码6-16位' onChangeText={psw=>this.setState({psw})}/>
				</View>
				<TouchableOpacity style={styles.btnSubmit} onPress={()=>this.forgetFun()}>
					<Text style={styles.btnText}>登录</Text>
				</TouchableOpacity>
				<View style={styles.managerView}>
					<TouchableOpacity onPress={() => dispatch(NavigationActions.navigate({routeName:'Register'}))}>
						<Text style={styles.managerText}>没账号?去注册</Text>
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

export default connect(mapStateToProps)(ForgetPassword)