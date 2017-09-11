import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Icon from './icon'

class Menu extends Component {

    goto(nav){
        const {dispatch} = this.props
        dispatch(NavigationActions.navigate({routeName:nav}))
    }

    render() {
        const menuArr = this.props.menuArr
        return (
            <FlatList
                style={styles.menu}
                data={menuArr}
                renderItem={({item}) => (
                <TouchableOpacity style={styles.itemView} activeOpacity={.8} onPress={()=>this.goto(item.nav)}>
                    <View style={styles.iconView}>
                        <View style={styles.iconBg}>
                            <Icon name={item.iconName} size={14} color='#fff'/>
                        </View>
                    </View>
                    <Text style={styles.text}>{item.text}</Text>
                    <View style={styles.iconView}>
                        <Icon name='angle-right' size={24} color='#ccc'/>
                    </View>
                </TouchableOpacity>
            )}/>
        )
    }
}

const styles = StyleSheet.create({
    menu:{
        borderTopWidth:1,
        borderTopColor:'#dfdfdf'
    },
    itemView:{
        width:'100%',
        height: 50,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb',
        borderTopWidth:1,
        borderTopColor:'#f8f8f8'
    },
    iconView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    iconBg:{
        width:24,
        height:24,
        backgroundColor:'#FF5051',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        flex:5,
        fontSize:18
    },
    lastItemNoBorder:{
        borderBottomWidth:0
    }
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(Menu)