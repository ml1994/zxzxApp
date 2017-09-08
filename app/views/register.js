import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Header from '../components/header'

export default class Register extends Component {

  render() {
    return (
      <View>
        <Header type='title' title='注册'/>
      </View>
    )
  }
}