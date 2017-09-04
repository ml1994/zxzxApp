import React, {Component} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'

export default class SearchInput extends Component {
    render() {
        return (
            <View>
                <TextInput style={styles.inputStyle} underlineColorAndroid='transparent' />
                <FAIcon name="search" size={24} color="#fff"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#fff',
        width: '66%',
        height: 24,

        borderRadius: 3,
        opacity: .6
    }
})
