import React, { Component } from 'react'
import { View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import Header from '../components/header'

export default class Directory extends Component {

    constructor(){
        super()
        this.state={
            tabsList:['全部','地产企业','消防企业','其他企业']
        }
    }

    render() {
        return (
            <View style={styles.rootView}>
                <Header type='title' title='企业名录'/>
                <View></View>
                <View style={styles.tabsView}>
                {
                    this.state.tabsList.map((value,index)=>(
                        <TouchableOpacity style={styles.tabView} onPress={()=>{this.changeTab(value.nav)}}>
                            <Text style={styles.tabText}>{value.title}</Text>
                        </TouchableOpacity>
                    ))
                }
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
    tabsView:{
        flexDirection:'row',
        flex:4,
        justifyContent:'center',
        height:36,
    },
    tabView:{
        marginTop:4,
        marginHorizontal:10,
        width:72,
        alignItems:'center',
        height:'100%'
    },
    tabText:{
        fontSize:18,
        color:'#fff',
        height:'100%'
    }
})