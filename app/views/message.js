import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View,TouchableOpacity,ListView,StyleSheet,Text} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'
import {NavigationActions} from 'react-navigation'
import Header from '../components/header'
import myFetch from '../utils/myFetch'
import * as appStateActions from '../actions/appState'

class Message extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataList:[]
        }
        this.getMessageList()
    }

    getMessageList(){
        const {dispatch} = this.props
        dispatch(appStateActions.fetch({fetching:true}))
        myFetch.get(
            '/message/view',
            {},
            res=>{
                if(res.code==0){
                    this.setState({
                        dataList:res.data.rows
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

    onPressMessage(data){
        const {dispatch} = this.props
        if(data.msg_type==1){
            dispatch(NavigationActions.navigate({
                routeName:'MessageDetail',
                params:{
                    time:data.create_time,
                    title:data.tails.msg_title,
                    text:data.tails.msg_text,
                    img:data.tails.msg_pic,
                    url:data.tails.msg_url
                }
            }))
        }else if(data.msg_type==2){

        }
    }

    delMessage(index){
        this.state.dataList.splice(index,1)
        this.setState({
            dataList:this.state.dataList
        })
    }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        return (
            <View>
                <Header type='title' title='消息中心'/>
                <SwipeListView
                    dataSource={ds.cloneWithRows(this.state.dataList)}
                    renderRow={data => (
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.onPressMessage(data)}}>
                            <View style={styles.rowFront}><Text style={styles.rowFrontText} numberOfLines={1}>{data.tails.msg_title}</Text></View>  
                        </TouchableOpacity>
                    )}
                    renderHiddenRow={(data, secId, rowId) => (
                        <TouchableOpacity style={styles.rowBack} activeOpacity={.8} onPress={()=>this.delMessage(rowId)}>
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
        color:'#7d7c7d',
        fontSize:16
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(Message)