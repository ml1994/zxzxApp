import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Header from '../components/header'
import MyVideo from '../components/myVideo'
import myFetch from '../utils/myFetch'

class PeopleShow extends Component {
	constructor() {
		super();
		this.state = {
			video: null
		}
		this.initVideo();
	}

	componentDidMount() {
	}

	initVideo() {
		myFetch.get(
			'/video/videolist', {},
			res => {
				console.log(res)
				let video = res.rows[0];
				let create = res.rows[0].createTime.substring(5,10)
				video.createTime = create;
				this.setState({
					video: video
				})
			}
			, err => {
				console.log(err)
			}
		)
	}

	render() {
		/*const video = {
			uri: 'http://video.zxzx119.com/e3dfa82b70fa4ec79825290019ff6e7f/baa86439bb414e638f895fd0fd37b74a-23ed88f2a1a26984ec60a497bcc1d316.m3u8',
			title: '消防安全 人人有责',
			time: '07-23',
			info: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
		}*/
		return (
			<ScrollView style={styles.rootView}>
				<Header type='title' title='真人秀'/>
				<MyVideo {...this.state.video} />
				<ImageBackground source={require('../asset/ppshow_adbg.jpg')} style={styles.adbg} resizeMode='contain'>
					<Text style={styles.adText}>更多精彩 敬请期待</Text>
				</ImageBackground>
			</ScrollView>
		)
	}
}

var styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	adbg: {
		height: 100,
		marginHorizontal: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	adText: {
		backgroundColor: 'transparent',
		fontSize: 28,
		color: '#fff'
	}
});

export default PeopleShow