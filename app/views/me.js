import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, Button, StyleSheet,FlatList} from 'react-native'
import {StackNavigator} from 'react-navigation'

import * as userinfoActions from '../actions/userinfo'

class Me extends Component {
    static navigationOptions = {
        title: 'me'
    }

    constructor(props) {
        super(props)
        const {dispatch} = this.props //dispatch要从this.props里先拿到才能使用
    }

    render() {
        return (
            <View>
                <Text>123</Text>
            </View>
        )
    }
}

const styles =StyleSheet.create({
    header:{
        flex:1
    }
})

const mapStateToProps = store => {
    return {userinfo: store.userinfo}
}

export default connect(mapStateToProps)(Me)

//export default Me