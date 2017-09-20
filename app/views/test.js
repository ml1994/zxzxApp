import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'
import storage from '../gStorage'
import Header from '../components/header'

import myFetch from '../utils/myFetch'
import * as testActions from '../actions/test'
import * as userinfoActions from '../actions/userinfo'


class Test extends Component {

	constructor(props) {
		super(props)
		const {dispatch} = this.props

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
	initMaxScore(){
		const {dispatch} = this.props
		let maxScore = new Array()
		return dispatch=>{
			dispatch({type:'GETTING_MAX_SCORE'})
			myFetch.get(
				'/examqueBank/list',
				{},
				res => {
					res.rows.map((item)=>{
						maxScore.push(item.maxscore);
					})
					console.log(res)
					dispatch(userinfoActions.getInfo({account:res.rows[0].account}))
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
		const icons = ['bell-o', 'search']
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
					<TouchableOpacity style={styles.propertyView} onPress={() => this.goSubject(2)}>
						<Text style={[styles.type, styles.right]}>
							<Text style={styles.bigSize}>物业</Text>
							消控人员
						</Text>
						<Text style={[styles.score, styles.right]}>最佳:{this.props.test.maxScore[1]}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.fireView} onPress={() => this.goSubject(3)}>
						<Text style={styles.type}>
							消防
							<Text style={styles.bigSize}>从业</Text>
							人员
						</Text>
						<Text style={styles.score}>最佳:{this.props.test.maxScore[2]}分</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.programerView} onPress={() => this.goSubject(4)}>
						<Text style={styles.type}>
							消防
							<Text style={styles.bigSize}>工程师</Text>
						</Text>
						<Text style={styles.score}>最佳:{this.props.test.maxScore[3]}分</Text>
					</TouchableOpacity>
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
	}

})

const mapStateToProps = store => ({
	nav: store.nav,
	test:store.test,
	userinfo:store.userinfo
})

export default connect(mapStateToProps)(Test)