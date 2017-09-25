import React, {Component} from 'react'
import {View, Button, ImageBackground, Text, TextInput, StyleSheet,TouchableOpacity,Alert} from 'react-native'
import { connect } from 'react-redux'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'
import * as askActions from '../actions/ask'

class AddOnAsk extends Component {

    constructor(props){
        super(props)
        const nowIndex = this.props.nav.routes.length-1   //当前路由index
        this.state = {
            content:'',
            id:this.props.nav.routes[nowIndex].params.qid
        }
    }

    publishFun(){
        const {dispatch,nav} = this.props
        myFetch.post(
            '/consult/save/questionadd',
            `qid=${this.state.id}&content=${this.state.content}`,
            res=>{
                console.log(res)
                if(res.code==0){
                    dispatch(NavigationActions.back())
                    dispatch(this.addQaFun())
                }
            },
            err=>{
                console.log(err)
                Alert.alert('提示','发布失败')
            }
        )
    }

    addQaFun(){
        const {dispatch} = this.props
        return dispatch=>{
            dispatch({type:'ADDING_QA_LIST'})
            myFetch.get(
                '/consult/detail/question',
                {id:this.state.id},
                res=>{
                    console.log(res)
                    if(res.code==0){
                        dispatch(askActions.addQaList({
                            qaList:res.data.questionanswer
                        }))
                        dispatch({type:'ADDED_QA_LIST'})              
                    }
                },
                err=>{
                    console.log(err)
                    Alert.alert('提示','获取问答信息失败')
                }
            )
        }
    }

    render() {
        const {dispatch} = this.props
        return (
            <View style={styles.rootView}>
                <ImageBackground source={require('../asset/add_bg.jpg')} style={styles.imageBg}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.btnView} onPress={()=>{dispatch(NavigationActions.back())}}>
                            <Text style={styles.button}>取消</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>追加问题</Text>
                        <TouchableOpacity style={styles.btnView} onPress={()=>{this.publishFun()}}>
                            <Text style={styles.button}>发布</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={content=>this.setState({content})}
                        placeholder='请输入问题...'
                        placeholderTextColor='#a1a0a0'
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline={true}
                        maxLength={200}
                        underlineColorAndroid="transparent"/>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#ce2626'
    },
    imageBg:{
        marginTop:20,
        flex:1,
        width:'100%'
    },
    header:{
        flexDirection:'row',
        backgroundColor:'transparent',
        width:'100%',
        height: 50,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5'
    },
    title:{
        fontSize:20,
        color:'#1f1f1f'
    },
    btnView:{
        height:30,
        justifyContent:'center'
    },
    button:{
        fontSize:12,
        color:'#c2990c',
        width: 50,
        textAlign:'center'
    },
    textInput:{
        marginTop:20,
        marginHorizontal:10,
        fontSize:12,
    }
})


const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(AddOnAsk)
