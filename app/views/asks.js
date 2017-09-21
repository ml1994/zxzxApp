import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, ScrollView, FlatList,Image,StyleSheet,RefreshControl} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Header from '../components/header'
import Ask from '../components/ask'
import myFetch from '../utils/myFetch'
import * as askActions from '../actions/ask'
import * as appStateActions from '../actions/appState'

class Asks extends Component {
    constructor(props){
        super(props)
        const {dispatch} = this.props
        this.state={
            refreshing:false,
        }

        myFetch.get(
            '/account/islogin',
            {},
            res=>{
                console.log(res)
                if(res.code=='0'){
                    dispatch(askActions.initAskList())
                    dispatch(this.getList())
                }else{
                    dispatch(NavigationActions.navigate({routeName:'Login'}))
                }
            },
            err=>{
                console.log(err)
            }
        )
    }

    getList(){
        const {dispatch} = this.props
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                '/consult/list/question',
                {page:1,pagesize:1000},
                res=>{
                    console.log(res)
                    if(res.code==0){
                        if(res.data.rows.length!=0){
                            const askList = res.data.rows
                            dispatch(askActions.loadAskList({askList}))
                            dispatch({type:'LOADED_ASKLIST'})
                        }else{
                            dispatch({type:'NO_ASKLIST'})
                        }
                    }
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                },
                err=>{
                    console.log(err)
                    alert('获取列表失败')
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                }
            )
        }
    }

    refreshFun(){
        const {dispatch} = this.props
        this.setState({refreshing: true})//开始刷新
        myFetch.get(
            '/consult/list/question',
            {page:1,pagesize:1000},
            res=>{
                console.log(res)
                if(res.code==0){
                    if(res.data.rows.length!=0){
                        const askList = res.data.rows
                        dispatch(askActions.loadAskList({askList}))
                        dispatch({type:'LOADED_ASKLIST'})
                    }else{
                        dispatch({type:'NO_ASKLIST'})
                    }
                }
                this.setState({refreshing: false})//停止刷新 
            },
            err=>{
                console.log(err)
                alert('获取列表失败')
                this.setState({refreshing: false})//停止刷新 
            }
        )  
    }
    
    render() {
        const icons = ['pencil-square-o','search']
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
                    {this.props.ask.askList?
                        (<FlatList data={this.props.ask.askList} renderItem={({item})=><Ask title={item.title} text={item.descr} time={item.created} id={item.id} update={item.answer_updated}/>}/>)
                        : (
                            <View style={styles.container}>
                                <Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
                                <Text style={styles.text}>您还没有咨询任何问题</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    container:{
        marginTop:100,
        alignItems:'center'
    },
    img:{
        width:100,
        height:100,
        marginBottom:10
    },
    text:{
        color:'#c9c9c9'
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    ask:store.ask
})

export default connect(mapStateToProps)(Asks)