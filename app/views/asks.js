import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, ScrollView, FlatList,Image,StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Header from '../components/header'
import Ask from '../components/ask'
import * as askActions from '../actions/ask'
import myFetch from '../utils/myFetch'

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
            dispatch({type:'LOADING_ASKLIST'})
            myFetch.get(
                '/consult/list/question',
                {page:1,pagesize:10},
                res=>{
                    console.log(res)
                    if(res.code==0){
                        const askList = res.data.rows
                        dispatch(askActions.loadAskList({askList}))
                        dispatch({type:'LOADED_ASKLIST'})
                    }
                },
                err=>{
                    console.log(err)
                    alert('获取列表失败')
                }
            )
        }
    }

    refreshFun(){
        const {dispatch} = this.props
        this.setState({refreshing: true})//开始刷新
        setTimeout(() => {
            alert('没有可刷新的内容！')
            this.setState({refreshing: false})//停止刷新
        },3000)            
    }
    
    render() {
        const icons = ['pencil-square-o','search']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='技术咨询' icons={icons}/>
                <ScrollView showsVerticalScrollIndicator={false}>    
                    {this.props.ask.askList?
                        (<FlatList data={this.props.ask.askList} renderItem={({item})=><Ask title={item.title} text={item.descr} time={item.created} id={item.id} update={item.answer_updated} refreshing={this.state.refreshing} onRefresh={()=>this.refreshFun()}/>}/>)
                        : (
                            <View style={styles.container}>
                                <Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
                                <Text style={styles.text}>您还没有咨询任何问题</Text>
                            </View>
                        )}
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