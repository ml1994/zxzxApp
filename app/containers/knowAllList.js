import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, FlatList, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'

class KnowAllList extends Component {

    _toDetailPage(id){
        const {dispatch} = this.props
        dispatch(NavigationActions.navigate({routeName:'KnowAllDetail',params:{id}}))
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.news.newsList}
                renderItem={({item,index}) => (
                <TouchableOpacity style={[styles.listView,index==this.props.news.newsList.length-1?styles.lastViewNoBorder:'']} onPress={()=>this._toDetailPage(item.id)}>
                    <Image source={{uri:item.thumbnail}} resizeMode="stretch" style={styles.listImg}/>
                    <View style={styles.textView}>
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.text} numberOfLines={2}>{item.remarks}</Text>
                    </View>
                </TouchableOpacity>
            )}/>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        paddingHorizontal:10,
        backgroundColor:'#fff',
    },
    listView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        paddingBottom:10,
        borderBottomWidth: 1,
        borderBottomColor: '#dddee1'
    },
    lastViewNoBorder:{
        borderBottomWidth: 0
    },
    listImg:{
        flex:1,
        height:80
    },
    textView:{
        flex:2,
        marginLeft:10
    },
    title:{
        fontSize:16,
        color: '#575757'
    },
    text:{
        marginTop:10,
        fontSize: 12,
        color: '#9f9f9f',
        //flexWrap:'wrap'
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    news:store.news
})

export default connect(mapStateToProps)(KnowAllList)