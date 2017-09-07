import React, {Component} from 'react'
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native'
import Header from '../components/header'
import KnowAllList from '../containers/knowAllList'


export default class Search extends Component {

    render() {
        //const navigation = this.props.navigation
        let searchList = []
        
        return (
            <View>
                <Header type='search'/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {searchList.length!=0?
                        (<KnowAllList/>)
                        : (
                            <View style={styles.container}>
                                <Image style={styles.img} resizeMode='contain' source={require('../asset/no_search.png')}/>
                                <Text style={styles.text}>没有任何搜索历史</Text>
                            </View>
                        )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:100,
        alignItems:'center'
    },
    img:{
        width:100,
        height:100,
        marginBottom:10
    },
    text:{
        color:'#c9c9c9'
    }
})
