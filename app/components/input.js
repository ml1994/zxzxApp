import React, {Component} from 'react'
import {Text, TextInput, View, StyleSheet,Button} from 'react-native'
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
		if (this.props.label){
			return <Text style={styles.label}>{this.props.label}</Text>
		}
		else {
			return <View style={{width:'10%'}}><Icon name={this.props.iconLeft} size={20} color='#585858' /></View>
		}
	}

	iconRightReader() {
		if (this.props.type == 'password') {
			return <View style={{width: '10%', alignItems: 'flex-end'}}><Icon name='eye' size={20} color='#585858'
			                                                                  style={{textAlign: 'right'}}/></View>
		}
		else if (this.props.type == 'sendCode') {
			return <Button title="Learn More" color="#841584" style={styles.btnSend}/>
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
		marginTop: 50,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',

		paddingVertical: 20,
		width: '100%',
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1,
	},
	inputStyle: {
		height: 30,
		paddingVertical: 0,
		width: '30%',
		fontSize: 12
	},
	label: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#585858'
	},
	btnSend:{
		width:30,
		padding:0
	}
})