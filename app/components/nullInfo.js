import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class nullInfo extends Component {

    render() {
        const {img,text} = this.props
        return (
            <View style={styles.container}>
                <Image style={styles.img} resizeMode='contain' source={img}/>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:100,
        alignItems:'center'
    },
    img:{
        width:100,
        height:100,
        marginBottom:10
    },
    text:{
        color:'#c9c9c9'
    }
})

