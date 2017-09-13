import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from './icon'

export default class Question extends Component {

    render() {
        const {type,question,answer,index} = this.props
        return (
            <View style={styles.rootView}>
                <View style={styles.titleView}>
                    <View style={styles.typeView}>
                        <View style={styles.typeTextView}>
                            <Text style={styles.typeText}>{type}</Text>
                        </View>
                        <View style={styles.typeArrow}></View>
                    </View>
                    <Text style={styles.num}>
                        共
                        <Text style={styles.nowNum}>{index+1}</Text>
                        /50题
                    </Text>
                </View>
                <Text style={styles.question}>{question}</Text>
                <FlatList
                 style={styles.optionList}
                 data={answer} 
                 renderItem={({item})=>(
                        <TouchableOpacity style={styles.optionView}>
                            <View style={styles.optionCheck}>
                                <Icon name='check' size={14} color='#fff'/>
                            </View>
                            <View style={styles.optionNoCheck}></View>
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}/>
                {/* <TouchableOpacity>
                    <ImageBackground source={require('../asset/btn_bg.png')} resizeMode='contain' style={styles.btn}>
                        <Text style={styles.btnText}>下一题</Text>
                    </ImageBackground>
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        alignItems:'center'
    },
    titleView:{
        flexDirection:'row',
        width:'100%',
        height:50,
        marginTop:10,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
    },
    typeView:{
        flexDirection:'row'
    },
    typeTextView:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#faab00',
        height:30,
        paddingHorizontal:10
    },
    typeText:{       
        fontWeight:'bold',     
        color:'#fff',
    },
    typeArrow:{
        borderWidth:15,
        borderLeftColor:'#faab00',
        borderTopColor:'transparent',
        borderRightColor:'transparent',
        borderBottomColor:'transparent',
        height:0
    },
    num:{
        marginRight:12,
        color:'#3d3d3d'
    },
    nowNum:{
        color:'#ce2626'
    },
    question:{
        marginTop:18,
        fontSize:18,
        lineHeight:24,
        width:'90%',
        color:'#3d3d3d'
    },
    optionList:{
        marginTop: 30,
        width:'90%',
    },
    optionView:{
        flexDirection:'row',
        marginTop:10,
        borderWidth:1,
        borderColor:'#e5e5e5',
        borderRadius:5,
        width:'100%',
        height:40,
        alignItems:'center'
    },
    optionCheckView:{
        backgroundColor:'#eee'
    },
    optionCheck:{
        marginHorizontal:10,
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#dd4b4b',
        justifyContent:'center',
        alignItems:'center'
    },
    optionNoCheck:{
        marginHorizontal:10,
        width:20,
        height:20,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#bababa'
    },
    optionText:{
        fontSize:18
    },
    // btn:{
    //     marginTop:40,
    //     width:110,
    //     height:40,
    //     justifyContent:'center',
    //     alignItems:'center',
    // },
    // btnText:{
    //     fontSize:16,
    //     fontWeight:'bold',
    //     color:'#fff'
    // }
})