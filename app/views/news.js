import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View,WebView,Image,StyleSheet} from 'react-native'
import Header from '../components/header'

class News extends Component {

    constructor(props){
        super(props)
        this.state={
            link:this.props.nav.routes[3].params.url
        }
    }

    render() {
        const {dispatch} = this.props

        return (
            <View style={styles.rootView}>
                <Header type='title' title='热点新闻'/>
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
        backgroundColor:'#FFF',
        flex:1,
    },
    webView:{}
})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(News)