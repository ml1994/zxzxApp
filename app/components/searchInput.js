import React, {Component} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import Icon from '../components/icon'

export default class SearchInput extends Component {
    render() {
        return (
            <View style={styles.rootView}>
                <View style={styles.rowView}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='rgba(255,255,255,.5)'
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                    <Icon name="search" size={20} color="#fff" style={styles.searchIcon}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        width:'66%',
        height:30,
    },
    rowView:{
        flex:1,
        flexDirection:'row',
        height:30,
        backgroundColor: 'rgba(255,255,255,.5)',   //使用背景色透明度，用opacity会使内部所有元素半透明
        borderRadius: 3,
        alignItems: 'center'
    },
    inputStyle: {
        width:'90%',
        paddingVertical:0
    },
    searchIcon:{
        
    }
})
