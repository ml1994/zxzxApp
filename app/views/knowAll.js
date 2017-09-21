import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView,View,Text,RefreshControl } from 'react-native'
import Header from '../components/header'
import KnowAllList from '../containers/knowAllList'
import * as newsActions from '../actions/news'

class KnowAll extends Component {

    constructor(props){
        super(props)
        this.state={
            refreshing:false
        }
    }

    refreshFun(){
        const {dispatch} = this.props
        console.log(this.props)
        this.setState({refreshing: true})//开始刷新
        fetch('http://zxzx119.com/api?method=querywaterfall&page=1&pagesize=10&taxonomyid=5')
        .then(res=>res.json())
        .then(resj=>{
            const newsList = resj.data.list
            if(resj.errorCode==0){
                dispatch(newsActions.loadNewList({newsList}))
                this.setState({refreshing: false})
            }
        })
        .catch(err=>{
            console.log(err)
            alert(err)
            this.setState({refreshing: false})
        })
    }

    render() {
        const icons=['bell-o','search']
        return (
            <View style={{flex:1}}>
                <Header type='title' title='消防百事通' icons={icons}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this.refreshFun()}
                            tintColor="#ccc"
                            title="Loading..."
                            titleColor="#ccc"
                        />
                    }>
                    <KnowAllList/>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = store=>({})

export default connect(mapStateToProps)(KnowAll)
