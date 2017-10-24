import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput } from 'react-native'
import Header from '../components/header'
import Icon from '../components/icon'
import {NavigationActions} from 'react-navigation'

class Directory extends Component {

    constructor(){
        super()
        this.state={
            tabsList:['全部','地产企业','消防企业','其他企业'],
            searchText:''
        }
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

    render() {
        return (
            <View style={styles.rootView}>
                <Header type='title' title='企业名录'/>
                <View style={styles.searchView}>
                    <View style={styles.searchSubView}>
                        <Icon name='search' size={20} color='#fff'/>
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
                    </View>
                </View>
                <View style={styles.tabsView}>
                {
                    this.state.tabsList.map((value,index)=>(
                        <TouchableOpacity style={styles.tabView} onPress={()=>{this.changeTab(value.nav)}}>
                            <Text style={styles.tabText}>{value.title}</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
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
        height:40
    },
    searchSubView:{
        flex: 1,
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
        marginLeft:5
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
        width:72,
        alignItems:'center',
        height:'100%'
    },
    tabText:{
        fontSize:18,
        color:'#fff',
        height:'100%'
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(Directory)