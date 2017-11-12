import React, { Component } from 'react'
import { Image,View,StyleSheet,Text,TouchableOpacity } from 'react-native'
import Header from '../components/header'

export default class Star extends Component {

    render() {
        return (
            <View style={styles.rootView}>
                <Header type='title' title='精选'/>
                <Image style={styles.image} source={require('../asset/star_img.jpg')} resizeMode='cover'/>
                <View style={styles.textView}>
                    <Text style={styles.text}>精选版块包括最新的行业资讯、最前沿的消防产品</Text>
                    <Text style={styles.text}>信息、精选的技术咨询内容以及最热门的消防培训课程。</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    image:{
        width:'100%',
        height:310
    },
    textView:{
        height:'14%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:12,
        lineHeight:24,
        color:'#a09ea0'
    }
})