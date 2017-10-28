import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, FlatList, TouchableOpacity, StyleSheet,Alert} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Icon from './icon'
import myFetch from '../utils/myFetch'
import * as userinfoActions from '../actions/userinfo'
import * as askActions from '../actions/ask'
import * as testActions from '../actions/test'

class Menu extends Component {

    pressFun(nav,type,loginOut){
        const {dispatch} = this.props
        if(!loginOut){
            dispatch(NavigationActions.navigate({routeName:nav,params:{type:type}}))
        }else{
            myFetch.get(
                '/account/logout',
                {},
                res=>{
                    if(res.code==0){
                        //this.props.nav.routes[0].routes[2].index=0
                        dispatch(userinfoActions.loginOut())
                        dispatch(askActions.initAskList())
                        dispatch(askActions.initQaList())
                        dispatch(testActions.initMaxScore())

                        const resetAction = NavigationActions.reset({//重置路由防止切换用户时非vip能看到企业咨询
                            index: 1, //显示login页
                            actions: [
                              NavigationActions.navigate({index:3,routeName: 'TabNav'}),
                              //NavigationActions.navigate({routeName: 'MySetting'}),
                              NavigationActions.navigate({routeName: 'Login'})
                            ]
                        })
                        dispatch(resetAction)
                        //dispatch(NavigationActions.navigate({routeName:'Login'}))
                    }else{
                        Alert.alert('提示','退出失败')
                    }
                },
                err=>{
                    console.log(err)
                }
            )
        }

    }

    render() {
        const menuArr = this.props.menuArr
        return (
            <FlatList
                style={styles.menu}
                data={menuArr}
                renderItem={({item}) => (
                <TouchableOpacity style={styles.itemView} activeOpacity={.8} onPress={()=>this.pressFun(item.nav,item.type,item.loginOut)}>
                    <View style={styles.iconView}>
                        <View style={styles.iconBg}>
                            <Icon name={item.iconName} size={14} color='#fff'/>
                        </View>
                    </View>
                    <Text style={styles.text}>{item.text}</Text>
                    <View style={styles.iconView}>
                        <Icon name='angle-right' size={24} color='#ccc'/>
                    </View>
                </TouchableOpacity>
            )}/>
        )
    }
}

const styles = StyleSheet.create({
    menu:{
        borderTopWidth:1,
        borderTopColor:'#dfdfdf'
    },
    itemView:{
        width:'100%',
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb',
        borderTopWidth:1,
        borderTopColor:'#f8f8f8'
    },
    iconView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    iconBg:{
        width:24,
        height:24,
        backgroundColor:'#FF5051',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        flex:5,
        fontSize:18,
        color:'#202020'
    },
    lastItemNoBorder:{
        borderBottomWidth:0
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    userinfo:store.userinfo,
    test:store.test,
    ask:store.ask
})

export default connect(mapStateToProps)(Menu)