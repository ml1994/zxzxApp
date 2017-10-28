import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,TouchableOpacity,Text,Image,ScrollView,StyleSheet,Linking } from 'react-native'
import Header from '../components/header'
import CompInfo from '../containers/compInfo'
import Swiper from 'react-native-swiper'
import myFetch from '../utils/myFetch'
import * as appStateActions from '../actions/appState'


class DirectoryDetail extends Component {

    constructor(props){
        super(props)
        this.state={
            isVip:false,
            baseurl:'',
            name:'',
            type:'',
            address:'',
            phoneNum:'',
            fax:'',
            //zipCode:'',
            webUrl:'',
            info:'',
            major:'',
            productList:[],
            projectList:[],
            honorList:[]
        }
        const {dispatch} = this.props
        dispatch(this.getDetail())
    }

    getDetail(){
        const {dispatch,nav} = this.props
        const {id} = nav.routes[nav.index].params
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                `/api/pindexinfo/${id}`,
                {},
                res=>{
                    if(res.code==0){
                        console.log(res)
                        if(res.hasOwnProperty('partner')){//vip
                            let type = ''
                            let typeArr = res.data.ent.ent_type.split(',')
                            typeArr.map((item,index)=>{
                                switch (item) {
                                    case '1':
                                        type+='房地产企业'
                                        break
                                    case '2':
                                        type+='消防产品厂家'
                                        break
                                    case '3':
                                        type+='消防设计单位'
                                        break
                                    case '4':
                                        type+='消防施工单位'
                                        break
                                    case '5':
                                        type+='消防技术服务机构'
                                        break
                                    case '6':
                                        type+='社会单位'
                                        break
                                    default:
                                        break
                                }
                                if(index!=typeArr.length-1){
                                    type+=','
                                }
                            })
                            
                            this.setState({
                                isVip:true,
                                baseurl:res.baseurl,
                                name:res.data.ent.ent_name,
                                type,
                                address:res.data.ent.ent_addr,
                                phoneNum:res.data.ent.ent_phone,
                                fax:res.data.ent.ent_fax,
                                zipCode:res.data.ent.post_code,
                                webUrl:res.data.ent.ent_website,
                                info:res.data.ent.ent_produce,
                                major:res.data.ent.ent_major,
                                productList:res.data.product,
                                projectList:res.data.cases,
                                honorList:res.data.honor
                            })
                            console.log(this.state.fax)
                        }
                    }
                    
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                },
                err=>{
                    console.log(err)
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                }
            )
        }
    }

    render() {
        const rightButton = <Text style={styles.buttonText}>›</Text>
        const leftButton = <Text style={styles.buttonText}>‹</Text>
        const imgResolution = '/600x600'
        return (
            <View style={styles.rootView}>
                <Header type='title' title='企业信息'/>
                {
                    this.state.isVip?(
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Image style={styles.bannerImg} source={require('../asset/comp_info_banner.jpg')} resizeMode='cover'/>
                            <CompInfo iconName='home' iconSize={24} title='企业信息'>
                                <Text style={styles.infoText}>企业名称：{this.state.name?this.state.name:'暂无信息'}</Text>
                                <Text style={styles.infoText}>企业类型：{this.state.type?this.state.type:'暂无信息'}</Text>
                                <Text style={styles.infoText}>企业地址：{this.state.address?this.state.address:'暂无信息'}</Text>
                                <Text style={styles.infoText}>联系电话：{this.state.phoneNum?this.state.phoneNum:'暂无信息'}</Text>
                                <Text style={styles.infoText}>传真：{this.state.fax?this.state.fax:'暂无信息'}</Text>
                                <Text style={styles.infoText}>邮编：{this.state.zipCode?this.state.zipCode:'暂无信息'}</Text>
                                <Text style={styles.infoText}>网址：{this.state.webUrl?this.state.webUrl:'暂无信息'}</Text>
                            </CompInfo>
                            <CompInfo iconName='tasks' iconSize={20} title='企业简介'>
                                <Text style={[styles.introduction,styles.infoText]}>{this.state.info?'      '+this.state.info:'暂无信息'}</Text>
                            </CompInfo>
                            <CompInfo iconName='briefcase' iconSize={22} title='主营业务'>
                                <Text style={[styles.introduction,styles.infoText]}>{this.state.major?'      '+this.state.major:'暂无信息'}</Text>
                            </CompInfo>
                            <CompInfo iconName='fire-extinguisher' iconSize={22} title='企业产品'>
                                {
                                    this.state.productList.length>0?
                                        <Swiper style={styles.wrapper} showsButtons={this.state.productList.length==1?false:true} showsPagination={false} nextButton={rightButton} prevButton={leftButton}>
                                                {this.state.productList.map(item=>(
                                                    <View style={styles.listView}>
                                                        <Image style={styles.listImg} source={{uri:this.state.baseurl+'uploadify/renderThumb/'+item.product_thumb+imgResolution}} resizeMode='contain'/>
                                                        <Text style={styles.listText} numberOfLines={1}>{item.product_name}</Text>
                                                    </View>
                                                ))}
                                        </Swiper>
                                        :<View style={styles.nullView}>
                                            <Text>暂无相关信息</Text>
                                        </View>
                                }
                            </CompInfo>
                            <CompInfo iconName='building' iconSize={20} title='工程案例'>
                                {
                                    this.state.projectList.length>0?
                                        <Swiper style={styles.wrapper} showsButtons={this.state.projectList.length==1?false:true} showsPagination={false} nextButton={rightButton} prevButton={leftButton}>
                                                {this.state.projectList.map(item=>(
                                                    <View style={styles.listView}>
                                                        <Image style={styles.listImg} source={{uri:this.state.baseurl+'uploadify/renderThumb/'+item.case_mainpic+imgResolution}} resizeMode='contain'/>
                                                        <Text style={styles.listText} numberOfLines={1}>{item.case_name}</Text>
                                                    </View>
                                                ))}
                                        </Swiper>
                                        :<View style={styles.nullView}>
                                            <Text>暂无相关信息</Text>
                                        </View>
                                }
                            </CompInfo>
                            <CompInfo iconName='trophy' iconSize={22} title='企业荣誉'>
                                {
                                    this.state.honorList.length>0?
                                        <Swiper style={styles.wrapper} showsButtons={this.state.honorList.length==1?false:true} showsPagination={false} nextButton={rightButton} prevButton={leftButton}>
                                                {this.state.honorList.map(item=>(
                                                    <View style={styles.listView}>
                                                        <Image style={styles.listImg} source={{uri:this.state.baseurl+'uploadify/renderThumb/'+item.honor_pic+imgResolution}} resizeMode='contain'/>
                                                        <Text style={styles.listText} numberOfLines={1}>{item.honor_name}</Text>
                                                    </View>
                                                ))}
                                        </Swiper>
                                        :<View style={styles.nullView}>
                                            <Text>暂无相关信息</Text>
                                        </View>
                                }
                            </CompInfo>
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
        marginTop:4,
        color:'#333'
    },
    nullView:{
        width:'100%',
        height:30,
        justifyContent:'center',
        alignItems:'center'
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
    nav:store.nav,
    userinfo:store.userinfo
})

export default connect(mapStateToProps)(DirectoryDetail)
