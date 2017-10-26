import React, {Component} from 'react'
import {View, Text, TextInput, ImageBackground, StyleSheet,Image} from 'react-native'
import Icon from '../components/icon'
import FakeSearchInput from '../components/fakeSearchInput'
import Swiper from 'react-native-swiper'

export default class HomeBanner extends Component {

    constructor(props) {
        super(props)
        this.state = {
           visibleSwiper: false
        }
     }
     
     componentDidMount() {
        setTimeout(() => {//控制swiper组件延迟加载，避免和TabsNavigator冲突导致无法正常使用
           this.setState({
             visibleSwiper: true
           })
        }, 100)
     }


    render() {
        let swiper = null
        if(this.state.visibleSwiper){
                swiper=(
                    <Swiper autoplay={true} autoplayTimeout={5} activeDotColor='#fff'>
                        <View style={styles.slide1}>
                            <Image style={styles.bannerImg} source={require('../asset/banner1.jpg')} resizeMode='stretch'/>
                        </View>
                        <View style={styles.slide1}>
                            <Image style={styles.bannerImg} source={require('../asset/banner2.jpg')} resizeMode='stretch'/>
                        </View>
                        <View style={styles.slide1}>
                            <Image style={styles.bannerImg} source={require('../asset/banner3.jpg')} resizeMode='stretch'/>
                        </View>
                    </Swiper>
                    )
        }else{
                swiper=(
                    <View style={{flex:1}}></View>
                    )
        }
        return (
            // <ImageBackground
            //     source={require('../asset/banner_bg.jpg')}
            //     resizeMode='cover'
            //     style={styles.bgStyle}>
            //     {/*<View style={styles.topBar}>
            //         <View style={styles.bellIcon}>
            //             {<Icon name="bell-o" size={20} color="#fff"/>}
            //         </View> 
            //         <FakeSearchInput placeholder="技术咨询"/>
            //     </View>*/}
            // </ImageBackground>
            <View style={styles.rootView}>
                {swiper}
                <View style={styles.topBar}>
                    {/* <View style={styles.bellIcon}>
                        {<Icon name="bell-o" size={20} color="#fff"/>}
                    </View>  */}
                    <FakeSearchInput placeholder="技术咨询"/>
                </View>
            </View>
                
        )
    }
}
const STATUSBAR_HEIGHT = 20
const styles = StyleSheet.create({
    rootView:{
        height:'50%'
    },
    bgStyle: {
        paddingTop: STATUSBAR_HEIGHT, //避开顶部状态栏高度
        width: '100%',
        height: '50%'
    },
    topBar: {
		flex: 1,
		width:'100%',
		flexDirection: 'row',
		top: 40,
		height: 30,
		justifyContent:'center',
		position:'absolute'
	},
    bellIcon: {
        width: 60,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    bannerImg:{
        width:'100%',
        height:'100%'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
})