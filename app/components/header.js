import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Modal} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Icon from './icon'
import SearchInput from '../components/searchInput'

/**
 * header分类
 * 1.只有title
 * 2.有title和右侧按钮
 * 3.search框
 * 4.有title和右侧暂停按钮（物业培训答题时）
 *
 *
 *
 * @returns
 * @memberof Header
 */
class Header extends Component {

    constructor(props){
        super(props)
    }

    iconsFun(icon){
        const {dispatch} = this.props
        switch (icon) {
            case 'pencil-square-o':
                dispatch(NavigationActions.navigate({routeName:'AddAsk'}))
                break
            case 'pause':
                this.props.iconPress()
                break
            case 'search':
                dispatch(NavigationActions.navigate({routeName:'Search'}))
                break
            default:
                break
        }
    }

    returnBtnFun(){
        const {dispatch,isLoginPage} = this.props
        if(isLoginPage===true){
            const resetAction = NavigationActions.reset({//未登录状态返回，返回到home页
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'TabNav'})
                ]
              })
            dispatch(resetAction)
        }else{
            dispatch(NavigationActions.back())
        }
    }

    changeTab(routeName){
        const {dispatch} = this.props
        this.setState({
            tabActive:routeName
        })
        dispatch(NavigationActions.navigate({routeName}))
    }

    render() {
        const {dispatch,type,icons,titles} = this.props

        //console.log(this.props)
        const routeIndex = this.props.nav.routes[0].routes[2].index //asks or compasks页
        //const title = type=='search'?'':this.props.title
        let container = ''
        let rightIcons = <View style={styles.rightIconView}></View> //右侧按钮view初始化

        if(icons){//如果有icons属性
            rightIcons=(
                <View style={styles.rightIconView}>
                    {icons.map((item,index)=>{
                        return (
                            <TouchableOpacity style={styles.rightIconView} onPress={()=>{this.iconsFun(item)}} key={index}>
                                <Icon name={item} size={20} color='#fff'/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        }
        switch (type) {//container
            case 'title':
                container = (
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                )
                break
            case 'search':
                container =  (<SearchInput placeholder="请输入关键字查找"/>)
                break
            case 'tabs':
                container =  (
                    <View style={styles.tabsView}>
                        {
                            titles.map((value,index)=>{
                                return (
                                    <TouchableOpacity key={index} style={[styles.tabView,routeIndex==index?styles.tabViewActive:'']} onPress={()=>{this.changeTab(value.nav)}}>
                                        <Text style={styles.tabText}>{value.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                )
                break
            default:
                break
        }

        return (
            <View style={styles.rootView}>
                <View style={type=='search'?styles.leftIconSearchView:styles.leftIconTitleView}>
                    <Icon name="angle-left" size={30} color='#fff' onPress={()=>this.returnBtnFun()}/>
                </View>
                {container}
                {rightIcons}
            </View>
        )
    }
}

const STATUSBAR_HEIGHT = 20

const styles = StyleSheet.create({
    rootView: {
        paddingTop: STATUSBAR_HEIGHT+20,
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: '#ce2626'
    },
    leftIconSearchView:{
        paddingLeft:10,
        width:50,
    },
    leftIconTitleView:{
        flex:1,
        paddingLeft:10,
    },
    rightIconView:{
        flex:1,
        flexDirection:'row',
        marginTop:2,
        marginRight:4,
        height:30,
        justifyContent:'center',
        alignItems:'center'
    },
    titleView:{
        flex:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:30
    },
    title:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'
    },
    tabsView:{
        flexDirection:'row',
        flex:4,
        justifyContent:'center',
        height:36,
    },
    tabView:{
        marginTop:4,
        marginHorizontal:10,
        alignItems:'center',
        height:'100%'
    },
    tabText:{
        fontSize:18,
        color:'#fff',
        height:'100%'
    },
    tabViewActive:{
        borderBottomWidth:5,
        borderBottomColor:'#f1f1f1'
    },
})

const mapStateToProps = store=>({
    nav:store.nav,

})

export default connect(mapStateToProps)(Header)