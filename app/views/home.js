import React, {Component} from 'react'
import {ScrollView,View, StatusBar, StyleSheet,AsyncStorage,Alert} from 'react-native'
import { connect } from 'react-redux'
import * as newsActions from '../actions/news'
import * as appStateActions from '../actions/appState'
import HomeBanner from '../containers/homeBanner'
import NavBar from '../components/navBar'
import KnowAllList from '../containers/knowAllList'

class Home extends Component {

    constructor(props){
        super(props)
        const {dispatch} = this.props
        // dispatch(newsActions.initNewsList())
        // dispatch(this.getNewList())
    }
    
    // getNewList(){
    //     const {dispatch} = this.props
    //     dispatch(appStateActions.fetch({fetching:true}))
    //     return dispatch=>{ 
    //         fetch('http://zxzx119.com/api?method=querywaterfall&page=1&pagesize=10&taxonomyid=5')
    //         .then(res=>res.json())
    //         .then(resj=>{
    //             const newsList = resj.data.list
    //             if(resj.errorCode==0){
    //                 dispatch(newsActions.loadNewList({newsList}))
    //                 dispatch(appStateActions.fetchEnd({fetching:false}))
    //             }
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             Alert.alert('提示',err)
    //             dispatch(appStateActions.fetchEnd({fetching:false}))
    //         })
    //     }
    // }

    render() {

        return (
            <View>          
                <HomeBanner/>
                <NavBar/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = store=>({
    news:store.news
})

export default connect(mapStateToProps)(Home)