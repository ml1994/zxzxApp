import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, Button, StyleSheet} from 'react-native'

import * as userinfoActions from '../actions/userinfo'

import Menu from '../components/menu'
import Icon from '../components/icon'

class Me extends Component {
    // static navigationOptions = {
    //     title: 'me'
    // }

    constructor(props) {
        super(props)
        const {dispatch} = this.props //dispatch要从this.props里先拿到才能使用
    }

    render() {
        const menuArr = [{
            iconName:'file-text-o',
            text:'个人设置',
            nav:''
        },{
            iconName:'pencil',
            text:'关于我们',
            nav:'AboutUs'
        }]
        const phoneNum = '13168301123'
        const intro = '您的掌上消防专家'
        return (
            <View>
                <View style={styles.header}>
                    <Icon name='user-circle-o' size={60} color='#fff'/>
                    <Text style={styles.phoneNum}>{phoneNum}</Text>
                    <Text style={styles.intro}>{intro}</Text>
                </View>
                <Menu menuArr={menuArr}/>
            </View>
        )
    }
}

const styles =StyleSheet.create({
    header:{
        width:'100%',
        height:200,
        backgroundColor:'#ce2626',
        marginBottom:6,
        justifyContent:'center',
        alignItems:'center'
    },
    phoneNum:{
        marginTop:12,
        fontSize:20,
        color:'#fff'
    },
    intro:{
        marginTop:6,
        fontSize:12,
        color:'#fff'
    }
})

const mapStateToProps = store => {
    return {userinfo: store.userinfo}
}

export default connect(mapStateToProps)(Me)

//export default Me