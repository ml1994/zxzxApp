import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput,RefreshControl,Image,FlatList,Alert,Dimensions} from 'react-native'
import Header from '../components/header'
import Icon from '../components/icon'
import myFetch from '../utils/myFetch'
import {NavigationActions} from 'react-navigation'
import * as directoryActions from '../actions/directory'
import * as appStateActions from '../actions/appState'

class Directory extends Component {

    constructor(props){
        super(props)
        this.state={
            refreshing: false,
            tabsList:['全部','地产企业','消防企业'],
            searchText:'',
            activeIndex:0,
            detailId:-1,
            page:1
        }
        const {dispatch} = this.props
        //dispatch(directoryActions.initDirectoryList())
        dispatch(this.getList(0))
    }

    getList(code,name=''){
        const {dispatch} = this.props
        this.setState({
            page:1
        })
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                '/advertisement/pindex',
                {page:1,pagesize:18,code,name},
                res=>{
					console.log(res)
                    if(!res.message){
						dispatch(directoryActions.loadDirectoryList({directoryList:res.rows}))
                    }else{
                        Alert.alert('提示',res.message)
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

    onChangeText(searchText){
        this.setState({
            searchText
        })
    }

    submitFun(){
        const {dispatch} = this.props
        dispatch(this.getList(this.state.activeIndex,this.state.searchText))
    }

    changeTab(index){
        const {dispatch} = this.props
        this.setState({
            activeIndex:index
        })
        dispatch(this.getList(index,this.state.searchText))
        if(this.refs.list){//上一个tab页是非空tab页
            this.refs.list.scrollToIndex({animated:false ,viewPosition: 0, index: 0})//回到flatlist顶部
        }
        //console.log(this.refs.list)
    }

    refreshFun(){//下拉刷新
        const {dispatch} = this.props
		//this.setState({refreshing: true})//开始刷新
        dispatch(this.getList(this.state.activeIndex,this.state.searchText))
        //this.setState({refreshing: false})//停止刷新
    }

    toDetailPage(id){
        const {dispatch} = this.props
        dispatch(NavigationActions.navigate({routeName:'DirectoryDetail',params:{id}}))
    }

    pullAddFun(){//上拉加载
        const {dispatch,directory} = this.props
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            myFetch.get(
                '/advertisement/pindex',
                {page:this.state.page+1,pagesize:18,code:this.state.activeIndex,name:this.state.searchText},
                res=>{
					console.log(res)
                    if(!res.message){
                        let newList = res.rows
                        if(newList.length!=0){
                            this.setState(prevState=>({
                                page:prevState.page+1
                            }))
                            let oldList = directory.directoryList
                            dispatch(directoryActions.loadDirectoryList({directoryList:[...oldList,...newList]}))
                        }
                    }else{
                        Alert.alert('提示',res.message)
                    }
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                },
                err=>{
                    console.log(err)
                    this.setState(prevState=>({
                        page:prevState.page
                    }))
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                }
            )
        }
    }

    render() {

        const {dispatch} = this.props

        return (
            <View style={styles.rootView}>
                <Header type='title' title='企业名录'/>
                <View style={styles.searchView}>
                    <View style={styles.searchSubView}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='请输入要查询的内容'
                            placeholderTextColor='#fff'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={searchText=>this.onChangeText(searchText)}
                            onSubmitEditing={()=>this.submitFun()}/>
                        <TouchableOpacity onPress={()=>this.submitFun()}>
                            <Icon name='search' size={20} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.tabsView}>
                {
                    this.state.tabsList.map((value,index)=>(
                        <TouchableOpacity style={[styles.tabView,this.state.activeIndex==index?styles.tabViewActive:'']} onPress={()=>{this.changeTab(index)}} activeOpacity={.7}>
                            <Text style={styles.tabText}>{value}</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
                
                    {this.props.directory.directoryList.length!=0?
                        (
                            // <FlatList
                            //     ref='list'
                            //     refreshControl={
                            //         <RefreshControl
                            //             refreshing={this.state.refreshing}
                            //             onRefresh={()=>this.refreshFun()}
                            //             tintColor="#ccc"
                            //             title="Loading..."
                            //             titleColor="#ccc"
                            //         />
                            //     }
                            //     data={this.props.directory.directoryList}
                            //     renderItem={({item})=>(
                            //         <TouchableOpacity style={styles.touchView} onPress={()=>this.toDetailPage(item.pk_ent)}>
                            //             <View style={styles.listView}>
                            //                 <Image source={{uri:this.state.baseUrl+item.ent_logo}} resizeMode="stretch" style={styles.listImg}/>
                            //                 <View style={styles.textView}>
                            //                     <View style={styles.titleView}>
                            //                         <Image style={styles.titleIcon} resizeMode='contain' source={require('../asset/diamond.png')}/>
                            //                         <Text style={styles.title} numberOfLines={1}>{item.ent_name}</Text>
                            //                     </View>
                            //                     <Text style={styles.text} numberOfLines={1}>所在区域：{item.ent_region?item.ent_region:'暂无信息'}</Text>
                            //                     <Text style={styles.text} numberOfLines={1}>企业网址：{item.ent_website?item.ent_website:'暂无信息'}</Text>
                            //                     <Text style={styles.text} numberOfLines={1}>联系电话：{item.ent_phone?item.ent_phone:'暂无信息'}</Text>
                            //                 </View>
                            //             </View>
                            //         </TouchableOpacity>
                            //     )}
                            //     showsVerticalScrollIndicator={false}
                            //     onEndReachedThreshold={.1}
                            //     onEndReached={info=>dispatch(this.pullAddFun())}
                            // />

                            <FlatList
                                ref='list'
                                numColumns={3}
                                columnWrapperStyle={styles.rowsView}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={()=>this.refreshFun()}
                                        tintColor="#ccc"
                                        title="Loading..."
                                        titleColor="#ccc"
                                    />
                                }
                                data={this.props.directory.directoryList}
                                renderItem={({item})=>(
                                    <TouchableOpacity style={styles.touchView} activeOpacity={1}>
                                        <Image source={{uri:item.ad_file}} resizeMode="contain" style={styles.listImg}/>
                                        <View style={styles.textView}>
                                            <Text style={styles.title} numberOfLines={2}>{item.ad_name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={.1}
                                onEndReached={info=>dispatch(this.pullAddFun())}
                            />
                        )
                        : (
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
                                <View style={styles.container}>
                                    <Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
                                    <Text style={styles.nullText}>还没有该类型企业入驻</Text>
                                </View>
                            </ScrollView>
                        )
                    }
                
            </View>
        )
    }
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    searchView:{
        width: '100%',
        backgroundColor:'#ce2626',
        alignItems:'center',
        height:36
    },
    searchSubView:{
        flexDirection: 'row',
        height:30,
        width:'70%',
        backgroundColor: 'rgba(255,255,255,.5)', //使用背景色透明度，用opacity会使内部所有元素半透明
        borderRadius: 3,
        alignItems: 'center',
        paddingHorizontal:5,
    },
    inputStyle: {
        width: '90%',
        paddingVertical: 0,
        marginLeft:5,
        fontSize:12
    },
    tabsView:{
        flexDirection:'row',
        justifyContent:'center',
        height:36,
        backgroundColor:'#ce2626'
    },
    tabView:{
        flex:1,
        height:36,
        marginHorizontal:10,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:3,
        borderBottomColor:'transparent'
    },
    tabViewActive:{
        borderBottomColor:'#f1f1f1'
    },
    tabText:{
        color:'#fff',
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
    nullText:{
        color:'#c9c9c9'
    },
    //listItemStyle
    // touchView:{
    //     paddingHorizontal:10,
    // },
    // listView:{
    //     flexDirection:'row',
    //     justifyContent:'space-between',
    //     marginTop:10,
    //     paddingVertical:10,
    //     paddingHorizontal:10,
    //     backgroundColor:'#f1f1f1'
    // },
    // listImg:{
    //     flex:1,
    //     height:80
    // },
    // textView:{
    //     flex:2,
    //     marginLeft:10
    // },
    // titleView:{
    //     flexDirection:'row',
    //     alignItems:'center',
    //     marginBottom:10
    // },
    // titleIcon:{
    //     width:30,
    //     height:20
    // },
    // title:{
    //     fontSize:16,
    //     color: '#2f2f2f'
    // },
    // text:{
    //     marginTop:3,
    //     fontSize: 12,
    //     color: '#2f2f2f',
    // }
    rowsView:{
        marginHorizontal:6,
        marginVertical:6,
    },
    touchView:{
        marginHorizontal:6,
        width:'30%',
        height:width*.3,
        borderWidth:1,
        borderColor:'#000',
        justifyContent:'center',
        alignItems:'center'
    },
    listImg:{
        width:70,
        height:70
    },
    textView:{
        paddingHorizontal:5,
        backgroundColor:'transparent'
    },
    title:{
        fontSize:10,
        textAlign:'center',
        color:'#000'
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    directory:store.directory
})

export default connect(mapStateToProps)(Directory)