import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView,View,Text,RefreshControl } from 'react-native'
import Header from '../components/header'
import KnowAllList from '../containers/knowAllList'
import * as newsActions from '../actions/news'
import * as appStateActions from '../actions/appState'

class KnowAll extends Component {

    constructor(props){
        super(props)
        this.state={
            refreshing:false,
            page:1
        }
    }

    refreshFun(){
        const {dispatch} = this.props

        this.setState({//开始刷新
            refreshing: true,
            page:1
        })
        fetch('http://zxzx119.com/api?method=querywaterfall&page=1&pagesize=10&taxonomyid=5')
        .then(res=>res.json())
        .then(resj=>{
            const newsList = resj.data.list
            if(resj.errorCode==0){
                dispatch(newsActions.loadNewList({newsList}))
                this.setState(prevState=>({
                    refreshing: false,
                    page:prevState.page+1
                }))
            }
        })
        .catch(err=>{
            console.log(err)
            alert(err)
            this.setState(prevState=>({
                refreshing: false,
                page:prevState.page
            }))
        })
    }

    pullAddFun(){
        const {dispatch} = this.props
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            fetch(`http://zxzx119.com/api?method=querywaterfall&page=${this.state.page+1}&pagesize=10&taxonomyid=5`)
            .then(res=>res.json())
            .then(resj=>{
                const oldList = this.props.news.newsList
                const newsList = resj.data.list
                if(resj.errorCode==0){
                    dispatch(newsActions.loadNewList({newsList:[...oldList,...newsList]}))
                    this.setState(prevState=>({
                        refreshing: false,
                        page:prevState.page+1
                    }))
                    dispatch(appStateActions.fetchEnd({fetching:false}))
                    console.log('add')
                }
            })
            .catch(err=>{
                console.log(err)
                alert(err)
                this.setState(prevState=>({
                    refreshing: false,
                    page:prevState.page
                }))
                dispatch(appStateActions.fetchEnd({fetching:false}))
            })
        }
    }

    render() {
        // const icons=['bell-o','search']
        const icons=['search']
        const {dispatch} = this.props
        return (
            <View style={{flex:1}}>
                <Header type='title' title='消防百事通' icons={icons}/>
                <KnowAllList 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this.refreshFun()}
                            tintColor="#ccc"
                            title="Loading..."
                            titleColor="#ccc"
                        />}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={.1}
                    onEndReached={info=>dispatch(this.pullAddFun())}
                    newsList={this.props.news.newsList}/>
            </View>
        )
    }
}

const mapStateToProps = store=>({
    news:store.news
})

export default connect(mapStateToProps)(KnowAll)
