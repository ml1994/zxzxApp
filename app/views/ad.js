import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'

class Ad extends Component {

    constructor(props){
        super(props)
        this.state={
            time:2+4,
            adList:[]
        }
    }

    componentDidMount() {

        myFetch.get(
            '/advertisement/screen',
            {},
            res=>{
                if(res.code==0){
                    this.setState({
                        adList:res.data
                    })
                    
                    if(!this.state.adList.length){
                        this.goHome()
                    }else{
                        this.timeoutFun()
                    }
                }
            },
            err=>{
                console.log(err)
                this.goHome()
            }
        )
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    timeoutFun(){
        this.setState({
            time:this.state.time-1
        })
        if(this.state.time){
            this.timer = setTimeout(()=>{
                this.timeoutFun()
                //console.log(this.state.time,new Date())
            },1000)
        }else{
            this.goHome()
        }
    }

    goHome(){
        const {dispatch} = this.props
        const resetAction = NavigationActions.reset({//路由中移除ad页，到home页
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'TabNav'})
            ]
        })
        dispatch(resetAction)
    }

    renderSwiper(){
        const {appState} = this.props
		if(!appState.isConnected&&this.state.adList.length==0){
			return  <View></View>
		}else{
            return (
                <Swiper showsPagination={false}>
                    {this.state.adList.map((item,index) => {
                        return (
                            <View style={styles.views} key={index}>
                                <Image
                                    style={styles.views}
                                    source={{uri:item.ad_file}} 
                                    resizeMode='stretch'/>
                            </View>
                        )
                    })}
                </Swiper>
            )
        }
    }

    render() {
        return (
            <View style={styles.rootView}>
                {this.renderSwiper()}
                <TouchableOpacity style={styles.fixButton} onPress={()=>{
                    this.goHome()
                }}>
                    <Text style={styles.buttonText}>跳过 {this.state.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
    },
    views:{
        flex:1,
        width:'100%'
    },
    Image:{
        flex:1
    },
    fixButton:{
        position:'absolute',
        top:30,
        right:30,
        padding:5,
        backgroundColor: 'rgba(255,255,255,.5)', //使用背景色透明度，用opacity会使内部所有元素半透明
        borderRadius: 10,
        height:20,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color:'#fff',
        fontSize:12,
    }
})

const mapStateToProps = store => ({
    appState:store.appState
})

export default connect(mapStateToProps)(Ad)
