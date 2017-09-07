import React, {Component} from 'react'
import {View, Text, Image,TouchableOpacity,StyleSheet} from 'react-native'

export default class Question extends Component {

    render() {
        return (
            <View style={styles.rootView}>
                <TouchableOpacity style={styles.touchView}>
                    <View style={styles.titleView}>
                        <View style={styles.dot}></View>
                        <Text style={styles.title} numberOfLines={1}>我提的问题</Text>
                    </View>
                    <Text style={styles.text} numberOfLines={3}>哈哈哈哈哈哈哈哈哈哈哈或哈哈哈哈哈哈哈哈哈哈哈或哈哈哈哈哈哈哈哈哈哈哈或哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或</Text>
                    <Text style={styles.time}>2017-9-20 12:00</Text>
                    <Image source={require('../asset/ask_new.png')} resizeMode='contain' style={styles.corner}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        width:'90%',
        height:100,  
    },
    touchView:{
        backgroundColor:'#f1f1f1',
        paddingHorizontal:10,
        paddingVertical:10,
        justifyContent:'space-around',
        borderRadius:3
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center'
    },
    dot:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'#ff8a00',
        marginRight:6
    },
    title:{
        fontSize:18
    },
    text:{
        marginLeft:16,
        marginTop:10,
        fontSize:12
    },
    time:{
        marginTop:6,
        alignSelf:'flex-end',
        color:'#555',
        fontSize:10
    },
    corner:{
        position:'absolute',
        right:0,
        top:0,
        width:38,
        height:30
    }
})