import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native'
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

const mapStateToProps = store=>({
	nav:store.nav
})

export default connect(mapStateToProps)(PeopleShow)