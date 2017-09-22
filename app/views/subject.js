import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, FlatList, ImageBackground, Modal, TouchableOpacity,} from 'react-native'
import Swiper from 'react-native-swiper'
import Header from '../components/header'
import Question from '../components/question'
import Icon from '../components/icon'
import {NavigationActions} from 'react-navigation'
import myFetch from '../utils/myFetch'
import {connect} from 'react-redux'
import storage from '../gStorage'
import * as appStateActions from '../actions/appState'

class Subject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			total: 2,
			index: 0,
			testList: [],
			modal: {
				type: 'pause',
				visible: false,
			},
			testResult: {score: 0, right: 0},
			testIng: 0
		}
		console.log(this.props.nav.routes[1].params.type)
		this.loadTestList()
	}

	initTest() {
		const {dispatch} = this.props
		let id = this.props.nav.routes[1].params.type
		return dispatch => {
			dispatch(appStateActions.fetch({fetching: true}))
			myFetch.post(
				'/examqueBank/startexam',
				`id=${id}`,
				resj => {
					const {code, message} = resj
					if (code == 0) {
						let total = resj.data.examquelist.length;
						let resultObj = {
							id: resj.data.id,
							testIng: 0,
							resultList: [],
							testList: resj.data.examquelist
						}
						this.setState({
							testList: []
						})
						this.setState({
							total: total,
							testList: resj.data.examquelist
						})
						for (let i = 0; i < total; i++) {
							resultObj.resultList.push({
								que_id: resj.data.examquelist[i].id,
								result: ''
							})
						}
						storage.save({key: this.props.userinfo.account, id: id, data: resultObj})
					} else {
						alert(message);
						dispatch(NavigationActions.back())
					}
					dispatch(appStateActions.fetchEnd({fetching: false}))
				},
				err => {
					console.log(err)
					alert(err)
					dispatch(appStateActions.fetchEnd({fetching: false}))
				}
			)
		}
	}

	continueTest() {
		this.setModalVisible(false)
	}

	restartTest() {
		const {dispatch} = this.props
		this.setModalVisible(false)
		storage.remove({
			key: this.props.userinfo.account,
			id: this.props.nav.routes[1].params.type
		})
		dispatch(this.initTest())
		this.initTest()
		this._swiper.scrollBy(-(this.state.index), false)
	}

	loadTestList() {
		const {dispatch} = this.props
		let id = this.props.nav.routes[1].params.type
		storage.load({key: this.props.userinfo.account, id: id}).then(ret => {
			this.setModalVisible(true, 'start');
			this.setState({index: ret.testIng, testList: ret.testList, total: ret.testList.length,});
		}).catch(err => {
			console.warn(err.message)
			switch (err.name) {
				case 'NotFoundError':
					dispatch(this.initTest())
					this.initTest()
					break;
				case 'ExpiredError':
					// TODO
					break;
			}
		})

	}

	renderBtnPrev = () => {
		let index = this.state.index;
		let total = this.state.total;
		if (index == 0) {
			return null;
		} else {
			return (
				<TouchableOpacity onPress={() => this._swiper.scrollBy(-1)}>
					<ImageBackground source={require('../asset/btn_bg_red.png')} resizeMode='contain'
									 style={styles.btn}>
						<Text style={styles.btnText}>上一题</Text>
					</ImageBackground>
				</TouchableOpacity>
			)
		}
	}

	renderBtnNext = () => {
		let index = this.state.index + 1;
		let total = this.state.total;
		let text = index < total ? '下一题' : '交卷';
		let handleClick = () => {
			if (index < total) {
				this._swiper.scrollBy(1);
			}
			else {
				this.submitTest();
			}
		};
		return (
			<TouchableOpacity onPress={() => handleClick()}>
				<ImageBackground source={require('../asset/btn_bg_yellow.png')} resizeMode='contain' style={styles.btn}>
					<Text style={styles.btnText}>{text}</Text>
				</ImageBackground>
			</TouchableOpacity>
		);
	}

	submitTest() {
		storage.load({key: this.props.userinfo.account, id: this.props.nav.routes[1].params.type}).then(
			ret => {
				fetch(`http://115.236.94.196:30005/app/examqueBank/uploadresult/${ret.id}`, {
					method: 'POST',
					body: JSON.stringify(ret.resultList),
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((response) => response.json())
					.then((responseJSON) => {
						this.setState({
							testResult: {score: responseJSON.data.score, right: responseJSON.data.tails.right},
						})
						this.setModalVisible(true, 'end')
						storage.remove({
							key: this.props.userinfo.account,
							id: this.props.nav.routes[1].params.type
						})
					}).then(() => {
					storage.remove({key: this.props.userinfo.account, id: this.props.nav.routes[1].params.type})
				})
			}
		).catch(err => {
			// 如果没有找到数据且没有sync方法，
			// 或者有其他异常，则在catch中返回
			console.warn(err.message);
			switch (err.name) {
				case 'NotFoundError':
					console.log('提交答案未找到记录')
					break;
				case 'ExpiredError':
					break;
			}
		})
	}

	renderModal(type) {
		const {dispatch} = this.props;
		switch (type) {
			case 'start':
				return (
					<View>
						<View style={styles.modalClose}>
							<TouchableOpacity style={styles.modalCloseView} onPress={() => {
								dispatch(NavigationActions.back())
								this.setModalVisible(false)
							}}>
								<Icon name='close' size={28} color='#fff'/>
							</TouchableOpacity>
							<View style={styles.modalLine}></View>
						</View>
						<View style={styles.modalStart}>
							<View style={styles.modalStartTop}>
								<Text style={styles.modalStartTopText}>您上一次回答道第{this.state.index + 1}题，是否继续进行？</Text>
							</View>
							<View style={styles.modalStartBottom}>
								<TouchableOpacity onPress={() => this.continueTest()}>
									<ImageBackground source={require('../asset/btn_bg_red.png')} resizeMode='contain'
													 style={styles.btn}>
										<Text style={styles.btnText}>继续挑战</Text>
									</ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => this.restartTest()}>
									<ImageBackground source={require('../asset/btn_bg_yellow.png')} resizeMode='contain'
													 style={styles.btn}>
										<Text style={styles.btnText}>重新开始</Text>
									</ImageBackground>
								</TouchableOpacity>
							</View>
						</View>
					</View>

				)
				break;
			case 'pause':
				return (
					<View style={styles.modalPause}>
						<View style={styles.modalPauseTextView}>
							<Text style={styles.modalPauseText}>暂停</Text>
						</View>
						<View style={styles.modalPauseIconsView}>
							<TouchableOpacity onPress={() => {
								dispatch(NavigationActions.back())
								this.setModalVisible(false);
							}}>
								<Icon name='home' size={40} color='#fff'/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.setModalVisible(false)}>
								<Icon name='play-circle-o' size={60} color='#faab00'/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.restartTest()}>
								<Icon name='refresh' size={36} color='#fff'/>
							</TouchableOpacity>
						</View>
					</View>
				)
				break;
			case 'end':
				return (
					<View>
						<View style={styles.modalClose}>
							<TouchableOpacity style={styles.modalCloseView} onPress={() => {
								dispatch(NavigationActions.back())
								this.setModalVisible(false)
							}}>
								<Icon name='close' size={28} color='#fff'/>
							</TouchableOpacity>
							<View style={styles.modalLine}></View>
						</View>
						<View style={styles.modalEnd}>
							<View style={styles.modalEndTop}>
								<Text style={styles.modalEndScore}>{this.state.testResult.score}</Text>
							</View>
							<View style={styles.modalEndBottom}>
								<Text style={styles.modalEndScoreText}>分数</Text>
								<Text style={styles.circle}></Text>
								<Text
									style={styles.modalEndBottomText}>对{this.state.testResult.right}题，错{this.state.total - this.state.testResult.right}题！</Text>
								<TouchableOpacity onPress={() => this.restartTest()}>
									<ImageBackground source={require('../asset/btn_bg_yellow.png')} resizeMode='contain'
													 style={styles.btn}>
										<Text style={styles.btnText}>重新开始</Text>
									</ImageBackground>
								</TouchableOpacity>
							</View>
						</View>
					</View>

				)
				break;

			default:
				break;
		}

	}

	setModalVisible = (visible, type = '') => {
		this.setState({modal: {visible: visible, type: type}});
	}

	render() {
		const icons = ['pause']
		let {testList, index, total} = this.state;
		testList.map((item, index) => {
			item.key = index
		})
		return (
			<View style={styles.rootView}>
				<Header type='title' title='物业培训' icons={icons} iconPress={() => this.setModalVisible(true, 'pause')}/>
				{(testList.length) ?
					<Swiper loop={false} showsPagination={false} showsButtons={false} index={this.state.index}
							ref={(swiper) => {
								this._swiper = swiper;
							}}
							onMomentumScrollEnd={(e, state, context) => {
								this.setState({index: state.index,})
							}}>
						{testList.map((item, index) => {
							return (
								<View style={styles.page} key={index}>
									<Question {...item} index={index} total={this.state.total}/>
								</View>
							)
						})}
					</Swiper> : null}
				<View style={styles.btnContainer}>
					{this.renderBtnPrev()}{this.renderBtnNext()}
				</View>
				<Image source={require('../asset/page_arrow.png')} resizeMode='contain' style={styles.arrow}/>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modal.visible}
				>
					<TouchableOpacity style={styles.modalView} activeOpacity={1}>
						{this.renderModal(this.state.modal.type)}
					</TouchableOpacity>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	btnContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 50,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	arrow: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: 100,
		height: 100
	},
	page: {
		flex: 1
	},
	//上下题按钮
	btn: {
		width: 110,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		backgroundColor: 'transparent'
	},
	//modal
	modalView: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'rgba(0,0,0,.5)'
	},
	//modalStart
	modalStart: {
		borderRadius: 20,
		alignItems: 'center',
		backgroundColor: '#fff',
		overflow: 'visible'
	},
	modalStartTop: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingVertical: 40,
		paddingHorizontal: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e92e2e'
	},
	modalStartTopText: {
		color: '#fff',
		fontSize: 22,
		lineHeight: 30
	},
	modalStartBottom: {
		flexDirection: 'row',
		paddingVertical: 40
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
	//modalEnd
	modalEnd: {
		borderRadius: 20,
		alignItems: 'center',
		overflow: 'visible',
		backgroundColor: '#fff',
	},
	modalEndTop: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 40,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#e92e2e'
	},
	modalEndImg: {
		width: '100%',
		height: '100%',
		alignItems: 'center'
	},
	modalEndScore: {
		fontSize: 66,
		color: '#fff',
		padding: 0
	},
	modalEndBottom: {
		paddingVertical: 20,
		alignItems: 'center',
		width: '100%',
	},
	modalEndScoreText: {
		color: '#7d7d7d',
		fontSize: 24,
		fontWeight: 'bold',
		padding: 0
	},
	modalEndBottomText: {
		marginTop: 30,
		marginBottom: 20,
		fontSize: 20,
		color: '#ce2626',
		fontWeight: 'bold',
		padding: 0
	},
	circle: {
		marginTop: -150,
		borderRadius: 80,
		width: 160,
		height: 160,
		borderWidth: 4,
		borderColor: '#faab00',
		backgroundColor: 'transparent'
	},
	//modalPause
	modalPause: {
		height: '50%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	modalPauseTextView: {
		height: '20%',

	},
	modalPauseText: {
		color: '#fff',
		fontSize: 36
	},
	modalPauseIconsView: {
		flexDirection: 'row',
		width: '80%',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
})

const mapStateToProps = store => {
	return {
		nav: store.nav,
		userinfo: store.userinfo
	}
}

export default connect(mapStateToProps)(Subject)