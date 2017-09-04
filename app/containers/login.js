import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import * as userinfoActions from '../actions/userinfo'

export default class Login extends Component {

    loginFun(){

    }

    render() {
        return (
            <View style={styles.rootView}>
                <TextInput style={styles.loginInput}/>
                <TextInput style={styles.loginInput}/>
                <Button title="登录" onPress={this.loginFun.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        alignItems:'center'
    },
    loginInput: {
        width: '80%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#e91e63',
        borderRadius: 5
    }
})