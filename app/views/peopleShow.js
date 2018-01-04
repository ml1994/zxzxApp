import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'

import Header from '../components/header'
import MyVideo from '../components/myVideo'
import myFetch from '../utils/myFetch'

class PeopleShow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			video: null
		}
		this.initVideo()
	}

	initVideo() {
		const {dispatch} = this.props
		myFetch.get(
			'/video/videolist', {},
			res => {
				console.log(res)
				if(res.code==0){
					let video = res.data.rows[0];
					let create = res.data.rows[0].createTime.substring(5,10)
					video.createTime = create;
					this.setState({
						video: video
					})
				}else{
					dispatch(NavigationActions.back())
				}

			}
			, err => {
				console.log(err)
			}
		)
	}

	render() {
		const {dispatch} = this.props
		return (
			<View style={styles.rootView}>
				<Header type='title' title='紧急呼叫'/>
				<ScrollView>
					<MyVideo {...this.state.video} />
					{/* <ImageBackground source={require('../asset/ppshow_adbg.jpg')} style={styles.adbg} resizeMode='contain'>
						<Text style={styles.adText}>更多精彩 敬请期待</Text>
					</ImageBackground> */}
					<View style={styles.containerbg}>
						<Image style={styles.topbg} source={require('../asset/header-bg-119.jpg')} resizeMode="cover"/>
						<View style={styles.container}>
							<Image style={styles.logo} source={require('../asset/logo-119.png')} resizeMode="cover"/>
							<Image style={styles.title} source={require('../asset/title-119.png')} resizeMode="cover"/>
							<Image style={styles.subtitle} source={require('../asset/subtitle-119.png')} resizeMode="cover"/>
							<ImageBackground style={styles.apply} source={require('../asset/apply-119.png')} resizeMode="cover">
								<TouchableOpacity style={styles.applyBtn} onPress={()=>dispatch(NavigationActions.navigate({routeName:'Apply'}))}>
									<Text style={styles.btnText}>我要报名</Text>
								</TouchableOpacity>
							</ImageBackground>
							<Image style={styles.circle} source={require('../asset/circle-119.png')} resizeMode="cover"/>
						</View>
						<Image style={styles.bottombg} source={require('../asset/fire-119.png')} resizeMode="cover"/>
					</View>
				</ScrollView>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	// adbg: {
	// 	height: 100,
	// 	marginHorizontal: 16,
	// 	justifyContent: 'center',
	// 	alignItems: 'center'
	// },
	// adText: {
	// 	backgroundColor: 'transparent',
	// 	fontSize: 28,
	// 	color: '#fff'
	// },
	containerbg:{
		marginTop: 12,
		width: '100%',
		height: 609,
		backgroundColor: '#191919',
	},
	topbg:{
		width: '100%',
		height: 225
	},
	container:{
		position: 'absolute',
		width: '100%',
		height: 609,
		alignItems: 'center'
	},
	logo:{
		marginTop: 19,
		width: 106,
		height: 94
	},
	title:{
		marginTop: 9,
		width: 288,
		height: 27
	},
	subtitle:{
		marginTop: 6,
		width: 90,
		height: 12
	},
	apply:{
		marginTop: 11,
		width: '66%',
		height: 128,
		alignItems: 'center'
	},
	applyBtn:{
		marginTop: 98,
		width: 93,
		height: 22,
		justifyContent: 'center',
		backgroundColor: '#ce2626',
		borderRadius: 1
	},
	btnText:{
		textAlign: 'center',
		color: '#fff',
		fontSize: 12
	},
	circle:{
		marginTop: 23,
		width: 272,
		height: 233,
	},
	bottombg:{
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 90
	}
});

const mapStateToProps = store=>({
	nav:store.nav
})

export default connect(mapStateToProps)(PeopleShow)