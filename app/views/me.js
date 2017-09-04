import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, Button, FlatList} from 'react-native'
import {StackNavigator} from 'react-navigation'
import * as userinfoActions from '../actions/userinfo'


class Me extends Component {
    static navigationOptions = {
        title: 'me'
    }

    constructor(props) {
        super(props)
        const {dispatch} = this.props //dispatch要从this.props里先拿到才能使用
        //初始化
        dispatch(userinfoActions.initial([{
            num:1,
            name:'haha'
        },{
            num:2,
            name:'xixi'
        }]))
    }

    

    changeInfo(url){
        this.props.dispatch(userinfoActions.getInfo(url))
    }


    render() {
        return (
            <View>
                <Text>Me</Text>
                <FlatList data={this.props.userinfo} renderItem={({item})=><Text>{item.num+'-'+item.name}</Text>} />
                <Button title="get" onPress={()=>{this.changeInfo('http://115.236.94.196:30005/tech/dict/get/501')}} />
            </View>
        )
    }
}

const mapStateToProps=store=>{
    return {
        userinfo:store.userinfo
    }
}

export default connect(
    mapStateToProps
)(Me)

//export default Me
