import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView, FlatList, Image, StyleSheet, RefreshControl, Alert} from 'react-native'
import {NavigationActions, TabNavigator} from 'react-navigation'
import Header from '../components/header'
import Ask from '../components/ask'
import myFetch from '../utils/myFetch'
import * as askActions from '../actions/ask'
import * as appStateActions from '../actions/appState'
import * as userinfoActions from '../actions/userinfo'

import CompAsks from '../views/compAsks'

class Asks extends Component {
	constructor(props) {
		super(props)
		const {dispatch} = this.props
		this.state = {
			refreshing: false,
		}

		myFetch.get(
			'/account/islogin',
			{},
			res => {
				console.log(res)
				if (res.code == '0') {
					dispatch(askActions.initAskList())
					dispatch(this.getList())
				} else {
					dispatch(NavigationActions.navigate({routeName: 'Login'}))
				}
			},
			err => {
				console.log(err)
			}
		)
	}


	getList() {
		const {dispatch} = this.props
		return dispatch => {
			dispatch(appStateActions.fetch({fetching: true}))
			myFetch.get(
				'/consult/list/question',
				{page: 1, pageSize: 1000},
				res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.question.rows.length != 0) {
							let vip = ''
							let partner = ''
							if (res.data.partner) {
								partner = res.data.partner.tails.partner_name
								vip = true
							} else {
								vip = false
							}
							const askList = res.data.question.rows
							dispatch(userinfoActions.getInfo({
								account: askList[0].tails.account,
								vip,
								partner
							}))
							dispatch(askActions.loadAskList({askList}))
							dispatch({type: 'LOADED_ASKLIST'})
						} else {
							dispatch({type: 'NO_ASKLIST'})
						}
					}
					dispatch(appStateActions.fetchEnd({fetching: false}))
				},
				err => {
					console.log(err)
					Alert.alert('提示', '获取列表失败')
					dispatch(appStateActions.fetchEnd({fetching: false}))
				}
			)
		}
	}

	refreshFun() {
		const {dispatch} = this.props
		this.setState({refreshing: true})//开始刷新
		myFetch.get(
			'/consult/list/question',
			{page: 1, pageSize: 1000},
			res => {
				console.log(res)
				if (res.code == 0) {
					if (res.data.question.rows.length != 0) {
						let vip = ''
						let partner = ''
						if (res.data.partner) {
							partner = res.data.partner.tails.partner_name
							vip = true
						} else {
							vip = false
						}
						const askList = res.data.question.rows
						dispatch(userinfoActions.getInfo({
							account: askList[0].tails.account,
							vip,
							partner
						}))
						dispatch(askActions.loadAskList({askList}))
						dispatch({type: 'LOADED_ASKLIST'})
					} else {
						dispatch({type: 'NO_ASKLIST'})
					}
				}
				this.setState({refreshing: false})//停止刷新
			},
			err => {
				console.log(err)
				Alert.alert('提示', '获取列表失败')
				this.setState({refreshing: false})//停止刷新
			}
		)
	}

	render() {
		// const icons = ['pencil-square-o','search']
		const {userinfo} = this.props
		const titles = [
			{
				title: '我的咨询',
				nav: 'Asks'
			},
			{
				title: '企业咨询',
				nav: 'CompAsks'
			}
		]
		const icons = ['pencil-square-o']
		let askList = this.props.ask.askList
		askList.map((item, index) => {
			item.key = index
		})
		return (
			<View style={styles.rootView}>
				{
					userinfo.vip ? <Header type='tabs' titles={titles} icons={icons}/> :
						<Header type='title' title='我的咨询' icons={icons}/>
				}
				{
					this.props.ask.askList.length != 0 ?
					(
						<FlatList 
							data={askList}
							refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={() => this.refreshFun()}
									tintColor="#ccc"
									title="Loading..."
									titleColor="#ccc"
								/>
							}
							renderItem={({item}) => (
								<Ask 
									title={item.title} 
									text={item.descr} 
									time={item.created}
									id={item.id} 
									update={item.answer_updated}/>
						)}/>
					)
					: (
						<ScrollView
							style={styles.scrollview}
							showsVerticalScrollIndicator={false}
							refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={() => this.refreshFun()}
									tintColor="#ccc"
									title="Loading..."
									titleColor="#ccc"
								/>
							}>
							<View style={styles.container}>
								<Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
								<Text style={styles.text}>您还没有咨询任何问题</Text>
							</View>
						</ScrollView>
					)
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	container: {
		marginTop: 100,
		alignItems: 'center'
	},
	img: {
		width: 100,
		height: 100,
		marginBottom: 10
	},
	text: {
		color: '#c9c9c9'
	}
})

const mapStateToProps = store => ({
	nav: store.nav,
	ask: store.ask,
	userinfo: store.userinfo
})

const connectedAsks = connect(mapStateToProps)(Asks)

const AskTabs = TabNavigator({
	Asks: {
		screen: connectedAsks,
		navigationOptions: {
			tabBarLabel: '我的咨询'
		}
	},
	CompAsks: {
		screen: CompAsks,
		navigationOptions: {
			tabBarLabel: '企业咨询',

		}
	}
}, {
	tabBarPosition: 'top',
	//lazy:true,
	swipeEnabled: false,
	animationEnabled: false,
	tabBarOptions: {
		style: {
			height: 0,//隐藏tabbar
		}
	}

})

export default AskTabs