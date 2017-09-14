import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, FlatList, ImageBackground, Modal, TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import Swiper from 'react-native-swiper'
import Header from '../components/header'
import Question from '../components/question'
import Icon from '../components/icon'


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

    renderModal(type){
        switch (type) {
            case 'start':
                return (
                    <View style={styles.modalStart}>
                        <View style={styles.modalStartTop}>
                            <Text style={styles.modalStartTopText}>您上一次回答道第1题，是否继续进行？</Text>
                        </View>
                        <View style={styles.modalStartBottom}>
                            <ImageBackground source={require('../asset/btn_bg_red.png')} resizeMode='contain' style={styles.btn}>
                                <Text style={styles.btnText}>继续挑战</Text>
                            </ImageBackground>
                            <ImageBackground source={require('../asset/btn_bg_yellow.png')} resizeMode='contain' style={styles.btn}>
                                <Text style={styles.btnText}>重新开始</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.modalClose}>
                            <TouchableOpacity style={styles.modalCloseView}>
                                <Icon name='close' size={28} color='#fff'/>
                            </TouchableOpacity>
                            <View style={styles.modalLine}></View>
                        </View>
                    </View>
                )
                break;
            case 'pause':
                
                break;
            case 'end':
                return (
                    <View style={styles.modalEnd}>
                        <ImageBackground style={styles.modalEndImg} source={require('../asset/modal_end_bg.png')} resizeMode="contain">
                            <Text style={styles.modalEndScore}>98</Text>
                            <Text style={styles.modalEndScoreText}>分数</Text>
                            <Text style={styles.modalEndBottomText}>对49题，错1题！</Text>
                            <ImageBackground source={require('../asset/btn_bg_yellow.png')} resizeMode='contain' style={styles.btn}>
                                <Text style={styles.btnText}>重新挑战</Text>
                            </ImageBackground>
                        </ImageBackground>
                        <View style={styles.modalClose}>
                            <TouchableOpacity style={styles.modalCloseView}>
                                <Icon name='close' size={28} color='#fff'/>
                            </TouchableOpacity>
                            <View style={styles.modalLine}></View>
                        </View>
                    </View>
                )
                break;
        
            default:
                break;
        }
        
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    >
                    <TouchableOpacity style={styles.modalView}>
                        {this.renderModal('end')}
                    </TouchableOpacity>
                </Modal>
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
    //上下题按钮
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
        color:'#fff',
        backgroundColor:'transparent'
    },
    //modal
    modalView:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:'rgba(0,0,0,.5)'
    },
    //modalStart
    modalStart:{
        borderRadius:20,
        alignItems:'center',
        backgroundColor:'#fff',
        overflow:'visible'
    },
    modalStartTop:{
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingVertical:40,
        paddingHorizontal:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#e92e2e'
    },
    modalStartTopText:{
        color:'#fff',
        fontSize:22,
        lineHeight:30
    },
    modalStartBottom:{
        flexDirection:'row',
        paddingVertical:30
    },
    modalClose:{
        position:'absolute',
        right:0,
        top:-100,
    },
    modalCloseView:{
        width:40,
        height:40,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    modalLine:{
        marginLeft:20,
        height:60,
        borderLeftWidth:1,
        borderLeftColor:'#fff'
    },
    //modalEnd
    modalEnd:{
        borderRadius:20,
        overflow:'visible',
        height:'58%'
    },
    modalEndImg:{ 
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    modalEndScore:{
        marginTop:84,
        fontSize:66,
        color:'#fff',
        padding:0
    },
    modalEndScoreText:{
        marginTop:10,
        color:'#7d7d7d',
        fontSize:24,
        fontWeight:'bold',
        padding:0
    },
    modalEndBottomText:{
        marginTop:30,
        fontSize:20,
        color:'#ce2626',
        fontWeight:'bold',
        padding:0
    }
    
})