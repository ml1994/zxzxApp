import React, { Component } from 'react'
import { View,Text,StatusBar } from 'react-native'
import HomeBanner from '../containers/homeBanner'



export default class Home extends Component {

    render() {
        
        return (
            <View>
                {/* <StatusBar ref='statusBar' translucent={true} backgroundColor='transparent'/>  */}
                <HomeBanner/>

            </View>
        )
    }
}
