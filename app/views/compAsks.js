import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	View,
	Text,
	ScrollView,
	FlatList,
	Image,
	StyleSheet,
	RefreshControl,
	Alert,
	TouchableOpacity,
	LayoutAnimation,
	UIManager,
	Dimensions
} from 'react-native'
import {NavigationActions, TabNavigator} from 'react-navigation'
import Header from '../components/header'
import Ask from '../components/ask'
import myFetch from '../utils/myFetch'
import * as askActions from '../actions/ask'
import * as appStateActions from '../actions/appState'
import * as userinfoActions from '../actions/userinfo'

var myLayoutAnimation = {
	duration: 100,
	create: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.scaleXY
	},
	update: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.scaleXY
	}
}

const SCREEN_HEIGHT = Dimensions.get('window').height

class CompAsks extends Component {
	constructor(props) {
		super(props)
		const {dispatch} = this.props
		this.state = {
			refreshing: false,
			subTabIndex: 0,
			filterViewShow: false,
			regionList: [],
			projectList: [],
			type: '',
			regionListSelected: -1,
			projetListSelected: -1
		}
		
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
		
		dispatch(askActions.initCompAskList())
		dispatch(this.getList(1))
		// myFetch.get(
		// 	'/account/islogin',
		// 	{},
		// 	res => {
		// 		console.log(res)
		// 		if (res.code == '0') {
		// 			dispatch(askActions.initCompAskList())
		// 			dispatch(this.getList(1))
		// 		} else {
		// 			dispatch(NavigationActions.navigate({routeName: 'Login'}))
		// 		}
		// 	},
		// 	err => {
		// 		console.log(err)
		// 	}
		// )
	}

	getList(type, region = '', project = '') {
		const {dispatch} = this.props
		const params = {
			page: 1,
			pageSize: 1000,
			type,
			region,
			project
		}
		this.setState({
			type
		})
		return dispatch => {
			dispatch(appStateActions.fetch({fetching: true}))
			myFetch.get(
				'/consult/list/questionCompany',
				params,
				res => {
					console.log(res)
					if (res.code == 0) {
						if (res.data.question.rows.length != 0) {
							let vip = ''
							let partner = ''
							let account = res.data.partner.phone
							if (res.data.partner) {
								partner = res.data.partner.tails.partner_name
								vip = true
							} else {
								vip = false
							}
							const compAskList = res.data.question.rows
							dispatch(userinfoActions.getInfo({
								account: account,
								vip,
								partner
							}))
							dispatch(askActions.loadCompAskList({compAskList}))
							dispatch({type: 'LOADED_COMPASKLIST'})
						} else {
							dispatch(askActions.initCompAskList())
							dispatch({type: 'NO_COMPASKLIST'})
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

	filterList() {
		const {dispatch} = this.props
		let region = (this.state.regionListSelected != -1) ? this.state.regionList[this.state.regionListSelected] : ''
		let project = (this.state.projectListSelected != -1) ? this.state.projectList[this.state.projectListSelected] : ''
		this.setState({filterViewShow: false})
		dispatch(this.getList(this.state.subTabIndex, region, project))
	}

	refreshFun() {
		const {dispatch} = this.props
		const params = {
			page: 1,
			pageSize: 1000,
			type: this.state.subTabIndex + 1
		}
		this.setState({refreshing: true})//开始刷新
		myFetch.get(
			'/consult/list/questionCompany',
			params,
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
						const compAskList = res.data.question.rows
						dispatch(userinfoActions.getInfo({
							account: compAskList[0].tails.account,
							vip,
							partner
						}))
						dispatch(askActions.loadCompAskList({compAskList}))
						dispatch({type: 'LOADED_COMPASKLIST'})
					} else {
						dispatch({type: 'NO_COMPASKLIST'})
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

	subTabPress(index) {
		LayoutAnimation.configureNext(myLayoutAnimation)
		const {dispatch} = this.props
		this.setState({
			subTabIndex: index,
			filterViewShow:false
		})
		let region = (this.state.regionListSelected != -1) ? this.state.regionList[this.state.regionListSelected] : ''
		let project = (this.state.projectListSelected != -1) ? this.state.projectList[this.state.projectListSelected] : ''
		dispatch(this.getList(index + 1, region, project))
	}

	asksFilter() {
		LayoutAnimation.configureNext(myLayoutAnimation)
		this.setState(prevState => {
			return {
				filterViewShow: !prevState.filterViewShow
			}
		})
		console.log(this.state.filterViewShow)
		if (!this.state.filterViewShow) {
			this.getRegionAndProject()
		}
	}

	getRegionAndProject() {
		const {dispatch} = this.props
		dispatch(appStateActions.fetch({fetching: true}))
		myFetch.get(
			'/consult/list/filter',
			{},
			res => {
				const regionList = res.data.region.map(value => {
					return value.region
				})
				const projectList = res.data.project.map(value => {
					return value.project
				})
				this.setState({
					regionList,
					projectList
				})
				dispatch(appStateActions.fetchEnd({fetching: false}))
			},
			err => {
				console.log(err)
				dispatch(appStateActions.fetchEnd({fetching: false}))
			}
		)
	}

	resetSelected() {
		this.setState({
			regionListSelected: -1,
			projectListSelected: -1
		})
	}

	render() {
		// const icons = ['pencil-square-o','search']
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
		const subTabsArr = ['综合', '时间', '热度', '筛选']
		const subTabsArrlength = subTabsArr.length
		let compAskList = this.props.ask.compAskList
		compAskList.map((item, index) => {
			item.key = index
		})
		let filterHeight = this.state.filterViewShow ? SCREEN_HEIGHT - 170 : 1
		return (
			<View style={styles.rootView}>
				{<Header type='tabs' titles={titles} icons={icons}/>}
				<View style={styles.subTabsView}>
					{
						subTabsArr.map((value, index) => {
							return (
								<TouchableOpacity style={styles.subTabView} key={index} onPress={() => {
									index != subTabsArrlength - 1 ? this.subTabPress(index) : this.asksFilter()
								}}>
									<Text
										style={[styles.subTabText, (this.state.subTabIndex == index && index != subTabsArrlength - 1) ? styles.subTabTextActive : '']}>{value}</Text>
								</TouchableOpacity>
							)
						})
					}
				</View>
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
					{this.props.ask.compAskList.length != 0 ?
						(<FlatList data={this.props.ask.compAskList}
								   renderItem={({item}) => <Ask title={item.title} text={item.descr} time={item.created}
																id={item.id} update={item.answer_updated}/>}/>)
						: (
							<View style={styles.container}>
								<Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
								<Text style={styles.text}>您还没有咨询任何问题</Text>
							</View>
						)
					}
				</ScrollView>
				<View style={[styles.filterView, {height: filterHeight}]}>
					<ScrollView style={styles.filterScrollView}>
						<View style={styles.filterImgView}>
							<Image source={require('../asset/filter_region.png')} style={styles.filterImg}/>
							<Text style={styles.filterImgText}>区域</Text>
						</View>
						<View style={styles.regionList}>
							{this.state.regionList.map((item, index) => {
								return (
									<TouchableOpacity style={styles.regionItem} key={index} onPress={() => {
										this.setState({regionListSelected: index})
									}}>
										<Text
											style={[styles.regionText, this.state.regionListSelected == index ? styles.activeText : '']}>{item}</Text>
									</TouchableOpacity>
								)
							})}
						</View>
						<View style={styles.filterImgView}>
							<Image source={require('../asset/filter_project.png')} style={styles.filterImg}/>
							<Text style={styles.filterImgText}>项目</Text>
						</View>
						<View style={styles.projectList}>
							{this.state.projectList.map((item, index) => {
								return (
									<TouchableOpacity style={styles.projectItem} key={index} onPress={() => {
										this.setState({projectListSelected: index})
									}}>
										<Text
											style={[styles.projectText, this.state.projectListSelected == index ? styles.activeText : '']}
											numberOfLines={1}>{item}</Text>
									</TouchableOpacity>
								)
							})}
						</View>
					</ScrollView>
					<View style={styles.buttonsView}>
						<TouchableOpacity style={styles.resetView} onPress={() => {
							this.resetSelected()
						}}>
							<Text style={styles.resetText}>重置</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.confirmView} onPress={() => {
							this.filterList()
						}}>
							<Text style={styles.confirmText}>确定</Text>
						</TouchableOpacity>
					</View>
				</View>
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
	},
	subTabsView: {
		flexDirection: 'row',
		backgroundColor: '#f1f1f1',
		borderBottomWidth: 1,
		borderBottomColor: '#bbb'
	},
	subTabView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 40
	},
	subTabText: {
		color: '#8b7272'
	},
	subTabTextActive: {
		color: '#c32827'
	},
	scrollview: {
		backgroundColor: '#fff'
	},
	filterView: {
		position: 'absolute',
		top: 121,
		left: 0,
		width: '100%',
		backgroundColor: '#fff',
		overflow: 'hidden'
	},
	filterScrollView: {
		paddingHorizontal: 15,
		paddingVertical: 20,
	},
	filterImgView: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	filterImg: {
		width: 24,
		height: 24
	},
	filterImgText: {
		color: '#000',
		fontSize: 16,
		paddingLeft: 6
	},
	buttonsView: {
		flexDirection: 'row'
	},
	resetView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#c32726'
	},
	resetText: {
		color: '#000'
	},
	confirmView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		backgroundColor: '#c32726'
	},
	confirmText: {
		color: '#fff'
	},
	regionList: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 20
	},
	regionItem: {
		width: '16.7%',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	regionText: {
		color: '#000'
	},
	activeText: {
		color: '#c32726'
	},
	projectList: {
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom: 20
	},
	projectItem: {
		width: '100%',
		height: 30,
		justifyContent: 'center',
		//alignItems:'center'
	},
	projectText: {
		color: '#000'
	},
})

const mapStateToProps = store => ({
	nav: store.nav,
	ask: store.ask,
	userinfo:store.userinfo
})

export default connect(mapStateToProps)(CompAsks)

