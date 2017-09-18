import React, {Component} from 'react'
import {ScrollView,View, StatusBar, StyleSheet} from 'react-native'

import HomeBanner from '../containers/homeBanner'
import NavBar from '../containers/navBar'
import KnowAllList from '../containers/knowAllList'

export default class Home extends Component {

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <StatusBar ref='statusBar' translucent={true} backgroundColor='transparent'/>  */}
                
                <HomeBanner/>
                <NavBar/>
                <View style={styles.addMarginTop10}>
                    <KnowAllList/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    addMarginTop10:{
        marginTop:10
    }
})