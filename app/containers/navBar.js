import React, {Component} from 'react'
import {View, FlatList, Image, Text, StyleSheet} from 'react-native'

export default class NavBar extends Component {

    render() {
        let tabArr = [
            {
                key: 1,
                img: require('../asset/fire_ext.png'),
                label: '消防百事通'
            }, {
                key:2,
                img: require('../asset/pipe.png'),
                label: '物业培训'
            }, {
                key:3,
                img: require('../asset/fire_ext.png'),
                label: '技术咨询'
            }, {
                key:4,
                img: require('../asset/fire_engine.png'),
                label: '真人秀'
            }
        ]
        return (
            <FlatList
                horizontal={true}
                justifyContent='space-around'
                style={styles.list}
                data={tabArr}
                renderItem={({item}) => (
                <View style={styles.listItem}>
                    <Image source={item.img} style={styles.img}/>
                    <Text style={styles.text}>{item.label}</Text>
                </View>
            )}/>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 10
    },
    listItem: {
        width: 90,
        alignItems: 'center'
    },
    img: {
        width: 40,
        height: 40
    },
    text: {
        marginTop:6,
        color: '#565555'
    }
})