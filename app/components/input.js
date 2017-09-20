import React, {Component} from 'react'
import {Text, TextInput, View, StyleSheet, Button, TouchableOpacity} from 'react-native'
import Icon from '../components/icon'
import myFetch from '../utils/myFetch'

export default class Input extends Component {

	constructor(props){
		super(props)
		const seePsw =  this.props.type=='password'?true:false
		this.state = {
			eyeName:'eye',
			seePsw,
            smsText:'获取验证码',
            smsNum:60,
            smsDisable:false
		}
	}

	inputRender() {
		return (
			<TextInput style={[styles.inputStyle, {width: (this.props.type) ? '70%' : '90%'}]}
			           {...this.props}
			           placeholder={this.props.placeholder}
			           underlineColorAndroid='transparent'
			           placeholderTextColor='#777'
			           secureTextEntry={this.state.seePsw}
					   autoCapitalize='none'
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
			return <TouchableOpacity style={styles.btnEyes} onPress={()=>this.eyesFun()}><Icon name={this.state.eyeName} size={14} color='#adadad'/></TouchableOpacity>
		}
		else if (this.props.type == 'sendCode') {
			return <TouchableOpacity disabled={this.state.smsDisable} style={this.state.smsDisable?styles.btnSendDisable:styles.btnSend} onPress={()=>this.smsFun(this.props.smsType)}><Text style={this.state.smsDisable?styles.btnTextDisable:styles.btnText}>{this.state.smsText}</Text></TouchableOpacity>
		}
	}

	eyesFun(){
		const eyeName = this.state.seePsw?'eye-slash':'eye'
		this.setState(prevState=>({
			seePsw:!prevState.seePsw,
			eyeName
		}))
	}

	smsFun(type){
        this.smsBtnFun()
        const {phone} = this.props
        const url = type=='reg'?'/account/sendsms':'/account/restsms'
        myFetch.post(
            url,
            `phone=${phone}`,
            res=>{
                console.log(res)
                if(res.code==0){
                    console.log('发送成功')
                }
            },
            err=>{
                console.log(err)
                alert('发送失败')
            }
        )
	}

	smsBtnFun(){
        if (this.state.smsNum == 0) {
            this.setState({
                smsText:`获取验证码`,
                smsNum:60,
                smsDisable:false
            })
        } else {
            this.setState(prevState=>({
                smsText:`重新发送(${prevState.smsNum})`,
                smsNum:prevState.smsNum-1,
                smsDisable:true
            }))
            setTimeout(()=>{
                this.smsBtnFun()
            }, 1000)
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
		width: '100%',
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
	btnEyes:{
		position: 'absolute', 
		right: 0
	},
	btnSend: {
		justifyContent: 'center',
		borderRadius: 1,
		borderWidth: 1,
		borderColor: '#eb6100',
		position: 'absolute',
		right: 0,
        height: 20,
        width:80
    },
    btnSendDisable:{
        justifyContent: 'center',
		borderRadius: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		position: 'absolute',
		right: 0,
        height: 20,
        width:80
    },
	btnText: {
		paddingHorizontal: 5,
		textAlign: 'center',
		fontSize: 10,
		color: '#eb6100'
    },
    btnTextDisable:{
        paddingHorizontal: 5,
		textAlign: 'center',
		fontSize: 10,
		color: '#ccc'
    }
})