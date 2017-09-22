import React, {Component} from 'react'
import {ScrollView,View, StatusBar, StyleSheet,AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import * as newsActions from '../actions/news'
import * as appStateActions from '../actions/appState'
import HomeBanner from '../containers/homeBanner'
import NavBar from '../containers/navBar'
import KnowAllList from '../containers/knowAllList'

class Home extends Component {

    constructor(props){
        super(props)
        const {dispatch} = this.props
        dispatch(newsActions.initNewsList())
        dispatch(this.getNewList())
    }
    
    getNewList(){
        const {dispatch} = this.props
        dispatch(appStateActions.fetch({fetching:true}))
        return dispatch=>{ 
            fetch('http://zxzx119.com/api?method=querywaterfall&page=1&pagesize=10&taxonomyid=5')
            .then(res=>res.json())
            .then(resj=>{
                const newsList = resj.data.list
                if(resj.errorCode==0){
                    dispatch(newsActions.loadNewList({newsList}))
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                }
            })
            .catch(err=>{
                console.log(err)
                alert(err)
                dispatch(appStateActions.fetchEnd({fetching:false}))
            })
        }
    }

    render() {

        return (
            <ScrollView showsVerticalScrollIndicator={false}>          
                <HomeBanner/>
                <NavBar/>
                <View style={styles.addMarginTop10}>
                    <KnowAllList newsList={this.props.news.newsList}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    addMarginTop10:{
        marginTop:10
    }
})

const mapStateToProps = store=>({
    news:store.news
})

export default connect(mapStateToProps)(Home)