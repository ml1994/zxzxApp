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

    iconsFun(icon){
        const {dispatch} = this.props
        switch (icon) {
            case 'pencil-square-o':
                dispatch(NavigationActions.navigate({routeName:'AddAsk'}))
                break;
            case 'pause':
                this.props.iconPress()
                break;
        
            default:
                break;
        }
    }

    returnBtnFun(){
        const {dispatch,isLoginPage} = this.props
        if(isLoginPage===true){
            dispatch(NavigationActions.navigate({routeName:'Home'}))
        }else{
            dispatch(NavigationActions.back())
        }
    }
    
    render() {
        const{dispatch,type,icons} = this.props
        const title = type=='search'?'':this.props.title
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
                        <Text style={styles.title}>{title}</Text>
                    </View>
                )
                break
            case 'search':
                container =  (<SearchInput placeholder="请输入关键字查找"/>)
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
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(Header)