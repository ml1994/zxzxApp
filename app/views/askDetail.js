import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity,RefreshControl,Alert} from 'react-native'
import {NavigationActions} from 'react-navigation'

import Header from '../components/header'
import Qa from '../components/qa'
import Icon from '../components/icon'
import myFetch from '../utils/myFetch'

import * as askActions from '../actions/ask'

class AskDetail extends Component {

    constructor(props){
        super(props)
        const {dispatch,nav} = this.props
        const nowIndex = nav.routes.length-1   //当前路由index
        this.state = {
            id:nav.routes[nowIndex].params.id,
            title:'',
            qaList:[],
            refreshing:false
        }
        dispatch(askActions.initQaList())
        dispatch(this.getQa())
    }

    getQa(){
        const {dispatch} = this.props
        return dispatch=>{
            dispatch({type:'LOADING_QA_LIST'})
            myFetch.get(
                '/consult/detail/question',
                {id:this.state.id},
                res=>{
                    console.log(res)
                    if(res.code==0){
                        dispatch(askActions.loadQaList({
                            title:res.data.question.title,
                            descr:res.data.question.descr,
                            created:res.data.question.created,
                            qaList:res.data.questionanswer
                        }))
                        dispatch({type:'LOADED_QA_LIST'})
                    }
                },
                err=>{
                    console.log(err)
                    Alert.alert('提示','获取问答信息失败')
                }
            )
        }
    }

    refreshFun(){
        const {dispatch} = this.props
        this.setState({refreshing: true})//开始刷新
        myFetch.get(
            '/consult/detail/question',
            {id:this.state.id},
            res=>{
                console.log(res)
                if(res.code==0){
                    dispatch(askActions.loadQaList({
                        qaList:res.data.questionanswer
                    }))
                    dispatch({type:'LOADED_QA_LIST'})
                    this.setState({refreshing: false})//停止刷新 
                }
            },
            err=>{
                console.log(err)
                Alert.alert('提示','获取问答信息失败')
                this.setState({refreshing: false})//停止刷新 
            }
        )
    }

    render() {
        const {dispatch} = this.props
        // const icons = ['pencil-square-o', 'search']
        const icons = ['pencil-square-o']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='技术咨询' icons={icons}/>
                <ScrollView
                    style={styles.scrollview}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this.refreshFun()}
                            tintColor="#ccc"
                            title="Loading..."
                            titleColor="#ccc"
                        />
                    }>   
                    <View style={styles.titleView}>
                        <View style={styles.dot}></View>
                        <Text style={styles.title} numberOfLines={2}>{this.props.ask.title}</Text>
                        <Image
                            style={styles.img}
                            source={require('../asset/qa.png')}
                            resizeMode='contain'/>
                    </View>
                    <Qa type='question' text={this.props.ask.descr} time={this.props.ask.created}/>
                    <FlatList data={this.props.ask.qaList} renderItem={({item})=><Qa type={item.type} text={item.content} time={item.created}/>}/>     
                </ScrollView>
                <TouchableOpacity style={styles.bottomBtn} onPress={()=>dispatch(NavigationActions.navigate({routeName:'AddOnAsk',params:{qid:this.state.id}}))}>
                    <Icon name='plus' size={14} color="#fff"/>
                    <Text style={styles.btnText}>追加问题</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '2%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff8a00',
        marginRight: 6
    },
    title: {
        fontSize: 18,
        width: '70%',
        color:'#202020'
    },
    img: {
        width: '20%',
        marginLeft: 10
    },
    bottomBtn:{
        flexDirection:'row',
        alignSelf:'flex-end',
        width:'100%',
        height:40,
        backgroundColor:'#e82325',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        marginLeft:6,
        color:'#fff'
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    ask:store.ask
})

export default connect(mapStateToProps)(AskDetail)