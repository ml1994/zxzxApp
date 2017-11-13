import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Image, Alert} from 'react-native'
import {NavigationActions} from 'react-navigation'
import storage from '../gStorage'
import Header from '../components/header'
import Icon from '../components/icon'
import myFetch from '../utils/myFetch'
import * as testActions from '../actions/test'
import * as userinfoActions from '../actions/userinfo'


class Test extends Component {

	constructor(props) {
		super(props)
		const {dispatch,appState} = this.props
		this.state = {
			modalVisible: false
		}
		if(appState.isConnected){
			dispatch(this.initMaxScore())
		}else{
			//无网
		}

	}

	initMaxScore() {
		const {dispatch} = this.props
		let maxScore = new Array()
		return dispatch => {
			dispatch({type: 'GETTING_MAX_SCORE'})
			myFetch.get(
				'/examqueBank/list',
				{},
				res => {
					res.rows.map((item) => {
						maxScore.push(item.maxscore);
					})
					console.log(res)
					dispatch(userinfoActions.getInfo({account: res.rows[0].account}))
					dispatch(testActions.getMaxScore({maxScore}))
				},
				err => {
					console.log(err)
				}
			)
		}
	}

	goSubject(type) {
		const {dispatch} = this.props
		dispatch(NavigationActions.navigate({routeName: 'TestVideo'}))
		dispatch(testActions.getTestType({type:type}))
	}

	render() {
		// const icons = ['bell-o', 'search']
		const icons = []
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
			}]
		let maxProperty = Math.max(this.props.test.maxScore[0], this.props.test.maxScore[1], this.props.test.maxScore[2], this.props.test.maxScore[3])
		return (
			<View style={styles.rootView}>
				<Header type='title' title='教育培训' icons={icons}/>
				<ImageBackground source={require('../asset/test_bg.png')} style={styles.imgBg} resizeMode='stretch'>
					<TouchableOpacity style={styles.societyView} onPress={() => this.goSubject(5)}>
						<Text style={[styles.type, styles.right]}>
							<Text style={styles.bigSize}>社会</Text>
							消防科普
						</Text>
						<Text style={[styles.score, styles.right]}>最佳:{this.props.test.maxScore[4]}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.societyAnotherView} onPress={() => this.goSubject(5)}></TouchableOpacity>
					<TouchableOpacity style={styles.propertyView} onPress={() => this.goSubject(2)}>
						<Text style={[styles.type, styles.right]}>
							<Text style={styles.bigSize}>物业</Text>
							从业人员
						</Text>
						<Text style={[styles.score, styles.right]}>最佳:{maxProperty}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.familyView} onPress={() => this.goSubject(6)}>
						<Text style={styles.type}>
							家庭
							<Text style={styles.bigSize}>消防安全</Text>
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.familyAnotherView} onPress={() => this.goSubject(6)}></TouchableOpacity>
				</ImageBackground>
			</View>
		)
	}
}

const styles = StyleSheet.create({
		rootView: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center'
		},
		imgBg: {
			flex: 1,
			marginVertical: 10,
			width: '80%'
		},
		societyView: {
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '100%',
			alignSelf: 'flex-end',
			justifyContent: 'center',
			height: '14%',
			//backgroundColor: 'rgba(0,0,0,.5)'
		},
		societyAnotherView: {
			top:0,
			height: '18%',
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '55%',
			//backgroundColor: 'rgba(0,0,0,.5)'
		},
		propertyView: {
			marginTop: '6%',
			height: '30%',
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '65%',
			alignSelf: 'flex-end',
			justifyContent: 'center',
			//backgroundColor: 'rgba(0,0,0,.5)'
		},
		familyView: {
			marginTop: '15%',
			height: '30%',
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '62%',
			//backgroundColor: 'rgba(0,0,0,.5)'
		},
		familyAnotherView:{
			bottom:'14%',
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '100%',
			alignSelf: 'flex-end',
			justifyContent: 'center',
			height: '14%',
			//backgroundColor: 'rgba(0,0,0,.5)'
		},
		type: {
			color: '#fff',
			fontSize: 20,
			backgroundColor: 'transparent',

		},
		bigSize: {
			fontSize: 24,
		},
		score: {
			//marginTop:6,
			fontWeight: 'bold',
			color: '#fff',
			backgroundColor: 'transparent'
		},
		right: {
			textAlign: 'right',
		},
	}
)

const mapStateToProps = store => ({
	nav: store.nav,
	test: store.test,
	userinfo: store.userinfo,
	appState: store.appState
})

export default connect(mapStateToProps)(Test)