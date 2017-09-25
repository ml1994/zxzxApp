import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity,Alert} from 'react-native'
import Header from '../components/header'
import Input from '../components/input'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import * as userinfoActions from '../actions/userinfo'
import myFetch from '../utils/myFetch'

class ChangePassword extends Component {

	constructor(){
		super()
		this.state = {
			oldPsw:'',
			newPsw:'',
			agNewPsw:''
		}
	}

	changeFun(){
		const {dispatch} = this.props
		const {oldPsw,newPsw,agNewPsw} = this.state
		myFetch.post(
			'/account/password/change',
			`old_password=${oldPsw}&new_password1=${newPsw}&new_password2=${agNewPsw}`,
			res=>{
				console.log(res)
				if(res.code==0){
					this.changeAndLoginout()
				}
			},
			err=>{
				console.log(err)
				Alert.alert('提示','修改失败')
			}
		)
	}

	changeAndLoginout(){
		const {dispatch} = this.props
		myFetch.get(
			'/account/logout',
			{},
			res=>{
				if(res.code==0){
					dispatch(userinfoActions.loginOut())
					dispatch(NavigationActions.navigate({ routeName: 'Home'}))
					dispatch(NavigationActions.navigate({ routeName: 'Login'}))
				}else{
					Alert.alert('提示','退出失败')
				}
			},
			err=>{
				console.log(err)
			}
		)
	}

	// goLoginAndClear() {
    //     const {dispatch} = this.props;
    //     const resetAction = NavigationActions.reset({//清空路由
    //         index: 0,//指定显示数组内的路由
    //         actions: [
    //             NavigationActions.navigate({ routeName: 'Login'}),
    //         ]
    //     });
    //     dispatch(resetAction);
    // }

	render() {
		const {dispatch}=this.props
		return (
			<View style={styles.rootView}>
				<Header type='title' title='修改密码'/>
				<Input label='原密码' placeholder='请输入原密码' onChangeText={oldPsw=>this.setState({oldPsw})}/>
				<Input label='新密码' placeholder='请输入新密码' onChangeText={newPsw=>this.setState({newPsw})}/>
				<Input label='确认密码' placeholder='请再次输入新密码' onChangeText={agNewPsw=>this.setState({agNewPsw})}/>
				<TouchableOpacity style={styles.btnSubmit} onPress={()=>this.changeFun()}>
					<Text style={styles.btnText}>确认修改</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		height: '100%',
		backgroundColor: '#fff',
		alignItems:'center'
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
})
const mapStateToProps=store=>{
	return {
		nav:store.nav
	}
}

export default connect(mapStateToProps)(ChangePassword)