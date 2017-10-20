import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,Image,StyleSheet } from 'react-native'
import Header from '../components/header'

class MessageDetail extends Component {

    render() {
        const {img,time,title,text,url} = this.props.nav.routes[2].params
        
        return (
            <View style={styles.rootView}>
                <Header type='title' title='消息详情'/>
                <View style={styles.container}>
                    <Image style={styles.img} source={{uri:img}} resizeMode='cover'/>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{},
    container:{},
    img:{},
    titleText:{},
    timeText:{},
    text:{}
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(MessageDetail)