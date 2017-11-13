import React, {Component} from 'react'
import {View, TouchableOpacity, FlatList, Text, StyleSheet, Alert, ScrollView, Modal, Image} from 'react-native'
import Header from '../components/header'
import VideoPlayer from 'react-native-video-player'
import {connect} from 'react-redux'
import myFetch from '../utils/myFetch'
import {NavigationActions} from 'react-navigation'
import Icon from '../components/icon'
import * as testActions from '../actions/test'
import * as appStateActions from '../actions/appState'

class TestVideo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			videoList: [],
			active: 0,
			modalVisible: false
		}

		const {dispatch,appState} = this.props
		if(appState.isConnected){
			myFetch.get(
				'/account/islogin',
				{},
				res => {
					console.log(res)
					if (res.code == '0') {
						this.getVideoList()
					} else {
						dispatch(NavigationActions.back())
						dispatch(NavigationActions.navigate({routeName: 'Login'}))
					}
				},
				err => {
					console.log(err)
				}
			)
		}else{
			//无网
		}
	}

	getVideoList() {
		const {dispatch} = this.props
		dispatch(appStateActions.fetch({fetching: true}))
		myFetch.get(
			'/examqueBank/bankvideo/' + this.props.test.type,
			{},
			res => {
				if (res.code == 0) {
					this.setState({
						videoList: res.data
					})
				} else {
					Alert.alert('提示', res.message)
					dispatch(NavigationActions.back())
				}
				dispatch(appStateActions.fetchEnd({fetching: false}))
			},
			err => {
				console.log(err)
				dispatch(appStateActions.fetchEnd({fetching: false}))
			})
	}

	headerTitle() {
		const {type} = this.props.test
		if (type == 5) {
			return '社会消防科普'
		} else if (type == 6) {
			return '家庭消防安全'
		} else {
			return '物业从业人员'
		}
	}

	timeFormatting(time) {
		let sec = time % 60
		let min = (time - sec) / 60
		sec = (sec < 10) ? '0' + sec : sec;
		min = (min < 10) ? '0' + min : min;
		return (min + ':' + sec)
	}

	renderVideo() {
		let activeVideo = this.state.videoList[this.state.active]
		if (activeVideo) {
			return (
				<View>
					<VideoPlayer
						video={{uri: activeVideo.mp4}}
						thumbnail={{uri: activeVideo.cover}}
						endWithThumbnail
						resizeMode='cover'
						ref={(ref) => {
							this.player = ref
						}}
						onEnd={() => {
							if (this.state.active < this.state.videoList.length-1) {
								this.setState({active: this.state.active + 1})
							}
						}}
						style={styles.backgroundVideo}
					/>
					<Text style={styles.title}>{activeVideo.title}</Text>
				</View>
			)
		}
	}

	renderList() {
		return (
			<ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
				{this.state.videoList.map((item, index) => {
					return (
						<TouchableOpacity style={styles.item} key={index} onPress={() => {
							this.pressVideo(index)
						}}>
							<Text
								style={[styles.itemText, (index == this.state.active) ? styles.active : null]}>第{index + 1}节</Text>
							<Text
								style={[styles.itemText, (index == this.state.active) ? styles.active : null]}>{item.title}</Text>
							<Text style={styles.duration}>{this.timeFormatting(item.duration)}</Text>
						</TouchableOpacity>)
				})}
			</ScrollView>
		)
	}

	renderBtn() {
		let text, press = ''
		const {dispatch} = this.props
		if (this.props.test.type == 6) {
			text = '消防小贴士'
			press = () => {
				dispatch(NavigationActions.navigate({routeName: 'TestTip'}))
			}
		} else {
			text = '开始答题'
			if (this.props.test.type == 5) {
				press = () => {
					dispatch(NavigationActions.navigate({routeName: 'Subject'}))
				}
			}
			if (this.props.test.type >= 1 && this.props.test.type <= 4) {
				press = () => {
					this.setState({
						modalVisible: true
					})
				}
			}
		}
		return (
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btn} onPress={() => {
					press()
				}}>
					<Text style={styles.btnText}>{text}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderModal() {
		const propertyType = [
			{avatar: require('../asset/avatar-cleaning.png'), name: '保洁/绿化', testType: '2', bgColor: '#dbac54', key: 1},
			{avatar: require('../asset/avatar-security.png'), name: '秩序/客服', testType: '1', bgColor: '#797939', key: 2},
			{avatar: require('../asset/avatar-fire.png'), name: '消控室人员', testType: '3', bgColor: '#7ea87e', key: 3},
			{
				avatar: require('../asset/avatar-management.png'),
				name: '管理层人员',
				testType: '4',
				bgColor: '#bc5e59',
				key: 4
			},
		]
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
				}}
			>
				<TouchableOpacity style={styles.modalView} activeOpacity={1}>
					<View>
						<View style={styles.modalClose}>
							<TouchableOpacity style={styles.modalCloseView} onPress={() => {
								this.setState({modalVisible: false})
							}}>
								<Icon name='close' size={28} color='#fff'/>
							</TouchableOpacity>
							<View style={styles.modalLine}></View>
						</View>
						<View style={styles.propertyTypeView}>
							<Text style={styles.propertyTypeTitle}>您的岗位是保洁，建议优先选择保洁进</Text>
							{propertyType.map((item) => {
								return (
									<TouchableOpacity
										style={[styles.propertyTypeButton, {backgroundColor: item.bgColor}]}
										onPress={() => {
											this.selectProperty(item.testType)
										}} key={item.key}>
										<Image style={styles.propertyTypeIcon} resizeMode='contain'
											   source={item.avatar}></Image>
										<Text style={styles.propertyTypeText}>{item.name}</Text>
									</TouchableOpacity>)
							})}
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		)
	}

	selectProperty(type) {
		const {dispatch} = this.props
		this.setState({
			modalVisible: false
		})
		dispatch(NavigationActions.navigate({routeName: 'Subject'}))
		dispatch(testActions.getTestType({type: type}))
	}

	pressVideo(index) {
		if (this.player.state.isStarted) {
			this.player.onEnd();
		}
		this.setState({active: index});
	}

	render() {
		return (
			<View style={styles.rootView}>
				<Header type='title' title={this.headerTitle()}></Header>
				{this.renderVideo()}
				{this.renderList()}
				{this.renderBtn()}
				{this.renderModal()}
			</View>
		)

	}
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	backgroundVideo: {
		width: '100%',
		height: 180
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#202020',
		paddingHorizontal: 10,
		marginTop: 10
	},
	//list
	duration: {
		color: '#999',
		fontSize: 12
	},
	item: {
		height: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#eee',
		borderBottomWidth: 1,
		paddingHorizontal: 10
	},
	itemText: {
		color: '#202020',
		fontSize: 12
	},
	active: {
		color: '#C32726'
	},
	list: {
		flex: 1,
		marginVertical: 30
	},
	btnContainer: {
		bottom: 0,
		alignItems: 'flex-end',
	},
	btn: {
		height: 40,
		width: '50%',
		backgroundColor: '#C32726',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		color: '#fff'
	},
	//modal
	modalView: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'rgba(0,0,0,.5)'
	},
	modalClose: {
		marginTop: -100,
		width: '100%',
		alignItems: 'flex-end'
	},
	modalCloseView: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalLine: {
		marginRight: 20,
		height: 60,
		borderLeftWidth: 1,
		borderLeftColor: '#fff'
	},
	propertyTypeView: {
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 20
	},
	propertyTypeTitle: {
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		color: '#202020'
	},
	propertyTypeButton: {
		marginTop: 15,
		paddingHorizontal: 15,
		borderRadius: 10,
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
	},
	propertyTypeText: {
		color: '#fff',
		fontSize: 22,
		textAlign: 'center',
		flex: 1,
		fontWeight: 'bold'
	},
	propertyTypeIcon: {
		width: 60,
	}
})
const mapStateToProps = store => {
	return {
		test: store.test,
		appState: store.appState
	}
}
export default connect(mapStateToProps)(TestVideo)