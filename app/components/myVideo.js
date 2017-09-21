import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from './icon'
import VideoPlayer from 'react-native-video-player'

export default class MyVideo extends Component {

	render() {
		const {mp4, title, createTime, description,coverURL} = this.props
		return (
			<View>
				<VideoPlayer video={{
					//uri: 'http://cdn.zxzx119.com/720p.mp4'
					uri: mp4
				}} // Can be a URL or a local file.
							 thumbnail={{uri:coverURL}}
							 resizeMode="cover"
							 ref={(ref) => {
								 this.player = ref
							 }} // Store reference
							 style={styles.backgroundVideo}/>
				<View style={styles.titleView}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.infoTitleView}>
					<View style={styles.square}></View>
					<Text style={styles.infoTitle}>影片简介</Text>
					<View style={styles.timeView}>
						<Icon name='clock-o' size={16} color="#999"/>
						<Text style={styles.time}>{createTime}</Text>
					</View>
				</View>
				<Text style={styles.info}>{description}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	backgroundVideo: {
		width: '100%',
		height: 240
	},
	titleView: {
		height: 50,
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		marginLeft: 14,
		color: '#202020'
	},
	infoTitleView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 30,
		borderBottomWidth: 1,
		borderBottomColor: '#e6e6e6'
	},
	square: {
		width: 10,
		height: 10,
		backgroundColor: '#ce2626'
	},
	infoTitle: {
		flex: 6,
		marginLeft: 6,
		fontSize: 16,
		color: '#202020'
	},
	timeView: {
		flex: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginRight: 16
	},
	time: {
		paddingLeft: 4,
		color: '#999',
		fontSize: 12,
	},
	info: {
		marginTop: 10,
		marginHorizontal: 16,
		lineHeight: 24,
		color: '#202020'
	}
})