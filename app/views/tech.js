import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Image,
	Linking,
	ScrollView,
	RefreshControl
} from 'react-native'
import Header from '../components/header'
import myFetch from '../utils/myFetch'
import * as techActions from '../actions/tech'
import * as appStateActions from '../actions/appState'
import { NavigationActions } from 'react-navigation'

class Tech extends Component {

	constructor(props) {
		super(props)
		this.state = {
			refreshing: false,
		}
		const {dispatch,appState} = this.props
		if(appState.isConnected){
			myFetch.get(
				'/account/islogin',
				{},
				res => {
					console.log(res)
					if (res.code == '0') {
						dispatch(this.getTechList())
					} else {
						dispatch(NavigationActions.navigate({routeName: 'Login'}))
					}
				},
				err => {
					console.log(err)
				}
			)
		}else{

		}
	}

	getTechList() {
		const {dispatch} = this.props
		return dispatch => {
			dispatch(appStateActions.fetch({fetching: true}))
			myFetch.get(
				'/api/techlist',
				{page: 1, pagesize: 1000},
				res => {
					if (res.code == 0) {
						const techList = res.data.rows
						if (techList.length > 0) {
							dispatch(techActions.loadTechList({
								ifRegister: true,
								list: res.data.rows,
								baseUrl: res.baseurl
							}))
							dispatch({type: 'LOADED_TECHLIST'})
						}
						else {
							dispatch({type: 'NO_TECHLIST'})
						}
					}
					dispatch(appStateActions.fetchEnd({fetching: false}))
				},
				err => {
					dispatch(appStateActions.fetchEnd({fetching: false}))
					console.log(err)
					Alert.alert('提示', '获取列表失败')
				}
			)

		}
	}

	refreshFun() {
		const {dispatch} = this.props
		this.setState({refreshing: true})//开始刷新
		myFetch.get(
			'/api/techlist',
			{page: 1, pagesize: 1000},
			res => {
				if (res.code == 0) {
					const techList = res.data.rows
					if (techList.length > 0) {
						dispatch(techActions.loadTechList({
							ifRegister: true,
							list: res.data.rows,
							baseUrl: res.baseurl
						}))
						dispatch({type: 'LOADED_TECHLIST'})
					}
					else {
						dispatch({type: 'NO_TECHLIST'})
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

	delayTime(time) {
		let now = new Date()
		let delaytime = new Date(time.replace(/-/g, "/"))
		if (now > delaytime) {
			return false
		} else {
			return true
		}
	}

	progress(item) {
		let text = ''
		if (item.pay_status == '未付款') {
			text = '验证付款中'
		} else if (item.status == '未审批' || this.delayTime(item.delay_time)) {
			text = '审批中'
		} else {
			text = '审批通过'
		}
		return <Text style={styles.progress}>{text}</Text>
	}

	renderList() {
		if (this.props.tech.ifRegister) {
			if (this.props.tech.list.length != 0) {
				return (
					<FlatList
						style={styles.list}
						data={this.props.tech.list}
						renderItem={({item, index}) => (
							<View style={styles.item} key={index}>
								<Image
									source={{uri: `${this.props.tech.baseUrl}uploadify/renderThumb/${item.project_pic}/160x160`}}
									style={styles.itemImg} resizeMode='contain'></Image>
								<View style={styles.itemInfo}>
									<Text style={styles.itemTitle}
										  numberOfLines={1}>{(item.project_name.length > 12) ? item.project_name.substring(0, 9) + '。。。' : item.project_name.substring(0, 12)}</Text>
									<Text style={styles.itemText} numberOfLines={1}>项目类型：{item.project_type}</Text>
									<Text style={styles.itemText} numberOfLines={1}>项目类别：{item.project_style}</Text>
									<Text style={styles.itemText} numberOfLines={1}>审图进度：{this.progress(item)}</Text>
									{(item.status == '已审批') ?
										<View style={styles.downloadContainer}><TouchableOpacity onPress={() => {
											Linking.openURL(`${myFetch.rootUrl}/api/techpdf/${item.project_id}`)
										}}><Text
											style={styles.downloadText}>查看审批文件</Text></TouchableOpacity></View> : null}

								</View>
							</View>
						)}
					/>)
			} else {
				return (
					<View style={styles.container}>
						<Image style={styles.img} resizeMode='contain' source={require('../asset/no_ask.png')}/>
						<Text style={styles.text}>您还没有任何审图服务</Text>
					</View>)
			}
		}
		else {
			return (
				<View style={styles.container}>
					<Image style={styles.img} resizeMode='contain' source={require('../asset/no_register.png')}/>
					<Text style={styles.text}>请登录公司官网http://e.zxzx119.com/创建项目资料。</Text>
					<Text style={styles.text}>手机端可同步查看图纸审查进度。</Text>
				</View>
			)
		}
	}

	render() {

		return (
			<View style={styles.rootView}>
				<Header type='title' title='审图服务'/>
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
					}>{this.renderList()}</ScrollView>
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
		color: '#c9c9c9',
		lineHeight:30
	},
	// underline: {
	// 	textDecorationLine:'underline'
	// },
	list: {
		padding: 15,
		paddingBottom: 0
	},
	item: {
		flexDirection: 'row',
		backgroundColor: '#F1F1F1',
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 20
	},
	itemImg: {
		width: '40%',
		height: 90
	},
	itemInfo: {
		marginLeft: '5%',
		width: '60%'
	},
	itemTitle: {
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 5,
		paddingRight: 10,
	},
	itemText: {
		color: '#000',
		fontSize: 12
	},
	progress: {
		color: '#b61515'
	},
	downloadContainer: {
		marginLeft: 24,
		marginTop: 5
	},
	downloadText: {
		fontSize: 10,
		color: '#2a649a',
		textDecorationLine: 'underline'
	}
})
const mapStateToProps = store => ({
	nav: store.nav,
	tech: store.tech,
	appState: store.appState
})

export default connect(mapStateToProps)(Tech)