import React, {Component} from 'react'
import {ScrollView, Text, StatusBar, StyleSheet} from 'react-native'
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
                <KnowAllList/>
            </ScrollView>
        )
    }
}
