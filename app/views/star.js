import React, { Component } from 'react'
import { Image,View,StyleSheet } from 'react-native'
import Header from '../components/header'

export default class Star extends Component {

    render() {
        return (
            <View style={styles.rootView}>
                <Header type='title' title='精选'/>
                <Image style={styles.image} source={require('../asset/star_img.jpg')} resizeMode='cover'/>
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
    }
})