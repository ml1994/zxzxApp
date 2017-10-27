import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,TouchableOpacity,Text,Image,ScrollView,StyleSheet,Linking } from 'react-native'
import Header from '../components/header'
import CompInfo from '../containers/compInfo'
import Swiper from 'react-native-swiper'


class DirectoryDetail extends Component {

    constructor(){
        super()
        this.state={
            swiperList:[
                {
                    iconName:'fire-extinguisher',
                    iconSize:22,
                    title:'企业产品',
                    list:[{
                        name:'产品名称'
                    },{
                        name:'产品名称'
                    },{
                        name:'产品名称'
                    }]
                },
                {
                    iconName:'building',
                    iconSize:20,
                    title:'工程案例',
                    list:[{
                        name:'案例名称'
                    },{
                        name:'案例名称'
                    },{
                        name:'案例名称'
                    }]
                },
                {
                    iconName:'trophy',
                    iconSize:22,
                    title:'企业荣誉',
                    list:[{
                        name:'荣誉名称'
                    },{
                        name:'荣誉名称'
                    },{
                        name:'荣誉名称'
                    }]
                }
            ]
        }
    }

    render() {
        let isVip = this.props.userinfo.vip
        const rightButton = <Text style={styles.buttonText}>›</Text>
        const leftButton = <Text style={styles.buttonText}>‹</Text>
        return (
            <View style={styles.rootView}>
                <Header type='title' title='企业信息'/>
                {
                    isVip?(
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Image style={styles.bannerImg} source={require('../asset/comp_info_banner.jpg')} resizeMode='cover'/>
                            <CompInfo iconName='home' iconSize={24} title='企业信息'>
                                <Text style={styles.infoText}>企业名称：xxx</Text>
                                <Text style={styles.infoText}>公司地址：xxx</Text>
                                <Text style={styles.infoText}>公司规模：xxx</Text>
                                <Text style={styles.infoText}>公司资质：xxx</Text>
                                <Text style={styles.infoText}>所属区域：xxx</Text>
                            </CompInfo>
                            <CompInfo iconName='tasks' iconSize={20} title='企业简介'>
                                <Text style={[styles.introduction,styles.infoText]}>        中消在线隶属于中消集团，于2016年11月9日上线，是中国首家以互联网+的思维模式打造的消防服务平台——中国消防在线.com（简称：中消在线）正式启动。中消在线是中消集团与公安部消防局合力开发运营的在线网络平台，历经2年对消防服务行业的深入调研，1年的前期筹划、资源整合及测试运营，“千呼万唤始出来”。</Text>
                            </CompInfo>
                            <CompInfo iconName='briefcase' iconSize={22} title='主营业务'>
                                <Text style={[styles.introduction,styles.infoText]}>检测、维保、评估</Text>
                            </CompInfo>
                            {
                                this.state.swiperList.map(item=>(
                                    <CompInfo iconName={item.iconName} iconSize={item.iconSize} title={item.title}>
                                        <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false} nextButton={rightButton} prevButton={leftButton}>
                                                {item.list.map(item=>(
                                                    <View style={styles.listView}>
                                                        <Image style={styles.listImg} source={{uri:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg'}} resizeMode='contain'/>
                                                        <Text style={styles.listText} numberOfLines={1}>{item.name}</Text>
                                                    </View>
                                                ))}
                                        </Swiper>
                                    </CompInfo>
                                ))
                            }
                        </ScrollView>
                    ):(
                        <View style={styles.container}>
                            <Image style={styles.img} resizeMode='contain' source={require('../asset/no_register.png')}/>
                            <Text style={styles.text}>您目前还不是VIP用户，不能查看相应信</Text>
                            <Text style={styles.text}>息，如想入驻成为VIP用户，请拨打以下电话:</Text>
                            <TouchableOpacity onPress={()=>{Linking.openURL('tel:400-1919-119').catch(e=>console.log(e))}} style={styles.marginTop10}>
                                <Text style={[styles.text,styles.underline]}>400-1919-119</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
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
        height:180
    },
    //组件内
    introduction:{
        textAlign:'justify'
    },
    infoText:{
        fontSize:16,
        color:'#333',
        lineHeight:24
    }, 
    wrapper: {
        height:160
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    buttonText:{
        color:'#ce2626',
        fontSize:50
    },
    listView:{
        height:'100%',
        paddingTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    listImg:{
        width:'100%',
        height:120
    },
    listText:{
        color:'#333'
    },
    //
    container: {
		marginTop: 100,
		alignItems: 'center'
	},
	img: {
		width: 100,
		height: 100,
		marginBottom: 10
	},
    marginTop10:{
        marginTop:10
    },
    text: {
        color: '#c9c9c9',
    },
    underline:{
        textDecorationLine:'underline'
    }
})

const mapStateToProps = store=>({
    userinfo:store.userinfo
})

export default connect(mapStateToProps)(DirectoryDetail)
