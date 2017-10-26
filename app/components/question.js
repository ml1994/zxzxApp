import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from './icon'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import storage from '../gStorage'

class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checks: ''
		};
		this.checkState()

	}

	checkState = () => {
		let {que_type, index} = this.props;
		storage.load({key: this.props.userinfo.account, id: this.props.test.type,}).then(ret => {
			let result = ret.resultList[index].result;
			if (ret.resultList[index].result) {
				this.setState({
					checks: result
				})
			}
		})
			.catch(err => {
				//console.warn(err.message);
				switch (err.name) {
					case 'NotFoundError':
						//console.log('初始化答案状态未找到记录')
						break;
					case 'ExpiredError':
						break;
				}
			})
	}//加载未完成测试答案
	optionCheck = (option) => {
		let {que_type, index} = this.props;
		storage.load({key: this.props.userinfo.account, id: this.props.test.type,}).then(ret => {
			ret.testIng = index;
			if (que_type == 2) {
				let result = (ret.resultList[index].result) ? ret.resultList[index].result.split(',') : [];
				indexOfResult = result.indexOf(option);
				if (indexOfResult == -1) {
					result.push(option);
				} else {
					result.splice(indexOfResult, 1);
				}
				ret.resultList[index].result = result.sort().join(',');
				this.setState({
					checks: result.sort().join(',')
				})
			}
			else {
				if (option == ret.resultList[index].result) {
					ret.resultList[index].result = '';
					this.setState({
						checks: ''
					})
				}
				else {
					ret.resultList[index].result = option;
					this.setState({
						checks: option
					})
				}
			}
			storage.save({key: this.props.userinfo.account, id: this.props.test.type, data: ret, expries: null});
			//console.log(storage)
		})
			.catch(err => {
				// 如果没有找到数据且没有sync方法，
				// 或者有其他异常，则在catch中返回
				console.warn(err.message);
				switch (err.name) {
					case 'NotFoundError':
						console.log('保存选中答案未找到记录')
						break;
					case 'ExpiredError':
						break;
				}
			})
	}//选择答案
	checkView = (option) => {
		if (this.props.que_type == 2) {
			let flag = this.state.checks.split(',').indexOf(option);
			if (flag == -1) {
				return <View style={styles.optionNoCheck}></View>
			} else {
				return <View style={styles.optionCheck}><Icon name='check' size={14} color='#fff'/></View>

			}
		} else {
			if (this.state.checks == option) {
				return <View style={styles.optionCheck}><Icon name='check' size={14} color='#fff'/></View>
			} else {
				return <View style={styles.optionNoCheck}></View>
			}
		}
	}

	render() {
		//console.log(this.state.checks)
		const {que_type, stem, options, index, total} = this.props
		const queType = ['单选题', '多选题', '判断题']
		let jsonOption = JSON.parse(options)
		jsonOption.map((item, index) => {
			item.key = index
		})
		return (
			<View style={styles.rootView}>
				<View style={styles.titleView}>
					<View style={styles.typeView}>
						<View style={styles.typeTextView}>
							<Text style={styles.typeText}>{queType[que_type - 1]}</Text>
						</View>
						<View style={styles.typeArrow}></View>
					</View>
					<Text style={styles.num}>
						共
						<Text style={styles.nowNum}>{index + 1}</Text>
						/{total}题
					</Text>
				</View>
				<Text style={styles.question}>{index + 1}.{stem}</Text>
				<FlatList
					style={styles.optionList}
					data={jsonOption}
					renderItem={({item, index}) => (
						((item.value)?<TouchableOpacity key={index + item.name} activeOpacity={.8} style={styles.optionView}
												onPress={() => this.optionCheck(item.name)}>
							{this.checkView(item.name)}
							<Text style={styles.optionText}>{item.value}</Text>
						</TouchableOpacity>:null)
					)}/>
				{/* <TouchableOpacity>
                    <ImageBackground source={require('../asset/btn_bg.png')} resizeMode='contain' style={styles.btn}>
                        <Text style={styles.btnText}>下一题</Text>
                    </ImageBackground>
                </TouchableOpacity> */}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	rootView: {
		alignItems: 'center'
	},
	titleView: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		marginTop: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#e6e6e6',
	},
	typeView: {
		flexDirection: 'row'
	},
	typeTextView: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#faab00',
		height: 30,
		paddingHorizontal: 10
	},
	typeText: {
		fontWeight: 'bold',
		color: '#fff',
	},
	typeArrow: {
		borderWidth: 15,
		borderLeftColor: '#faab00',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
		height: 0
	},
	num: {
		marginRight: 12,
		color: '#3d3d3d'
	},
	nowNum: {
		color: '#ce2626'
	},
	question: {
		marginTop: 18,
		fontSize: 16,
		lineHeight: 24,
		width: '90%',
		color: '#3d3d3d'
	},
	optionList: {
		marginTop: 30,
		width: '90%',
	},
	optionView: {
		flexDirection: 'row',
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#e5e5e5',
		borderRadius: 5,
		width: '100%',
		height: 40,
		alignItems: 'center'
	},
	optionCheckView: {
		backgroundColor: '#eee'
	},
	optionCheck: {
		marginHorizontal: 10,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#dd4b4b',
		justifyContent: 'center',
		alignItems: 'center'
	},
	optionNoCheck: {
		marginHorizontal: 10,
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#bababa'
	},
	optionText: {
		fontSize: 14
	},
	// btn:{
	//     marginTop:40,
	//     width:110,
	//     height:40,
	//     justifyContent:'center',
	//     alignItems:'center',
	// },
	// btnText:{
	//     fontSize:16,
	//     fontWeight:'bold',
	//     color:'#fff'
	// }
})
const mapStateToProps = store => {
	return {
		nav: store.nav,
		userinfo: store.userinfo,
		test:store.test
	}
}

export default connect(mapStateToProps)(Question)