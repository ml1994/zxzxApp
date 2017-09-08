import React, { Component } from 'react'
import { View,ScrollView } from 'react-native'
import Header from '../components/header'

export default class KnowAllDetail extends Component {

    render() {
        const icons = ['bell-o','search']
        return (
            <View>
                <Header type='title' title='消防百事通' icons={icons}/>
                <ScrollView>
                    
                </ScrollView>
            </View>
        )
    }
}