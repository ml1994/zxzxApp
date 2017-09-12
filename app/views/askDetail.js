import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'

import Header from '../components/header'
import Qa from '../components/qa'
import Icon from '../components/icon'

class AskDetail extends Component {

    render() {
        const {dispatch} = this.props
        const qaList = ['q','a']
        const icons = ['pencil-square-o', 'search']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='技术咨询' icons={icons}/>
                <ScrollView>     
                    <View style={styles.titleView}>
                        <View style={styles.dot}></View>
                        <Text style={styles.title} numberOfLines={2}>我提的问题我提的问题我提的问题我提的</Text>
                        <Image
                            style={styles.img}
                            source={require('../asset/qa.png')}
                            resizeMode='contain'/>
                    </View>
                    <FlatList data={qaList} renderItem={({item})=><Qa type={item}/>}/>     
                </ScrollView>
                <TouchableOpacity style={styles.bottomBtn} onPress={()=>dispatch(NavigationActions.navigate({routeName:'AddOnAsk'}))}>
                    <Icon name='plus' size={14} color="#fff"/>
                    <Text style={styles.btnText}>追加问题</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '2%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff8a00',
        marginRight: 6
    },
    title: {
        fontSize: 18,
        width: '70%',
        color:'#202020'
    },
    img: {
        width: '20%',
        marginLeft: 10
    },
    bottomBtn:{
        flexDirection:'row',
        alignSelf:'flex-end',
        width:'100%',
        height:40,
        backgroundColor:'#e82325',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        marginLeft:6,
        color:'#fff'
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(AskDetail)