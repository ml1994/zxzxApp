import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Header from '../components/header'
import Input from '../components/input'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

class ChangePassword extends Component {

	render() {
		const {dispatch}=this.props
		return (
			<View style={styles.rootView}>
				<Header type='title' title='忘记密码'/>
				<Input label='原密码' placeholder='请输入原密码'/>
				<Input label='新密码' placeholder='请输入验新密码'/>
				<Input label='确认密码' placeholder='请再次输入新密码'/>
				<TouchableOpacity style={styles.btnSubmit}>
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