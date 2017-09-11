import React, {Component} from 'react'
import {View, Text, ScrollView, FlatList,Image,StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Header from '../components/header'
import Question from '../components/question'

class Ask extends Component {
    
    render() {
        let askList = ['1']
        const icons = ['pencil-square-o','search']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='技术咨询' icons={icons}/>
                <ScrollView showsVerticalScrollIndicator={false}>    
                    {askList.length!=0?
                        (<FlatList data={askList} renderItem={({item})=><Question />}/>)
                        : (
                            <View style={styles.container}>
                                <Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
                                <Text style={styles.text}>您还没有咨询任何问题</Text>
                            </View>
                        )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
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

export default Ask