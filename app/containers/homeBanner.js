import React, {Component} from 'react'
import {View, Text, TextInput, ImageBackground, StyleSheet} from 'react-native'
import Icon from '../components/icon'
import FakeSearchInput from '../components/fakeSearchInput'

export default class HomeBanner extends Component {

    render() {
        return (
            <ImageBackground
                source={require('../asset/banner_bg.jpg')}
                resizeMode='cover'
                style={styles.bgStyle}>
                <View style={styles.topBar}>
                    <View style={styles.bellIcon}>
                        {/* <Icon name="bell-o" size={20} color="#fff"/> */}
                    </View>
                    <FakeSearchInput placeholder="请输入关键字查找"/>
                </View>
            </ImageBackground>
        )
    }
}
const STATUSBAR_HEIGHT = 20
const styles = StyleSheet.create({
    bgStyle: {
        paddingTop: STATUSBAR_HEIGHT, //避开顶部状态栏高度
        width: '100%',
        height: 260
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 0,
        height: 30
    },
    bellIcon: {
        width: 60,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})