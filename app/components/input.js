import React, {Component} from 'react'
import {Text, TextInput, View, StyleSheet, Button, TouchableOpacity} from 'react-native'
import Icon from '../components/icon'

export default class Input extends Component {
	inputRender() {
		return (
			<TextInput style={styles.inputStyle}
			           {...this.props}
			           placeholder={this.props.placeholder}
			           underlineColorAndroid='transparent'
			           placeholderTextColor='#777'
			           secureTextEntry={(this.props.type == 'password') ? true : false}
			>
			</TextInput>
		)
	}

	iconLeftReader() {
		let type = this.props.type;
		if (this.props.label) {
			return <Text style={styles.label}>{this.props.label}</Text>
		}
		else {
			return <View style={styles.iconContainer}><Icon name={this.props.iconLeft} size={(this.props.iconLeft=='mobile')?16:14} color='#585858'/></View>
		}
	}

	iconRightReader() {
		if (this.props.type == 'password') {
			return <Icon name='eye' size={12} color='#585858' style={{textAlign: 'right'}}/>
		}
		else if (this.props.type == 'sendCode') {
			return (
				<TouchableOpacity style={styles.btnSend}><Text style={styles.btnText}>获取短验证码</Text></TouchableOpacity>)
		}
	}


	render() {
		return (
			<View style={styles.container}>
				{this.iconLeftReader()}
				{this.inputRender()}
				{this.iconRightReader()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 20,
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1,
	},
	inputStyle: {
		height: 30,
		paddingVertical: 0,
		paddingHorizontal: 20,
		width: '60%',
		fontSize: 12
	},
	label: {
		width: '20%',
		textAlign: 'right',
		fontSize: 12,
		fontWeight: 'bold',
		color: '#585858'
	},
	iconContainer:{
		width:20,
		alignItems:'center'
	},
	btnSend: {
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#eb6100',
		width: 'auto',
		height: 15,
	},
	btnText: {
		paddingHorizontal: 1.5,
		paddingVertical:5,
		textAlign: 'center',
		fontSize: 8,
		color: '#eb6100'
	}
})