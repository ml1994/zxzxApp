import React, {Component} from 'react'
import {View, TouchableOpacity, ImageBackground, Text, TextInput, StyleSheet,Alert} from 'react-native'
import { connect } from 'react-redux'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'
import * as askActions from '../actions/ask'

class AddAsk extends Component {

    constructor(){
        super()
        this.state = {
            title:'',
            descr:''
        }
    }

    publishFun(){
        const {dispatch} = this.props
        const {title,descr} = this.state

        myFetch.post(
            '/consult/save/question',
            `title=${title}&descr=${descr}`,
            res=>{
                console.log(res)
                if(res.code==0){
                    dispatch(this.addAsk())
                    dispatch(NavigationActions.back())
                }
            },
            err=>{
                console.log(err)
                Alert.alert('提示','添加错误')
            }
        )
        
    }

    addAsk(){
        const {dispatch} = this.props
        return dispatch=>{
            //dispatch({type:''})
            myFetch.get(
                '/consult/list/question',
                {page:1,pagesize:1000},
                res=>{
                    console.log(res)
                    if(res.code==0){
                        const askList = res.data.question.rows
                        dispatch(askActions.loadAskList({askList}))
                        dispatch({type:'LOADED_ASKLIST'})
                    }
                },
                err=>{
                    console.log(err)
                    Alert.alert('提示','获取列表失败')
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
                        <Text style={styles.title}>发起问题</Text>
                        <TouchableOpacity style={styles.btnView} onPress={()=>{this.publishFun()}}>
                            <Text style={styles.button}>发布</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleView}>
                        <TextInput 
                            style={styles.titleInput}
                            placeholder='标题'
                            placeholderTextColor='#595959'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={2}
                            maxLength={18}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            onChangeText={title=>this.setState({title})}/>
                        <Text style={styles.tip}>请不要超过18个字</Text>
                    </View>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='正文'
                        placeholderTextColor='#777'
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical='top'
                        maxLength={200}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        onChangeText={descr=>this.setState({descr})}/>
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
        height:50,
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
    titleView:{
        flexDirection:'row',
        marginTop:10,
        height:60,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5'
    },
    titleInput:{
        flex:1,
        fontSize:16,
        marginLeft:10
    },
    tip:{
        backgroundColor:'transparent',
        color:'#ed612a',
        fontSize:12,
        marginRight:10
    },
    textInput:{
        marginTop:10,
        marginHorizontal:10,
        fontSize:12,
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(AddAsk)
