import React, {Component} from 'react'
import {View, Text, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity,Dimensions} from 'react-native'
import Icon from '../components/icon'
import FakeSearchInput from '../components/fakeSearchInput'
import Swiper from 'react-native-swiper'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import myFetch from '../utils/myFetch'

class HomeBanner extends Component {

	constructor(props) {
		super(props)
		this.state = {
			visibleSwiper: false,
			advList:[]
		}
		this.getAdvList()
	}

	getAdvList(){
		myFetch.get(
			'/advertisement/banner',
			{},
			res=>{
				if(res.code==0){
					this.setState({
						advList:res.data
					})
				}
			},
			err=>{}
		)
	}

	componentWillMount() {
		setTimeout(() => {//控制swiper组件延迟加载，避免和TabsNavigator冲突导致无法正常使用
			this.setState({
				visibleSwiper: true
			})
		}, 500)
		
	}


	goWebView(link) {
		const {dispatch} = this.props;
		dispatch(NavigationActions.navigate({routeName: 'KnowAllDetail', params: {link: link,title:'热点新闻'}}))
	}

	renderSwiper(){
		const {appState} = this.props
		if(!appState.isConnected&&this.state.advList.length==0){
			return  <View></View>
		}else{
			let swiper = null
			
			if (this.state.visibleSwiper) {
				swiper = (
					<Swiper style={styles.swiper} autoplay={true} autoplayTimeout={5} activeDotColor='rgba(255,255,255,.6)' removeClippedSubviews={false}>
						{this.state.advList.map((item, index) => {
							return (
								<TouchableOpacity style={styles.slide1} key={index} onPress={() => {
									this.goWebView(item.ad_url)
								}} activeOpacity={1}>
									<Image style={styles.bannerImg} source={{uri:item.ad_file}} resizeMode='stretch'/>
								</TouchableOpacity>
							)
						})}
					</Swiper>
				)
			} else {
				swiper = (
					<View></View>
				)
			}
			return swiper
		}
	}

	render() {
		
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
				{this.renderSwiper()}
				
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
const bannerHeight = (Dimensions.get('window').height-50)/2
const styles = StyleSheet.create({
	rootView: {
		height: bannerHeight
	},
	bgStyle: {
		paddingTop: STATUSBAR_HEIGHT, //避开顶部状态栏高度
		width: '100%',
		height: '50%'
	},
	topBar: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		top: 40,
		height: 30,
		justifyContent: 'center',
		position: 'absolute'
	},
	bellIcon: {
		width: 60,
		height: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	swiper:{
		height:bannerHeight
	},
	slide1: {
		//flex:1,
		height:bannerHeight,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	bannerImg: {
		width: '100%',
		height:'100%'
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	}
})
const mapStateToProps = store => {
	return {
		nav: store.nav,
		appState: store.appState
	}
}
export default connect(mapStateToProps)(HomeBanner)