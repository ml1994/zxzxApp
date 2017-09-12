import React, {Component} from 'react'
import {View, Text, StyleSheet,Image,FlatList,ImageBackground} from 'react-native'
import Swiper from 'react-native-swiper'
import Header from '../components/header'
import Question from '../components/question'


export default class Subject extends Component {

    renderBtn(type){
        const bgImg = type=='next'?require('../asset/btn_bg_yellow.png'):require('../asset/btn_bg_red.png')
        const text = type=='next'?'下一题':'上一题'
        return (
            <ImageBackground source={bgImg} resizeMode='contain' style={styles.btn}>
                <Text style={styles.btnText}>{text}</Text>
            </ImageBackground>
        )
    }

    render() {
        const icons = ['pause']
        const qList = [{
            type:'单选题',
            question:'1. 依据《仓库防火安全管理规则》,库房内的照明灯具的垂直下方与储存物品水平间距不得小于(  )米。',
            answer:['0.3','0.4','0.5','0.6']
        },{
            type:'单选题',
            question:'1. 依据《仓库防火安全管理规则》,库房内的照明灯具的垂直下方与储存物品水平间距不得小于(  )米。',
            answer:['0.3','0.4','0.5','0.6']
        },{
            type:'单选题',
            question:'1. 依据《仓库防火安全管理规则》,库房内的照明灯具的垂直下方与储存物品水平间距不得小于(  )米。',
            answer:['0.3','0.4','0.5','0.6']
        }]
    

        return (
            <View style={styles.rootView}>
                <Header type='title' title='物业培训' icons={icons}/>
                <Swiper loop={false} showsPagination={false} showsButtons={true} buttonWrapperStyle={styles.buttonWrapperStyle} nextButton={this.renderBtn('next')} prevButton={this.renderBtn('prev')}>
                    {qList.map((item,index)=>{
                        return (
                            <View style={styles.page}>
                                <Question {...item} index={index}/>
                            </View>
                        )
                    })}
                </Swiper>
                <Image source={require('../asset/page_arrow.png')} resizeMode='contain' style={styles.arrow}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    buttonWrapperStyle:{
        top:140,
        justifyContent:'center'
    },
    arrow:{
        position:'absolute',
        right:0,
        bottom:0,
        width:100,
        height:100
    },
    page:{
        flex:1
    },
    btn:{
        marginTop:40,
        width:110,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff'
    }
})