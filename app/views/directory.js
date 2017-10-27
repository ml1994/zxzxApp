import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput,RefreshControl,Image,FlatList } from 'react-native'
import Header from '../components/header'
import Icon from '../components/icon'
import myFetch from '../utils/myFetch'
import {NavigationActions} from 'react-navigation'

class Directory extends Component {

    constructor(){
        super()
        this.state={
            tabsList:['全部','地产企业','消防企业','社会单位'],
            searchText:'',
            activeIndex:0
        }
    }

    getList(){

    }

    onChangeText(searchText){
        this.setState({
            searchText
        })
    }

    submitFun(){
        const {dispatch} = this.props
        return dispatch=>{

        }
    }
    

    changeTab(index){
        this.setState({
            activeIndex:index
        })
    }

    refreshFun(){

    }

    toDetailPage(){
        const {dispatch} = this.props

        dispatch(NavigationActions.navigate({routeName:'DirectoryDetail',params:{}}))
    }

    render() {

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
                            autoFocus={true}
                            onChangeText={searchText=>this.onChangeText(searchText)}
                            onSubmitEditing={()=>dispatch(this.submitFun())}/>
                        <Icon name='search' size={20} color='#fff'/>
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
                    {this.props.directory.directoryList.length!=1?
                        (
                            [1,2,3].map((item,index)=>
                                (
                                    <TouchableOpacity style={styles.touchView} onPress={()=>this.toDetailPage()}>
                                        <View style={styles.listView}>
                                            <Image source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508835473366&di=41ff5b4d89bfad088a759b31e02ec21d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0332b18554c75dd00000158fc28ceb0.jpg%40600w_1l_2o_100sh.jpg'}} resizeMode="stretch" style={styles.listImg}/>
                                            <View style={styles.textView}>
                                                <View style={styles.titleView}>
                                                    <Image style={styles.titleIcon} resizeMode='contain' source={require('../asset/diamond.png')}/>
                                                    <Text style={styles.title} numberOfLines={1}>xx公司</Text>
                                                </View>
                                                <Text style={styles.text} numberOfLines={1}>所在区域：xxx</Text>
                                                <Text style={styles.text} numberOfLines={1}>企业网址：xxx</Text>
                                                <Text style={styles.text} numberOfLines={1}>联系电话：xxx</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            )
                        )
                        : (
                            <View style={styles.container}>
                                <Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
                                <Text style={styles.text}>还没有该类型企业入驻</Text>
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
        height:36,
        marginHorizontal:10,
        width:72,
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
    text:{
        color:'#c9c9c9'
    },
    //listItemStyle
    touchView:{
        paddingHorizontal:10,
    },
    listView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:'#f1f1f1'
    },
    listImg:{
        flex:1,
        height:80
    },
    textView:{
        flex:2,
        marginLeft:10
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    titleIcon:{
        width:30,
        height:20
    },
    title:{
        fontSize:16,
        color: '#2f2f2f'
    },
    text:{
        fontSize: 12,
        color: '#2f2f2f',
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    directory:store.directory
})

export default connect(mapStateToProps)(Directory)