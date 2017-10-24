import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Icon from '../components/icon'
import * as newsActions from '../actions/news'
import * as appStateActions from '../actions/appState'

class SearchInput extends Component {

    constructor(){
        super()
        this.state = {
            searchText:''
        }
    }

    _onChangeText(searchText){
        this.setState({
            searchText
        })
    }

    submitFun(){
        const {dispatch} = this.props
        const searchText = this.state.searchText
        return dispatch=>{
            dispatch(appStateActions.fetch({fetching:true}))
            fetch(`http://zxzx119.com/api?method=querywaterfallByTitle&page=1&pagesize=20&taxonomyid=5&title=${searchText}`)
            .then(res=>res.json())
            .then(resj=>{
                dispatch(newsActions.getSearchList({searchList:resj.data.list}))
                dispatch(appStateActions.fetchEnd({fetching:false}))
            })
            .catch(err=>{
                console.log(err)
                dispatch(appStateActions.fetchEnd({fetching:false}))
            })    
        }
    }

    render() {
        const {dispatch} = this.props
        return (
            <View style={styles.rootView}>
                <View style={styles.rowView}>
                    <Icon name='search' size={20} color='#fff'/>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='rgba(255,255,255,.5)'
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={searchText=>this._onChangeText(searchText)}
                        onSubmitEditing={()=>dispatch(this.submitFun())}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView: {
        width: '70%',
        height: 30
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'rgba(255,255,255,.5)', //使用背景色透明度，用opacity会使内部所有元素半透明
        borderRadius: 3,
        alignItems: 'center',
        paddingHorizontal:5
    },
    inputStyle: {
        width: '90%',
        paddingVertical: 0,
        marginLeft:5
    },
    textStyle: {
        width: '90%',
        color: 'rgba(255,255,255,.5)'
    }
})

const mapStateToProps=store=>{
    return {
        nav:store.nav,
        news:store.news
    }
}

export default connect(mapStateToProps)(SearchInput)