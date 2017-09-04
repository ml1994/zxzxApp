import React, {Component} from 'react'
import {View,Text, TextInput, Image, StyleSheet} from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import SearchInput from '../components/searchInput'


export default class HomeBanner extends Component {
   
    render() {
        let bellButton = <FAIcon name="bell-o" size={24} color="#fff" style={styles.bellIcon}/>
        return (
            <View style={styles.rootView}>
                <Image
                    source={require('../asset/banner_bg.jpg')}
                    style={styles.bgStyle}>
                    <View style={styles.topBar}>
                        {bellButton}
                        <SearchInput/>
                    </View>
                </Image>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rootView: {
        flex: 1
    },
    bgStyle: {
        paddingTop:20, //避开顶部状态栏高度
        width: '100%',
        height: 300
    },
    topBar:{
        flexDirection:'row'
    },
    bellIcon:{
        backgroundColor:'transparent' //去除Text组件ios自带背景色
    }
})