import React, { Component } from 'react'
import { ScrollView,View,Text } from 'react-native'
import Header from '../components/header'

export default class KnowAll extends Component {

    render() {
        const icons=['bell-o','search']
        return (
            <View>
                <Header type='title' title='消防百事通' icons={icons}/>
                <ScrollView>
                    
                </ScrollView>
            </View>
        )
    }
}