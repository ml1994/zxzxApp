import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Icon from '../components/icon'

class SearchInput extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.rootView} activeOpacity={.6}>
                <View style={styles.rowView}>
                    <Icon name='search' size={20} color='#fff'/>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='rgba(255,255,255,.5)'
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        autoCorrect={false}/>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    rootView: {
        width: '70%',
        height: 30
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'rgba(255,255,255,.5)', //使用背景色透明度，用opacity会使内部所有元素半透明
        borderRadius: 3,
        alignItems: 'center',
        paddingHorizontal:5
    },
    inputStyle: {
        width: '90%',
        paddingVertical: 0,
        marginLeft:5
    },
    textStyle: {
        width: '90%',
        color: 'rgba(255,255,255,.5)'
    }
})

const mapStateToProps=store=>{
    return {
        nav:store.nav
    }
}

export default connect(mapStateToProps)(SearchInput)