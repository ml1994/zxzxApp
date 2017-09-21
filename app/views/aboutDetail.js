import React, { Component } from 'react'
import { View,Image,StyleSheet,Text,ScrollView } from 'react-native'

import Header from '../components/header'
import Icon from '../components/icon'


export default class AboutDetail extends Component {

    renderContainer(){
        const {params} = this.props.navigation.state
        switch (params.type) {
            case 'Info':
                return (
                    <View style={styles.infoView}>
                        <View style={styles.titleView}>
                            <View style={styles.iconView}>
                                <View style={styles.iconBg}>
                                    <Icon name='bars' size={14} color='#fff'/>
                                </View>
                            </View>
                            <Text style={styles.title}>简介</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoTitleView}>
                                <View style={styles.square}></View>
                                <Text style={styles.infoTitle}>基本介绍</Text>
                            </View>
                            <Text style={styles.infoText}>中消在线隶属于中消集团，于2016年11月9日上线，是中国首家以互联网+的思维模式打造的消防服务平台——中国消防在线.com（简称：中消在线）正式启动。中消在线是中消集团与公安部消防局合力开发运营的在线网络平台，历经2年对消防服务行业的深入调研，1年的前期筹划。</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoTitleView}>
                                <View style={styles.square}></View>
                                <Text style={styles.infoTitle}>中消使命</Text>
                            </View>
                            <Text style={styles.infoText}>中消在线隶属于中消集团，于2016年11月9日上线，是中国首家以互联网+的思维模式打造的消防服务平台——中国消防在线.com（简称：中消在线）正式启动。中消在线是中消集团与公安部消防局合力开发运营的在线网络平台，历经2年对消防服务行业的深入调研，1年的前期筹划、资源整合及测试运营，“千呼万唤始出来”。</Text>
                        </View>
                    </View>
                )
                break;
            case 'Phone':
                return (
                    <View style={styles.textView}>
                        <Text style={styles.text}>客服热线：400-1919-119</Text>
                    </View>
                )
                break;
            case 'Registered':           
                return (
                    <View style={styles.textView}>
                        <Text style={styles.text}>版权由中消在线有限公司所有</Text>
                    </View>
                )
                break;
            default:
                break;
        }
    }

    render() {
        const {params} = this.props.navigation.state
        let title = ''
        switch (params.type) {
            case 'Info':
                title='公司简介'
                break;
            case 'Phone':
                title='客服热线'
                break;
            case 'Registered':           
                title='版权所有'
                break;
            default:
                break;
        }
        return (
            <View style={styles.rootView}>
                <Header ref='header' type='title' title={title}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.logoView}>
                        <Image resizeMode='contain' source={require('../asset/logo.png')} style={styles.logo}/>
                    </View>
                    {this.renderContainer()}
                </ScrollView>   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff',
    },
    logoView:{
        alignItems:'center'
    },
    logo:{
        width:130,
        height:180
    },
    //info
    infoView:{
        paddingBottom:20
    },
    titleView:{
        width:'100%',
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb',
        borderTopWidth:3,
        borderTopColor:'#eee'
    },
    iconView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    iconBg:{
        width:24,
        height:24,
        backgroundColor:'#FF5051',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        flex:5,
        fontSize:18,
        color:'#202020',
        fontWeight:'bold'
    },
    infoContainer:{
        marginTop:20
    },
    infoTitleView:{
        flexDirection:'row',
        alignItems:'center',
        height:30
    },
    square:{
        width:10,
        height:10,
        backgroundColor:'#ad0006'
    },
    infoTitle:{
        marginLeft:6,
        fontSize:16,
        color:'#ad0006'
    },
    infoText:{
        paddingHorizontal:16,
        fontSize:16,
        color:'#010101'
    },
    //phone and registered
    textView:{
        marginTop:160,
        alignItems:'center'
    },
    text:{
        fontSize:16,
        color:'#010101'
    }
})