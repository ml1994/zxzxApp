import React, { Component } from 'react'
import { View,Text } from 'react-native'
import Header from '../components/header'

export default class Login extends Component {

  render() {
    return (
      <View>
        <Header type='title' title='登录'/>
      </View>
    )
  }
}