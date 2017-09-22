import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { View,ScrollView,WebView,StyleSheet } from 'react-native'
import Header from '../components/header'

import * as appStateActions from '../actions/appState'

export default class KnowAllDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            link:`http://cdn.zxzx119.com${this.props.navigation.state.params.link}`
        }
        const {dispatch} = this.props.navigation
       // dispatch(this.getNewsDetail())
    }

    getNewsDetail(){
        const link = this.props.navigation.state.params.link
        const {dispatch} = this.props.navigation
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            fetch(`http://zxzx119.com/api?method=queryContent&id=${id}`)
            .then(res=>res.json())
            .then(resj=>{
                this.setState({
                    text:resj.data
                })
                console.log(this.state)
                dispatch(appStateActions.fetchEnd({fetching:false}))
            })
            .catch(err=>{
                console.log(err)
                dispatch(appStateActions.fetchEnd({fetching:false}))
            })
        }
    }

    render() {
        // const icons = ['bell-o','search']
        const icons = ['search']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='消防百事通' icons={icons}/>
                <WebView style={styles.webView}
                    startInLoadingState={true}  
                    domStorageEnabled={true}  
                    scalesPageToFit={true}
                    source={{uri:this.state.link}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    webView:{
        width:'100%'
    }
})