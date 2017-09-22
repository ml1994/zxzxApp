import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native'
import Header from '../components/header'
import KnowAllList from '../containers/knowAllList'


class Search extends Component {

    constructor(){
        super()
    }

    render() {

        return (
            <View style={styles.rootView}>
                <Header type='search'/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.props.news.searchList.length!=0?
                        (<KnowAllList newsList={this.props.news.searchList}/>)
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

const mapStateToProps = store=>({
    news:store.news
})

export default connect(mapStateToProps)(Search)
