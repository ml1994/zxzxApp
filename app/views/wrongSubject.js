import React, {Component} from 'react'
import {View, Image, TouchableOpacity, StyleSheet, Text, ImageBackground} from 'react-native'
import Swiper from 'react-native-swiper'
import myFetch from '../utils/myFetch'
import Header from '../components/header'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import * as appStateActions from '../actions/appState'
import WrongQuestion from '../components/wrongQuestion'

class WrongSubject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			wrongList: [],
			index: 0,
			total: this.props.nav.routes[3].params.wrong
		}
		const {dispatch,appState} = this.props
		if(appState.isConnected){
			this.initWrongList()
		}else{
			//
		}
	}

	renderBtnPrev() {
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

	renderBtnNext() {
		let index = this.state.index + 1;
		let total = this.state.total;
		let text = index < total ? '下一题' : '交卷';
		if (index < total) {
			return (
				<TouchableOpacity onPress={() => this._swiper.scrollBy(1)}>
					<ImageBackground source={require('../asset/btn_bg_yellow.png')} resizeMode='contain'
									 style={styles.btn}>
						<Text style={styles.btnText}>下一题</Text>
					</ImageBackground>
				</TouchableOpacity>
			);
		} else {
			return null
		}
	}

	renderSwiper() {
		let {wrongList, index, total} = this.state
		for (let i = 0; i < wrongList.length; i++) {
			if (wrongList[i].tails.type != 1) {
				wrongList.splice(i, 1)
				i--
			}
		}
		//console.log(wrongList)
		if (wrongList.length) {
			return (
				<Swiper loop={false} showsPagination={false} showsButtons={false}
						ref={(swiper) => {
							this._swiper = swiper;
						}}
						onMomentumScrollEnd={(e, state, context) => {
							this.setState({index: state.index,})
						}}>
					{wrongList.map((item, index) => {
						return (
							<View style={styles.page} key={index}>
								<WrongQuestion {...item} index={index} total={total}></WrongQuestion>
							</View>
						)
					})}
				</Swiper>
			)
		} else {
			return null
		}
	}

	initWrongList() {
		const {dispatch} = this.props
		dispatch(appStateActions.fetch({fetching: true}))
		myFetch.get(
			'/examqueBank/result/' + this.props.nav.routes[3].params.result_id,
			{},
			res => {
				console.log(res)
				if (res.code == 0) {
					this.setState({
						wrongList: res.data,
					})
				} else {
					Alert('提示', res.message)
				}
				dispatch(appStateActions.fetchEnd({fetching: false}))
			},
			err => {
				console.log(err)
				dispatch(appStateActions.fetchEnd({fetching: false}))
			})
	}

	render() {
		return (
			<View style={styles.rootView}>
				<Header type='title' title='查看错题'></Header>
				{this.renderSwiper()}
				<View style={styles.btnContainer}>
					{this.renderBtnPrev()}{this.renderBtnNext()}
				</View>
				<Image source={require('../asset/page_arrow.png')} resizeMode='contain' style={styles.arrow}/>
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
})
const mapStateToProps = store => {
	return {
		nav: store.nav,
		appState: store.appState
	}
}
export default connect(mapStateToProps)(WrongSubject)