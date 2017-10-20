import React, { Component } from 'react'
import { View,Image,Text,FlatList,StyleSheet,Linking,TouchableOpacity } from 'react-native'
import Header from '../components/header'

import reportList from '../asset/reportInfo.json'

export default class Report extends Component {


    render() {
        
        return (
            <View style={styles.rootView}>
                <Header type='title' title='监督举报' />
                <Image style={styles.bannerImg} source={require('../asset/report_banner.jpg')} resizeMode='cover'/>

                <FlatList
                    data={reportList}
                    renderItem={
                        ({item})=>(
                            <TouchableOpacity style={styles.listItem} onPress={()=>{Linking.openURL('tel:'+item.tel).catch(e=>console.log(e))}}>
                                <Text style={styles.listText}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    }
                    numColumns={5}
                    style={styles.list}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    bannerImg:{
        width:'100%',
        height:184
    },
    list:{
        paddingVertical:20,
        paddingHorizontal:10
    },
    listItem:{
        width:'20%',
        height:30,
        justifyContent:'center',
        alignItems:'center'
    },
    listText:{
        color:'#000'
        
    }
})