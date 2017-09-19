import React, { Component } from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default class Qa extends Component {

    render() {
        const {type,text,time} = this.props
        return (
            <View style={styles.rootView}>
                <View style={[styles.container,type=='question'?styles.questionBg:styles.answerBg]}>
                    <Text style={styles.text}>{text}</Text>
                    <Text style={styles.time}>{time}</Text>   
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        width:'100%',
        alignItems:'center'
    },
    container:{
        width:'96%',
        marginTop:10,
        paddingVertical:10,
        paddingHorizontal:14,
        borderWidth:1,
        borderColor:'#e5e5e5',
        borderRadius:3
    },
    questionBg:{
        backgroundColor:'#fff'
    },
    answerBg:{
        backgroundColor:'#f1f1f1'
    },
    text:{
        color:'#1e1e1e'
    },
    time:{
        marginTop:10,
        fontSize:12,
        color:'#ca8750'
    }
})
