import React, {Component} from 'react'
import {Text, TextInput, View, StyleSheet,Button,TouchableOpacity } from 'react-native'
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
			return <Icon name={this.props.iconLeft} size={20} color='#585858' />
		}
	}

	iconRightReader() {
		if (this.props.type == 'password') {
			return <View style={{width: '10%', alignItems: 'flex-end'}}><Icon name='eye' size={20} color='#585858'
			                                                                  style={{textAlign: 'right'}}/></View>
		}
		else if (this.props.type == 'sendCode') {
			return <TouchableOpacity style={styles.btnSend}><Text  style={{fontSize:8}}>发送短信</Text></TouchableOpacity>
		}
	}


	render() {
		return (
			<View style={styles.container}>
				<View style={{width:'10%'}}>
				{this.iconLeftReader()}
				</View>
				{this.inputRender()}
				<View style={{width:'10%',flex:1}}>
                    {this.iconRightReader()}
				</View>

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
		justifyContent:'space-between',
		paddingVertical: 20,
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1,
	},
	inputStyle: {
		height: 30,
		paddingVertical: 0,
		width: '80%',
		fontSize: 12
	},
	label: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#585858'
	},
	btnSend:{
		justifyContent:'center',
		borderWidth:1,
		borderColor:'#c41335',
        width:'100%',
        height:15,
	}
})