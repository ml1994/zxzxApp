import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet,ImageBackground} from 'react-native'
import {NavigationActions} from 'react-navigation'

import Header from '../components/header'


class Test extends Component {
    render() {
        const icons = ['bell-o','search']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='物业培训' icons={icons}/>
                <ImageBackground source={require('../asset/test_bg.png')} style={styles.imgBg} resizeMode='contain'>
                </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    imgBg:{
        flex:1,
        marginVertical:10,
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(Test)