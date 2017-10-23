import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,Image,StyleSheet,ScrollView,TouchableOpacity} from 'react-native'
import Header from '../components/header'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'
import * as appStateActions from '../actions/appState'
import * as messageActions from '../actions/message'

class MessageDetail extends Component {

    constructor(props){
        super(props)
        this.state={
            img:'../asset/loading.gif',
            text:'',
            title:'',
            url:'',
            time:''
        }
        const {dispatch} = this.props
        dispatch(this.getDetail())
        dispatch(this.getMessageList())
    }

    getDetail(){
        const {dispatch} = this.props
        const id = this.props.nav.routes[2].params.id
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                `/message/getinfo/${id}`,
                {},
                res=>{
                    if(res.code==0){
                        this.setState({
                            img:res.data.tails.msg_pic,
                            text:res.data.tails.msg_text,
                            title:res.data.tails.msg_title,
                            url:res.data.tails.msg_url,
                            time:res.data.create_time
                        })
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

    getMessageList(){
        const {dispatch} = this.props
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                '/message/view',
                {},
                res=>{
                    console.log(res.data)
                    if(res.code==0){
                        dispatch(messageActions.loadList({messageList:res.data.rows}))
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
        const {dispatch} = this.props
        return (
            <View style={styles.rootView}>
                <Header type='title' title='消息详情'/>
                <ScrollView style={styles.container}>
                    <Image style={styles.img} source={{uri:this.state.img}} resizeMode='stretch'/>
                    <Text style={styles.titleText} numberOfLines={2}>{this.state.title}</Text>
                    <Text style={styles.timeText}>{this.state.time}</Text>
                    <Text style={styles.text}>{"        "+this.state.text}</Text>
                    <View style={styles.pressView}>
                        <TouchableOpacity style={styles.pressBtn} onPress={()=>{dispatch(NavigationActions.navigate({routeName:'News',params:{url:this.state.url}}))}}>
                            <Text style={styles.pressText}>点此查看</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        backgroundColor:'#FFF',
        flex:1,
    },
    container:{},
    img:{
        width:'100%',
        height:240
    },
    titleText:{
        marginTop:12,
        marginBottom:4,
        marginHorizontal:10,
        fontSize:20,
        color:'#000'
    },
    timeText:{
        fontSize:12,
        color:'#999',
        marginBottom:6,
        marginHorizontal:10
    },
    text:{
        marginHorizontal:10,
        color:'#000',
    },
    pressView:{
        justifyContent:'center',
        alignItems:'center',
        height:30
    },
    pressBtn:{
        height:30,
        width:60
    },
    pressText:{
        color:'#7af',
        textDecorationLine:'underline'
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(MessageDetail)