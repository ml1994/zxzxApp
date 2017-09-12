import React, {Component} from 'react'
import {Text, TextInput, View, StyleSheet, Button, TouchableOpacity} from 'react-native'
import Icon from '../components/icon'

export default class Input extends Component {
	inputRender() {
		return (
			<TextInput style={[styles.inputStyle, {width: (this.props.type) ? '70%' : '90%'}]}
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
		let iconSize = 0
		switch (this.props.iconLeft) {
			case 'mobile':
				iconSize = 20;
				break;
			case 'key':
				iconSize = 14;
				break;
			default:
				iconSize = 18;
				break;
		}

		if (this.props.label) {
			return <Text style={styles.label}>{this.props.label}</Text>
		}
		else {
			return <View style={styles.iconContainer}><Icon name={this.props.iconLeft}
			                                                size={iconSize}
			                                                color='#585858'/></View>
		}
	}

	iconRightReader() {
		if (this.props.type == 'password') {
			return <View style={{position: 'absolute', right: 0}}><Icon name='eye' size={14} color='#adadad'/></View>
		}
		else if (this.props.type == 'sendCode') {
			return (
				<TouchableOpacity style={styles.btnSend}><Text style={styles.btnText}>获取验证码</Text></TouchableOpacity>)
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
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1,
	},
	inputStyle: {
		height: 20,
		paddingVertical: 0,
		paddingHorizontal: 20,
		fontSize: 16
	},
	label: {
		width: '20%',
		textAlign: 'right',
		fontSize: 12,
		fontWeight: 'bold',
		color: '#585858'
	},
	iconContainer: {
		width: 20,
		alignItems: 'center',
	},
	btnSend: {
		justifyContent: 'center',
		borderRadius: 1,
		borderWidth: 1,
		borderColor: '#eb6100',
		position: 'absolute',
		right: 0,
		height: 20,
	},
	btnText: {
		paddingHorizontal: 5,
		textAlign: 'center',
		fontSize: 10,
		color: '#eb6100'
	}
})