import React, { Component } from 'react'
import { View,Text,StyleSheet } from 'react-native'
import Icon from '../components/icon'
import Swiper from 'react-native-swiper'

export default class CompInfo extends Component {

    constructor(props){
        super(props)
        this.state={
            childrenType : typeof this.props.children
        }
    }

    componentDidMount() {
        //console.log(this.props)
    }

    render() {
        //const isSwiper = this.props.isSwiper
        return (
            <View style={styles.rootView}>
                <View style={styles.titleView}>
                    <View style={styles.iconView}>
                        <Icon name={this.props.iconName} size={this.props.iconSize} color='#ce2626'/>                   
                    </View>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={[styles.textView]}>
                    {
                        this.state.childrenType=='object'?this.props.children:this.props.children.map(item=>(item))
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        marginHorizontal:10,
        marginTop:14,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    iconView:{
        width:30,
        justifyContent:'center',
        alignItems:'center'
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center',
    },
    title:{
        fontSize:20,
        color:'#333',
        fontWeight:'bold'
    },
    textView:{
        marginVertical:14,
        
    }
})