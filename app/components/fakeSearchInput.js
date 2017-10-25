import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Icon from '../components/icon'

class FakeSearchInput extends Component {
    
    render() {
        const {dispatch} = this.props
        return (
            <TouchableOpacity
                style={styles.rootView}
                onPress={() => dispatch(NavigationActions.navigate({routeName:'AddAsk'}))}
                activeOpacity={.6}>
                <View style={styles.rowView}>
                    <Text style={styles.textStyle}>{this.props.placeholder}</Text>
                    <Icon name='pencil-square-o' size={20} color='#fff'/>
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
        textAlign:'center',
        width: '90%',
        color: 'rgba(255,255,255,1)'
    }
})

const mapStateToProps=store=>{
    return {
        nav:store.nav
    }
}

export default connect(mapStateToProps)(FakeSearchInput)