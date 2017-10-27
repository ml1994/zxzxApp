import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Alert, ScrollView} from 'react-native'
import Header from '../components/header'
import myFetch from '../utils/myFetch'
import * as appStateActions from '../actions/appState'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

class TestTip extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content: ''
		}
		this.getTip()
	}

	getTip() {
		const {dispatch} = this.props
		myFetch.get('/examqueBank/banktips/' + this.props.test.type,
			{},
			res => {
				dispatch(appStateActions.fetch({fetching: true}))
				if (res.code == 0) {
					this.setState({
						content: res.data
					})
					dispatch(appStateActions.fetchEnd({fetching: false}))
				} else {
					Alert.alert('提示', res.message)
					dispatch(NavigationActions.back())
				}
			},
			err => {
				console.log(err)
			})
	}

	renderContent() {
		if (this.props.test.type == 6) {
			return (
				<ScrollView>
					<Image source={require('../asset/familyTips.jpg')} style={styles.familyTip}
						   resizeMode='contain'/>
				</ScrollView>)
		} else {
			return (
				<View style={styles.rootView}>
					<View style={styles.contentContainer}>
						<Image style={styles.imgTop} source={require('../asset/tips_top.png')} resizeMode='contain'/>
						<View style={styles.content}>
							<Text style={styles.contentTitle}>{this.state.content.title}</Text>
							<Text style={styles.contentText}>{this.state.content.context}</Text>
						</View>
					</View>
					<Image style={styles.imgBottom} source={require('../asset/tips_bottom.png')} resizeMode='stretch'/>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={styles.rootView}>
				<Header type='title' title='消防小贴士'></Header>
				{this.renderContent()}
			</View>
		)

	}
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imgTop: {
		height: 40,
		marginBottom: 20
	},
	contentContainer: {
		alignItems: 'center',
		padding: 20
	},
	content: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ce2626',
		width: '100%',
		padding: 10
	},
	imgBottom: {
		position: 'absolute',
		bottom: 0,
		height: 110,
		width: '100%'
	},
	familyTip: {
		height: 4120,
		width: '100%'
	}
})
const mapStateToProps = store => {
	return {
		nav: store.nav,
		test: store.test
	}
}
export default connect(mapStateToProps)(TestTip)