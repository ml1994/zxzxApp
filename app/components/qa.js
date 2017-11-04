import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet } from 'react-native'
import Icon from '../components/icon'

class Qa extends Component {

    render() {
        const {type,text,time} = this.props
        return (
            <View style={styles.rootView}>
                <View style={[styles.container,type=='question'?styles.questionBg:styles.answerBg]}>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomLeftView}>
                            {/*this.props.userinfo.vip==true&&type=='question'?
                                <View style={styles.vipSee}>
                                    <View style={styles.vipView}>
                                        <Text style={styles.vip}>VIP</Text>    
                                    </View>
                                    <Text style={styles.vipText}>{this.props.userinfo.partner}</Text>
                                </View>:null
                            */}
                            {this.props.userinfo.vip==true&&type=='answer'?
                                <View style={styles.proSee}>
                                    <Icon name='star' size={16} color='#FC0D1B'/>
                                    <Text style={styles.proText}>专家</Text>
                                </View>:null
                            }
                        </View>
                        <Text style={styles.time}>{time}</Text>
                    </View>   
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        width:'100%',
        alignItems:'center'
    },
    container:{
        width:'96%',
        marginTop:10,
        paddingVertical:10,
        paddingHorizontal:14,
        borderWidth:1,
        borderColor:'#e5e5e5',
        borderRadius:3
    },
    questionBg:{
        backgroundColor:'#fff'
    },
    answerBg:{
        backgroundColor:'#f1f1f1'
    },
    text:{
        color:'#1e1e1e'
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
        marginRight:10,
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
    proSee:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    proText:{
        marginLeft:10,
        color:'#FC0D1B'
    },
    time:{
        marginTop:10,
        fontSize:12,
        color:'#ca8750'
    }
})

const mapStateToProps = store=>({
    userinfo:store.userinfo
})

export default connect(mapStateToProps)(Qa)