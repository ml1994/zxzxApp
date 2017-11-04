import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, Image,TouchableOpacity,StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'

class Ask extends Component {

    constructor(props){
        super(props)
    }

    render() {
        //update判断是否显示new
        const {dispatch,title,text,time,id,update} = this.props
        //console.log(this.props.userinfo.vip)
        return (
            <View style={styles.rootView}>
                <TouchableOpacity style={styles.touchView} onPress={()=>dispatch(NavigationActions.navigate({routeName:'AskDetail',params:{id}}))}>
                    <View style={styles.titleView}>
                        <View style={styles.dot}></View>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    </View>
                    <Text style={styles.text} numberOfLines={3}>{text}</Text>
                    
                    <View style={styles.bottomView}>
                        <View style={styles.bottomLeftView}>
                            {/*this.props.userinfo.vip==true?
                                <View style={styles.vipSee}>
                                    <View style={styles.vipView}>
                                        <Text style={styles.vip}>VIP</Text>    
                                    </View>
                                    <Text style={styles.vipText}>{this.props.userinfo.partner}</Text>
                                </View>:null
                            */}
                        </View>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                    {!update?<Image source={require('../asset/ask_new.png')} resizeMode='contain' style={styles.corner}/>:null}
                    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        marginTop:10,
        width:'100%',
        height:100, 
        alignItems:'center' 
    },
    touchView:{
        width:'96%',
        backgroundColor:'#f1f1f1',
        paddingHorizontal:10,
        paddingVertical:10,
        justifyContent:'space-around',
        borderRadius:3
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center'
    },
    dot:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'#ff8a00',
        marginRight:6
    },
    title:{
        fontSize:18,
        width:'90%',
        color:'#202020'
    },
    text:{
        marginLeft:16,
        marginTop:10,
        fontSize:12,
        color:'#202020'
    },
    bottomView:{
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
        justifyContent:'space-between'
    },
    bottomLeftView:{
        flexDirection:'row',
        alignItems:'center'
    },
    vipSee:{
        flexDirection:'row',
        alignItems:'center'
    },
    vipView:{
        marginHorizontal:10,
        backgroundColor:'#F19725',
        borderRadius:2,
        width:30,
        alignItems:'center',
    },
    vip:{
        color:'#f1f1f1',
        fontWeight:'bold', 
    },
    vipText:{
        color:'#F5CB2E'
    },
    time:{
        color:'#555',
        fontSize:10
    },
    corner:{
        position:'absolute',
        right:0,
        top:0,
        width:38,
        height:30
    }
})

const mapStateToProps = store=>({
    nav:store.nav,
    userinfo:store.userinfo
})

export default connect(mapStateToProps)(Ask)