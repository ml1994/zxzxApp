import React, {Component} from 'react'
import {View, Button, ImageBackground, Text, TextInput, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {NavigationActions} from 'react-navigation'

class AddOnAsk extends Component {

    publishFun(){

    }

    render() {
        const {dispatch} = this.props
        return (
            <View style={styles.rootView}>
                <ImageBackground source={require('../asset/add_bg.jpg')} style={styles.imageBg}>
                    <View style={styles.header}>
                        <Text style={styles.button} onPress={()=>{dispatch(NavigationActions.back())}}>取消</Text>
                        <Text style={styles.title}>追加问题</Text>
                        <Text style={styles.button} onPress={()=>{this.publishFun()}}>发布</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder='请输入问题...' placeholderTextColor='#a1a0a0' multiline={true} maxLength={200} underlineColorAndroid="transparent"/>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#ce2626'
    },
    imageBg:{
        marginTop:20,
        flex:1,
        width:'100%'
    },
    header:{
        flexDirection:'row',
        backgroundColor:'transparent',
        width:'100%',
        height: 50,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5'
    },
    title:{
        fontSize:20,
        color:'#1f1f1f'
    },
    button:{
        fontSize:12,
        color:'#c2990c',
        width: 50,
        textAlign:'center'
    },
    textInput:{
        marginTop:20,
        marginHorizontal:10,
        fontSize:12,
    }
})


const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(AddOnAsk)
