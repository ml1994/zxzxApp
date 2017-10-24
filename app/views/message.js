import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View,TouchableOpacity,ListView,StyleSheet,Text,Alert} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'
import {NavigationActions} from 'react-navigation'
import Header from '../components/header'
import myFetch from '../utils/myFetch'
import * as appStateActions from '../actions/appState'
import * as messageActions from '../actions/message'

class Message extends Component {

    constructor(props){
        super(props)
        const {dispatch} = this.props
        dispatch(this.getMessageList())
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

    onPressMessage(data){
        const {dispatch} = this.props

        if(data.msg_type==1){
            dispatch(NavigationActions.navigate({
                routeName:'MessageDetail',
                params:{id:data.id}
            }))
        }else if(data.msg_type==2){
            dispatch(NavigationActions.navigate({routeName:'AskDetail',params:{id:data.tails.msg_consultid}}))
        }
    }

    delMessage(data, secId, rowId, rowMap){
        const {dispatch} = this.props
        myFetch.get(
            '/message/remove',
            {id:data.id},
            res=>{
                Alert.alert('提示','删除成功')
                rowMap[`${secId}${rowId}`].closeRow()
                dispatch(this.getMessageList())
            },
            err=>{
                console.log(err)
            }
        )
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        return (
            <View>
                <Header type='title' title='消息中心'/>
                <SwipeListView
                    dataSource={ds.cloneWithRows(this.props.message.messageList)}
                    renderRow={data => (
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.onPressMessage(data)}}>
                            <View style={styles.rowFront}><Text style={[styles.rowFrontText,data.state==1?styles.rowFrontTextReaded:'']} numberOfLines={1}>{data.tails.msg_title}</Text></View>  
                        </TouchableOpacity>
                    )}
                    renderHiddenRow={(data, secId, rowId, rowMap) => (
                        <TouchableOpacity style={styles.rowBack} activeOpacity={.8} onPress={()=>this.delMessage(data, secId, rowId, rowMap)}>
                            <Text style={styles.rowBackText}>删除</Text>
                        </TouchableOpacity>
                    )}
                    disableRightSwipe={true} 
                    rightOpenValue={-100}
                    swipeToOpenPercent={30}
                    tension={100}
                    friction={20}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        backgroundColor:'#eeeeed'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#c32726',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1
    },
    rowBackText:{
        color:'#fff',
        fontSize:20,
        width:100,
        height:'100%',
        textAlign:'center',
        textAlignVertical:'center'
    },
    rowFront: {
        //alignItems: 'center',
        paddingHorizontal:16, 
        backgroundColor: '#fff',
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowFrontText:{
        color:'#2e2f2f',
        fontSize:16
    },
    rowFrontTextReaded:{
        color:'#ccc',
        fontSize:16
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    message:store.message
})

export default connect(mapStateToProps)(Message)