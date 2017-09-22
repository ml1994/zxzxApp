import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Image} from 'react-native'
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
		const {dispatch} = this.props
		this.state = {
			modalVisible: false
		}
		myFetch.get(
			'/account/islogin',
			{},
			res => {
				console.log(res)
				res.code == '0' ? dispatch(this.initMaxScore()) : dispatch(NavigationActions.navigate({routeName: 'Login'}))
			},
			err => {
				console.log(err)
			}
		)

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
		dispatch(NavigationActions.navigate({routeName: 'Subject', params: {type}}))
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
			},]
		return (
			<View style={styles.rootView}>
				<Header type='title' title='物业培训' icons={icons}/>
				<ImageBackground source={require('../asset/test_bg.png')} style={styles.imgBg} resizeMode='stretch'>
					<TouchableOpacity style={styles.societyView} onPress={() => this.goSubject(1)}>
						<Text style={[styles.type, styles.right]}>
							<Text style={styles.bigSize}>社会</Text>
							消防科普
						</Text>
						<Text style={[styles.score, styles.right]}>最佳:{this.props.test.maxScore[0]}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.propertyView} onPress={() => this.setState({modalVisible: true})}>
						<Text style={[styles.type, styles.right]}>
							<Text style={styles.bigSize}>物业</Text>
							从业人员
						</Text>
						<Text style={[styles.score, styles.right]}>最佳:{this.props.test.maxScore[1]}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.fireView} onPress={() => alert('更多内容敬请期待')}>
						<Text style={styles.type}>
							消防
							<Text style={styles.bigSize}>从业</Text>
							人员
						</Text>
						<Text style={styles.score}>最佳:{this.props.test.maxScore[2]}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.programerView} onPress={() => alert('更多内容敬请期待')}>
						<Text style={styles.type}>
							消防
							<Text style={styles.bigSize}>工程师</Text>
						</Text>
						<Text style={styles.score}>最佳:{this.props.test.maxScore[3]}分</Text>
					</TouchableOpacity>
				</ImageBackground>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
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
								<Text style={styles.propertyTypeTitle}>物业从业人员选择</Text>
								{propertyType.map((item) => {
									return (
										<TouchableOpacity
											style={[styles.propertyTypeButton, {backgroundColor: item.bgColor}]}
											onPress={() => {this.goSubject(item.testType);this.setState({modalVisible:false})}} key={item.key}>
											<Image style={styles.propertyTypeIcon} resizeMode='contain'
												   source={item.avatar}></Image>
											<Text style={styles.propertyTypeText}>{item.name}</Text>
										</TouchableOpacity>)
								})}
							</View>
						</View>
					</TouchableOpacity>
				</Modal>
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
			//backgroundColor:'rgba(0,0,0,.5)'
		},
		propertyView: {
			marginTop: '22%',
			height: '20%',
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '60%',
			alignSelf: 'flex-end',
			justifyContent: 'center',
			//backgroundColor:'rgba(0,0,0,.5)'
		},
		fireView: {
			marginTop: '10%',
			height: '24%',
			paddingVertical: 10,
			paddingHorizontal: 10,
			width: '52%',
			justifyContent: 'flex-end',
			//backgroundColor:'rgba(0,0,0,.5)'
		},
		programerView: {
			position: 'absolute',
			bottom: 0,
			paddingVertical: 5,
			paddingHorizontal: 10,
			width: '100%',
			height: '12%',
			justifyContent: 'center',
			//backgroundColor:'rgba(0,0,0,.5)'
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
		//Modal
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
			fontWeight:'bold',
			fontSize:16,
			textAlign:'center',
			color:'#000'
		},
		propertyTypeButton: {
			marginTop: 15,
			paddingHorizontal: 15,
			borderRadius:10,
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
	}
)

const mapStateToProps = store => ({
	nav: store.nav,
	test: store.test,
	userinfo: store.userinfo
})

export default connect(mapStateToProps)(Test)